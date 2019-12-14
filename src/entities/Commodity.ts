/**
 * Commodities are the core of the game and fall roughly into three categories
 * Harvested from the terrain
 * Has no intrisic value, but can be used to produce additional goods.
 * Has either military or population value and can be delivered to the towncenter.
 *
 * Commodities can be classified by the following two metrics:
 * production depth (how many times its components need to be refined),
 * and production bredth (how many different components it has)
 */


export const enum CommodityId {
  // Harvested goods
  Timber,
  RawMeat,
  Sinew,
  WildGrain,
  WheatGrain,
  CopperOre,
  TinOre,
  IronOre,
  Coal,

  // Process goods 
  Lumber,
  WoodenPole,
  Millet,
  Flour,
  CopperIngot,
  BronzeIngot,
  IronIngot,
  SteelIngot,
  Pig,
  Cow,

  // Production goods
  CookedMeat,
  WoodenSpear,
  CopperSpear,
  BronzeSpear,
  IronSpear,
  SteelSpear,
  CopperTool,
  BronzeTool,
  IronTool,
  SteelTool,
  Bow,
  Bread,
}

export interface Commodity<Id extends CommodityId> {
  readonly id: Id;
  readonly sources: ProductionDetail[];
  readonly population?: number;
  readonly military?: number;
}

export type AnyCommodity = Commodity<CommodityId>;

export type Components = {
  readonly [Id in CommodityId]?: number;
}

export interface ProductionDetail {
  readonly output: number;
  readonly components?: Components;
}

export type CommodityStorage = {
  [Id in CommodityId]?: number;
}

const addBaseToolSrcs = (src: Components = {}) => ([
  {
    output: 1,
    components: Object.assign({}, src),
  },
  {
    output: 2,
    components: Object.assign({
      [CommodityId.CopperTool]: 0.5,
    }, src),
  },
  {
    output: 2,
    components: Object.assign({
      [CommodityId.BronzeTool]: 0.25,
    }, src),
  },
  {
    output: 2,
    components: Object.assign({
      [CommodityId.IronTool]: 0.125,
    }, src),
  },
  {
    output: 2,
    components: Object.assign({
      [CommodityId.SteelTool]: 0.0625,
    }, src),
  },
]);


export const commodities: { readonly [Id in CommodityId]: Commodity<Id> } = {
  [CommodityId.Timber]: {
    id: CommodityId.Timber,
    sources: addBaseToolSrcs(),
  },
  [CommodityId.Lumber]: {
    id: CommodityId.Lumber,
    sources: addBaseToolSrcs({ [CommodityId.Timber]: 1 }),
  },
  [CommodityId.WoodenPole]: {
    id: CommodityId.WoodenPole,
    sources: addBaseToolSrcs({ [CommodityId.Lumber]: 1 }),
  },
  [CommodityId.WoodenSpear]: {
    id: CommodityId.WoodenSpear,
    sources: addBaseToolSrcs({ [CommodityId.WoodenPole]: 1 }),
  },
  [CommodityId.Bow]: {
    id: CommodityId.Bow,
    sources: addBaseToolSrcs({
      [CommodityId.WoodenPole]: 1,
      [CommodityId.Sinew]: 1,
    }),
  },
  [CommodityId.RawMeat]: {
    id: CommodityId.RawMeat,
    sources: [
      {
        output: 1,
      },
      {
        output: 2,
        components: {
          [CommodityId.Bow]: 0.5,
        },
      }
    ],
  },
  [CommodityId.Sinew]: {
    id: CommodityId.Sinew,
    sources: [
      {
        output: 1,
      },
      {
        output: 2,
        components: {
          [CommodityId.Bow]: 0.5,
        },
      }
    ],
  },
  [CommodityId.CookedMeat]: {
    id: CommodityId.CookedMeat,
    sources: [
      {
        output: 1,
        components: {
          [CommodityId.RawMeat]: 1,
        },
      },
    ],
  },
  [CommodityId.WheatGrain]: {
    id: CommodityId.WheatGrain,
    sources: addBaseToolSrcs({}),
  },
  [CommodityId.WildGrain]: {
    id: CommodityId.WildGrain,
    sources: [{
      output: 1,
    }],
  },
  [CommodityId.Flour]: {
    id: CommodityId.Flour,
    sources: [{
      output: 1,
      components: {
        [CommodityId.WheatGrain]: 1,
      },
    }],
  },
  [CommodityId.Bread]: {
    id: CommodityId.Bread,
    sources: [{
      output: 1,
      components: {
        [CommodityId.Flour]: 1,
      },
    }],
  },
  [CommodityId.Millet]: {
    id: CommodityId.Millet,
    sources: [
      {
        output: 1,
        components: {
          [CommodityId.WildGrain]: 1,
        },
      },
      {
        output: 2,
        components: {
          [CommodityId.WheatGrain]: 0.5,
        },
      },
    ],
  },
  [CommodityId.Pig]: {
    id: CommodityId.Pig,
    sources: [
      {
        output: 1,
      },
      {
        output: 2,
        components: {
          [CommodityId.WildGrain]: 1,
        },
      },
      {
        output: 1,
        components: {
          [CommodityId.WheatGrain]: 0.5,
        },
      },
    ],
  },
  [CommodityId.Cow]: {
    id: CommodityId.Cow,
    sources: [
      {
        output: 1,
      },
      {
        output: 2,
        components: {
          [CommodityId.WildGrain]: 1,
        },
      },
      {
        output: 1,
        components: {
          [CommodityId.WheatGrain]: 0.5,
        },
      },
    ],
  },
  [CommodityId.CopperOre]: {
    id: CommodityId.CopperOre,
    sources: addBaseToolSrcs({}),
  },
  [CommodityId.TinOre]: {
    id: CommodityId.TinOre,
    sources: [
      {
        output: 1,
        components: {
          [CommodityId.CopperTool]: 1,
        },
      },
      {
        output: 2,
        components: {
          [CommodityId.BronzeTool]: 0.5,
        },
      },
      {
        output: 2,
        components: {
          [CommodityId.IronTool]: 0.25,
        },
      },
      {
        output: 2,
        components: {
          [CommodityId.SteelTool]: 0.125,
        },
      },
    ],
  },
  [CommodityId.IronOre]: {
    id: CommodityId.IronOre,
    sources: [
      {
        output: 1,
        components: {
          [CommodityId.BronzeTool]: 1,
        },
      },
      {
        output: 2,
        components: {
          [CommodityId.IronTool]: 0.5,
        },
      },
      {
        output: 2,
        components: {
          [CommodityId.SteelTool]: 0.25,
        },
      },
    ],
  },
  [CommodityId.Coal]: {
    id: CommodityId.Coal,
    sources: [
      {
        output: 1,
        components: {
          [CommodityId.BronzeTool]: 1,
        },
      },
      {
        output: 2,
        components: {
          [CommodityId.IronTool]: 0.5,
        },
      },
    ],
  },
  [CommodityId.CopperIngot]: {
    id: CommodityId.CopperIngot,
    sources: [
      {
        output: 1,
        components: {
          [CommodityId.CopperOre]: 1,
        },
      },
      {
        output: 2,
        components: {
          [CommodityId.CopperOre]: 1,
          [CommodityId.Coal]: 0.5,
        },
      },
    ],
  },
  [CommodityId.BronzeIngot]: {
    id: CommodityId.BronzeIngot,
    sources: [
      {
        output: 1,
        components: {
          [CommodityId.CopperOre]: 1,
          [CommodityId.TinOre]: 1,
        },
      },
      {
        output: 2,
        components: {
          [CommodityId.CopperOre]: 1,
          [CommodityId.TinOre]: 1,
          [CommodityId.Coal]: 0.5,
        },
      },
    ],
  },
  [CommodityId.IronIngot]: {
    id: CommodityId.IronIngot,
    sources: [
      {
        output: 1,
        components: {
          [CommodityId.IronOre]: 1,
        },
      },
      {
        output: 2,
        components: {
          [CommodityId.IronOre]: 1,
          [CommodityId.Coal]: 0.5,
        },
      },
    ],
  },
  [CommodityId.SteelIngot]: {
    id: CommodityId.SteelIngot,
    sources: [
      {
        output: 1,
        components: {
          [CommodityId.IronOre]: 2,
          [CommodityId.Coal]: 1,
        },
      },
    ],
  },
  [CommodityId.CopperSpear]: {
    id: CommodityId.CopperSpear,
    sources: [{
      output: 1,
      components: {
        [CommodityId.WoodenPole]: 1,
        [CommodityId.CopperIngot]: 1,
      },
    }],
  },
  [CommodityId.BronzeSpear]: {
    id: CommodityId.BronzeSpear,
    sources: [{
      output: 1,
      components: {
        [CommodityId.WoodenPole]: 1,
        [CommodityId.BronzeIngot]: 1,
      },
    }],
  },
  [CommodityId.IronSpear]: {
    id: CommodityId.IronSpear,
    sources: [{
      output: 1,
      components: {
        [CommodityId.WoodenPole]: 1,
        [CommodityId.IronIngot]: 1,
      },
    }],
  },
  [CommodityId.SteelSpear]: {
    id: CommodityId.SteelSpear,
    sources: [{
      output: 1,
      components: {
        [CommodityId.WoodenPole]: 1,
        [CommodityId.SteelIngot]: 1,
      },
    }],
  },
  [CommodityId.CopperTool]: {
    id: CommodityId.CopperTool,
    sources: [{
      output: 1,
      components: {
        [CommodityId.WoodenPole]: 1,
        [CommodityId.CopperIngot]: 1,
      },
    }],
  },
  [CommodityId.BronzeTool]: {
    id: CommodityId.BronzeTool,
    sources: [{
      output: 1,
      components: {
        [CommodityId.WoodenPole]: 1,
        [CommodityId.BronzeIngot]: 1,
      },
    }],
  },
  [CommodityId.IronTool]: {
    id: CommodityId.IronTool,
    sources: [{
      output: 1,
      components: {
        [CommodityId.WoodenPole]: 1,
        [CommodityId.IronIngot]: 1,
      },
    }],
  },
  [CommodityId.SteelTool]: {
    id: CommodityId.SteelTool,
    sources: [{
      output: 1,
      components: {
        [CommodityId.WoodenPole]: 1,
        [CommodityId.SteelIngot]: 1,
      },
    }],
  },
};

export function getComponentIds(production: ProductionDetail): CommodityId[] {
  if (!production.components) return [];
  return Object.keys(production.components).map(Number);
}