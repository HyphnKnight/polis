export declare const identity: <T>(x: T) => T;
export declare const applyTo: <type, result>(arg: type) => (func: (arg: type) => result) => result;
export declare const curry: <T1, T2, R>(func: (a: T1, b: T2) => R, var1: T1) => (var2: T2) => R;
export declare function debounce(func: Function, wait: number, leading?: boolean, maxWait?: number): (...args: any[]) => void;
export declare const once: <type>(func: () => type) => () => void;
export declare const compose: <type>(...funcs: Function[]) => (startValue: any) => type;
export declare const pipe: <type>(...funcs: Function[]) => (startValue: any) => type;
export declare const memoize: <type, result>(func: (...args: type[]) => result) => (...args: any[]) => result;
