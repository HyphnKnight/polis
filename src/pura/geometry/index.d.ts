import { Vector2d } from '../vector';
import { VectorList } from '../vector/list';
export declare enum Shape {
    Point = "Point",
    Circle = "Circle",
    Rectangle = "Rectangle",
    Polygon = "Polygon",
}
export interface Point {
    type: Shape.Point;
    position: Vector2d;
    rotation: number;
    bounding: 0;
}
export interface Circle {
    type: Shape.Circle;
    position: Vector2d;
    rotation: number;
    radius: number;
    bounding: number;
}
export interface Rectangle {
    type: Shape.Rectangle;
    position: Vector2d;
    rotation: number;
    width: number;
    height: number;
    points: VectorList;
    bounding: number;
}
export interface Polygon {
    type: Shape.Polygon;
    position: Vector2d;
    rotation: number;
    points: VectorList;
    bounding: number;
}
export declare type Line = [number, number, number, number];
export declare type Geometry = Point | Circle | Rectangle | Polygon;
export declare const getRectanglePoints: (width: number, height: number) => number[];
export declare const normalizePoints: (points: number[]) => number[];
export declare const createLinesFromPoints: (points: number[]) => [number, number, number, number][];
export declare const createPoint: (position: [number, number], rotation?: number) => Point;
export declare const createCircle: (position: [number, number], rotation?: number, radius?: number) => Circle;
export declare const createRectangle: (position: [number, number], rotation?: number, width?: number, height?: number) => Rectangle;
export declare const createPolygon: (position: [number, number], rotation: number | undefined, points: number[]) => Polygon;
export declare const createSquare: (position: [number, number], rotation: number, size: number) => Rectangle;
export declare const createEqualLateralPolygonPoints: (sides: number, radius: number) => number[];
export declare const createEqualLateralPolygon: (position: [number, number], rotation: number, sides: number, radius: number) => Polygon;
export declare const getPolygonPoints: (polygon: Rectangle | Polygon) => number[];
