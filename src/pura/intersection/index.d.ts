import { Geometry, Line } from '../geometry';
import { Vector2d } from '../vector';
export declare const pointRelationToLine: (point: [number, number], line: [number, number, number, number]) => number;
export declare const isPointInCircle: (point: [number, number], position: [number, number], radius: number) => boolean;
export declare const isPointInAlignedRectangle: (point: [number, number], position: [number, number], width: number, height: number) => boolean;
export declare const isPointInPolygon: (point: [number, number], points: number[]) => boolean;
export declare const isCircleInCircle: (positionA: [number, number], radiusA: number, positionB: [number, number], radiusB: number) => boolean;
export declare const isCircleInAlignedRectangle: (positionA: [number, number], radius: number, positionB: [number, number], width: number, height: number) => boolean;
export declare const isAlignedRectangleInAlignedRectangle: (positionA: [number, number], widthA: number, heightA: number, positionB: [number, number], widthB: number, heightB: number) => boolean;
export declare const isPolygonInPolygon: (positionA: [number, number], pointsA: number[], positionB: [number, number], pointsB: number[]) => boolean;
export interface Intersection {
    time: number;
    point: Vector2d;
}
export declare function lineIntersection(lineA: Line, lineB: Line): Intersection | false;
export declare const isInsideBounding: (geometryA: Geometry, geometryB: Geometry) => boolean;
