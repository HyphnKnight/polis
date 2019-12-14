import { round, sign, sqr } from '../math';
import { add, addSet, cross, dot, lerp, magnitudeSqr, scale, set, subtract, subtractSet } from '../vector';
/* -1 === left, 0 === aligned, 1 === right */
export const pointRelationToLine = (point, line) => sign((line[2] - line[0]) * (point[1] - line[1]) - (line[3] - line[1]) * (point[0] - line[0]));
export const isPointInCircle = (point, position, radius) => magnitudeSqr(subtract(point, position)) <= sqr(radius);
export const isPointInAlignedRectangle = (point, position, width, height) => Math.abs(point[0] - position[0]) <= width / 2 &&
    Math.abs(point[1] - position[1]) <= height / 2;
export const isPointInPolygon = (point, points) => {
    let i = 0;
    const len = points.length;
    let next = 0;
    let relation = 0;
    while (i <= len - 2) {
        next = i === len - 2 ? 0 : i + 2;
        relation = pointRelationToLine(point, [points[i], points[i + 1], points[next], points[next + 1]]);
        if (relation === -1)
            return false;
        i += 2;
    }
    return true;
};
export const isCircleInCircle = (positionA, radiusA, positionB, radiusB) => magnitudeSqr(subtract(positionA, positionB)) <= sqr(radiusA + radiusB);
export const isCircleInAlignedRectangle = (positionA, radius, positionB, width, height) => isPointInAlignedRectangle(positionA, positionB, width, height) ||
    isPointInCircle(positionB, positionA, radius) ||
    (sqr(positionA[0] - Math.max(positionB[0], Math.min(positionA[0], positionB[0] + width))) +
        sqr(positionA[1] - Math.max(positionB[1], Math.min(positionA[1], positionB[1] + height)))) < sqr(radius);
export const isAlignedRectangleInAlignedRectangle = (positionA, widthA, heightA, positionB, widthB, heightB) => !(Math.abs(positionB[0] - positionA[0]) > widthA / 2 + widthB / 2 ||
    Math.abs(positionB[1] - positionA[1]) > heightA / 2 + heightB / 2);
export const isPolygonInPolygon = (positionA, pointsA, positionB, pointsB) => {
    if (isPointInPolygon(positionA, pointsB) ||
        isPointInPolygon(positionB, pointsA))
        return true;
    const length = Math.max(pointsA.length, pointsB.length);
    for (let i = 0; i < length; i += 2) {
        if ((i < pointsA.length && isPointInPolygon([pointsA[i], pointsA[i + 1]], pointsB)) ||
            (i < pointsB.length && isPointInPolygon([pointsB[i], pointsB[i + 1]], pointsA)))
            return true;
    }
    return false;
};
const validTime = (t) => t < 0 || t > 1;
export function lineIntersection(lineA, lineB) {
    const positionA = [lineA[0], lineA[1]];
    const displacementA = [lineA[2], lineA[3]];
    const positionB = [lineB[0], lineB[1]];
    const displacementB = [lineB[2], lineB[3]];
    const endPointA = add(positionA, displacementA);
    const relativePos = subtract(positionB, positionA);
    const det = cross(displacementA, displacementB);
    if (det === 0) {
        if (cross(relativePos, displacementA) === 0) {
            let t0, t1, time;
            const disADot = scale(displacementA, 1 / dot(displacementA, displacementA));
            if (dot(displacementA, displacementB) >= 0) {
                t0 = dot(relativePos, disADot);
                t1 = t0 + dot(displacementB, disADot);
            }
            else {
                const finalB = add(positionB, displacementB);
                const finalBDiffStartA = subtract(finalB, positionA);
                t1 = dot(finalBDiffStartA, disADot);
                t0 = dot(relativePos, disADot);
            }
            if (validTime(t0) && validTime(t1)) {
                time = (t0 + t1) / 2;
            }
            else if (validTime(t0)) {
                time = t1 < t0
                    ? t0 / 2
                    : (1 - t0) / 2 + t0;
            }
            else if (validTime(t1)) {
                time = t0 < t1
                    ? t1 / 2
                    : (1 - t1) / 2 + t1;
            }
            else {
                return false;
            }
            return {
                point: addSet(scale(displacementA, time), positionA),
                time: round(time)
            };
        }
        return false;
    }
    const numerator = displacementA[1] * relativePos[0] - displacementA[0] * relativePos[1]; // cross
    const s = numerator / det;
    if (!validTime(s))
        return false;
    const t = displacementA[0] !== 0
        ? (relativePos[0] - s * displacementB[0]) / displacementA[0]
        : (relativePos[1] - s * displacementB[1]) / displacementA[1];
    if (!validTime(t))
        return false;
    return { time: t, point: lerp(positionA, endPointA, t) };
}
const boundingVec = [0, 0];
export const isInsideBounding = ({ position: posA, bounding: radA }, { position: posB, bounding: radB }) => magnitudeSqr(subtractSet(set(boundingVec, posB), posA)) <= (radA + radB) * (radA + radB);
