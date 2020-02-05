import { DistrictTypeId } from "./DistrictTypeId";
import { ProductionLine } from "./ProductionLine";


export interface DistrictType {
  readonly id: DistrictTypeId;
  readonly productionLines: ReadonlyArray<ProductionLine>;
}
