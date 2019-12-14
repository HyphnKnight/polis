export declare const createNode: <type>(id: string, data: type, resist: number, priority: number, cameFrom?: Node<type> | undefined) => Node<type>;
export interface Node<type> {
    id: string;
    data: type;
    resist: number;
    priority: number;
    cameFrom: Node<type> | null;
    hasBeenRoot: boolean;
}
