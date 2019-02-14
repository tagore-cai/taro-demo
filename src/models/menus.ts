import Taro from '@tarojs/taro';
// model文件模版
import * as Api from '../service/base';

const INITIAL_STATE = {
  tree: [],
  menus: [],
  mapMenus: {}
};

/**
 * 返回重构路由数据
 * @param {后端返回菜单数据} sourceMenus
 * @param {重构的路由} menus
 * @param {父级菜单} father
 * @param {菜单层数} i
 */
export function genMenu(sourceMenus: Array<any> = [], menus: Array<any> = [], father?, i: number | string = 0) {
  let idx = 0;
  sourceMenus.forEach(function(item) {
    if (item.useable === 1) {
      menus[idx] = {};
      menus[idx].path = item.href;
      menus[idx].name = item.name;
      menus[idx].useable = item.useable;
      menus[idx].delFlag = item.delFlag;
      menus[idx].key = `${i}-${idx}`;
      menus[idx].hidden = false;
      menus[idx].uid = father ? `${father.uid}/${item.href}` : item.href;
      menus[idx].children = [];
      if (item.childrenMenu && item.childrenMenu.length > 0) {
        genMenu(item.childrenMenu, menus[idx].children, menus[idx], `${i}-${idx}`);
      }
      idx += 1;
    } else if (item.childrenMenu && item.childrenMenu.length <= 0 && father) {
      father.meta = father.meta || [];
      father.meta.push({
        path: item.href,
        name: item.name,
        useable: item.useable,
        delFlag: item.delFlag,
        option: item.permission.split(':') ? item.permission.split(':').pop() : ''
      });
    }
  });
  return menus;
}

export function genMapMenu(uid: string, menus: Array<any> = [], mapMenus = {}) {
  const len = menus.length;
  for (let i = 0; i < len; i++) {
    mapMenus[menus[i].uid] = menus[i];
    genMapMenu(uid, menus[i].children, mapMenus);
  }
  return mapMenus;
}

export default {
  namespace: 'menus',
  state: {
    tree: [],
    menus: [],
    curr: []
  },

  effects: {
    *getMenuTree({ payload }, { call, put }) {
      const res = yield call(Api.getMenuTree, payload);
      const menus = genMenu(res);
      const mapMenus = genMapMenu('/item/mryx/itemList', menus);
      yield put({
        type: 'save',
        payload: { tree: res, menus, mapMenus }
      });
    }
  },

  reducers: {
    save(state = INITIAL_STATE, { payload }) {
      return { ...state, ...payload };
    }
  }
};
