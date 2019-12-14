export interface ObjLit<Value> {
    [prop: string]: Value;
}
export declare type Iterator<Value, Result> = (value: Value, key: string, obj: ObjLit<Value>) => Result;
export declare const forEach: <Value>(obj: ObjLit<Value>, func: Iterator<Value, void>) => string[];
export declare const mapValues: <Value, Result>(obj: ObjLit<Value>, func: Iterator<Value, Result>) => ObjLit<Result>;
export declare const mapKeys: <Value>(obj: ObjLit<Value>, func: Iterator<Value, string | number>) => ObjLit<Value>;
export declare const pick: <Value extends Result, Result>(obj: ObjLit<Value>, func: Iterator<Value, boolean>) => ObjLit<Result>;
export declare const match: <type extends {
    [id: string]: any;
}>(target: Partial<type>) => (obj: type) => boolean;
export declare const copy: <type>(obj: type) => any;
export declare const mapToArray: <Value, Result>(obj: ObjLit<Value>, iterator: Iterator<Value, Result>) => Result[];
export declare const pairs: <Value>(obj: ObjLit<Value>) => [string, Value][];
export declare const merge: <type>(obj: type, ...objs: Partial<type>[]) => type;
export declare const get: <type>(obj: any, path: string, defaultValue: type) => type;
export declare const set: <type extends {
    [id: string]: any;
}, value>(obj: type, path: string, value: value) => type;
export declare const findKey: <type extends {
    [id: string]: any;
}>(obj: type, predicate: (key: string | number, value: any) => boolean) => string | null;
export declare const findValue: <type extends {
    [id: string]: any;
}>(obj: type, predicate: (key: string | number, value: any) => boolean) => any;
