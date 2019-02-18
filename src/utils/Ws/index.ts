import Request from './request';

import InterceptorManager from './InterceptorManager';
import Queue from './queue';

export default class Ws {
  defaults: Object;
  queue: Queue;
  interceptors: {
    request: InterceptorManager;
    response: InterceptorManager;
  };

  delete: (url: string, data?: Object, config?: Object) => Promise<any>;
  get: (url: string, data?: Object, config?: Object) => Promise<any>;
  head: (url: string, data?: Object, config?: Object) => Promise<any>;
  options: (url: string, data?: Object, config?: Object) => Promise<any>;
  post: (url: string, data?: Object, config?: Object) => Promise<any>;
  put: (url: string, data?: Object, config?: Object) => Promise<any>;
  patch: (url: string, data?: Object, config?: Object) => Promise<any>;

  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };

    this.queue = new Queue(5, Request);

    ['delete', 'get', 'head', 'options'].forEach(method => {
      this[method] = (url, params, config) => {
        return this.request({
          ...config,
          method,
          url,
          params
        });
      };
    });

    ['post', 'put', 'patch'].forEach(method => {
      this[method] = (url, data, config) => {
        return this.request({
          ...config,
          method,
          url,
          data
        });
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

    config.method = config.method ? config.method.toLowerCase() : 'get';

    const chain = [this.queue.request.bind(this.queue), undefined];

    let promise = Promise.resolve(config);

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  }
}
