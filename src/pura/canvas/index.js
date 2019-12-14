import { round } from '../math';
import { addSet, scaleSet, } from '../vector';
import { forEachList, mapList, subtractList, } from '../vector/list';
export let canvas = document.createElement('canvas');
export let ctx = canvas.getContext('2d');
export const setCanvas = (newCanvas, canvasAttributes) => {
    canvas = newCanvas;
    const newContext = newCanvas.getContext('2d', canvasAttributes);
    if (newContext)
        ctx = newContext;
};
const originVector = [0, 0];
export const translate = (vec) => ctx.translate(round(vec[0]), round(vec[1]));
export const rotate = (angle) => ctx.rotate(angle);
export const clearRect = (vec, width, height) => ctx.clearRect(round(vec[0]), round(vec[1]), round(width), round(height));
export const clear = () => clearRect(originVector, canvas.width, canvas.height);
export const moveTo = (vec) => ctx.moveTo(round(vec[0]), round(vec[1]));
export const lineTo = (vec) => ctx.lineTo(round(vec[0]), round(vec[1]));
export const quadraticCurveTo = (vec, control) => ctx.quadraticCurveTo(round(control[0]), round(control[1]), round(vec[0]), round(vec[1]));
const arc = (vec, radius, startAngle, endAngle, counterClockwise) => ctx.arc(round(vec[0]), round(vec[1]), radius, startAngle, endAngle, counterClockwise);
const rect = (vec, width, height) => ctx.rect(round(vec[0]), round(vec[1]), round(width), round(height));
export const drawImage = (image) => (vec, width, height) => ctx.drawImage(image, round(vec[0]), round(vec[1]), width, height);
export const drawSlicedImage = (image) => (vec, slice, sliceWidth, sliceHeight, width, height) => ctx.drawImage(image, round(slice[0]), round(slice[1]), sliceWidth, sliceHeight, round(vec[0]), round(vec[1]), width, height);
export const drawLine = (points, angle = 0) => {
    const origin = [points[0], points[1]];
    const adjustedPoints = subtractList(points, origin);
    ctx.save();
    translate(origin);
    rotate(angle);
    moveTo(originVector);
    forEachList(adjustedPoints, lineTo);
    ctx.restore();
};
export const drawPolygon = (position, points, angle = 0) => {
    const first = [
        points[points.length - 2],
        points[points.length - 1],
    ];
    ctx.save();
    translate(position);
    rotate(angle);
    moveTo(first);
    forEachList(points, lineTo);
    ctx.restore();
};
export const drawOval = (position, points, angle = 0) => {
    const midPoints = mapList(points, (pnt, index) => scaleSet(addSet(points[index * 2 - 2]
        ? [points[index * 2 - 2], points[index * 2 - 1]]
        : [points[points.length - 2], points[points.length - 1]], pnt), 0.5));
    ctx.save();
    translate(position);
    rotate(angle);
    moveTo([midPoints[0], midPoints[1]]);
    let i = 0;
    while ((i += 2) <= 9) {
        quadraticCurveTo(midPoints[i]
            ? [midPoints[i], midPoints[i + 1]]
            : [midPoints[0], midPoints[1]], [points[i - 2], points[i - 1]]);
    }
    ctx.restore();
};
export const drawRectangle = (position, width, height, angle = 0) => {
    ctx.save();
    translate(position);
    rotate(angle);
    rect([-width / 2, -height / 2], round(width), round(height));
    ctx.restore();
};
export const drawArc = (vec, radius = 100, angle = 0, startAngle = 0, endAngle = 2 * Math.PI, counterClockwise = false) => {
    ctx.save();
    translate(vec);
    rotate(angle);
    arc(originVector, radius, startAngle, endAngle, counterClockwise);
    ctx.restore();
};
const fill = (draw) => (style, ...args) => {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = style;
    draw(...args);
    ctx.fill();
    ctx.restore();
};
const stroke = (draw) => (options, ...args) => {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = options.style || '';
    ctx.lineWidth = options.thickness || 1;
    draw(...args);
    ctx.stroke();
    ctx.restore();
};
export const fillPolygon = fill(drawPolygon);
export const fillOval = fill(drawOval);
export const fillRectangle = fill(drawRectangle);
export const fillLine = fill(drawLine);
export const fillArc = fill(drawArc);
export const strokePolygon = stroke(drawPolygon);
export const strokeOval = stroke(drawOval);
export const strokeRectangle = stroke(drawRectangle);
export const strokeLine = stroke(drawLine);
export const strokeArc = stroke(drawArc);
export const strokeText = (fontOptions, vec, text, angle = 0) => {
    ctx.save();
    ctx.strokeStyle = fontOptions.style || '';
    ctx.font = fontOptions.font || ctx.font;
    ctx.textAlign = fontOptions.textAlign || ctx.textAlign;
    ctx.textBaseline = fontOptions.textBaseline || ctx.textBaseline;
    rotate(angle);
    if (fontOptions.horizontalAlign) {
        const { width } = ctx.measureText(text);
        translate([-width / 2, 0]);
    }
    ctx.strokeText(text, round(vec[0]), round(vec[1]), fontOptions.maxWidth);
    ctx.restore();
};
export const fillText = (fontOptions, vec, text, angle = 0) => {
    ctx.save();
    ctx.fillStyle = fontOptions.style || '';
    ctx.font = fontOptions.font || ctx.font;
    ctx.textAlign = fontOptions.textAlign || ctx.textAlign;
    ctx.textBaseline = fontOptions.textBaseline || ctx.textBaseline;
    rotate(angle);
    if (fontOptions.horizontalAlign) {
        const { width } = ctx.measureText(text);
        translate([-width / 2, 0]);
    }
    ctx.fillText(text, round(vec[0]), round(vec[1]), fontOptions.maxWidth);
    ctx.restore();
};
