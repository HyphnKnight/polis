import { TerrainTypeId } from "./TerrainTypeId";
import { DistrictTypeId } from './DistrictTypeId'


export interface TerrainType {
  readonly id: TerrainTypeId;
  readonly districts: ReadonlyArray<DistrictTypeId>;
  readonly passability: number;
}
