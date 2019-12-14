export declare const getReachable: <data>(getNeighbors: (node: data) => data[], resist: (current: data, neighbor: data) => number) => (start: data, maxResist?: number) => data[];
