import Taro from '@tarojs/taro';

export default function request(options) {
  const a = Taro.request(options);
  console.log(a);
}
