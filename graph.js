

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

//canvas zentrieren
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

let nodes = {
    A: { x: 150, y: 300 },
    B: { x: 250, y: 100 },
    C: { x: 50, y: 150 },
    D: { x: 380, y: 360 },
    E: { x: 400, y: 200 },
    F: { x: 350, y: 500 },
    G: { x: 50, y: 450 },
    H: { x: 550, y: 150 },
    I: { x: 530, y: 450 },
    J: { x: 650, y: 300 },
    K: { x: 640, y: 390 },
    L: { x: 630, y: 200 },
    M: { x: 400, y: 60 },
    N: { x: 470, y: 550 },
};

//ungerichteter Graph
let edges = [
    { from: 'A', to: 'B' },
    { from: 'B', to: 'A' },
    { from: 'B', to: 'M' },
    { from: 'M', to: 'B' },
    { from: 'A', to: 'C' },
    { from: 'C', to: 'A' },
    { from: 'A', to: 'F' },
    { from: 'F', to: 'A' },
    { from: 'F', to: 'N' },
    { from: 'N', to: 'F' },
    { from: 'B', to: 'C' },
    { from: 'C', to: 'B' },
    { from: 'B', to: 'E' },
    { from: 'E', to: 'B' },
    { from: 'B', to: 'H' },
    { from: 'H', to: 'B' },
    { from: 'H', to: 'M' },
    { from: 'M', to: 'H' },
    { from: 'B', to: 'F' },
    { from: 'F', to: 'B' },
    { from: 'C', to: 'G' },
    { from: 'G', to: 'C' },
    { from: 'E', to: 'D' },
    { from: 'D', to: 'E' },
    { from: 'D', to: 'H' },
    { from: 'H', to: 'D' },
    { from: 'F', to: 'D' },
    { from: 'D', to: 'F' },
    { from: 'E', to: 'H' },
    { from: 'H', to: 'E' },
    { from: 'F', to: 'G' },
    { from: 'G', to: 'F' },
    { from: 'F', to: 'I' },
    { from: 'I', to: 'F' },
    { from: 'I', to: 'N' },
    { from: 'N', to: 'I' },
    { from: 'J', to: 'I' },
    { from: 'I', to: 'J' },
    { from: 'H', to: 'J' },
    { from: 'J', to: 'H' },
    { from: 'J', to: 'K' },
    { from: 'K', to: 'J' },
    { from: 'I', to: 'K' },
    { from: 'K', to: 'I' },
    { from: 'H', to: 'L' },
    { from: 'L', to: 'H' },
    { from: 'J', to: 'L' },
    { from: 'L', to: 'J' },
    { from: 'I', to: 'H' },
    { from: 'H', to: 'I' },
];

let weights = {};
//Zuweisung gleiche key und gleiche Werte Kanten zwischen 2 nodes
edges.forEach(edge => {
    let key = [edge.from, edge.to].sort().join('-');
    if (!weights[key]) {
        weights[key] = Math.floor(Math.random() * 10) + 1;
    }
    edge.weight = weights[key];
});

function assignNewWeights() {
    weights = {};

    edges.forEach(edge => {
        let key = [edge.from, edge.to].sort().join('-');
        weights[key] = Math.floor(Math.random() * 10) + 1;
        edge.weight = weights[key];
    });
}

function drawNode(node, color, label) {
    let position = nodes[node];
    ctx.beginPath();
    ctx.arc(position.x, position.y, 15, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, position.x, position.y);
}
// Funktion funktioniert für alle Knoten inenrhalb Canvas egal Position/Anzahl (zufällig)!
function drawConnection(node1, node2, color, thickness) {
    const position1 = nodes[node1];
    const position2 = nodes[node2];

    const directionX = position2.x - position1.x;
    const directionY = position2.y - position1.y;
    const distance = Math.sqrt(directionX * directionX + directionY * directionY);
    const unitDirectionX = directionX / distance;
    const unitDirectionY = directionY / distance;

    //Positionen der Knotenränder verbundener Knoten
    const radius = 15;
    const borderPosition1 = {
        x: position1.x + unitDirectionX * radius,
        y: position1.y + unitDirectionY * radius
    };
    const borderPosition2 = {
        x: position2.x - unitDirectionX * radius,
        y: position2.y - unitDirectionY * radius
    };

    //Methode Verbindungen definieren und zeichnen (stroke)
    ctx.beginPath();
    ctx.moveTo(borderPosition1.x, borderPosition1.y);
    ctx.lineTo(borderPosition2.x, borderPosition2.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.stroke();
}

function drawWeight(node1, node2, weight) {
    const { x: x1, y: y1 } = nodes[node1];
    const { x: x2, y: y2 } = nodes[node2];
    const midX = ({ x: x1, y: y1 }.x + { x: x2, y: y2 }.x) / 2;
    const midY = ({ x: x1, y: y1 }.y + { x: x2, y: y2 }.y) / 2;
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(weight, midX, midY);
}


function drawGraph(selectedNodeCount) {
    let drawnEdges = {};        // Speichert bereits gezeichnete Kanten
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    edges.forEach(edge => {
        if (edge.from.charCodeAt(0) - 65 < selectedNodeCount && edge.to.charCodeAt(0) - 65 < selectedNodeCount) {
            let sortedEdge = [edge.from, edge.to].sort().join('-');         // Sortiere die Kanten, um Konsistenz zu gewährleisten
            if (!drawnEdges[sortedEdge]) {          //zeichnet nur wenn Kante/Gewicht noch nicht gezeichnet
                drawConnection(edge.from, edge.to, '#8a8a8a', 1);
                drawWeight(edge.from, edge.to, edge.weight);
                drawnEdges[sortedEdge] = true;
            }
        }
    });

    Object.keys(nodes).forEach(node => {
        if (node.charCodeAt(0) - 65 < selectedNodeCount) {
            drawNode(node, 'white', node);
        }
    });
}

// führt nodes+edges in ein gemeinsames globales (zugriff .js selbe Ordner) array zusammen 
let graph = {};
function createGraph(selectedNodeCount) {
    for (const node of Object.keys(nodes)) {
        if (node.charCodeAt(0) - 65 < selectedNodeCount) {
            graph[node] = {};

            for (const edge of edges) {
                if (node === edge.from && edge.to.charCodeAt(0) - 65 < selectedNodeCount) {
                    graph[node][edge.to] = edge.weight;
                    if (!graph[edge.to]) {
                        graph[edge.to] = {};
                    }
                }
            }
        }
    }
}
