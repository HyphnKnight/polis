import { find, forEach, map } from '../array';
import { isEqual } from '../is/type';
import { uniqueId } from '../string';
const setStore = (store) => (updateObj) => {
    const objKeys = Object.keys(updateObj);
    let oldStore;
    if (objKeys.map((key) => {
        if (!isEqual(updateObj[key], store.__store__[key])) {
            if (!oldStore) {
                oldStore = Object.assign({}, store.__store__);
            }
            store.__store__[key] = updateObj[key];
            return true;
        }
        else {
            return false;
        }
    }).some((x) => x)) {
        forEach(Object.keys(store.subscriptions), (key) => store.subscriptions[key](store.__store__, oldStore));
    }
};
const protectedSubscribe = (store) => (keys, func) => store.subscribe((newState, oldstate) => find(keys, (key) => newState[key] !== oldstate[key]) &&
    func(newState, oldstate));
export const createStore = (protoObj) => {
    const subscriptions = {};
    const newStore = {
        subscriptions: {},
        subscribe: (func) => {
            const key = uniqueId();
            subscriptions[key] = func;
            return () => {
                delete subscriptions[key];
            };
        },
        protectedSubscribe: () => () => { throw new Error('Store failed to initialize'); },
        set: () => { throw new Error('Store failed to initialize'); },
        [Symbol.iterator]: () => (function iteratorMaker(savedProtoObj) {
            const objKeys = Object.keys(savedProtoObj);
            let index = 0;
            return {
                next() {
                    const result = { value: savedProtoObj[objKeys[index]], done: true };
                    if (index <= objKeys.length - 1) {
                        result.done = false;
                        ++index;
                    }
                    return result;
                },
            };
        })(protoObj),
        __store__: {},
    };
    forEach(Object.keys(protoObj), (key) => {
        newStore.__store__[key] = protoObj[key];
        Object.defineProperty(newStore, key, {
            set: (value) => {
                if (!isEqual(value, newStore.__store__[key])) {
                    const oldStore = Object.assign({}, newStore.__store__);
                    newStore.__store__[key] = value;
                    Object.keys(subscriptions).forEach((subKey) => subscriptions[subKey](newStore.__store__, oldStore));
                }
            },
            get: () => newStore.__store__[key]
        });
    });
    Object.defineProperty(newStore, 'JSON', {
        set: (string) => newStore.set(JSON.parse(string)),
        get: () => JSON.stringify(newStore.__store__)
    });
    newStore.set = setStore(newStore);
    newStore.protectedSubscribe = protectedSubscribe(newStore);
    return Object.preventExtensions(newStore);
};
export const multiSubscribe = (stores, func) => {
    const unsubscribes = map(stores, (store) => store.subscribe(func));
    return () => forEach(unsubscribes, (unsubscribe) => unsubscribe());
};
