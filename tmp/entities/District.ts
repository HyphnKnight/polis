import { CommodityId, CommodityStorage, commodities, ProductionDetail, getComponentIds, Commodity } from "./Commodity";
import { Tile } from "./Tile";
import { find } from "../pura/array";


export const enum DistrictTypeId {
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

class DistrictType {
  readonly commodityInputs = new Set<CommodityId>();
  readonly produces: Set<CommodityId>;

  constructor(
    readonly id: DistrictTypeId,
    produces: CommodityId[] = [],
    readonly productionCycleLength: number = 1000,
  ) {
    this.produces = new Set(produces);
    this.produces
      .forEach(id => {
        const { sources } = commodities[id];
        sources.forEach(({ components }) => {
          const componentIds = Object.keys(components) as CommodityId[];
          componentIds.forEach(id => this.commodityInputs.add(id));
        });
      })
  }
}

export class District {
  readonly type: DistrictType;

  constructor(
    typeId: DistrictTypeId,
    readonly tile: Tile,
    readonly storage: CommodityStorage = {},
  ) {
    this.type = districtTypes[typeId];
  }
}

export const districtTypes: { readonly [Id in DistrictTypeId]: DistrictType } = {
  [DistrictTypeId.TownCenter]: new DistrictType(DistrictTypeId.TownCenter),
  [DistrictTypeId.LumberCamp]: new DistrictType(DistrictTypeId.LumberCamp, [CommodityId.Lumber]),
  [DistrictTypeId.Carpenter]: new DistrictType(DistrictTypeId.Carpenter, [
    CommodityId.WoodenPole,
    CommodityId.WoodenSpear,
  ]),
  [DistrictTypeId.HuntingCamp]: new DistrictType(DistrictTypeId.HuntingCamp, [
    CommodityId.RawMeat,
    CommodityId.Sinew,
  ]),
  [DistrictTypeId.WheatFarm]: new DistrictType(DistrictTypeId.WheatFarm, [
    CommodityId.WheatGrain,
  ]),
  [DistrictTypeId.Mill]: new DistrictType(DistrictTypeId.Mill, [
    CommodityId.Flour,
  ]),
  [DistrictTypeId.Bakery]: new DistrictType(DistrictTypeId.Bakery, [
    CommodityId.Bread,
  ]),
  [DistrictTypeId.CopperMine]: new DistrictType(DistrictTypeId.CopperMine, [
    CommodityId.CopperOre,
  ]),
  [DistrictTypeId.TinMine]: new DistrictType(DistrictTypeId.TinMine, [
    CommodityId.TinOre,
  ]),
  [DistrictTypeId.IronMine]: new DistrictType(DistrictTypeId.IronMine, [
    CommodityId.IronOre,
  ]),
  [DistrictTypeId.Kiln]: new DistrictType(DistrictTypeId.Kiln, [
    CommodityId.CopperIngot,
    CommodityId.BronzeIngot,
  ]),
  [DistrictTypeId.Furnace]: new DistrictType(DistrictTypeId.Furnace, [
    CommodityId.CopperIngot,
    CommodityId.BronzeIngot,
    CommodityId.IronIngot,
  ]),
  [DistrictTypeId.Blacksmith]: new DistrictType(DistrictTypeId.Blacksmith, [
  ]),
};
