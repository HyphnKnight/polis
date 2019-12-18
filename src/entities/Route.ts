import { distanceFromTo } from "../pura/hex";
import { hexPathTo } from "../pura/hex/path";
import { commodities, CommodityId } from "./Commodity";
import { DistrictDataId } from "./District";
import { Scenario } from "./Scenario";
import { terrainTypes, TerrainId } from "./Terrain";
import { Tile } from "./Tile";


// How much of a single resource and a district store.
const STORAGE_MAXIMUM = 10;

/**
 * Should handle:
 * waiting to deliver when storage is full
 * if a district is placed on the route`
 */
export class Route {
  readonly calcHexPath = hexPathTo((_c, neighbor) => {
    const tile = this.scenario.tiles.get(neighbor)!;
    if (!!tile.district) return Infinity;
    return -tile.terrain.movementModifier;
  }, distanceFromTo);

  readonly path: Tile[];

  readonly caravan: Caravan;

  readonly travelLength: number;

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
    this.travelLength = this.path.length * 1000;
  }

  update(delta: number) {
    if (!this.end.district) this.scenario.removeRoute(this);
    this.caravan.update(delta);
  }

  obstructed() {
    this.scenario.removeRoute(this)
  }

  complete() {
    if (this.end.district!.id === DistrictDataId.TownCenter) {
      this.scenario.deliver(this.commodity);
    } else {
      this.end.district!.storeCommodity(this.commodity);
    }

    if (!this.start.district) this.scenario.removeRoute(this);
  }

  static isTileObstructed(tile: Tile): boolean {
    if (tile.terrain.movementModifier === 0) return true;
    if (tile.district) return true;
  }

  static isValidEndOfRoute(end: Tile, id: CommodityId): boolean {
    if (!end.district) return false

    if (end.district.id === DistrictDataId.TownCenter) {
      const commodity = commodities[id];
      return !!commodity.military || !!commodity.population;
    }

    return end.district.acceptableInputs.includes(id);
  }

  static isValidRoute(start: Tile, end: Tile, id: CommodityId): boolean {
    if (!start.district) return false
    if (!start.district.data.produces) return false;
    if (start.district.data.produces.includes(id)) return false;

    return Route.isValidEndOfRoute(end, id);
  }
}


export const enum CaravanState {
  Traveling,
  WaitingForPickup,
  WaitingToDeliver,
}

export class Caravan {
  progress = 0;

  state: CaravanState = CaravanState.WaitingForPickup;

  get start() {
    return this.route.start;
  }

  get end() {
    return this.route.end;
  }

  get currentTileIndex(): number {
    if (this.progress === 0) {
      return 0
    }
    return Math.ceil(this.progress / 1000) - 1;
  }

  get currentTile(): Tile {
    return this.route.path[this.currentTileIndex];
  }

  get nextTile(): Tile | undefined {
    return this.route.path[this.currentTileIndex + 1];
  }

  constructor(readonly route: Route) { }

  private updatePosition(delta: number) {
    const currentTile = this.route.path[Math.floor(this.progress / 1000)];

    const movement = delta * currentTile.terrain.movementModifier;

    this.progress = Math.min(this.progress + movement, this.route.travelLength);
  }

  // Returns false if cargo pick up was unsuccessful.
  private tryToPickUpCargo(): boolean {
    if (this.start.district!.storage![this.route.commodity]! > 0) {
      this.start.district!.storage![this.route.commodity]! -= 1;
      return true;
    }

    return false;
  }

  // Returns false if cargo drop off was unsuccessful.
  private tryToDropOffCargo(): boolean {
    if (this.start.district!.storage![this.route.commodity]! < STORAGE_MAXIMUM) {
      this.route.complete();
      this.progress = 0;
      return true;
    }

    return false;
  }

  update(delta: number) {
    if (this.progress === 0) {
      const didPickUpCargo = this.tryToPickUpCargo();
      if (!didPickUpCargo) return;
    }

    this.updatePosition(delta);

    if (this.progress >= this.route.travelLength) {
      const didDropOffCargo = this.tryToDropOffCargo();
      if (!didDropOffCargo) return;
    }

    if (Route.isTileObstructed(this.nextTile)) {
      this.route.obstructed();
    }
  }
}


