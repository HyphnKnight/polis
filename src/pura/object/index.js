import { find, forEach as arrayForEach, map, reduce } from '../array';
export const forEach = (obj, func) => arrayForEach(Object.keys(obj), (key) => func(obj[key], key, obj));
export const mapValues = (obj, func) => reduce(Object.keys(obj), (result, key) => {
    result[key] = func(obj[key], key, obj);
    return result;
}, {});
export const mapKeys = (obj, func) => reduce(Object.keys(obj), (result, key) => {
    result[func(obj[key], key, obj)] = obj[key];
    return result;
}, {});
export const pick = (obj, func) => reduce(Object.keys(obj), (result, key) => {
    if (func(obj[key], key, obj)) {
        result[key] = obj[key];
    }
    return result;
}, {});
export const match = (target) => (obj) => reduce(Object.keys(target), (result, key) => result && obj[key] === target[key], true);
export const copy = (obj) => merge(Object.create(null), obj);
export const mapToArray = (obj, iterator) => map(Object.keys(obj), (key) => iterator(obj[key], key, obj));
export const pairs = (obj) => map(Object.keys(obj), (key) => ([key, obj[key]]));
export const merge = (obj, ...objs) => Object.assign(Object.create(null), obj, ...objs);
export const get = (obj, path, defaultValue) => {
    let value = obj;
    const paths = path.split('.');
    while (paths.length) {
        const currentPath = paths.shift();
        value = value[currentPath || ''];
        if ((!value && paths.length) || typeof value === 'undefined')
            return defaultValue;
    }
    return value;
};
export const set = (obj, path, value) => {
    obj[path] = value;
    return obj;
};
export const findKey = (obj, predicate) => find(Object.keys(obj), (key) => predicate(key, obj[key]));
export const findValue = (obj, predicate) => {
    const valueKey = find(Object.keys(obj), (key) => predicate(key, obj[key]));
    if (valueKey) {
        return obj[valueKey];
    }
    else {
        return null;
    }
};
