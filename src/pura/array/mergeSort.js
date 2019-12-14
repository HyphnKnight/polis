const merge = (left, right, func) => {
    const result = [];
    while (left.length && right.length) {
        if ((func(left[0]) || 0) <= (func(right[0]) || 0)) {
            result.push(left.shift() || left[0]);
        }
        else {
            result.push(right.shift() || right[0]);
        }
    }
    while (left.length)
        result.push(left.shift() || left[0]);
    while (right.length)
        result.push(right.shift() || right[0]);
    return result;
};
export default function mergeSort(array, func) {
    if (array.length < 2)
        return array;
    const middle = Math.floor(array.length / 2);
    return merge(mergeSort(array.slice(0, middle), func), mergeSort(array.slice(middle), func), func);
}
