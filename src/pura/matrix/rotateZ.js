export const rotateZ = (src, rotation, target) => {
    const s = Math.sin(rotation);
    const c = Math.cos(rotation);
    const a00 = src[0];
    const a01 = src[1];
    const a02 = src[2];
    const a03 = src[3];
    const a10 = src[4];
    const a11 = src[5];
    const a12 = src[6];
    const a13 = src[7];
    // If the source and destination differ, copy the unchanged last row
    if (src !== target) {
        target[8] = src[8];
        target[9] = src[9];
        target[10] = src[10];
        target[11] = src[11];
        target[12] = src[12];
        target[13] = src[13];
        target[14] = src[14];
        target[15] = src[15];
    }
    // Perform axis-specific matrix multiplication
    target[0] = a00 * c + a10 * s;
    target[1] = a01 * c + a11 * s;
    target[2] = a02 * c + a12 * s;
    target[3] = a03 * c + a13 * s;
    target[4] = a10 * c - a00 * s;
    target[5] = a11 * c - a01 * s;
    target[6] = a12 * c - a02 * s;
    target[7] = a13 * c - a03 * s;
    return target;
};
