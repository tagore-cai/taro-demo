/* eslint-disable import/no-commonjs */
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
      proxy: {
        '/api': {
          target: 'http://item-center-web.dev9.staging.imrfresh.com',
          // target: "http://item-center-web.beta3.staging.imrfresh.com",
          // target: "http://172.16.156.90:18599",
          pathRewrite: {
            '^/api': '/api'
          },
          logLevel: 'debug'
        },
        '/console': {
          target: 'http://blg-web.dev9.staging.imrfresh.com',
          pathRewrite: {
            '^/console': '/console'
          },
          logLevel: 'debug'
        }
      }
    }
  }
}
