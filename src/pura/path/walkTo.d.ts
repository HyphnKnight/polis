export interface WalkToData<data> {
    start: data;
    destination: data;
    getUniqueId: (data: data) => string;
    getNeighbors: (currentPos: data) => data[];
    priorityFunc: (currentPos: data, destination: data) => number;
    resistFunc: (src: data, next: data) => number;
    maxResist: number;
}
export declare function walkTo<data>(pathingData: WalkToData<data>): IterableIterator<data>;
