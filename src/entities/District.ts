import { CommodityId, CommodityStorage, commodities, ProductionDetail, getComponentIds, Commodity } from "./Commodity";
import { Tile } from "./Tile";
import { find } from "../pura/array";


export const enum DistrictDataId {
  TownCenter = "TownCenter",
  LumberCamp = "LumberCamp",
  HuntingCamp = "HuntingCamp",
  WheatFarm = "WheatFarm",
  Mill = "Mill",
  Bakery = "Bakery",
  Carpenter = "Carpenter",
  CopperMine = "CopperMine",
  TinMine = "TinMine",
  IronMine = "IronMine",
  Kiln = "Kiln",
  Furnace = "Furnace",
  Blacksmith = "Blacksmith",
}

export interface DistrictData {
  readonly id: DistrictDataId;
  readonly produces?: CommodityId[];
  readonly productionCycleLength?: number;
}

export const districtData: { readonly [Id in DistrictDataId]: DistrictData } = {
  [DistrictDataId.TownCenter]: {
    id: DistrictDataId.TownCenter,
  },
  [DistrictDataId.LumberCamp]: {
    id: DistrictDataId.LumberCamp,
    produces: [CommodityId.Lumber],
  },
  [DistrictDataId.Carpenter]: {
    id: DistrictDataId.Carpenter,
    produces: [
      CommodityId.WoodenPole,
      CommodityId.WoodenSpear,
    ],
  },
  [DistrictDataId.HuntingCamp]: {
    id: DistrictDataId.HuntingCamp,
    produces: [
      CommodityId.RawMeat,
      CommodityId.Sinew,
    ],
  },
  [DistrictDataId.WheatFarm]: {
    id: DistrictDataId.WheatFarm,
    produces: [
      CommodityId.WheatGrain,
    ],
  },
  [DistrictDataId.Mill]: {
    id: DistrictDataId.Mill,
    produces: [
      CommodityId.Flour,
    ],
  },
  [DistrictDataId.Bakery]: {
    id: DistrictDataId.Bakery,
    produces: [
      CommodityId.Bread,
    ],
  },
  [DistrictDataId.CopperMine]: {
    id: DistrictDataId.CopperMine,
    produces: [
      CommodityId.CopperOre,
    ],
  },
  [DistrictDataId.TinMine]: {
    id: DistrictDataId.TinMine,
    produces: [
      CommodityId.TinOre,
    ],
  },
  [DistrictDataId.IronMine]: {
    id: DistrictDataId.IronMine,
    produces: [
      CommodityId.IronOre,
    ],
  },
  [DistrictDataId.Kiln]: {
    id: DistrictDataId.Kiln,
    produces: [
      CommodityId.CopperIngot,
      CommodityId.BronzeIngot,
    ],
  },
  [DistrictDataId.Furnace]: {
    id: DistrictDataId.Furnace,
    produces: [
      CommodityId.CopperIngot,
      CommodityId.BronzeIngot,
      CommodityId.IronIngot,
    ],
  },
  [DistrictDataId.Blacksmith]: {
    id: DistrictDataId.Blacksmith,
    produces: [
    ],
  },
};


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
