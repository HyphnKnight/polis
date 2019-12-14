export const createNode = (id, data, resist, priority, cameFrom) => ({
    id, data, resist, priority,
    cameFrom: cameFrom || null,
    hasBeenRoot: false,
});
