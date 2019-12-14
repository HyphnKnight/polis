export declare let canvas: HTMLCanvasElement;
export declare let ctx: CanvasRenderingContext2D;
export declare const setCanvas: (newCanvas: HTMLCanvasElement, canvasAttributes?: Partial<Canvas2DContextAttributes> | undefined) => void;
export declare const translate: (vec: [number, number]) => void;
export declare const rotate: (angle: number) => void;
export declare const clearRect: (vec: [number, number], width: number, height: number) => void;
export declare const clear: () => void;
export declare const moveTo: (vec: [number, number]) => void;
export declare const lineTo: (vec: [number, number]) => void;
export declare const quadraticCurveTo: (vec: [number, number], control: [number, number]) => void;
export declare const drawImage: (image: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement | ImageBitmap) => (vec: [number, number], width: number, height: number) => void;
export declare const drawSlicedImage: (image: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement | ImageBitmap) => (vec: [number, number], slice: [number, number], sliceWidth: number, sliceHeight: number, width: number, height: number) => void;
export declare const drawLine: (points: number[], angle?: number) => void;
export declare const drawPolygon: (position: [number, number], points: number[], angle?: number) => void;
export declare const drawOval: (position: [number, number], points: number[], angle?: number) => void;
export declare const drawRectangle: (position: [number, number], width: number, height: number, angle?: number) => void;
export declare const drawArc: (vec: [number, number], radius?: number, angle?: number, startAngle?: number, endAngle?: number, counterClockwise?: boolean) => void;
export interface StrokeOptions {
    style?: string;
    thickness?: number;
}
export declare const fillPolygon: (style: string, position: [number, number], points: number[], angle: number) => void;
export declare const fillOval: (style: string, position: [number, number], points: number[], angle: number) => void;
export declare const fillRectangle: (style: string, position: [number, number], width: number, height: number, angle: number) => void;
export declare const fillLine: (style: string, points: number[], angle: number) => void;
export declare const fillArc: (style: string, vec: [number, number], radius: number, angle?: number | undefined, startAngle?: number | undefined, endAngle?: number | undefined, counterClockwise?: boolean | undefined) => void;
export declare const strokePolygon: (style: StrokeOptions, position: [number, number], points: number[], angle: number) => void;
export declare const strokeOval: (style: StrokeOptions, position: [number, number], points: number[], angle: number) => void;
export declare const strokeRectangle: (style: StrokeOptions, position: [number, number], width: number, height: number, angle: number) => void;
export declare const strokeLine: (style: StrokeOptions, points: number[], angle: number) => void;
export declare const strokeArc: (style: StrokeOptions, vec: [number, number], angle: number, radius: number, startAngle?: number | undefined, endAngle?: number | undefined, counterClockwise?: boolean | undefined) => void;
export interface FontOptions {
    style?: string;
    font?: string;
    textAlign?: string;
    horizontalAlign?: boolean;
    textBaseline?: string;
    maxWidth?: number;
}
export declare const strokeText: (fontOptions: FontOptions, vec: [number, number], text: string, angle?: number) => void;
export declare const fillText: (fontOptions: FontOptions, vec: [number, number], text: string, angle?: number) => void;
