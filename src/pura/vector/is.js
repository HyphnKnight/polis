import { isNumber } from '../is/type';
export const isVector2d = (u) => u && isNumber(u[0]) && isNumber(u[1]);
