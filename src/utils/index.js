const toString = Object.prototype.toString;

export function bind(fn, thisArg) {
  return function wrap() {
    const args = new Array(arguments.length);
    for (let i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
}

export function isArray(val) {
  return toString.call(val) === '[object Array]';
}

export function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

export function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

export function isString(val) {
  return typeof val === 'string';
}

export function isNumber(val) {
  return typeof val === 'number';
}

export function isUndefined(val) {
  return typeof val === 'undefined';
}

export function isObject(val) {
  return val !== null && typeof val === 'object';
}

export function isDate(val) {
  return toString.call(val) === '[object Date]';
}

export function isFile(val) {
  return toString.call(val) === '[object File]';
}

export function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

export function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

export function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

export function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

export function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

export function isStandardBrowserEnv() {
  if (
    typeof navigator !== 'undefined' &&
    (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')
  ) {
    return false;
  }
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

export function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  if (typeof obj !== 'object') {
    obj = [obj];
  }

  if (isArray(obj)) {
    for (let i = 0, l = obj.length; i < l; i++) {
      fn(obj[i], i, obj);
    }
  } else {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn(obj[key], key, obj);
      }
    }
  }
}

export function merge(/* obj1, obj2, obj3, ... */) {
  const result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (let i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

export function deepMerge(/* obj1, obj2, obj3, ... */) {
  const result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (let i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

export function extend(a, b, thisArg) {
  forEach(b, (val, key) => {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

export default {
  isArray,
  isArrayBuffer,
  isFormData,
  isString,
  isNumber,
  isObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isFunction,
  isStream,
  isURLSearchParams,
  isStandardBrowserEnv,
  forEach,
  merge,
  deepMerge,
  extend,
  trim
};
