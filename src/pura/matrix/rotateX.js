export const rotateX = (src, rotation, target) => {
    const s = Math.sin(rotation);
    const c = Math.cos(rotation);
    const a10 = src[4];
    const a11 = src[5];
    const a12 = src[6];
    const a13 = src[7];
    const a20 = src[8];
    const a21 = src[9];
    const a22 = src[10];
    const a23 = src[11];
    if (src !== target) {
        target[0] = src[0];
        target[1] = src[1];
        target[2] = src[2];
        target[3] = src[3];
        target[12] = src[12];
        target[13] = src[13];
        target[14] = src[14];
        target[15] = src[15];
    }
    target[4] = a10 * c + a20 * s;
    target[5] = a11 * c + a21 * s;
    target[6] = a12 * c + a22 * s;
    target[7] = a13 * c + a23 * s;
    target[8] = a20 * c - a10 * s;
    target[9] = a21 * c - a11 * s;
    target[10] = a22 * c - a12 * s;
    target[11] = a23 * c - a13 * s;
    return target;
};
