export function forEach(array, func) {
    let i = -1;
    while (++i < array.length)
        func(array[i], i, array);
    return array;
}
export function reduce(array, func, base) {
    let i = -1;
    while (++i < array.length)
        base = func(base, array[i], i, array);
    return base;
}
export function reduceRight(array, func, base) {
    let i = array.length;
    while (--i >= 0)
        base = func(base, array[i], i, array);
    return base;
}
export const map = (array, func) => reduce(array, (result, value, index, self) => {
    result.push(func(value, index, self));
    return result;
}, []);
export const mapToObject = (array, func) => reduce(array, (obj, value, index, self) => {
    obj[func(value, index, self)] = value;
    return obj;
}, Object.create(null));
export const mapToMap = (array, func) => new Map(map(array, func));
export const filter = (array, func = (x) => !!x) => reduce(array, (result, value, index, self) => func(value, index, self)
    ? (result.push(value), result)
    : result, []);
export const indexOf = (array, value) => {
    let i = -1;
    while (++i < array.length) {
        if (array[i] === value)
            return i;
    }
    return null;
};
export function find(array, func) {
    let i = -1;
    while (++i < array.length) {
        if (func(array[i], i, array))
            return array[i];
    }
    return null;
}
export function findIndex(array, func) {
    let i = -1;
    while (++i < array.length) {
        if (func(array[i], i, array))
            return i;
    }
    return null;
}
export function times(length, func) {
    const result = [];
    let i = -1;
    while (++i < length)
        result.push(func(i, length));
    return result;
}
export const difference = (array, targetArray) => filter(array, (val) => indexOf(targetArray, val) === null);
export const intersection = (array, targetArray) => filter(array, (val) => indexOf(targetArray, val) !== null);
export const flatten = (array) => [].concat(...array);
export const unique = (array) => filter(array, (value, index, self) => indexOf(self, value) === index);
export const uniqueBy = (array, func) => {
    const result = [];
    const resultKeys = [];
    let i = -1;
    while (++i < array.length) {
        const key = func(array[i], i, array);
        if (indexOf(resultKeys, key) === null) {
            result.push(array[i]);
            resultKeys.push(key);
        }
    }
    return result;
};
export const countBy = (array, func) => {
    const result = Object.create(null);
    const len = array.length;
    let i = -1;
    while (++i < len) {
        const key = func(array[i], i, array);
        if (!result[key])
            result[key] = 0;
        ++result[key];
    }
    return result;
};
export const invoke = (array) => forEach(array, (func) => func());
export const concat = (...arrays) => flatten(arrays);
export const union = (...arrays) => unique(concat(...arrays));
export const reverse = (array) => {
    const result = [];
    for (let i = array.length - 1; i >= 0; i--) {
        result.push(array[i]);
    }
    return result;
};
export const heuristicFind = (sort) => (array, func) => sort(array, func)[0];
export const contains = (array, value) => indexOf(array, value) !== null;
export const copy = (array) => array.slice(0);
export const clear = (array) => {
    while (array.length)
        array.pop();
    return array;
};
export const remove = (array, value) => {
    const result = copy(array);
    const valueIndex = indexOf(array, value);
    if (valueIndex !== null)
        result.splice(valueIndex, 1);
    return result;
};
export const add = (array, value, index = 0) => {
    const result = copy(array);
    result.splice(index, 0, value);
    return result;
};
export const toggle = (array, value) => contains(array, value)
    ? remove(array, value)
    : add(array, value);
export const push = (array, value) => {
    const result = copy(array);
    result.push(value);
    return result;
};
export const chunk = (array, chunkSize = 10) => times(Math.ceil(array.length / chunkSize), (index) => array.slice(index * chunkSize, index * chunkSize + chunkSize));
export const last = (array, pos = 0) => array[array.length - 1 - pos];
export function lastValues(array, num = 1) {
    const result = [];
    let i = array.length;
    const min = Math.max(array.length - 1 - num, 0);
    while (--i > min)
        result.push(array[i]);
    return result;
}
export const first = (array, pos = 0) => array[0 + pos];
export function firstValues(array, num = 1) {
    const result = [];
    let i = 0;
    while (i < num && i < array.length)
        result.push(array[i++]);
    return result;
}
export const any = (array, func) => !!find(array, func);
export const all = (array, func) => !find(array, (value, i, self) => !func(value, i, self));
