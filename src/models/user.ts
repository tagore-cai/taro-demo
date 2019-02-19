import Taro from '@tarojs/taro';
// model文件模版
import * as Api from '../service/login';

export default {
  namespace: 'user',
  state: {
    appList: [],
    token: '',
    oauthUser: {},
    ...Taro.getStorageSync('user')
  },

  effects: {
    *login({ payload }, { call, put }) {
      const auth = yield call(Api.login, payload);
      yield Taro.setStorage({ key: 'user', data: { ...auth } });
      yield put({ type: 'save', payload: { ...auth } });
      yield put({ type: 'menus/getMenuTree' });
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
