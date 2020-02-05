import "./index.css";
import "./custom.css";
import { tag } from "pura/framework";
import { InterfaceComponent } from "./InterfaceComponent";
import { Selector } from "./shared/Selector";
import { CommodityEditor } from "./editor/CommodityEditor";

import { config, Config } from '../data/Config';

enum EditorStatus {
  IS_FULL_SCREEN = "--is-full-screen",
  IS_OPEN = "--is-open",
  IS_CLOSED = "--is-closed",
}

const enum EditorView {
  ENTITY = "--entity",
  SCENARIO = "--scenario",
}

const enum EntityType {
  TERRAIN = "Terrain",
  COMMODITY = "Commodity",
  PRODUCTION_LINE = "ProductionLine",
  DISTRICT_TYPE = "DistrictType",
}

interface AppState {
  editorStatus: EditorStatus;
  editorView: EditorView;
  entityType: EntityType;
  config: Config;
}

class App extends InterfaceComponent<AppState> {
  element = document.createElement("section");

  entityTypeSelector = new Selector<EntityType>(
    'Entity type',
    [
      EntityType.TERRAIN,
      EntityType.COMMODITY,
      EntityType.PRODUCTION_LINE,
      EntityType.DISTRICT_TYPE,
    ],
    EntityType.TERRAIN,
  );

  commodityEditor = new CommodityEditor({ id: '', population: 0, military: 0 });

  constructor() {
    super({
      editorStatus: EditorStatus.IS_OPEN,
      editorView: EditorView.ENTITY,
      entityType: EntityType.COMMODITY,
      config: Object.assign({}, config),
    });

    this.entityTypeSelector.changes.subscribe(entityType => this.state.merge({ entityType }));
  }

  build({ editorStatus, editorView, entityType }) {
    return tag`
      <section id="Editor" class="${editorStatus}">
        <div class="bar">
          <button onClick="${() => this.state.merge({ editorStatus: EditorStatus.IS_CLOSED })}">
            Close
          </button>
          <button onClick="${() => this.state.merge({ editorStatus: EditorStatus.IS_FULL_SCREEN })}">
            Full Screen
          </button>
          <button onClick="${() => this.state.merge({ editorStatus: EditorStatus.IS_OPEN })}">
            Open
          </button>
        </div>
        <div class="bar">
          <button onClick="${() => this.state.merge({ editorView: EditorView.ENTITY })}">
            Entity
          </button>
          <button onClick="${() => this.state.merge({ editorView: EditorView.SCENARIO })}">
            Scenario
          </button>
        </div>
        <div id="EditorContent" class="${editorView}">
          <div class="Entity">
            <h3>Entity Editor</h3>
            ${this.entityTypeSelector.element}
            ${this.commodityEditor.element}
          </div>
          <div class="Scenario">
            <h3>Scenario Editor</h3>
          </div>
        </div>
      </section>
    </body>
    `;
  }
}

const app = new App();
document.body.appendChild(app.element);
