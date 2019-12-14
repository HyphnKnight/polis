import { is } from '../is';
import { Shape } from './index';
export const isPoint = is((x) => x.type === Shape.Point);
export const isCircle = is((x) => x.type === Shape.Circle);
export const isRectangle = is((x) => x.type === Shape.Rectangle);
export const isPolygon = is((x) => x.type === Shape.Polygon);
