import { Tile } from "../entities/Tile";
import { District } from "../entities/District";
import { find } from "../pura/array";
import { CommodityId, ProductionDetail } from "../entities/Commodity";

/*
export class District {
  readonly acceptableInputs: CommodityId[] = [];

  private produtionCycle = 0;

  private readonly productionLines: Map<CommodityId, ProductionDetail[]>;

  get data() {
    return districtData[this.id];
  }

  get productionCycleLength(): number {
    return this.data.productionCycleLength || 1000;
  }

  constructor(
    readonly id: DistrictDataId,
    readonly storage: CommodityStorage,
    readonly tile: Tile,
  ) {
    if (this.data.produces) {
      this.data.produces.forEach(id => {
        const commodity = commodities[id];
        commodity.sources.forEach(detail => {
          const ids = getComponentIds(detail);
          this.acceptableInputs.push(...ids);
        });
      })
    }
  }

  update(delta: number) {
    this.produtionCycle += delta;

    if (this.produtionCycle < this.productionCycleLength) {
      return;
    }

    this.produtionCycle = this.produtionCycle % this.productionCycleLength;

    const srcRoute = this.tile.scenario.routes.find(({ start }) => start === this.tile);

    if (!srcRoute) return;

    const productionDetails = this.productionLines.get(srcRoute.commodity);

    if (!productionDetails) return;

    const productionDetail = find(productionDetails, (productionDetail) => {
      if (!productionDetail.components) return true;
      const componentIds = getComponentIds(productionDetail);
      return componentIds.every(
        id => this.storage[id]! >= productionDetail.components![id]!);
    });

    if (!productionDetail) return;

    this.buildCommodity(srcRoute.commodity, productionDetail);
  }

  storeCommodity(id: CommodityId, quantity: number = 1) {
    const currentValue = (this.storage[id] || 0);
    this.storage[id] = Math.min(currentValue + quantity, 10);
  }

  private buildCommodity(id: CommodityId, productionDetail: ProductionDetail) {
    const components = productionDetail.components;
    if (!components) {
      this.storeCommodity(id, productionDetail.output)
    }
    const componentIds = getComponentIds(productionDetail);
    componentIds.forEach(id => {
      this.storage[id] -= components[id];
    });
  }
}
*/

export function isDistrictExportOrImport(district: District, commodity: CommodityId) {
  return district.type.commodityInputs.has(commodity) || district.type.produces.has(commodity);
}

export function storeCommodity(district: District, commodity: CommodityId) {
  district.storage[commodity] = Math.min(district.storage[commodity] + 1, 10);
}

function buildCommodity(district: District, commodity: CommodityId, productionDetail: ProductionDetail) {
  const components = productionDetail.components;
  if (!components) {
    storeCommodity(district,, productionDetail.output)
  }
  const componentIds = getComponentIds(productionDetail);
  componentIds.forEach(id => {
    this.storage[id] -= components[id];
  });
}
