/* eslint-disable import/no-commonjs */
const prepareProxy = require('./prepareProxy');
module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {},
  weapp: {
    module: {
      postcss: {
        // 小程序端样式引用本地资源内联
        url: {
          enable: true,
          limit: 102400000000
        }
      }
    }
  },
  h5: {
    devServer: {
      host: '0.0.0.0',
      disableHostCheck: true,
      port: 8088,
      open: false,
      https: false,
      proxy: prepareProxy(
        {
          '/api': {
            target: '',
            pathRewrite: {
              '^/api': '/api'
            },
            logLevel: 'debug'
          },
          '/console': {
            target: '',
            pathRewrite: {
              '^/console': '/console'
            },
            logLevel: 'debug'
          }
        }
      )
    }
  }
};
