import * as Api from '../service/item';

export default {
  namespace: 'listMryxItem',
  state: { lists: [], pageNo: 1 },
  effects: {
    *getLists(_, { call, put }) {
      const res = yield call(Api.listMryxItemInfoNew, { pageNo: 1 });
      yield put({ type: 'saveLists', payload: { lists: res.list, pageNo: 2 } });
    },

    *nextLists({ payload }, { call, put }) {
      const res = yield call(Api.listMryxItemInfoNew, payload);
      if (res.list && res.list.length > 0) {
        yield put({ type: 'saveNextPage', payload: { lists: res.list } });
      }
    }
  },
  reducers: {
    saveLists(state, { payload }) {
      return { ...state, ...payload };
    },

    saveNextPage(state, { payload }) {
      let { lists } = state;
      return { lists: lists.concat(payload.lists), pageNo: state.pageNo + 1 };
    }
  }
};
