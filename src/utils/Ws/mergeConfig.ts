
// 自己实现 参数合并
const mergeConfig = (def, config) => {
  return { ...def, ...config };
};

export default mergeConfig;
