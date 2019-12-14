export declare function raycast<Data>(start: Data, getNext: (data: Data) => Data, resistFunc: (data: Data) => number, maxResist?: number): Data[] | false;
