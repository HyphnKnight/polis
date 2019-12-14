import { remove } from "../pura/array";
import { generateGrid, Hex } from "../pura/hex";
import { clamp } from "../pura/math";
import { commodities, CommodityId, AnyCommodity } from "./Commodity";
import { Route } from "./Route,";
import { Tile } from "./Tile";


const SECONDS_TO_VALUE_LOSS = 5;

export class Scenario {
  population: number;
  military: number;
  readonly routes: Route[] = [];
  readonly grid: Hex[][];
  readonly tiles = new Map<Hex, Tile>();

  private readonly populationDeliveries: CommodityId[] = [];
  private readonly militaryDeliveries: CommodityId[] = [];

  constructor(
    private radius: number,
    population: number = 1,
    military: number = 1,
    terrainGenerator: (hex: Hex, grid: Hex[][], tiles: Map<Hex, Tile>) => Tile,
    private lockPopulation: boolean = false,
    private lockMilitary: boolean = false,
  ) {
    this.grid = generateGrid(this.radius);
    this.population = population;
    this.military = military;
    this.grid.flat().forEach(hex => {
      this.tiles.set(hex, terrainGenerator(hex, this.grid, this.tiles));
    });

  }

  update(delta: number) {
    this.routes.forEach(route => route.update(delta));
    this.tiles.forEach(tile => tile.update(delta));
    this.population -= (delta / SECONDS_TO_VALUE_LOSS);
    if (this.population < 1) this.population = 1;
    this.military -= (delta / SECONDS_TO_VALUE_LOSS);
    if (this.military < 1) this.military = 1;
  }

  addRoute(start: Tile, end: Tile, commodity: CommodityId): void {
    const route = new Route(start, end, commodity, this);
    this.routes.push(route);
  }

  removeRoute(route: Route): void {
    remove(this.routes, route);
  }

  deliver(id: CommodityId) {
    const commodity = commodities[id];

    if (commodity.military && !this.lockMilitary) {
      this.deliverMilitary(commodity);
    }

    if (commodity.population && !this.lockPopulation) {
      this.deliverPopulation(commodity);
    }
  }

  private deliverMilitary(commodity: AnyCommodity) {
    const count = this.militaryDeliveries.reduce(
      (count, id) => id === commodity.id ? count + 1 : count, 0);
    const percentage = count / this.militaryDeliveries.length;
    const overUseModifier = 0.5 + (1 - percentage) / 2;

    const growthModifier = calculateGrowthModifier(this.militaryDeliveries.length);

    this.military += commodity.military! * overUseModifier * growthModifier;
    this.militaryDeliveries.push(commodity.id);
    if (this.militaryDeliveries.length > 100) {
      this.militaryDeliveries.shift();
    }
  }

  private deliverPopulation(commodity: AnyCommodity) {
    const count = this.populationDeliveries.reduce(
      (count, id) => id === commodity.id ? count + 1 : count, 0);
    const percentage = count / this.populationDeliveries.length;
    const overUseModifier = 0.5 + (1 - percentage) / 2;

    const growthModifier = calculateGrowthModifier(this.populationDeliveries.length);

    this.population += commodity.population! * overUseModifier * growthModifier;
    this.populationDeliveries.push(commodity.id);
    if (this.populationDeliveries.length > 100) {
      this.populationDeliveries.shift();
    }
  }
}

function calculateGrowthModifier(x: number) {
  const mod = clamp(Math.cos(x * Math.PI / 100) / 2 + 0.5, 0, 1);
  return 0.5 + mod / 2;
}