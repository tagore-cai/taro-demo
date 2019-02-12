import Taro from '@tarojs/taro';

import InterceptorManager from './InterceptorManager';

import { forEach, merge, buildURL } from '../index';
import mergeConfig from './mergeConfig';

export default class Ws {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };

    forEach(['delete', 'get', 'head', 'options'], method => {
      this[method] = function(url) {
        return this.request(method, url);
      };
    });

    forEach(['post', 'put', 'patch'], method => {
      this[method] = (url, data, config) => {
        return this.request(
          merge(config || {}, {
            method,
            url,
            data
          })
        );
      };
    });
  }
  request(config) {
    if (typeof config === 'string') {
      config = arguments[1] || {};
      config.url = arguments[0];
    } else {
      config = config || {};
    }

    config = mergeConfig(this.defaults, config);
    config.method = config.method ? config.method.toLowerCase() : 'get';

    // Hook up interceptors middleware
    const chain = [Taro.request, undefined];
    console.log(config);

    let promise = Promise.resolve(config);
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }

  getUri(config) {
    config = mergeConfig(this.defaults, config);
    return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
  }
}
