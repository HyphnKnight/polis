export const rotateY = (src, rotation, target) => {
    const s = Math.sin(rotation);
    const c = Math.cos(rotation);
    const a00 = src[0];
    const a01 = src[1];
    const a02 = src[2];
    const a03 = src[3];
    const a20 = src[8];
    const a21 = src[9];
    const a22 = src[10];
    const a23 = src[11];
    // If the source and destination differ, copy the unchanged rows
    if (src !== target) {
        target[4] = src[4];
        target[5] = src[5];
        target[6] = src[6];
        target[7] = src[7];
        target[12] = src[12];
        target[13] = src[13];
        target[14] = src[14];
        target[15] = src[15];
    }
    // Perform axis-specific matrix multiplication
    target[0] = a00 * c - a20 * s;
    target[1] = a01 * c - a21 * s;
    target[2] = a02 * c - a22 * s;
    target[3] = a03 * c - a23 * s;
    target[8] = a00 * s + a20 * c;
    target[9] = a01 * s + a21 * c;
    target[10] = a02 * s + a22 * c;
    target[11] = a03 * s + a23 * c;
    return target;
};
