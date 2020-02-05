import { Tile } from './Tile';
import { CommodityId } from './CommodityId';


export interface RouteData {
  readonly start: Tile;
  readonly end: Tile;
  readonly cargo: CommodityId;
  progress: number;
}

export class Route {
  progress: number;

  constructor(
    readonly start: Tile,
    readonly end: Tile,
    readonly cargo: CommodityId,
    progress: number,
  ) {
    this.progress = progress;
  }

  
}