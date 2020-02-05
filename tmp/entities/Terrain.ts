import { DistrictDataId } from "./District";

export const enum TerrainId {
  Plain = "Plain",
  Forest = "Forest",
}

export interface Terrain {
  readonly id: TerrainId;
  // 2 means it takes twice as long.
  readonly movementModifier: number;
  readonly allowableDistricts?: DistrictDataId[];
}

export const terrainTypes: { readonly [Id in TerrainId]: Terrain } = {
  [TerrainId.Plain]: {
    id: TerrainId.Plain,
    movementModifier: 1,
    allowableDistricts: [
      DistrictDataId.Bakery,
      DistrictDataId.Mill,
      DistrictDataId.WheatFarm,
    ],
  },
  [TerrainId.Forest]: {
    id: TerrainId.Forest,
    movementModifier: 1.5,
    allowableDistricts: [
      DistrictDataId.LumberCamp,
      DistrictDataId.HuntingCamp,
    ],
  },
}; 