import { renderToBody, tag } from "pura/framework";
import { CommodityEditor } from "./CommodityEditor";

const commodityEditor = new CommodityEditor();

renderToBody(tag`
<body>
  <h1>Editor</h1>
  ${commodityEditor.element}
</body>
`);