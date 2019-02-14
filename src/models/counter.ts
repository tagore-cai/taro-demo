import { ADD, MINUS } from '../constants/counter';

const INITIAL_STATE = {
  num: 0
};

export default {
  namespace: 'counter',
  state: { num: 0 },
  effects: {
    *add(_, { put }) {
      yield put({ type: 'save', payload: { type: ADD } });
    },
    *minus(_, { put }) {
      yield put({ type: 'save', payload: { type: MINUS } });
    },
    *asyncAdd(_, { put }) {
      yield new Promise(function(r) {
        setTimeout(r, 1000);
      });
      yield put({ type: 'save', payload: {} });
    }
  },
  reducers: {
    save(state = INITIAL_STATE, { payload }) {
      switch (payload.type) {
        case ADD:
          return {
            ...state,
            num: state.num + 1
          };
        case MINUS:
          return {
            ...state,
            num: state.num - 1
          };
        default:
          return {
            ...state,
            num: state.num - 1
          };
      }
    }
  }
};
