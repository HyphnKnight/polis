import { countBy, heuristicFind, reduce } from '../array';
import mergeSort from '../array/mergeSort';
const mergeFind = heuristicFind(mergeSort);
export const mean = (array, func) => reduce(array, (sum, val) => sum + func(val), 0) / array.length;
export const mode = (array, func) => {
    const count = countBy(array, func);
    return mergeFind(Object.keys(count), (key) => count[key]);
};
export const median = (array, func) => {
    const sortedArray = mergeSort([...array], func);
    const middle = array.length / 2;
    return middle % 1 === 0
        ? sortedArray[middle]
        : (func(sortedArray[Math.floor(middle)]) + func(sortedArray[Math.ceil(middle)])) / 2;
};
