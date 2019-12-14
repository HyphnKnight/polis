export interface PossibleState {
    subscribe?: never;
    __store__?: never;
    set?: never;
    JSON?: never;
    [prop: string]: any;
}
export declare type Subscription<State extends PossibleState> = (newState: State, oldState: State) => void;
export interface StoreProps<State extends PossibleState> {
    subscriptions: {
        [id: string]: Subscription<State>;
    };
    protectedSubscribe: (keys: Array<keyof State>, func: Subscription<State>) => () => void;
    subscribe: (func: Subscription<State>) => () => void;
    set: (state: Partial<State>) => void;
    [Symbol.iterator]: () => Iterator<any>;
    __store__: State;
}
export interface UnassignedStoreProps {
    subscriptions: {
        [id: string]: Subscription<{}>;
    };
    protectedSubscribe: (keys: Array<keyof {}>, func: Subscription<{}>) => () => void;
    subscribe: (func: Subscription<{}>) => () => void;
    set: (state: Partial<{}>) => void;
    [Symbol.iterator]: () => Iterator<any>;
    __store__: any;
}
export declare const createStore: <State extends PossibleState>(protoObj: State) => StoreProps<State> & State;
export declare const multiSubscribe: (stores: any[], func: () => void) => () => void;
