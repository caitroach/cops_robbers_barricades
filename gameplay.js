
// function makeGraph(nodes, edges) {
//   // nodes: [{id, x, y}]  x/y in [0,1] relative coords
//   // edges: [[a, b], ...]
//   const adj = {};
//   nodes.forEach(n => (adj[n.id] = []));
//   edges.forEach(([a, b]) => {
//     adj[a].push(b);
//     adj[b].push(a);
//   });
//   return { nodes, edges, adj };
// }
// claude made this but i like the python version better. it outputs a json that we load into this file.
// const GRAPHS = {

//   path5: {
//     label: "Path P₅",
//     desc: "Path on 5 vertices. Requires ⌈6/6⌉ = 1 cop in the local barricade variant.",
//     build() {
//       const nodes = Array.from({ length: 5 }, (_, i) => ({ id: i, x: 0.1 + i * 0.2, y: 0.5 }));
//       const edges = Array.from({ length: 4 }, (_, i) => [i, i + 1]);
//       return makeGraph(nodes, edges);
//     },
//   },

//   path7: {
//     label: "Path P₇",
//     desc: "Path on 7 vertices. Requires ⌈8/6⌉ = 2 cops (local barricade variant).",
//     build() {
//       const nodes = Array.from({ length: 7 }, (_, i) => ({ id: i, x: 0.05 + i * 0.15, y: 0.5 }));
//       const edges = Array.from({ length: 6 }, (_, i) => [i, i + 1]);
//       return makeGraph(nodes, edges);
//     },
//   },

//   path12: {
//     label: "Path P₁₂",
//     desc: "Path on 12 vertices. Requires ⌈13/6⌉ = 3 cops (local). A stress test for cop placement.",
//     build() {
//       const nodes = Array.from({ length: 12 }, (_, i) => ({ id: i, x: 0.03 + i * 0.088, y: 0.5 }));
//       const edges = Array.from({ length: 11 }, (_, i) => [i, i + 1]);
//       return makeGraph(nodes, edges);
//     },
//   },

//   cycle5: {
//     label: "Cycle C₅",
//     desc: "5-cycle. Requires ⌈5/6⌉ = 1 cop (local). Discussed as a base case for odd cycles.",
//     build() {
//       const nodes = Array.from({ length: 5 }, (_, i) => {
//         const a = (2 * Math.PI * i) / 5 - Math.PI / 2;
//         return { id: i, x: 0.5 + 0.36 * Math.cos(a), y: 0.5 + 0.36 * Math.sin(a) };
//       });
//       const edges = Array.from({ length: 5 }, (_, i) => [i, (i + 1) % 5]);
//       return makeGraph(nodes, edges);
//     },
//   },

//   cycle6: {
//     label: "Cycle C₆",
//     desc: "6-cycle (even). Requires ⌈6/6⌉ = 1 cop. Local and global variants agree here.",
//     build() {
//       const nodes = Array.from({ length: 6 }, (_, i) => {
//         const a = (2 * Math.PI * i) / 6 - Math.PI / 2;
//         return { id: i, x: 0.5 + 0.36 * Math.cos(a), y: 0.5 + 0.36 * Math.sin(a) };
//       });
//       const edges = Array.from({ length: 6 }, (_, i) => [i, (i + 1) % 6]);
//       return makeGraph(nodes, edges);
//     },
//   },

//   cycle12: {
//     label: "Cycle C₁₂",
//     desc: "12-cycle. Requires ⌈12/6⌉ = 2 cops (local barricade variant).",
//     build() {
//       const nodes = Array.from({ length: 12 }, (_, i) => {
//         const a = (2 * Math.PI * i) / 12 - Math.PI / 2;
//         return { id: i, x: 0.5 + 0.4 * Math.cos(a), y: 0.5 + 0.4 * Math.sin(a) };
//       });
//       const edges = Array.from({ length: 12 }, (_, i) => [i, (i + 1) % 12]);
//       return makeGraph(nodes, edges);
//     },
//   },

//   caterpillar: {
//     label: "Caterpillar tree",
//     desc: "A tree with all nodes within distance 1 of a central spine. Trees of height ≤ 2 are barricade-cop-win.",
//     build() {
//       const nodes = [
//         { id: 0,  x: 0.15, y: 0.5 }, { id: 1,  x: 0.3,  y: 0.5 },
//         { id: 2,  x: 0.5,  y: 0.5 }, { id: 3,  x: 0.7,  y: 0.5 },
//         { id: 4,  x: 0.85, y: 0.5 },
//         { id: 5,  x: 0.15, y: 0.27 }, { id: 6,  x: 0.3,  y: 0.27 },
//         { id: 7,  x: 0.3,  y: 0.73 }, { id: 8,  x: 0.5,  y: 0.27 },
//         { id: 9,  x: 0.5,  y: 0.73 }, { id: 10, x: 0.7,  y: 0.27 },
//         { id: 11, x: 0.85, y: 0.27 }, { id: 12, x: 0.85, y: 0.73 },
//       ];
//       const edges = [
//         [0,1],[1,2],[2,3],[3,4],
//         [0,5],[1,6],[1,7],[2,8],[2,9],[3,10],[4,11],[4,12],
//       ];
//       return makeGraph(nodes, edges);
//     },
//   },

// //   spider: {
// //     label: "spider S(2,2,3)",
// //     desc: "spider graph with legs of lengths 2, 2, 3. tests barricade strategies on asymmetric trees..",
// //     build() {
// //       const nodes = [{ id: 0, x: 0.5, y: 0.5 }];
// //       const edges = [];
// //       let id = 1;
// //       const legs = [
// //         { len: 2, angle: -Math.PI / 2 },
// //         { len: 2, angle: Math.PI / 6 },
// //         { len: 3, angle: (5 * Math.PI) / 6 },
// //       ];
// //       legs.forEach(({ len, angle }) => {
// //         let prev = 0;
// //         for (let i = 1; i <= len; i++) {
// //           const x = 0.5 + (i / 3.8) * 0.38 * Math.cos(angle);
// //           const y = 0.5 + (i / 3.8) * 0.38 * Math.sin(angle);
// //           nodes.push({ id, x, y });
// //           edges.push([prev, id]);
// //           prev = id++;
// //         }
// //       });
// //       return makeGraph(nodes, edges);
// //     },
// //   },

//   tall_tree: {
//     label: "Tall tree (height 3)",
//     desc: "A tree of height 3. Height > 2 trees are NOT barricade-cop-win with 1 cop — a key result in Chapter 2.",
//     build() {
//       const nodes = [];
//       const edges = [];
//       let id = 0;
//       function place(depth, x, y, spread) {
//         const me = id++;
//         nodes.push({ id: me, x, y });
//         if (depth < 3) {
//           const l = id; place(depth + 1, x - spread, y + 0.22, spread / 2);
//           const r = id; place(depth + 1, x + spread, y + 0.22, spread / 2);
//           edges.push([me, l], [me, r]);
//         }
//       }
//       place(1, 0.5, 0.1, 0.22);
//       return makeGraph(nodes, edges);
//     },
//   },

//   complete4: {
//     label: "complete K₄",
//     desc: "complete graph on 4 vertices. see pg.6.",
//     build() {
//       const nodes = Array.from({ length: 4 }, (_, i) => {
//         const a = (2 * Math.PI * i) / 4 - Math.PI / 4;
//         return { id: i, x: 0.5 + 0.35 * Math.cos(a), y: 0.5 + 0.35 * Math.sin(a) };
//       });
//       const edges = [];
//       for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) edges.push([i, j]);
//       return makeGraph(nodes, edges);
//     },
//   },

//   petersen: {
//     label: "Petersen graph",
//     desc: "Cop number 2 classically. A recurring counterexample in Meger's thesis — barricade behaviour here is subtle.",
//     build() {
//       const nodes = [];
//       for (let i = 0; i < 5; i++) {
//         const a = (2 * Math.PI * i) / 5 - Math.PI / 2;
//         nodes.push({ id: i,   x: 0.5 + 0.38 * Math.cos(a), y: 0.5 + 0.38 * Math.sin(a) });
//       }
//       for (let i = 0; i < 5; i++) {
//         const a = (2 * Math.PI * i) / 5 - Math.PI / 2;
//         nodes.push({ id: 5+i, x: 0.5 + 0.18 * Math.cos(a), y: 0.5 + 0.18 * Math.sin(a) });
//       }
//       const edges = [
//         [0,1],[1,2],[2,3],[3,4],[4,0],
//         [0,5],[1,6],[2,7],[3,8],[4,9],
//         [5,7],[7,9],[9,6],[6,8],[8,5],
//       ];
//       return makeGraph(nodes, edges);
//     },
//   },

//   dodecahedron: {
//     label: "Dodecahedron",
//     desc: "3-regular graph on 20 vertices. Cop number 2. Used in Meger's thesis to test barricade bounds.",
//     build() {
//       const nodes = [];
//       const push = (id, x, y) => nodes.push({ id, x, y });
//       for (let i = 0; i < 5; i++) {
//         const a = (2 * Math.PI * i) / 5 - Math.PI / 2;
//         push(i,    0.5 + 0.44 * Math.cos(a), 0.5 + 0.44 * Math.sin(a));
//       }
//       for (let i = 0; i < 5; i++) {
//         const a = (2 * Math.PI * i) / 5 - Math.PI / 2 + Math.PI / 5;
//         push(5+i,  0.5 + 0.32 * Math.cos(a), 0.5 + 0.32 * Math.sin(a));
//       }
//       for (let i = 0; i < 5; i++) {
//         const a = (2 * Math.PI * i) / 5 - Math.PI / 2;
//         push(10+i, 0.5 + 0.20 * Math.cos(a), 0.5 + 0.20 * Math.sin(a));
//       }
//       for (let i = 0; i < 5; i++) {
//         const a = (2 * Math.PI * i) / 5 - Math.PI / 2 + Math.PI / 5;
//         push(15+i, 0.5 + 0.09 * Math.cos(a), 0.5 + 0.09 * Math.sin(a));
//       }
//       const edges = [
//         [0,1],[1,2],[2,3],[3,4],[4,0],
//         [0,5],[1,6],[2,7],[3,8],[4,9],
//         [5,6],[6,7],[7,8],[8,9],[9,5],
//         [5,10],[6,11],[7,12],[8,13],[9,14],
//         [10,11],[11,12],[12,13],[13,14],[14,10],
//         [10,15],[11,16],[12,17],[13,18],[14,19],
//         [15,16],[16,17],[17,18],[18,19],[19,15],
//       ];
//       return makeGraph(nodes, edges);
//     },
//   },

//   grid3x3: {
//     label: "Grid 3×3",
//     desc: "3×3 grid graph. Cop number 2. Standard test case for grid-based barricade strategies.",
//     build() {
//       const nodes = [];
//       const edges = [];
//       for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
//         nodes.push({ id: r * 3 + c, x: 0.2 + c * 0.3, y: 0.2 + r * 0.3 });
//       }
//       for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
//         if (c < 2) edges.push([r*3+c, r*3+c+1]);
//         if (r < 2) edges.push([r*3+c, (r+1)*3+c]);
//       }
//       return makeGraph(nodes, edges);
//     },
//   },

//   grid3x4: {
//     label: "Grid 3×4",
//     desc: "3×4 grid. Cop number 2. Tests robber's ability to exploit longer corridors.",
//     build() {
//       const nodes = [];
//       const edges = [];
//       for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
//         nodes.push({ id: r*4+c, x: 0.1 + c * 0.27, y: 0.25 + r * 0.25 });
//       }
//       for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
//         if (c < 3) edges.push([r*4+c, r*4+c+1]);
//         if (r < 2) edges.push([r*4+c, (r+1)*4+c]);
//       }
//       return makeGraph(nodes, edges);
//     },
//   },

//   necklace3: {
//     label: "Necklace N₃",
//     desc: "Three diamond 'beads' in a chain. The key example distinguishing local vs. global barricade rules (Chapter 3).",
//     build() {
//       // tips: 0, 3, 6, 9  — inner nodes: 1,2 / 4,5 / 7,8
//       const tips = [0, 3, 6, 9];
//       const tipX  = [0.07, 0.35, 0.65, 0.93];
//       const topY  = 0.28, botY = 0.72, midY = 0.5;
//       const nodes = [
//         { id:0, x:tipX[0], y:midY },
//         { id:1, x:0.21, y:topY }, { id:2, x:0.21, y:botY },
//         { id:3, x:tipX[1], y:midY },
//         { id:4, x:0.50, y:topY }, { id:5, x:0.50, y:botY },
//         { id:6, x:tipX[2], y:midY },
//         { id:7, x:0.79, y:topY }, { id:8, x:0.79, y:botY },
//         { id:9, x:tipX[3], y:midY },
//       ];
//       const edges = [
//         [0,1],[0,2],[1,3],[2,3],
//         [3,4],[3,5],[4,6],[5,6],
//         [6,7],[6,8],[7,9],[8,9],
//       ];
//       return makeGraph(nodes, edges);
//     },
//   },

//   necklace4: {
//     label: "Necklace N₄",
//     desc: "Four diamond beads. Barricade cop number can differ between local and global variants.",
//     build() {
//       const tipX  = [0.05, 0.28, 0.51, 0.74, 0.95];
//       const topY  = 0.27, botY = 0.73, midY = 0.5;
//       const mids  = [0.165, 0.395, 0.625, 0.845];
//       const nodes = [
//         { id:0,  x:tipX[0], y:midY },
//         { id:1,  x:mids[0], y:topY }, { id:2,  x:mids[0], y:botY },
//         { id:3,  x:tipX[1], y:midY },
//         { id:4,  x:mids[1], y:topY }, { id:5,  x:mids[1], y:botY },
//         { id:6,  x:tipX[2], y:midY },
//         { id:7,  x:mids[2], y:topY }, { id:8,  x:mids[2], y:botY },
//         { id:9,  x:tipX[3], y:midY },
//         { id:10, x:mids[3], y:topY }, { id:11, x:mids[3], y:botY },
//         { id:12, x:tipX[4], y:midY },
//       ];
//       const edges = [
//         [0,1],[0,2],[1,3],[2,3],
//         [3,4],[3,5],[4,6],[5,6],
//         [6,7],[6,8],[7,9],[8,9],
//         [9,10],[9,11],[10,12],[11,12],
//       ];
//       return makeGraph(nodes, edges);
//     },
//   },

//   hypercube: {
//     label: "Hypercube Q₃",
//     desc: "3-dimensional hypercube. Cop number 2. Mentioned in Meger's thesis in relation to regular graphs.",
//     build() {
//       const pos = [
//         [0.22,0.27],[0.58,0.27],[0.22,0.63],[0.58,0.63],
//         [0.40,0.12],[0.76,0.12],[0.40,0.48],[0.76,0.48],
//       ];
//       const nodes = pos.map(([x, y], i) => ({ id: i, x, y }));
//       const edges = [];
//       for (let i = 0; i < 8; i++)
//         for (let j = i+1; j < 8; j++)
//           if (popcount(i ^ j) === 1) edges.push([i, j]);
//       function popcount(n) { let c = 0; while (n) { c += n & 1; n >>= 1; } return c; }
//       return makeGraph(nodes, edges);
//     },
//   },

//   prism: {
//     label: "Prism Y₄",
//     desc: "4-prism (two squares connected by a matching). Referenced in Chapter 3 as a barricade variant example.",
//     build() {
//       const nodes = [
//         { id:0, x:0.22, y:0.2 }, { id:1, x:0.78, y:0.2 },
//         { id:2, x:0.78, y:0.8 }, { id:3, x:0.22, y:0.8 },
//         { id:4, x:0.38, y:0.36 }, { id:5, x:0.62, y:0.36 },
//         { id:6, x:0.62, y:0.64 }, { id:7, x:0.38, y:0.64 },
//       ];
//       const edges = [
//         [0,1],[1,2],[2,3],[3,0],
//         [4,5],[5,6],[6,7],[7,4],
//         [0,4],[1,5],[2,6],[3,7],
//       ];
//       return makeGraph(nodes, edges);
//     },
//   },
// };

// yeh we r doing things differently now: 

const GRAPHS = {};

const MODE_INFO = {
  local: {
    label: "local",
    desc: "after moving, the robber may barricade one vertex adjacent to their new position. cops cannot enter barricaded vertices. (primary variant in chapters 2 and 3)",
  },
  global: {
    label: "global",
    desc: "after moving, the robber may barricade any vertex in the graph (not occupied). the robber can cut off distant regions, making this mode stronger than the local variant.",
  },
  slug: {
    label: "slug",
    desc: "the robber leaves a barricade on the vertex they just vacated. the robber's trail is permanently blocked.",
  },
};

const state = {
  graph:     null,
  mode:      'local',
  numCops:   1,

  // phase values:
  // idle | place-cops | place-robber | cops-move | robber-move
  // | barricade-local | barricade-global | barricade-slug-auto | over
  phase:     'idle',

  copPositions:  [],     // index = cop id, value = node id (or null during placement)
  robberPos:     null,
  barricaded:    new Set(), // set of barricaded NODE ids (not edges — Meger barricades vertices)
  slugFrom:      null,   // the node the robber just left (for slug auto-barricade)

  selectedCop:   null,
  validMoves:    [],

  turn:      0,
  winner:    null,
};

const canvas  = document.getElementById('canvas');
const ctx     = canvas.getContext('2d');
const NODE_R  = 17; // logical radius (will be scaled by dpr)

const C = {
  node:        '#FAF7F5',
  nodeBorder:  '#C4A8B0',
  cop:         '#A5C4D4',
  copBorder:   '#5F98B0',
  robber:      '#E8C87A',
  robberBorder:'#C4A040',
  selected:    '#DDD0EC',
  selBorder:   '#9B6B7E',
  valid:       '#F2D7D9',
  validBorder: '#C4A8B0',
  barricaded:  '#E8D5D5',
  barricBorder:'#C07070',
  edge:        '#DDD0D4',
  text:        '#5C3D4E',
  muted:       '#A08898',
  highlight:   '#9B6B7E',
};

function buildAdj(raw) { // takes a raw graph from JSON and builds adjacency list
  const adj = {};
  raw.nodes.forEach(n=>(adj[n.id]=[]));
  raw.edges.forEach(([a,b])=>{adj[a].push(b); adj[b].push(a);})
  return {...raw, adj};
}

function loadGraphs() { 
  return fetch('graphs.json') .then( r => { 
    if (!r.ok) throw new Error(`Could not load graphs.json.`);
    return r.json();
  })
  .then(data=> {
    Object.assign(GRAPHS, data);
  })
}

function resize() {
  const wrap = canvas.parentElement;
  canvas.width  = wrap.clientWidth  * devicePixelRatio;
  canvas.height = wrap.clientHeight * devicePixelRatio;
  canvas.style.width  = wrap.clientWidth  + 'px';
  canvas.style.height = wrap.clientHeight + 'px';
  draw();
}

function nodePos(node) {
  const dpr = devicePixelRatio;
  const W = canvas.width, H = canvas.height;
  const pad = 64 * dpr;
  return {
    x: pad + node.x * (W - 2 * pad),
    y: pad + node.y * (H - 2 * pad),
  };
}

function draw() {
  if (!state.graph) { ctx.clearRect(0, 0, canvas.width, canvas.height); return; }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const dpr = devicePixelRatio;
  const g   = state.graph;
  const r   = NODE_R * dpr;

  // draw edges
  g.edges.forEach(([a, b]) => {
    const pa = nodePos(g.nodes[a]);
    const pb = nodePos(g.nodes[b]);
    ctx.beginPath();
    ctx.moveTo(pa.x, pa.y);
    ctx.lineTo(pb.x, pb.y);
    ctx.strokeStyle = C.edge;
    ctx.lineWidth   = 2 * dpr;
    ctx.stroke();
  });

  // draw nodes
  g.nodes.forEach(node => {
    const p       = nodePos(node);
    const isCop   = state.copPositions.includes(node.id);
    const isRobber= state.robberPos === node.id;
    const isBarr  = state.barricaded.has(node.id);
    const isSel   = state.selectedCop !== null &&
                    state.copPositions[state.selectedCop] === node.id;
    const isValid = state.validMoves.includes(node.id);

    // --- determine fill/border ---
    let fill = C.node, border = C.nodeBorder, bw = 1.5;

    if (isBarr)   { fill = C.barricaded; border = C.barricBorder; bw = 2; }
    if (isValid)  { fill = C.valid;      border = C.validBorder; }
    if (isSel)    { fill = C.selected;   border = C.selBorder; bw = 2.5; }
    if (isCop)    { fill = C.cop;        border = C.copBorder; bw = 2; }
    if (isRobber) { fill = C.robber;     border = C.robberBorder; bw = 2; }
    // both on same node = caught
    if (isCop && isRobber) { fill = '#E8C87A'; border = C.selBorder; }

    // barricade "X" marker
    if (isBarr && !isCop && !isRobber) {
      ctx.save();
      ctx.strokeStyle = C.barricBorder;
      ctx.lineWidth   = 1.5 * dpr;
      ctx.globalAlpha = 0.5;
      const s = r * 0.5;
      ctx.beginPath();
      ctx.moveTo(p.x-s, p.y-s); ctx.lineTo(p.x+s, p.y+s);
      ctx.moveTo(p.x+s, p.y-s); ctx.lineTo(p.x-s, p.y+s);
      ctx.stroke();
      ctx.restore();
    }

    // node circle
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, 2 * Math.PI);
    ctx.fillStyle   = fill;
    ctx.fill();
    ctx.strokeStyle = border;
    ctx.lineWidth   = bw * dpr;
    ctx.stroke();

    // node id label
    ctx.fillStyle    = C.text;
    ctx.font         = `${11 * dpr}px 'DM Sans', sans-serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.id, p.x, p.y);

    // role badges
    if (isCop) {
      const idx = state.copPositions.indexOf(node.id);
      ctx.font      = `bold ${9 * dpr}px 'DM Sans'`;
      ctx.fillStyle = C.copBorder;
      ctx.fillText('C' + (idx + 1), p.x, p.y - r - 5 * dpr);
    }
    if (isRobber) {
      ctx.font      = `bold ${9 * dpr}px 'DM Sans'`;
      ctx.fillStyle = C.robberBorder;
      ctx.fillText('R', p.x, p.y + r + 5 * dpr);
    }
    if (isBarr && !isCop && !isRobber) {
      ctx.font      = `${8 * dpr}px 'DM Sans'`;
      ctx.fillStyle = C.barricBorder;
      ctx.fillText('✕', p.x, p.y + r + 5 * dpr);
    }
  });

  // highlight barricade-eligible nodes during barricade phases
  if (state.phase === 'barricade-local' || state.phase === 'barricade-global') {
    state.validMoves.forEach(nid => {
      const p = nodePos(g.nodes[nid]);
      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, r + 4 * dpr, 0, 2 * Math.PI);
      ctx.strokeStyle = C.highlight;
      ctx.lineWidth   = 2 * dpr;
      ctx.globalAlpha = 0.5;
      ctx.setLineDash([5 * dpr, 4 * dpr]);
      ctx.stroke();
      ctx.restore();
    });
  }
}

canvas.addEventListener('click', e => {
  if (!state.graph) return;
  const rect = canvas.getBoundingClientRect();
  const dpr  = devicePixelRatio;
  const cx   = (e.clientX - rect.left) * dpr;
  const cy   = (e.clientY - rect.top)  * dpr;
  const r    = NODE_R * dpr;

  let hit = null, bestDist = Infinity;
  state.graph.nodes.forEach(node => {
    const p = nodePos(node);
    const d = Math.hypot(cx - p.x, cy - p.y);
    if (d < r * 1.5 && d < bestDist) { bestDist = d; hit = node.id; }
  });

  if (hit === null) return;
  handleClick(hit);
  draw();
});

function handleClick(nodeId) {
  const ph = state.phase;

  if (ph === 'place-cops') {
    if (state.copPositions.includes(nodeId)) return;
    if (state.barricaded.has(nodeId)) return;
    const slot = state.copPositions.indexOf(null);
    if (slot === -1) return;
    state.copPositions[slot] = nodeId;
    addLog(`Cop ${slot + 1} placed on ${nodeId}.`, 'info');
    const filled = state.copPositions.filter(x => x !== null).length;
    if (filled === state.numCops) {
      state.phase = 'place-robber';
      updateUI();
    }
    return;
  }

  if (ph === 'place-robber') {
    if (state.copPositions.includes(nodeId)) return;
    if (state.barricaded.has(nodeId)) return;
    state.robberPos = nodeId;
    addLog(`Robber placed on ${nodeId}.`, 'info');
    state.phase = 'cops-move';
    computeValidMoves();
    updateUI();
    return;
  }

  if (ph === 'cops-move') {
    const copIdx = state.copPositions.indexOf(nodeId);

    if (copIdx !== -1 && state.selectedCop === null) {
      // select this cop
      state.selectedCop = copIdx;
      computeValidMoves();
      updateUI();
      return;
    }
    if (copIdx !== -1 && state.selectedCop !== null && copIdx !== state.selectedCop) {
      // switch selection
      state.selectedCop = copIdx;
      computeValidMoves();
      updateUI();
      return;
    }
    if (state.selectedCop !== null) {
      const from = state.copPositions[state.selectedCop];
      if (nodeId === from) {
        // stay
        addLog(`Cop ${state.selectedCop + 1} stays on ${from}.`, 'info');
        state.selectedCop = null;
        afterCopsMove();
        return;
      }
      if (state.validMoves.includes(nodeId)) {
        state.copPositions[state.selectedCop] = nodeId;
        addLog(`Cop ${state.selectedCop + 1} moves ${from} → ${nodeId}.`, 'info');
        state.selectedCop = null;
        if (nodeId === state.robberPos) { endGame('cops'); return; }
        afterCopsMove();
      }
    }
    return;
  }

  if (ph === 'robber-move') {
    if (!state.validMoves.includes(nodeId) && nodeId !== state.robberPos) return;
    const from = state.robberPos;
    state.robberPos = nodeId;
    state.turn++;
    if (state.copPositions.includes(nodeId)) { endGame('cops'); return; }

    if (state.mode === 'slug') {
      // auto-barricade the vertex just vacated
      if (from !== nodeId && !state.barricaded.has(from)) {
        state.barricaded.add(from);
        addLog(`robber left ${from} → ${nodeId}. node ${from} automatically barricaded (slug).`, 'event');
      } else {
        addLog(`robber stays on ${nodeId} (slug: no new barricade).`, 'info');
      }
      nextCopsTurn();
    } else if (state.mode === 'local') {
      addLog(`robber moves ${from} → ${nodeId}.`, 'event');
      state.phase = 'barricade-local';
      computeBarricadeOptions();
      if (state.validMoves.length === 0) {
        addLog(`no valid nodes to barricade!`, 'info');
        nextCopsTurn();
      }
    } else if (state.mode === 'global') {
      addLog(`robber moves ${from} → ${nodeId}.`, 'event');
      state.phase = 'barricade-global';
      computeBarricadeOptions();
      if (state.validMoves.length === 0) {
        addLog(`no valid nodes to barricade!`, 'info');
        nextCopsTurn();
      }
    }
    updateUI();
    return;
  }

  if (ph === 'barricade-local' || ph === 'barricade-global') {
    if (!state.validMoves.includes(nodeId)) return;
    state.barricaded.add(nodeId);
    addLog(`robber barricaded node ${nodeId}.`, 'bad');
    // check if a cop is now stuck on a barricaded node, edge case
    nextCopsTurn();
    return;
  }
}


function afterCopsMove() {
  state.validMoves = [];
  state.phase = 'robber-move';
  computeRobberMoves();
  updateUI();
}

function nextCopsTurn() {
  state.validMoves = [];
  if (state.turn > 300) { endGame('robber'); return; }
  state.phase = 'cops-move';
  computeValidMoves();
  updateUI();
}

function computeValidMoves() {
  // called when cops-move phase begins (no cop selected yet = clear)
  // actual move list is computed when a cop is selected
  if (state.selectedCop === null) { state.validMoves = []; return; }
  const from = state.copPositions[state.selectedCop];
  const g    = state.graph;
  state.validMoves = g.adj[from]
    .filter(nb => !state.barricaded.has(nb))
    .concat([from]); // can stay
}

function computeRobberMoves() {
  const g   = state.graph;
  const pos = state.robberPos;
  state.validMoves = g.adj[pos]
    .filter(nb => !state.barricaded.has(nb))
    .concat([pos]); // can stay
}

function computeBarricadeOptions() {
  const g   = state.graph;
  const pos = state.robberPos;

  if (state.phase === 'barricade-local') {
    // can barricade any adjacent unbarricaded node not occupied by anyone
    state.validMoves = g.adj[pos].filter(nb =>
      !state.barricaded.has(nb) &&
      !state.copPositions.includes(nb) &&
      nb !== state.robberPos
    );
  } else if (state.phase === 'barricade-global') {
    // can barricade any unbarricaded node not currently occupied
    state.validMoves = g.nodes
      .map(n => n.id)
      .filter(id =>
        !state.barricaded.has(id) &&
        !state.copPositions.includes(id) &&
        id !== state.robberPos
      );
  }
}

function endGame(winner) {
  state.winner  = winner;
  state.phase   = 'over';
  state.selectedCop = null;
  state.validMoves  = [];
  if (winner === 'cops') {
    addLog(`cops win. robber caught on turn ${state.turn}!`, 'good');
  } else {
    addLog(`robber wins. evaded for ${state.turn} turns.`, 'bad');
  }
  updateUI();
  draw();
}

function addLog(msg, cls = '') {
  const el  = document.getElementById('log');
  const div = document.createElement('div');
  div.className = 'log-entry' + (cls ? ' ' + cls : '');
  div.textContent = msg;
  el.appendChild(div);
  el.scrollTop = el.scrollHeight;
}

const PHASE_LABELS = {
  'idle':              '—',
  'place-cops':        'place cops',
  'place-robber':      'place robber',
  'cops-move':         ph => `cops' turn (turn ${state.turn + 1})`,
  'robber-move':       ph => `robber's turn (turn ${state.turn + 1})`,
  'barricade-local':   'robber: place local barricade',
  'barricade-global':  'robber: place global barricade',
  'over':              () => state.winner === 'cops' ? 'cops win!' : 'robber wins!',
};

const PHASE_INSTRUCTIONS = {
  'idle':             'choose a graph, mode, and number of cops, then press <strong>new game</strong>.',
  'place-cops':       'click nodes to place your cops.',
  'place-robber':     'click a free node to place the robber.',
  'cops-move':        'click a cop to select it, then click a destination. click the current node to stay.',
  'robber-move':      'click to move the robber to an adjacent unbarricaded node, or stay.',
  'barricade-local':  'click a highlighted adjacent node to barricade it, or press <strong>skip</strong>.',
  'barricade-global': 'click any highlighted node to barricade it, or press <strong>skip</strong>.',
  'barricade-slug-auto': '',
  'over':             () => `game over. Press <strong>new game</strong> to play again.`,
};

function updateUI() {
  const ph = state.phase;

  // status box
  const sb    = document.getElementById('status-box');
  const label = typeof PHASE_LABELS[ph] === 'function'
    ? PHASE_LABELS[ph](ph)
    : PHASE_LABELS[ph] || ph;
  let sbClass = '';
  let sbBody  = '';
  if (ph === 'over') {
    sbClass = state.winner === 'cops' ? 'win-cops' : 'win-robber';
    sbBody  = state.winner === 'cops'
      ? 'the robber was caught.'
      : 'the robber evaded all cops.';
  }
  sb.className = 'status-box' + (sbClass ? ' ' + sbClass : '');
  sb.innerHTML = `<strong>${label}</strong>${sbBody ? '<br>' + sbBody : ''}`;

  // instruction bar
  const ib   = document.getElementById('instruction-bar');
  const inst = typeof PHASE_INSTRUCTIONS[ph] === 'function'
    ? PHASE_INSTRUCTIONS[ph](ph)
    : PHASE_INSTRUCTIONS[ph] || '';
  ib.innerHTML = inst;

  // skip button — visible during barricade placement phases
  const skipBtn = document.getElementById('btn-skip-barricade');
  skipBtn.style.display = (ph === 'barricade-local' || ph === 'barricade-global') ? 'block' : 'none';

  draw();
}


function startGame() {
  const graphKey = document.getElementById('graph-select').value;
  const mode     = document.getElementById('mode-select').value;
  const numCops  = Math.max(1, Math.min(5, parseInt(document.getElementById('cop-count').value) || 1));

  state.graph        = buildAdj(GRAPHS[graphKey]);
  state.mode         = mode;
  state.numCops      = numCops;
  state.phase        = 'place-cops';
  state.copPositions = Array(numCops).fill(null);
  state.robberPos    = null;
  state.barricaded   = new Set();
  state.selectedCop  = null;
  state.validMoves   = [];
  state.turn         = 0;
  state.winner       = null;
  state.slugFrom     = null;

  document.getElementById('log').innerHTML = '';
  addLog(`New game — graph: ${graphKey}, mode: ${mode}, cops: ${numCops}`, 'info');
  updateUI();
}

function resetGame() {
  state.phase      = 'idle';
  state.graph      = null;
  state.copPositions = [];
  state.robberPos  = null;
  state.barricaded = new Set();
  state.selectedCop = null;
  state.validMoves = [];
  state.turn       = 0;
  state.winner     = null;

  const sb = document.getElementById('status-box');
  sb.className = 'status-box';
  sb.innerHTML = 'press <strong>new game</strong> to begin.';
  document.getElementById('instruction-bar').innerHTML =
    'choose a graph, mode, and number of cops, then press <strong>new game</strong>.';
  document.getElementById('log').innerHTML = '';
  document.getElementById('btn-skip-barricade').style.display = 'none';
  draw();
}


function refreshModeDesc() {
  const mode = document.getElementById('mode-select').value;
  document.getElementById('mode-desc').textContent = MODE_INFO[mode]?.desc || '';
}

function refreshGraphDesc() {
  const key = document.getElementById('graph-select').value;
  document.getElementById('graph-desc').textContent = GRAPHS[key]?.desc || '';
}


document.getElementById('mode-select').addEventListener('change', refreshModeDesc);
document.getElementById('graph-select').addEventListener('change', refreshGraphDesc);
document.getElementById('btn-start').addEventListener('click', startGame);
document.getElementById('btn-reset').addEventListener('click', resetGame);
document.getElementById('btn-skip-barricade').addEventListener('click', () => {
  addLog('robber skipped barricade.', 'info');
  nextCopsTurn();
});

window.addEventListener('resize', resize);

loadGraphs()
  .then(() => {
    refreshModeDesc();
    refreshGraphDesc();
    resize();
  })
  .catch(err => {
    document.getElementById('instruction-bar').innerHTML =
      `<strong>error:</strong> could not load graphs.json — ${err.message}. serve over http, not file://.`;
  });