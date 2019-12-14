import { lerp as nLerp, sign, sqr } from '../math';
export const set = (vec, target) => {
    vec[0] = target[0];
    vec[1] = target[1];
    return vec;
};
export const addSet = (vecA, vecB) => set(vecA, [vecA[0] + vecB[0], vecA[1] + vecB[1]]);
export const add = (vecA, vecB) => addSet([...vecA], vecB);
export const subtractSet = (vecA, vecB) => set(vecA, [vecA[0] - vecB[0], vecA[1] - vecB[1]]);
export const subtract = (vecA, vecB) => subtractSet([...vecA], vecB);
export const scaleSet = (base, scaleValue) => {
    base[0] *= scaleValue;
    base[1] *= scaleValue;
    return base;
};
export const scale = (vec, scaleValue) => scaleSet([...vec], scaleValue);
export const lerpSet = (vecA, vecB, dt) => {
    vecA[0] = nLerp(vecA[0], vecB[0], dt);
    vecA[1] = nLerp(vecA[1], vecB[1], dt);
    return vecA;
};
export const lerp = (vecA, vecB, dt) => lerpSet([...vecA], vecB, dt);
export const equals = (vecA, vecB) => vecA[0] === vecB[0] &&
    vecA[1] === vecB[1];
export const magnitudeSqr = (vec) => sqr(vec[0]) + sqr(vec[1]);
export const magnitude = (vec) => Math.sqrt(magnitudeSqr(vec));
export const normalizeSet = (vec) => vec[0] === 0 && vec[1] === 0
    ? [0, 0]
    : scaleSet(vec, 1 / magnitude(vec));
export const normalize = (vec) => normalizeSet([...vec]);
export const normalSet = (vec) => {
    const tmp = vec[0];
    vec[0] = -vec[1];
    vec[1] = tmp;
    return vec;
};
export const normal = (vec) => normalSet([...vec]);
export const invert = (vec) => scale(vec, -1);
export const invertSet = (vec) => scaleSet(vec, -1);
export const dot = (vecA, vecB) => vecA[0] * vecB[0] + vecA[1] * vecB[1];
export const cross = (vecA, vecB) => vecA[0] * vecB[1] - vecA[1] * vecB[0];
export const rotateSet = (vec, rotation) => {
    const s = Math.sin(rotation);
    const c = Math.cos(rotation);
    const tmp = vec[0];
    vec[0] = vec[0] * c - vec[1] * s;
    vec[1] = tmp * s + vec[1] * c;
    return vec;
};
export const rotate = (vec, rotation) => rotateSet([...vec], rotation);
export const angleBetween = (vecA, vecB) => Math.atan2(vecB[0], vecB[1]) - Math.atan2(vecA[0], vecA[1]);
export const scaleToSet = (vec, newMagnitude) => scaleSet(normalizeSet(vec), newMagnitude);
export const scaleTo = (vec, newMagnitude) => scaleToSet([...vec], newMagnitude);
export const component = (vec, directionVector) => magnitude(vec) * Math.cos(Math.atan2(vec[1], vec[0]) - Math.atan2(directionVector[1], directionVector[0]));
export const componentVector = (vec, directionVector) => scaleSet(normal(directionVector), component(vec, directionVector));
export const absolute = (vec) => set(vec, [vec[0] * sign(vec[0]), vec[1] * sign(vec[1])]);
export const copy = (vec) => ([vec[0], vec[1]]);
