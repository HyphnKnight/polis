import { map } from '../../array';
import { tag } from '../html';
import { render } from '../render';
import { uniqueId } from '../../string';
import { isString } from '../../is/type';
export const createTextInput = (initConfig) => {
    const element = document.createElement('field-set');
    const id = uniqueId();
    const config = Object.assign({}, initConfig);
    return (props) => {
        Object.assign(config, initConfig, props);
        return render(tag `
        <field-set class="--text">
          <label for="${id}" >${config.label}</label>
          <input
            id="${id}"
            type="text"
            disabled="${config.disabled || false}"
            placeholder="${config.placeholder || ''}"
            autocomplete="${config.autocomplete || 'none'}"
            value="${config.value}"
            oninput="${event => config.onInput(event.target.value)}"
          />
        </field-set>
      `, element);
    };
};
export const createNumberInput = (initConfig) => {
    const element = document.createElement('field-set');
    const id = uniqueId();
    const config = Object.assign({ type: 'number' }, initConfig);
    return (props) => {
        Object.assign(config, initConfig, props);
        return render(tag `
        <field-set class="--${config.type}">
          <label for="${id}" >${config.label}</label>
          <input
            id="${id}"
            type="${config.type}"
            disabled="${config.disabled || false}"
            placeholder="${config.placeholder || ''}"
            min="${config.min || 0}"
            max="${config.max || 100}"
            step="${config.step || 1}"
            value="${config.value}"
            oninput="${event => config.onInput(Number(event.target.value))}"
          />
        </field-set>
      `, element);
    };
};
export const createPasswordInput = (initConfig) => {
    const element = document.createElement('field-set');
    const id = uniqueId();
    const config = Object.assign({}, initConfig);
    return (props) => {
        Object.assign(config, initConfig, props);
        return render(tag `
        <field-set class="--password">
          <label for="${id}" >${config.label}</label>
          <input
            id="${id}"
            type="password"
            disabled="${config.disabled || false}"
            autocomplete="${config.autocomplete || 'none'}"
            placeholder="${config.placeholder || ''}"
            value="${config.value}"
            oninput="${event => config.onInput(event.target.value)}"
          />
        </field-set>
      `, element);
    };
};
export const createSearchInput = (initConfig) => {
    const element = document.createElement('field-set');
    const id = uniqueId();
    const config = Object.assign({}, initConfig);
    return (props) => {
        Object.assign(config, initConfig, props);
        return render(tag `
        <field-set class="--search">
          <label for="${id}" >${config.label}</label>
          <input
            id="${id}"
            list="${`list_${id}`}"
            type="search"
            disabled="${config.disabled || false}"
            placeholder="${config.placeholder || ''}"
            autocomplete="${config.autocomplete || 'none'}"
            value="${config.value}"
            oninput="${event => config.onInput(event.target.value)}"
          />
          ${!!config.options ? tag `<datalist id="${`list_${id}`}">
            ${map(config.options || [], (option) => tag `<option value="${option}" />`)}
          </datalist>` : null}
        </field-set>
      `, element);
    };
};
export const createCheckbox = (initConfig) => {
    const element = document.createElement('field-set');
    const id = uniqueId();
    const config = Object.assign({}, initConfig);
    return (props) => {
        Object.assign(config, initConfig, props);
        return render(tag `
        <field-set class="--checkbox">
          <label for="${id}" >${config.label}</label>
          <input
            id="${id}"
            type="checkbox"
            disabled="${config.disabled || false}"
            checked="${config.value}"
            onchange="${() => config.onInput(!config.value)}"
          />
        </field-set>
      `, element);
    };
};
const createRadioButton = (label, name) => {
    const element = document.createElement('li');
    const id = uniqueId();
    return (config) => render(tag `
        <li>
          <label for="${id}" >${label}</label>
          <input
            id="${id}"
            type="radio"
            name="${name}"
            disabled="${config.disabled || false}"
            checked="${config.value === label}"
            onchange="${() => config.onInput(label)}"
          />
        </li>
      `, element);
};
export const createRadioInput = (initConfig) => {
    const element = document.createElement('field-set');
    const config = Object.assign({}, initConfig);
    const name = `name_${uniqueId}`;
    const options = map(config.options, (option) => createRadioButton(option, name));
    return (props) => {
        Object.assign(config, initConfig, props);
        return render(tag `
        <field-set class="--radio">
          <ul>
            ${map(options, (create) => create(config))}
          </ul>
        </field-set>
      `, element);
    };
};
const createSelectItem = (value) => (option) => {
    if (isString(option)) {
        return tag `
          <option
            value="${option}"
            selected="${value ? value === option : false}"
          >${option}</option>`;
    }
    else {
        return tag `
          <optgroup
            label="${option.label}"
            disabled="${option.disabled || false}">
            ${map(option.options, createSelectItem(value))}
          </optgroup>
        `;
    }
};
export const createSelectInput = (initConfig) => {
    const element = document.createElement('field-set');
    const id = uniqueId();
    const config = Object.assign({}, initConfig);
    return (props) => {
        Object.assign(config, initConfig, props);
        return render(tag `
        <field-set class="--select">
          <label for="${id}">${config.label}</label>
          <select
            id="${id}"
            value="${config.value}"
            disabled="${config.disabled || false}"
            oninput="${event => config.onInput(event.target.value)}"
            >
            ${map(config.options, createSelectItem(config.value))}
          </select>
        </field-set>
      `, element);
    };
};
export const createButton = (initConfig) => {
    const element = document.createElement('button');
    const config = Object.assign({}, initConfig);
    return (props) => {
        Object.assign(config, initConfig, props);
        return render(tag `
        <button
          disabled="${config.disabled}"
          onclick="${config.onInput}"
        >${config.label}</button>
      `, element);
    };
};
