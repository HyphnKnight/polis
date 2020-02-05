import { InterfaceComponent } from "../InterfaceComponent";
import { tag } from "pura/framework";
import { Subject, filter, map } from "pura/reactive";


export class Selector<Value> extends InterfaceComponent<{ selected: Value | null }> {
  element = document.createElement('div');

  private cssId = `Selector_${this.id}`;
  private valueMap = new Map<string, Value>();

  changes = this.state.pipe(map(({ selected }) => selected));

  constructor(
    readonly label: string,
    readonly content: Value[],
    initialSelection: Value | null,
    readonly createText: (value: Value) => string = x => String(x)
  ) {
    super({ selected: initialSelection });
    content.forEach(value => {
      this.valueMap.set(
        createText(value),
        value,
      );
    });
  }

  onChange = (evt: Event) => {
    const text = (evt.target as unknown as { value: string }).value;
    this.state.merge({
      selected: this.valueMap.get(text)
    });
  };

  build({ selected }) {
    return tag`
    <div id="${this.cssId}" class="bar">
      <label for="${this.cssId + '_select'}">
        ${this.label}:
      </label>
      <select name="${this.label}"
          id="${this.cssId + '_select'}"
          onChange="${this.onChange}">
      ${
      Array.from(this.valueMap.entries()).map(([text, value]) => tag`
        <option
            selected="${value === selected}"
            value="${text}">
          ${text}
        </option>
      `)
      }
      </select>
    </div>
    `;
  }
}
