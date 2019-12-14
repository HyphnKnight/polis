import { distanceFromTo } from "../pura/hex";
import { hexPathTo } from "../pura/hex/path";
import { commodities, CommodityId } from "./Commodity";
import { DistrictDataId } from "./District";
import { Scenario } from "./Scenario";
import { terrainTypes } from "./Terrain";
import { Tile } from "./Tile";


export class Route {
  readonly calcHexPath = hexPathTo((_c, neighbor) => {
    const tile = this.scenario.tiles.get(neighbor)!;
    return terrainTypes[tile.terrain].movementModifier;
  }, distanceFromTo);

  readonly path: Tile[];

  readonly caravan: Caravan;

  constructor(
    readonly start: Tile,
    readonly end: Tile,
    readonly commodity: CommodityId,
    readonly scenario: Scenario,
  ) {
    const hexPath = this.calcHexPath(this.start.hex, this.end.hex);
    this.path = hexPath ? hexPath.map(hex => this.scenario.tiles.get(hex)!) : [];
    if (!hexPath) this.scenario.removeRoute(this);
    this.caravan = new Caravan(this);
  }

  update(delta: number) {
    if (!this.end.district) this.scenario.removeRoute(this);
    this.caravan.update(delta);
  }

  obstructed() {
    this.scenario.removeRoute(this)
  }

  complete() {
    if (this.end.district!.kind === DistrictDataId.TownCenter) {
      this.scenario.deliver(this.commodity);
    } else {
      this.end.district!.storeCommodity(this.commodity);
    }

    if (!this.start.district) this.scenario.removeRoute(this);
  }

  static isValidEndOfRoute(end: Tile, id: CommodityId): boolean {
    if (!end.district) return false

    if (end.district.kind === DistrictDataId.TownCenter) {
      const commodity = commodities[id];
      return !!commodity.military || !!commodity.population;
    }

    return end.district.acceptableInputs.includes(id);
  }

  static isValidRoute(start: Tile, end: Tile, id: CommodityId): boolean {
    if (!start.district) return false
    if (!start.district.districtData.produces) return false;
    if (start.district.districtData.produces.includes(id)) return false;

    return Route.isValidEndOfRoute(end, id);
  }
}

export class Caravan {
  progress = 0;

  get start() {
    return this.route.start;
  }

  get end() {
    return this.route.end;
  }

  constructor(
    readonly route: Route,
  ) { }

  update(delta: number) {
    const currentTile = this.route.path[Math.floor(this.progress)];

    if (this.progress === 0) {
      if (this.start.district!.storage![this.route.commodity]! > 0) {
        this.start.district!.storage![this.route.commodity]! -= 1;
      } else {
        return;
      }
    }

    const currentTerrain = terrainTypes[currentTile.terrain];
    const movement = delta * currentTerrain.movementModifier;
    this.progress += movement;

    if (this.progress >= this.route.path.length) {
      this.route.complete();
      this.progress = 0;
    }

    const nextTile = this.route.path[Math.floor(this.progress)];
    if (!nextTile.district) {
      this.route.obstructed();
    }
  }
}


