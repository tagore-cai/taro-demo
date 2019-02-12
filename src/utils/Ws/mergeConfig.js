'use strict';

import { forEach, deepMerge, isObject } from '../index';

export default function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  const config = {};

  forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
    if (isObject(config2[prop])) {
      config[prop] = deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (isObject(config1[prop])) {
      config[prop] = deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  forEach(
    [
      'baseURL',
      'transformRequest',
      'transformResponse',
      'paramsSerializer',
      'timeout',
      'withCredentials',
      'adapter',
      'responseType',
      'xsrfCookieName',
      'xsrfHeaderName',
      'onUploadProgress',
      'onDownloadProgress',
      'maxContentLength',
      'validateStatus',
      'maxRedirects',
      'httpAgent',
      'httpsAgent',
      'cancelToken',
      'socketPath'
    ],
    function defaultToConfig2(prop) {
      if (typeof config2[prop] !== 'undefined') {
        config[prop] = config2[prop];
      } else if (typeof config1[prop] !== 'undefined') {
        config[prop] = config1[prop];
      }
    }
  );

  return config;
}
