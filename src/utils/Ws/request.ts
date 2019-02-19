import Taro from '@tarojs/taro';

/**
 * request 必须实现 complate 方法作为返回调用
 * 此方法自己实现请求适配
 * @export
 * @param {*} options
 * @returns
 */
export default function request(options) {
  return Taro.request(options);
}
