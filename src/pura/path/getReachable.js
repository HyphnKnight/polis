import { filter } from '../array';
import mergeSort from '../array/mergeSort';
export const getReachable = (getNeighbors, resist) => (start, maxResist = Infinity) => {
    const result = [];
    const frontier = [start];
    const costSoFar = new Map();
    costSoFar.set(start, 0);
    let current = start;
    while (frontier.length) {
        current = frontier.shift();
        const currentCost = costSoFar.get(current);
        if (currentCost >= maxResist)
            break;
        result.push(current);
        const neighbors = getNeighbors(current);
        frontier.push(...filter(neighbors, (neighbor) => {
            if (costSoFar.get(neighbor))
                return false;
            const newCost = currentCost + resist(current, neighbor);
            costSoFar.set(neighbor, newCost);
            return newCost <= maxResist;
        }));
        mergeSort(frontier, (value) => costSoFar.get(value));
    }
    return result;
};
