import { TerrainId, terrainTypes } from "./Terrain";
import { District } from "./District";
import { Hex } from "../pura/hex";
import { Scenario } from "./Scenario";


export class Tile {
  district?: District;

  get terrain() {
    return terrainTypes[this.terrainId];
  }

  constructor(
    readonly terrainId: TerrainId,
    readonly hex: Hex,
    readonly scenario: Scenario,
    district?: District,
  ) {
    this.district = district;
  }

  update(delta: number) {
    if (this.district) {
      this.district.update(delta);
    }
  }
}
