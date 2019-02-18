import { forEach } from '../index';

export default class InterceptorManager {
  handlers: Array<any>;
  constructor() {
    this.handlers = [];
  }
  use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled,
      rejected
    });
    return this.handlers.length - 1;
  }
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  forEach(fn) {
    forEach(this.handlers, h => {
      if (h !== null) {
        fn(h);
      }
    });
  }
}
