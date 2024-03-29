/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file at
 * https://github.com/facebookincubator/create-react-app/blob/master/LICENSE
 */

const fs = require('fs');
const url = require('url');
const path = require('path');
const chalk = require('chalk');
const address = require('address');

const defaultConfig = {
  logLevel: 'silent',
  secure: false,
  changeOrigin: true,
  ws: true,
  xfwd: true
};

module.exports = function prepareProxy(proxy, appPublicFolder = 'public') {
  if (!proxy) {
    return undefined;
  }
  if (typeof proxy !== 'object' && typeof proxy !== 'string') {
    console.log(chalk.red('When specified, "proxy" in package.json must be a string or an object.'));
    console.log(chalk.red('Instead, the type of "proxy" was "' + typeof proxy + '".'));
    console.log(chalk.red('Either remove "proxy" from package.json, or make it an object.'));
    process.exit(1);
  }

  // Otherwise, if proxy is specified, we will let it handle any request except for files in the public folder.
  function mayProxy(pathname) {
    const maybePublicPath = path.resolve(appPublicFolder, pathname.slice(1));
    return !fs.existsSync(maybePublicPath);
  }

  function createProxyEntry(target, usersOnProxyReq, context) {
    // #2478
    // There're a little-known use case that the `target` field is an object rather than a string
    // https://github.com/chimurai/http-proxy-middleware/blob/master/recipes/https.md
    if (typeof target === 'string' && process.platform === 'win32') {
      target = resolveLoopback(target);
    }
    return {
      target,
      context(pathname, req) {
        // is a static asset
        if (!mayProxy(pathname)) {
          return false;
        }
        if (context) {
          // Explicit context, e.g. /api
          return pathname.match(context);
        } else {
          // not a static request
          if (req.method !== 'GET') {
            return true;
          }
          // Heuristics: if request `accept`s text/html, we pick /index.html.
          // Modern browsers include text/html into `accept` header when navigating.
          // However API calls like `fetch()` won’t generally accept text/html.
          // If this heuristic doesn’t work well for you, use a custom `proxy` object.
          return req.headers.accept && req.headers.accept.indexOf('text/html') === -1;
        }
      },
      onProxyReq(proxyReq, req, res) {
        if (usersOnProxyReq) {
          usersOnProxyReq(proxyReq, req, res);
        }
        // Browsers may send Origin headers even with same-origin
        // requests. To prevent CORS issues, we have to change
        // the Origin to match the target URL.
        if (!proxyReq.agent && proxyReq.getHeader('origin')) {
          proxyReq.setHeader('origin', target);
        }
      },
      onError: onProxyError(target)
    };
  }

  if (typeof proxy === 'string') {
    if (!/^http(s)?:\/\//.test(proxy)) {
      console.log(chalk.red('When "proxy" is specified in package.json it must start with either http:// or https://'));
      process.exit(1);
    }

    return [Object.assign({}, defaultConfig, createProxyEntry(proxy))];
  }

  return Object.keys(proxy).map(context => {
    const config = proxy[context];
    if (!config.hasOwnProperty('target')) {
      console.log(
        chalk.red('When `proxy` in package.json is an object, each `context` object must have a ' + '`target` property specified as a url string')
      );
      process.exit(1);
    }
    const entry = createProxyEntry(config.target, config.onProxyReq, context);
    return Object.assign({}, defaultConfig, config, entry);
  });
};

function resolveLoopback(proxy) {
  const o = url.parse(proxy);
  o.host = undefined;
  if (o.hostname !== 'localhost') {
    return proxy;
  }

  try {
    if (!address.ip()) {
      o.hostname = '127.0.0.1';
    }
  } catch (_ignored) {
    o.hostname = '127.0.0.1';
  }
  return url.format(o);
}

function onProxyError(proxy) {
  return (err, req, res) => {
    const host = req.headers && req.headers.host;
    console.log(
      chalk.red('Proxy error:') + ' Could not proxy request ' + chalk.cyan(req.url) + ' from ' + chalk.cyan(host) + ' to ' + chalk.cyan(proxy) + '.'
    );
    console.log('See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (' + chalk.cyan(err.code) + ').');
    console.log();
    if (res.writeHead && !res.headersSent) {
      res.writeHead(500);
    }
    res.end('Proxy error: Could not proxy request ' + req.url + ' from ' + host + ' to ' + proxy + ' (' + err.code + ').');
  };
}
