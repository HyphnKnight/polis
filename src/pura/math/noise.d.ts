export declare type Noise = <Data>(list: Data[], getNeighbors: (item: Data) => Data[], getValue: (item: Data) => number, setValue: (item: Data, value: number) => void, iterations: number) => Data[];
export declare const sum: (...numbers: number[]) => number;
export declare const noise: Noise;
export declare function gridNoise(width: number, height: number, iterations?: number): number[][];
