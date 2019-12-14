import { Geometry } from '../geometry';
import { Vector2d } from '../vector';
export declare class Transform {
    position: Vector2d;
    savedPositions: Vector2d[];
    rotation: number;
    savedRotations: number[];
    constructor();
    apply: (geometry: Geometry) => Geometry;
    save(): void;
    restore(): void;
}
