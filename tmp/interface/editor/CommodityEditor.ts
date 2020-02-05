import { InterfaceComponent } from "../InterfaceComponent";
import { tag } from "pura/framework";



interface State {
  id: string,
  population: number,
  military: number,
}

export class CommodityEditor extends InterfaceComponent<State>{
  element = document.createElement("div");


  build({ id, population, military }) {
    return tag`
    <div class="CommodityEditor">
      <div class="bar">
        <label for="CommodityIdEditor">Commodity Id</label>
        <input id="CommodityIdEditor"
            type="text"
            onChange="${evt => this.state.merge({ id: this.getValueFromEvent(evt) })}"
            value="${id}" />
      </div>
      <div class="bar">
        <label for="PopulationEditor">Population</label>
        <input id="PopulationEditor"
            type="number"
            min="0"
            onChange="${evt => this.state.merge({ population: Number(this.getValueFromEvent(evt)) })}"
            value="${population}" />
      </div>
      <div class="bar">
        <label for="MilitaryEditor">Military</label>
        <input id="MilitaryEditor"
            type="number"
            min="0"
            onChange="${evt => this.state.merge({ military: Number(this.getValueFromEvent(evt)) })}"
            value="${military}" />
      </div>
    </div>
    `;
  }

}