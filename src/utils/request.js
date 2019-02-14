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
      accessToken: Taro.getStorageSync('token')
    };
    return config;
  },
  error => {
    console.log(error);
    // Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (+res.code !== 0) {
      Taro.showToast({
        title: `${res.message}`,
        icon: 'none',
        mask: true
      });
    }
    return res.data;
  },
  error => {
    Taro.showToast({
      title: `网络请求错误`,
      icon: 'none',
      mask: true
    });
    return error;
  }
);

export default service;
