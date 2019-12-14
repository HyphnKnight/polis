import { round } from '../math';
import { scaleSet } from './index';
export const addListSet = (list, vec) => {
    for (let i = 0, len = list.length; i < len; i += 2) {
        list[i] += vec[0];
        list[i + 1] += vec[1];
    }
    return list;
};
export const addList = (list, vec) => addListSet([...list], vec);
export const subtractListSet = (list, vec) => {
    for (let i = 0, len = list.length; i < len; i += 2) {
        list[i] -= vec[0];
        list[i + 1] -= vec[1];
    }
    return list;
};
export const subtractList = (list, vec) => subtractListSet([...list], vec);
export const scaleListSet = (list, scale) => {
    for (let i = 0, len = list.length; i < len; i += 2) {
        list[i] *= scale;
        list[i + 1] *= scale;
    }
    return list;
};
export const scaleList = (list, scale) => scaleListSet(list, scale);
export const invertList = (list) => scaleList(list, -1);
export const invertListSet = (list) => scaleListSet(list, -1);
export const normalListSet = (list) => {
    let tmp = 0;
    for (let i = 0, len = list.length; i < len; i += 2) {
        tmp = list[i];
        list[i] = -list[i + 1];
        list[i + 1] = tmp;
    }
    return list;
};
export const normalList = (list) => normalListSet([...list]);
export const rotateListSet = (list, rotation) => {
    const s = Math.sin(rotation);
    const c = Math.cos(rotation);
    let tmp = 0;
    for (let i = 0, len = list.length; i < len; i += 2) {
        tmp = list[i];
        list[i] = round(tmp * c - list[i + 1] * s);
        list[i + 1] = round(tmp * s + list[i + 1] * c);
    }
    return list;
};
export const rotateList = (list, rotation) => rotateListSet([...list], rotation);
export const rotateListAround = (list, point, rotation) => addList(rotateList(subtractList(list, point), rotation), point);
export const rotateListAroundSet = (list, point, rotation) => addListSet(rotateListSet(subtractListSet(list, point), rotation), point);
export const scaleToList = (list, newMagnitude) => scaleList(normalList(list), newMagnitude);
export const scaleToListSet = (list, newMagnitude) => scaleListSet(normalListSet(list), newMagnitude);
export const sumList = (list) => {
    const result = [0, 0];
    for (let i = 0, len = list.length; i < len; i += 2) {
        result[0] += list[i];
        result[1] += list[i + 1];
    }
    return result;
};
export const averageList = (list) => scaleSet(sumList(list), 2 / list.length);
export const listToVector = (list) => {
    const result = [];
    for (let i = 0; i < list.length; i += 2) {
        result.push([list[i], list[i + 1]]);
    }
    return result;
};
export const forEachList = (list, func) => {
    for (let i = 0; i < list.length; i += 2) {
        func([list[i], list[i + 1]], i / 2);
    }
};
export const mapListSet = (list, func) => {
    for (let i = 0; i < list.length; i += 2) {
        list.splice(i, 2, ...func([list[i], list[i + 1]], i / 2));
    }
    return list;
};
export const mapList = (list, func) => mapListSet([...list], func);
