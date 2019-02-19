export default class Queue {
  map: Object;
  mq: Array<number>;
  running: Array<number>;
  MAX_QUEUE: number;
  runner: (...any) => any;

  constructor(max = 5, runner) {
    // 注入队列执行
    this.runner = runner;
    // 缓存参数
    this.map = {};
    // 缓存句柄
    this.mq = [];
    // 进程队列
    this.running = [];
    // 队列容量
    this.MAX_QUEUE = max;
  }

  // 缓存 参数 随机句柄Id
  add(args) {
    args.t = +new Date();
    // 缓存句柄 取随机句柄，如果存在重新生成随机句柄
    while (this.mq.indexOf(args.t) > -1 || this.running.indexOf(args.t) > -1) {
      args.t += (10 * Math.random()) >> 0;
    }
    // 添加缓存句柄
    this.mq.push(args.t);
    // 按句柄 缓存参数
    this.map[args.t] = args;
  }

  // 请求
  next() {
    // 如果 异步小于MAX_QUEUE个直接请求 否则加入队列请求
    if (0 !== this.mq.length && this.running.length < this.MAX_QUEUE) {
      // 取缓存句柄
      const t: any = this.mq.shift();
      // 取缓存参数
      const currArgs = this.map[t];
      // 取自定义 complete
      const complete = currArgs.complete;
      // 重新定义 complete
      currArgs.complete = (...args) => {
        // 删除 缓存句柄
        this.running.splice(this.running.indexOf(currArgs.t), 1);
        // 删除 缓存参数
        delete this.map[currArgs.t];
        // 如果 自定义complete存在 则调用
        complete && complete.apply(currArgs, args);
        // 递归调用 请求
        this.next();
      };
      // 线程数加1 缓存句柄
      this.running.push(currArgs.t);
      // 发送请求
      return this.runner(currArgs);
    }
  }

  // 请求封装 缓存参数 重构参数 config
  put(config = {}) {
    this.add(config);
    return this.next();
  }
}
