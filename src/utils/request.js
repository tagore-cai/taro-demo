import Taro from '@tarojs/taro';
import Ws from './Ws';

const service = new Ws({
  baseURL: '', // api 的 base_url
  timeout: 1000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    config.header = {
      'Content-Type': 'application/json;charset=UTF-8',
      'accessToken': Taro.getStorageSync('accessToken')
    };
    return config;
  },
  error => {
    console.log(error);
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (+res.code !== 0) {
      return Promise.reject(res);
    }
    return res;
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
