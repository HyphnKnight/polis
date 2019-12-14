import { all, find } from '../array';
import { is } from './index';
/* Type Testing */
export const isNull = is((u) => u === null);
export const isUndefined = is((u) => typeof u === 'undefined');
export const isNullOrUndefined = is((u) => isNull(u) || isUndefined(u));
export const isString = is((u) => typeof u === 'string');
export const isNumber = is((u) => typeof u === 'number');
export const isBoolean = is((u) => typeof u === 'boolean');
export const isDate = is((u) => Object.prototype.toString.call(u) === '[object Date]');
export const isFunction = is((u) => !!u && u.constructor && u.call && u.apply);
export const isArray = is((u) => Array.isArray(u));
export const isArrayOf = (func) => (u) => !!u &&
    Array.isArray(u) &&
    all(u, func);
export const isArrayOfNumbers = isArrayOf(isNumber);
export const isArrayOfStrings = isArrayOf(isString);
export const isArrayOfDates = isArrayOf(isDate);
export const isArrayOfFunctions = isArrayOf(isFunction);
export const isMap = is((u) => !!u && u.__proto__ === Map.prototype);
export const isMapOfTo = (keyFunc, valueFunc) => (u) => isMap(u) &&
    all([...u.keys()], keyFunc) &&
    all([...u.values()], valueFunc);
export const isSet = is((u) => !!u && u.__proto__ === Set.prototype);
export const isSetOf = (func) => (u) => isSet(u) &&
    all([...u.entries()], func);
export const isObjectLiteral = is((u) => {
    if (!u || typeof u !== 'object')
        return false;
    let tmp = u;
    while (true) {
        tmp = Object.getPrototypeOf(tmp);
        if (tmp === null) {
            break;
        }
    }
    return Object.getPrototypeOf(u) === tmp;
});
export const isNode = is((u) => typeof Node === 'object'
    ? u instanceof Node
    : u && typeof u === 'object' && typeof u.nodeType === 'number' && typeof u.nodeName === 'string');
export const isElement = is((u) => typeof HTMLElement === 'object'
    ? u instanceof HTMLElement
    : u && typeof u === 'object' && u !== null && u.nodeType === 1 && typeof u.nodeName === 'string');
export const isComparable = is((u) => isNullOrUndefined(u) ||
    isNumber(u) ||
    isBoolean(u) ||
    isString(u) ||
    isFunction(u) ||
    typeof u === 'symbol');
export const isFalsey = is((u) => isNullOrUndefined(u) ||
    (isBoolean(u) && !u) ||
    (isString(u) && u === ''));
/* Comparison */
export function isEqual(valueA, valueB) {
    if (isComparable(valueA) && isComparable(valueB)) {
        return valueA === valueB;
    }
    else if (isArray(valueA) && isArray(valueB)) {
        return valueA.length === valueB.length &&
            !find(valueA, (value, index) => !isEqual(value, valueB[index]));
    }
    else if (isObjectLiteral(valueA) && isObjectLiteral(valueB)) {
        const keysA = Object.keys(valueA);
        const keysB = Object.keys(valueB);
        return keysA.length === keysB.length &&
            !find(keysA, (key) => !isEqual(valueA[key], valueB[key]));
    }
    else if (isMap(valueA) && isMap(valueB)) {
        const keysA = [...valueA.keys()];
        const keysB = [...valueB.keys()];
        return keysA.length === keysB.length &&
            !find(keysA, (key) => !isEqual(valueA.get(key), valueB.get(key)));
    }
    else if (isSet(valueA) && isSet(valueB)) {
        return valueA.size === valueB.size &&
            isEqual([...valueA.entries()], [...valueB.entries()]);
    }
    return false;
}
