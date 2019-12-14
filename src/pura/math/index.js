import { reduce } from '../array';
export const abs = (x) => x < 0
    ? -x
    : x;
export const floor = (x) => x | 0;
export const round = (x) => x + 0.5 | 0;
export const eqSign = (x, y) => (x ^ y) >= 0;
export const multiplyByPowerOfTwo = (x, powOfTwo) => x << powOfTwo;
export const divideByPowerOfTwo = (x, powOfTwo) => x >> powOfTwo;
export const sum = (numbers) => reduce(numbers, (total, val) => total + val, 0);
export const clamp = (num, lower, upper) => num > upper
    ? upper
    : (num < lower
        ? lower
        : num);
export const inRange = (num, lower = 0, upper = 1) => !(num < lower || num > upper);
export const sign = (num) => num === 0
    ? 0
    : num / abs(num);
export const clampPerc = (num, lower, upper) => (num - lower) / (upper - lower);
export const random = (max = 1, min = 0) => Math.random() * (max - min) + min;
export const lerp = (a, b, dt) => a + (b - a) * dt;
export const sqr = (x) => x * x;
