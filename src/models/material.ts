import * as Api from '../service/material';

export default {
  namespace: 'material',
  state: { addressList: [], pageNo: 1 },
  effects: {
    *getAddressList(_, { call, put }) {
      const res = yield call(Api.getAddressList, { pageNo: 1 });
      yield put({ type: 'saveAddressList', payload: { addressList: res.list, pageNo: 2 } });
    },

    *nextAddressList(arg, { call, put }) {
      const res = yield call(Api.getAddressList, arg.payload);
      if (res.list && res.list.length > 0) {
        yield put({ type: 'saveNextPage', payload: { addressList: res.list } });
      }
    }
  },
  reducers: {
    saveAddressList(state, { payload }) {
      return { ...state, ...payload };
    },
    saveNextPage(state, { payload }) {
      let { addressList } = state;
      return { addressList: addressList.concat(payload.addressList), pageNo: state.pageNo + 1 };
    }
  }
};
