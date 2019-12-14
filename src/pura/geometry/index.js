import { flatten, times } from '../array';
import { magnitudeSqr, rotateSet, scaleSet } from '../vector';
import { addListSet, averageList, forEachList, rotateList, subtractListSet } from '../vector/list';
/* Type Declarations */
export var Shape;
(function (Shape) {
    Shape["Point"] = "Point";
    Shape["Circle"] = "Circle";
    Shape["Rectangle"] = "Rectangle";
    Shape["Polygon"] = "Polygon";
})(Shape || (Shape = {}));
/* Utilities */
export const getRectanglePoints = (width, height) => ([
    width / 2, height / 2,
    -width / 2, height / 2,
    +width / 2, -height / 2,
    -width / 2, -height / 2,
]);
export const normalizePoints = (points) => subtractListSet(points, averageList(points));
export const createLinesFromPoints = (points) => {
    const results = [];
    const length = points.length;
    for (let i = 0; i < length; i += 2) {
        const next = i === length - 1 ? 0 : i + 1;
        results.push([
            points[i], points[i + 1],
            points[next] - points[i], points[next + 1] - points[i + 1]
        ]);
    }
    return results;
};
/* Basic Geometry */
export const createPoint = (position, rotation = 0) => ({
    type: Shape.Point,
    bounding: 0,
    position, rotation,
});
export const createCircle = (position, rotation = 0, radius = 1) => ({
    type: Shape.Circle,
    bounding: radius,
    position, rotation,
    radius,
});
export const createRectangle = (position, rotation = 0, width = 1, height = 1) => ({
    type: Shape.Rectangle,
    bounding: Math.sqrt(width * width + height * height),
    position, rotation,
    width, height,
    points: getRectanglePoints(width, height),
});
export const createPolygon = (position, rotation = 0, points) => {
    const adjustedPoints = normalizePoints(points);
    let bounding = 0;
    forEachList(adjustedPoints, (pnt) => bounding = Math.max(bounding || magnitudeSqr(pnt)));
    bounding = Math.sqrt(bounding);
    return {
        type: Shape.Polygon,
        points: adjustedPoints,
        position, rotation, bounding,
    };
};
/* Custom Geometry */
export const createSquare = (position, rotation, size) => createRectangle(position, rotation, size, size);
export const createEqualLateralPolygonPoints = (sides, radius) => flatten(times(sides, (i) => scaleSet(rotateSet([0, 1], i * (2 * Math.PI / sides)), radius)));
export const createEqualLateralPolygon = (position, rotation, sides, radius) => createPolygon(position, rotation, createEqualLateralPolygonPoints(sides, radius));
/* Utility Funcs */
export const getPolygonPoints = (polygon) => addListSet(rotateList(polygon.points, polygon.rotation), polygon.position);
