import { abs, lerp as nLerp, sqr } from '../math';
export const set = (vec, target) => {
    vec[0] = target[0];
    vec[1] = target[1];
    vec[2] = target[2];
    return vec;
};
export const addSet = (vecA, vecB) => set(vecA, [
    vecA[0] + vecB[0],
    vecA[1] + vecB[1],
    vecA[2] + vecB[2],
]);
export const add = (vecA, vecB) => addSet([...vecA], vecB);
export const subtractSet = (vecA, vecB) => set(vecA, [
    vecA[0] - vecB[0],
    vecA[1] - vecB[1],
    vecA[2] - vecB[2],
]);
export const subtract = (vecA, vecB) => subtractSet([...vecA], vecB);
export const scaleSet = (base, scaleValue) => {
    base[0] *= scaleValue;
    base[1] *= scaleValue;
    base[2] *= scaleValue;
    return base;
};
export const scale = (vec, scaleValue) => scaleSet([...vec], scaleValue);
export const lerpSet = (vecA, vecB, dt) => {
    vecA[0] = nLerp(vecA[0], vecB[0], dt);
    vecA[1] = nLerp(vecA[1], vecB[1], dt);
    vecA[2] = nLerp(vecA[2], vecB[2], dt);
    return vecA;
};
export const lerp = (vecA, vecB, dt) => lerpSet([...vecA], vecB, dt);
export const equals = (vecA, vecB) => vecA[0] === vecB[0] &&
    vecA[1] === vecB[1] &&
    vecA[2] === vecB[2];
export const magnitudeSqr = (vec) => sqr(vec[0]) + sqr(vec[1]) + sqr(vec[2]);
export const magnitude = (vec) => Math.sqrt(magnitudeSqr(vec));
export const normalizeSet = (vec) => vec[0] === 0 && vec[1] === 0
    ? [0, 0, 0]
    : scaleSet(vec, 1 / magnitude(vec));
export const normalize = (vec) => normalizeSet([...vec]);
export const invert = (vec) => scale(vec, -1);
export const invertSet = (vec) => scaleSet(vec, -1);
export const dot = (vecA, vecB) => vecA[0] * vecB[0] + vecA[1] * vecB[1] + vecA[2] * vecB[2];
export const scaleToSet = (vec, newMagnitude) => scaleSet(normalizeSet(vec), newMagnitude);
export const scaleTo = (vec, newMagnitude) => scaleToSet([...vec], newMagnitude);
export const absolute = (vec) => set(vec, [abs(vec[0]), abs(vec[1]), abs(vec[2])]);
export const copy = (vec) => ([...vec]);
