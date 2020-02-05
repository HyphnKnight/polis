import { SpotLight, SpotLightHelper, HemisphereLight, MeshLambertMaterial, Face3, Scene, PointLightHelper, PointLight, PerspectiveCamera, Vector3, WebGLRenderer, BoxGeometry, Mesh, MeshBasicMaterial, Geometry } from 'three';
import { generateGrid, Hex, hexToVector2d, getNeighborsGrid } from 'pura/hex';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var spotLight = new SpotLight(),
  spotLightHelper = new SpotLightHelper(spotLight);
spotLight.add(spotLightHelper);
scene.add(spotLight);
var light = new PointLight(0xff0000, 1, 200);
light.position.set(0, 0, 5);
const pointLightHelper = new PointLightHelper(light);
light.add(pointLightHelper);
scene.add(light);


// set position of spotLight,
// and helper bust be updated when doing that
spotLight.position.set(-20, -20, 20);
spotLight.lookAt(new Vector3());
spotLightHelper.update();

camera.position.y = -10;
camera.position.z = 15;
camera.lookAt(new Vector3())

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const grid = generateGrid(40);


function createTerrainGraph(grid: Hex[][]): TerrainGraph {
  const nodes = new Map<Hex, TerrainGraphNode>();
  const edges = new Map<Hex, Edge[]>();
  const getNeighbors = getNeighborsGrid(grid);
  grid.forEach(row => {
    row.forEach(hex => {
      nodes.set(hex, { height: 0 });
    });
  });
  grid.forEach(row => {
    row.forEach(hex => {
      edges.set(hex, [
        ...getNeighbors(hex).map(nHex => ({
          start: nodes.get(hex),
          end: nodes.get(nHex),
          value: 0,
        }),
      ]);
    });
  });

}

interface TerrainGraph {
  nodes: TerrainGraphNode[];
  edges: Edge[];
}

interface Edge {
  start: TerrainGraphNode,
  end: TerrainGraphNode,
  value: number;
}

interface TerrainGraphNode {
  height: number;
}

const seed: [number[], number[], number[]] = [
  [],
  [],
  [],
];

for (let i = 0; i < 1000; ++i) {
  if (Math.random() < .025) {
    seed[0].push(i);
  }
  if (Math.random() < .025) {
    seed[1].push(i);
  }
  if (Math.random() < .025) {
    seed[2].push(i);
  }
}

function generateHeight(hex: Hex): number {
  let height = 0;
  if (hex[0]) {
    seed[0].forEach((i, index, array) => {
      height += Math.sin(i * hex[0] + array[i - 1] || 0) / (index + 1);
    });
  }
  if (hex[1]) {
    seed[1].forEach((i, index, array) => {
      height += Math.sin(i * hex[1] + array[i - 1] || 0) / (index + 1);
    });
  }
  if (hex[2]) {
    seed[2].forEach((i, index, array) => {
      height += Math.sin(i * hex[2] + array[i - 1] || 0) / (index + 1);
    });
  }
  return height / 2;
}

function generateGeometryFromGrid(grid: Hex[][]): Geometry {
  const geometry = new Geometry();
  const indexMap = new Map<Hex, number>();
  const vertexMap = new Map<Hex, Vector3>();

  function createHexIndex(hex: Hex) {
    const [x, y] = hexToVector2d(hex);
    const vec = new Vector3(x, y, generateHeight(hex));
    const index = geometry.vertices.push(vec) - 1;
    vertexMap.set(hex, vec);
    indexMap.set(hex, index);
  }

  for (let y = 0; y < grid.length; ++y) {
    const row = grid[y];
    for (let x = 0; x < row.length; ++x) {
      const hex = grid[y][x];
      if (!indexMap.has(hex)) {
        createHexIndex(hex);
      }


      if (y < Math.ceil(grid.length / 2)) {
        if (grid[y][x + 1] &&
          grid[y - 1] &&
          grid[y - 1][x]) {
          const nextHex = grid[y - 1][x];
          const hexBelow = grid[y][x + 1];
          if (!indexMap.has(nextHex)) {
            createHexIndex(nextHex);
          }
          if (!indexMap.has(hexBelow)) {
            createHexIndex(hexBelow);
          }
          geometry.faces.push(new Face3(
            indexMap.get(hex),
            indexMap.get(nextHex),
            indexMap.get(hexBelow),
          ));
        }
      } else {
        if (grid[y][x + 1] &&
          grid[y - 1] &&
          grid[y - 1][x + 1]) {
          const nextHex = grid[y - 1][x + 1];
          const hexBelow = grid[y][x + 1];
          if (!indexMap.has(nextHex)) {
            createHexIndex(nextHex);
          }
          if (!indexMap.has(hexBelow)) {
            createHexIndex(hexBelow);
          }
          geometry.faces.push(new Face3(
            indexMap.get(hex),
            indexMap.get(nextHex),
            indexMap.get(hexBelow),
          ));
        }
      }
      if (y < Math.ceil(grid.length / 2) - 1) {
        if (grid[y + 1] &&
          grid[y][x + 1] &&
          grid[y + 1][x + 1]) {
          const nextHex = grid[y][x + 1];
          const hexBelow = grid[y + 1][x + 1];
          if (!indexMap.has(nextHex)) {
            createHexIndex(nextHex);
          }
          if (!indexMap.has(hexBelow)) {
            createHexIndex(hexBelow);
          }
          geometry.faces.push(new Face3(
            indexMap.get(hex),
            indexMap.get(nextHex),
            indexMap.get(hexBelow),
          ));
        }
      } else {
        if (grid[y + 1] &&
          grid[y][x + 1] &&
          grid[y + 1][x]) {
          const nextHex = grid[y][x + 1];
          const hexBelow = grid[y + 1][x];
          if (!indexMap.has(nextHex)) {
            createHexIndex(nextHex);
          }
          if (!indexMap.has(hexBelow)) {
            createHexIndex(hexBelow);
          }
          geometry.faces.push(new Face3(
            indexMap.get(hex),
            indexMap.get(nextHex),
            indexMap.get(hexBelow),
          ));
        }
      }
    }
  }

  geometry.verticesNeedUpdate = true;
  geometry.elementsNeedUpdate = true;
  geometry.normalsNeedUpdate = true;
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  geometry.computeBoundingBox();

  return geometry;
}

const material = new MeshLambertMaterial({
  color: 0x00afaf,
  emissive: 0x2a2a2a,
  emissiveIntensity: .5,
});

const geometry = generateGeometryFromGrid(grid);
const map = new Mesh(geometry, material);
map.castShadow = true;
map.receiveShadow = true;

const animate = function () {
  requestAnimationFrame(animate);

  scene.add(map);

  map.rotation.z += 0.01;

  renderer.render(scene, camera);
};

animate();

