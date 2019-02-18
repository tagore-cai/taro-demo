import Taro from '@tarojs/taro';

export default function request(options) {
  options = options || {};
  if (typeof options === 'string') {
    options = {
      url: options
    };
  }
  const originSuccess = options.success;
  const originFail = options.fail;
  const originComplete = options.complete;
  let requestTask;
  const p = new Promise((resolve, reject) => {
    options.success = res => {
      originSuccess && originSuccess(res);
      resolve(res);
    };
    options.fail = res => {
      originFail && originFail(res);
      reject(res);
    };

    options.complete = res => {
      originComplete && originComplete(res);
    };

    requestTask = Taro.request(options);
  });
  p.abort = cb => {
    cb && cb();
    if (requestTask) {
      requestTask.abort();
    }
    return p;
  };
  return p;
}
