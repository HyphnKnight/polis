import { InterfaceComponent } from '../../shared/InterfaceComponent';
import { CommodityId, commodities, Commodity } from '../../entities/commodities';
import { tag } from 'pura/framework';


interface CommodityData {
  selectedId: string;
  commodityIds: string[];
  commodityList: Commodity[];
  commodities: typeof commodities;
}

export class CommodityEditor extends InterfaceComponent<CommodityData> {
  element = document.createElement('section');

  constructor() {
    super({
      commodities,
      selectedId: Object.keys(commodities)[0],
      commodityIds: Object.keys(commodities),
      commodityList: Object.values(commodities),
    });
  }

  private copyCommoditiesFile() {
    const { commodityList: commodityListUnsorted } = this.state.getValue();
    const commodityList = commodityListUnsorted
      .sort((a, b) => a.id > b.id ? 1 : -1);
    const fileContents = 'export const enum CommodityId {\n'
      + commodityList.map(({ id }) => `  ${id} = "${id}",\n`).join('')
      + '}\n'
      + '\n'
      + 'export interface Commodity {\n'
      + '  readonly id: CommodityId;\n'
      + '  readonly population: number;\n'
      + '  readonly military: number;\n'
      + '}\n'
      + '\n'
      + 'export type CommodityStore = {\n'
      + '  [Id in CommodityId]?: number;\n'
      + '}\n'
      + '\n'
      + 'export const commodities: { readonly [Id in CommodityId]: Commodity; } = {\n'
      + commodityList.map(({ id, population, military }) =>
        `  [CommodityId.${id}]: {\n` +
        `    id: CommodityId.${id},\n` +
        `    population: ${population},\n` +
        `    military: ${military},\n` +
        '  },\n'
      ).join('')
      + '}';
    navigator.clipboard.writeText(fileContents);
    //console.log(fileContents);
  }
  private createOptionTags(ids: string[]) {
    return ids.map(
      (id) => tag`<option value="${id}">${id}</option>`);
  }

  private setSelectedId = (evt: Event) => {
    this.state.merge({ selectedId: this.getValueFromEvent<string>(evt) });
  };

  private createNewCommodity(id: string) {
    const adjustedId = id.toUpperCase().replace(/\s/, '_');
    const commodityIds = this.state.getValue().commodityIds;
    const commodityList = this.state.getValue().commodityList;
    commodityIds.push(adjustedId);
    const commodity = {
      id: adjustedId as CommodityId,
      military: 0,
      population: 0,
    };
    commodityList.push(commodity);
    commodities[adjustedId] = commodity;
    this.state.merge({ selectedId: adjustedId, commodityList, commodityIds });
  }

  private updateMilitary =
    (id: string) =>
      (evt: Event) => {
        const { commodities } = this.state.getValue();
        commodities[id].military = this.getValueFromEvent<number>(evt);
        this.state.merge({ commodities });
      };

  private updatePopulation =
    (id: string) =>
      (evt: Event) => {
        const { commodities } = this.state.getValue();
        commodities[id].population = this.getValueFromEvent<number>(evt);
        this.state.merge({ commodities });
      };

  private buildEditor(state: CommodityData) {
    const commodity = state.commodities[state.selectedId];
    return tag`
    <div>
      <h3>${commodity.id}</h3>
      <label>Population</label>
      <input type="number"
        onChange="${this.updatePopulation(commodity.id)}"
        value="${commodity.population}"
        min="0"
        max="255" />
      <label>Military</label>
      <input type="number"
        onChange="${this.updateMilitary(commodity.id)}"
        value="${commodity.military}"
        min="0"
        max="255" />
    </div>
    `;
  }

  private buildCreateNewButton(state: CommodityData) {
    const id = state.selectedId;
    return tag`
    <button disabled="${state.selectedId.length === 0}"
        onClick="${() => this.createNewCommodity(id)}" >
      Create New Commodity Named ${id}
    </button>
    `;
  }

  build(state) {
    return tag`
    <section>
      <h2>Commodity Editor</h2>
      <div class="row">
        <label>CommodityId</label>
        <input type="search"
          value="${state.selectedId}"
          list="CommodityIds"
          onChange="${this.setSelectedId}" />
        <datalist id="CommodityIds">
        ${this.createOptionTags(state.commodityIds)}
        </datalist>
      </div>
      <div>
      ${!!state.commodities[state.selectedId]
        ? this.buildEditor(state)
        : this.buildCreateNewButton(state)}
      </div>
      <div class="row">
        <button onClick="${() => this.copyCommoditiesFile()}">
          Copy commodities.ts
        </button> 
      </div>
    </section>
    `;
  }
}
