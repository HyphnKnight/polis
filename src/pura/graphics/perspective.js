export const perspective = (camera, focalLength, viewWidth, viewHeight) => 
// 2d point in world space
(point) => {
    const pX = point[0] - camera[0];
    const pY = point[1] - camera[1];
    const cZ = camera[2];
    const relPos = (pY + focalLength);
    let sX = pX + pY * -pX / (pY + focalLength) + viewWidth / 2;
    let sY;
    if (relPos < 0) {
        sY = viewHeight + cZ * pY / relPos;
        sX = pX;
    }
    else if (relPos > 0) {
        sY = viewHeight - cZ * pY / relPos;
    }
    else {
        sY = viewHeight;
        sX = pX;
    }
    return [sX, sY, Math.pow(focalLength + pY, 2) + Math.pow(-pX, 2)];
};
