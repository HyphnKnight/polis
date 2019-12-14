import { Geometry, Rectangle } from '../geometry';
import { Vector2d } from '../vector';
export interface CEl<geometryType extends (Geometry | null)> {
    geometry?: Geometry;
    children?: Array<CEl<any>>;
    render?: (el: CEl<geometryType>) => void;
    interact?: {
        onMouseDown?: (el: CEl<geometryType>, position: Vector2d) => void;
        onMouseMove?: (el: CEl<geometryType>, position: Vector2d) => void;
        onMouseUp?: (el: CEl<geometryType>, position: Vector2d) => void;
    };
}
export declare const onMouseDownCollection: Map<CEl<any>, [CEl<any>, Geometry, (el: CEl<Geometry>, position: [number, number]) => void]>;
export declare const onMouseMoveCollection: Map<CEl<any>, [CEl<any>, Geometry, (el: CEl<Geometry>, position: [number, number]) => void]>;
export declare const onMouseUpCollection: Map<CEl<any>, [CEl<any>, Geometry, (el: CEl<Geometry>, position: [number, number]) => void]>;
export declare let windowGeometry: Rectangle;
export declare const calcCanvasSize: () => void;
export declare const renderUI: (canvasEl: HTMLCanvasElement, base: CEl<Geometry>) => void | (() => void);
