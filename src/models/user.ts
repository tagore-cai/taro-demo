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
        key: 'token',
        data: token
      });
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
      const token = Taro.getStorageSync('token');
      yield put({ type: 'saveToken', payload: { token } });
    }
  },

  reducers: {
    save(state = INITIAL_STATE, { payload }) {
      return { ...state, ...payload };
    },

    saveToken(state = { token: '' }, { payload }) {
      return {
        ...state,
        ...payload
      };
    }
  }
};
