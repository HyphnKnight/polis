import { forEach, map } from '../array';
import quickSort from '../array/quickSort';
import { createNode } from './node';
export function* walkTo(pathingData) {
    const { start, destination, getUniqueId, getNeighbors, priorityFunc, resistFunc, maxResist } = pathingData;
    if (start === destination)
        return destination;
    let rootNode = createNode(getUniqueId(start), start, 0, priorityFunc(start, destination));
    const nodes = { [rootNode.id]: rootNode };
    let newNeighbors = [rootNode];
    while (newNeighbors[0].data !== destination) {
        if (rootNode.priority > maxResist) {
            return null;
        }
        newNeighbors = map(getNeighbors(rootNode.data), (neighbor) => {
            const node = nodes[getUniqueId(neighbor)];
            if (node) {
                node.resist += rootNode.resist + resistFunc(rootNode.data, neighbor);
                node.priority = node.resist + priorityFunc(neighbor, destination);
                return node;
            }
            else {
                const resist = rootNode.resist + resistFunc(rootNode.data, neighbor);
                const priority = resist + priorityFunc(neighbor, destination);
                return createNode(getUniqueId(neighbor), neighbor, resist, priority, rootNode);
            }
        });
        newNeighbors = quickSort(newNeighbors, (node) => node.priority + Number(node === rootNode) * node.priority);
        forEach(newNeighbors, (node) => nodes[node.id] = node);
        rootNode = newNeighbors[0];
        yield rootNode.data;
    }
}
