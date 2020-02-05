export const enum CommodityId {
  LUMBER = "LUMBER",
  TIMBER = "TIMBER",
}

export interface Commodity {
  readonly id: CommodityId;
  readonly population: number;
  readonly military: number;
}

export type CommodityStore = {
  [Id in CommodityId]?: number;
}

export const commodities: { readonly [Id in CommodityId]: Commodity; } = {
  [CommodityId.LUMBER]: {
    id: CommodityId.LUMBER,
    population: 0,
    military: 0,
  },
  [CommodityId.TIMBER]: {
    id: CommodityId.TIMBER,
    population: 3,
    military: 0,
  },
};
