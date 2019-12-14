import { pathTo } from '../path/pathTo';
import { getNeighbors } from './index';
export const hexPathTo = (resist, heuristic, maxResist = Infinity) => pathTo(getNeighbors, resist, heuristic, maxResist);
