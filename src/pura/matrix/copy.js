// Copy the values from one mat4 to another
export const copyTo = (src) => (target = new Float32Array(16)) => {
    target[0] = src[0];
    target[1] = src[1];
    target[2] = src[2];
    target[3] = src[3];
    target[4] = src[4];
    target[5] = src[5];
    target[6] = src[6];
    target[7] = src[7];
    target[8] = src[8];
    target[9] = src[9];
    target[10] = src[10];
    target[11] = src[11];
    target[12] = src[12];
    target[13] = src[13];
    target[14] = src[14];
    target[15] = src[15];
    return target;
};
