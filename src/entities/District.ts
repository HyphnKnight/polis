import { DistrictTypeId } from './DistrictTypeId';
import { CommodityStore } from './CommodityStore';
import { CommodityId } from './CommodityId';
import { districtTypes } from './districtTypes';
import { DistrictType } from './DistrictType';

export class District {
  readonly outputs = new Set<CommodityId>();
  readonly inputs = new Set<CommodityId>();

  get districtType(): DistrictType {
    return districtTypes[this.type];
  }

  constructor(
    readonly type: DistrictTypeId,
    readonly storage: CommodityStore = {},
  ) {
    this.districtType.productionLines.forEach(({ input, output }) => {
      this.outputs.add(output);

      const inputCommodities = Object.keys(input) as unknown as CommodityId[];
      inputCommodities.forEach(commodity => {
        this.inputs.add(commodity);
      })
    });
  }
}