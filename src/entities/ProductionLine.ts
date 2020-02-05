import { CommodityId } from "./CommodityId";
import { CommodityStore } from "./CommodityStore";

export interface ProductionLine {
  output: CommodityId;
  input: CommodityStore;
}
