import Taro from '@tarojs/taro';
import * as Api from '../service/base';

import { genMapMenu, genMenu } from '../utils/menu';

export default {
  namespace: 'menus',
  state: {
    tree: [],
    menus: [],
    mapMenus: [],
    ...Taro.getStorageSync('menu')
  },

  effects: {
    *getMenuTree({ payload }, { call, put }) {
      const res = yield call(Api.getMenuTree, payload);
      const menus = genMenu(res);
      const mapMenus = genMapMenu(menus);
      const data = { tree: res, menus, mapMenus };
      yield put({ type: 'save', payload: data });
      yield Taro.setStorage({ key: 'menu', data });
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
