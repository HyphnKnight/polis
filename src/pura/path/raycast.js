export function raycast(start, getNext, resistFunc, maxResist = Number.MAX_VALUE) {
    const ray = [];
    let current = getNext(start);
    let resistance = 0;
    while (!!current && resistance < maxResist) {
        ray.push(current);
        current = getNext(current);
        resistance += resistFunc(current);
    }
    return ray;
}
