export const translate = (src, trans, target) => {
    const [x, y, z] = trans;
    let a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23;
    if (src === target) {
        target[12] = src[0] * x + src[4] * y + src[8] * z + src[12];
        target[13] = src[1] * x + src[5] * y + src[9] * z + src[13];
        target[14] = src[2] * x + src[6] * y + src[10] * z + src[14];
        target[15] = src[3] * x + src[7] * y + src[11] * z + src[15];
    }
    else {
        a00 = src[0];
        a01 = src[1];
        a02 = src[2];
        a03 = src[3];
        a10 = src[4];
        a11 = src[5];
        a12 = src[6];
        a13 = src[7];
        a20 = src[8];
        a21 = src[9];
        a22 = src[10];
        a23 = src[11];
        target[0] = a00;
        target[1] = a01;
        target[2] = a02;
        target[3] = a03;
        target[4] = a10;
        target[5] = a11;
        target[6] = a12;
        target[7] = a13;
        target[8] = a20;
        target[9] = a21;
        target[10] = a22;
        target[11] = a23;
        target[12] = a00 * x + a10 * y + a20 * z + src[12];
        target[13] = a01 * x + a11 * y + a21 * z + src[13];
        target[14] = a02 * x + a12 * y + a22 * z + src[14];
        target[15] = a03 * x + a13 * y + a23 * z + src[15];
    }
    return target;
};
