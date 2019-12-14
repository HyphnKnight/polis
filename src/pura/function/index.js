import { uniqueId } from '../string';
export const identity = (x) => x;
export const applyTo = (arg) => (func) => func(arg);
export const curry = (func, var1) => (var2) => func(var1, var2);
export function debounce(func, wait, leading = true, maxWait = Number.MAX_VALUE) {
    let invokeTime = 0;
    if (leading) {
        return function debounceLeadingInside(...args) {
            const time = Date.now();
            if (time - invokeTime > wait) {
                invokeTime = Date.now();
                func(...args);
            }
        };
    }
    else {
        let attemptedInvoke = 0;
        let delay;
        let argsData;
        return function debounceTrailingInside(...args) {
            argsData = args;
            const time = Date.now();
            if (attemptedInvoke === 0) {
                attemptedInvoke = time;
            }
            if (!!delay && time - attemptedInvoke < maxWait) {
                window.clearTimeout(delay);
            }
            if (time - attemptedInvoke < maxWait) {
                delay = setTimeout(() => {
                    attemptedInvoke = 0;
                    func(...argsData);
                }, wait);
            }
        };
    }
}
export const once = (func) => {
    let hasBeenCalled = false;
    return () => {
        if (!hasBeenCalled) {
            hasBeenCalled = true;
            func();
        }
    };
};
export const compose = (...funcs) => (startValue) => {
    let result = startValue;
    for (let i = funcs.length - 1; i >= 0; --i) {
        result = funcs[i](result);
    }
    return result;
};
export const pipe = (...funcs) => (startValue) => {
    let result = startValue;
    for (let i = 0, len = funcs.length; i < len; ++i) {
        result = funcs[i](result);
    }
    return result;
};
const memoizedDB = {};
export const memoize = (func) => {
    const id = uniqueId();
    memoizedDB[id] = {};
    const memoized = (...args) => {
        const key = JSON.stringify(args);
        return memoizedDB[id][key] = (memoizedDB[id][key] || func(...args));
    };
    return memoized;
};
