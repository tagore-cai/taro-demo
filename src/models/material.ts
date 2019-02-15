import * as Api from '../service/material';

export default {
  namespace: 'material',
  state: { addressList: [] },
  effects: {
    *getAddressList({ payload }, { call, put }) {
      const res = yield call(Api.getAddressList, payload);
      yield put({ type: 'saveAddressList', payload: { addressList: res.list } });
    }
  },
  reducers: {
    saveAddressList(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
