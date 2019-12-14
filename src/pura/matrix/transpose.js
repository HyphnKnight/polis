export const transpose = (src, target) => {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (target === src) {
        const a01 = src[1];
        const a02 = src[2];
        const a03 = src[3];
        const a12 = src[6];
        const a13 = src[7];
        const a23 = src[11];
        target[1] = src[4];
        target[2] = src[8];
        target[3] = src[12];
        target[4] = a01;
        target[6] = src[9];
        target[7] = src[13];
        target[8] = a02;
        target[9] = a12;
        target[11] = src[14];
        target[12] = a03;
        target[13] = a13;
        target[14] = a23;
    }
    else {
        target[0] = src[0];
        target[1] = src[4];
        target[2] = src[8];
        target[3] = src[12];
        target[4] = src[1];
        target[5] = src[5];
        target[6] = src[9];
        target[7] = src[13];
        target[8] = src[2];
        target[9] = src[6];
        target[10] = src[10];
        target[11] = src[14];
        target[12] = src[3];
        target[13] = src[7];
        target[14] = src[11];
        target[15] = src[15];
    }
    return target;
};
