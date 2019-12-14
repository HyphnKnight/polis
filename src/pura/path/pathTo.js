import { forEach, map } from '../array';
import mergeSort from '../array/mergeSort';
export const pathTo = (getNeighbors, resist, heuristic, maxResist = Infinity) => (start, goal) => {
    let frontier = [[start, heuristic(goal, start)]];
    const cameFrom = new Map();
    const costSoFar = new Map();
    cameFrom.set(start, null);
    costSoFar.set(start, 0);
    let current = frontier[0];
    while (frontier.length) {
        current = frontier.shift();
        const currentCost = costSoFar.get(current);
        if (current[0] === goal) {
            break;
        }
        if (currentCost >= maxResist) {
            return null;
        }
        forEach(getNeighbors(current[0]), (neighbor) => {
            const newCost = currentCost + resist(current[0], neighbor);
            const oldCost = costSoFar.get(neighbor);
            if (!oldCost || newCost < oldCost) {
                costSoFar.set(neighbor, newCost);
                const priority = newCost + heuristic(goal, neighbor);
                frontier.push([neighbor, priority]);
                cameFrom.set(neighbor, current);
            }
        });
        frontier = mergeSort(frontier, ([, value]) => value);
    }
    const path = [];
    let last = goal;
    while (last !== start) {
        path.unshift(current);
        last = cameFrom.get(current);
    }
    return map(path, ([itemData]) => itemData);
};
