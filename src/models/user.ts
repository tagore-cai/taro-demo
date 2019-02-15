import Taro from '@tarojs/taro';
// model文件模版
import * as Api from '../service/login';

const INITIAL_STATE = {
  appList: [],
  token: '',
  oauthUser: {}
};

export default {
  namespace: 'user',
  state: {
    appList: [],
    token: '',
    oauthUser: {}
  },

  effects: {
    *login({ payload }, { call, put }) {
      const { appList, token, oauthUser } = yield call(Api.login, payload);
      Taro.setStorage({
        key: 'user',
        data: {
          appList,
          token,
          oauthUser
        }
      });
      yield put({ type: 'menus/getMenuTree' });
      yield put({
        type: 'save',
        payload: {
          appList,
          token,
          oauthUser
        }
      });
    },

    *getToken(_, { put }) {
      const payload = Taro.getStorageSync('user');
      yield put({ type: 'save', payload });
      if (payload) {
        yield put({ type: 'menus/getMenuTree' });
      }
    }
  },

  reducers: {
    save(state = INITIAL_STATE, { payload }) {
      return { ...state, ...payload };
    }
  }
};
