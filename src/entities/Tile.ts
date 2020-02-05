import { District } from "./District";
import { TerrainTypeId } from "./TerrainTypeId";
import { TerrainType } from "./TerrainType";
import { terrainTypes } from "./terrainTypes";


export interface TileData {
  readonly terrainType: TerrainTypeId;
  district: District | null;
}

export class Tile {
  district: District | null;

  get terrain(): TerrainType {
    return terrainTypes[this.type];
  }

  get isEmpty() {
    return !this.district;
  }

  constructor(
    private readonly type: TerrainTypeId,
    district: District | null = null,
  ) {
    this.district = district;
  }
}