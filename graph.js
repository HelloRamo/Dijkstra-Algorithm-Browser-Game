
let canvas = document.getElementById('canvas1');
let ctx = canvas.getContext('2d');


//canvas zentrieren
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

const graphConfigurations = {
    7: {
        nodes: {
            A: { x: 200, y: 200 },
            B: { x: 150, y: 100 },
            C: { x: 350, y: 100 },
            D: { x: 375, y: 200 },
            E: { x: 150, y: 300 },
            F: { x: 350, y: 300 },
            G: { x: 500, y: 200 }
        },
        edges: [
            { from: 'A', to: 'B' },
            { from: 'B', to: 'A' },
            { from: 'A', to: 'E' },
            { from: 'E', to: 'A' },
            { from: 'A', to: 'D' },
            { from: 'D', to: 'A' },
            { from: 'B', to: 'C' },
            { from: 'C', to: 'B' },
            { from: 'C', to: 'D' },
            { from: 'D', to: 'C' },
            { from: 'C', to: 'G' },
            { from: 'G', to: 'C' },
            { from: 'E', to: 'F' },
            { from: 'F', to: 'E' },
            { from: 'D', to: 'G' },
            { from: 'G', to: 'D' },
            { from: 'D', to: 'F' },
            { from: 'F', to: 'D' },
            { from: 'F', to: 'G' },
            { from: 'G', to: 'F' }
        ]
    },
    8: {
        nodes: {
            A: { x: 200, y: 200 },
            B: { x: 150, y: 100 },
            C: { x: 350, y: 100 },
            D: { x: 375, y: 200 },
            E: { x: 150, y: 300 },
            F: { x: 350, y: 300 },
            G: { x: 500, y: 200 },
            H: { x: 100, y: 200 },

        },
        edges: [
            { from: 'A', to: 'B' },
            { from: 'B', to: 'A' },
            { from: 'A', to: 'C' },
            { from: 'C', to: 'A' },
            { from: 'A', to: 'E' },
            { from: 'E', to: 'A' },
            { from: 'A', to: 'D' },
            { from: 'D', to: 'A' },
            { from: 'B', to: 'C' },
            { from: 'C', to: 'B' },
            { from: 'C', to: 'D' },
            { from: 'D', to: 'C' },
            { from: 'C', to: 'G' },
            { from: 'G', to: 'C' },
            { from: 'E', to: 'F' },
            { from: 'F', to: 'E' },
            { from: 'D', to: 'G' },
            { from: 'G', to: 'D' },
            { from: 'D', to: 'F' },
            { from: 'F', to: 'D' },
            { from: 'F', to: 'G' },
            { from: 'G', to: 'F' },
            { from: 'H', to: 'B' },
            { from: 'B', to: 'H' },
            { from: 'H', to: 'E' },
            { from: 'E', to: 'H' }
        ]
    },
    9: {
        nodes: {
            A: { x: 200, y: 200 },
            B: { x: 150, y: 100 },
            C: { x: 350, y: 100 },
            D: { x: 375, y: 200 },
            E: { x: 150, y: 300 },
            F: { x: 350, y: 300 },
            G: { x: 475, y: 150 },
            H: { x: 100, y: 200 },
            I: { x: 475, y: 250 },
        },
        edges: [
            { from: 'A', to: 'B' },
            { from: 'B', to: 'A' },
            { from: 'A', to: 'F' },
            { from: 'F', to: 'A' },
            { from: 'A', to: 'E' },
            { from: 'E', to: 'A' },
            { from: 'A', to: 'D' },
            { from: 'D', to: 'A' },
            { from: 'B', to: 'C' },
            { from: 'C', to: 'B' },
            { from: 'C', to: 'D' },
            { from: 'D', to: 'C' },
            { from: 'C', to: 'G' },
            { from: 'G', to: 'C' },
            { from: 'E', to: 'F' },
            { from: 'F', to: 'E' },
            { from: 'D', to: 'G' },
            { from: 'G', to: 'D' },
            { from: 'D', to: 'F' },
            { from: 'F', to: 'D' },
            { from: 'D', to: 'I' },
            { from: 'I', to: 'D' },
            { from: 'F', to: 'I' },
            { from: 'I', to: 'F' },
            { from: 'H', to: 'B' },
            { from: 'B', to: 'H' },
            { from: 'H', to: 'E' },
            { from: 'E', to: 'H' },
            { from: 'I', to: 'G' },
            { from: 'G', to: 'I' }

        ]
    }
};

let nodes = {};
let edges = [];
let weights = {};

// node = Zeichenobjekt
function drawNode(node, color, label) {
    let position = nodes[node];
    ctx.beginPath();
    ctx.arc(position.x, position.y, 20, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
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
    // zeichnet nodes von ASCII 65 (A) an bis selectenodecount
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

function updateGraph() {
    const selectedNodeCount = parseInt(document.getElementById('nodeCount').value);
    const selectedConfiguration = graphConfigurations[selectedNodeCount];

    nodes = selectedConfiguration.nodes;
    edges = selectedConfiguration.edges;

    //Zuweisung gleiche key und gleiche Werte Kanten zwischen 2 nodes
    edges.forEach(edge => {
        let key = [edge.from, edge.to].sort().join('-');
        if (!weights[key]) {
            weights[key] = Math.floor(Math.random() * 10) + 1;
        }
        edge.weight = weights[key];
    });

    drawGraph(selectedNodeCount);
    createGraph(selectedNodeCount);
}

/////////////////////////////////* Zufällige Knoten + Gitterstruktur*/////////////////////////

ctx.clearRect(0, 0, canvas.width, canvas.height);
const numLines = 5;
const spacing = canvas.width / (numLines + 1);

// Funktion zum Zeichnen des Gitters
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 1; i <= numLines; i++) {
        ctx.beginPath();
        ctx.moveTo(i * spacing, 0);
        ctx.lineTo(i * spacing, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * spacing);
        ctx.lineTo(canvas.width, i * spacing);
        ctx.stroke();
    }
}

// Funktion zum Zeichnen der Knoten
function drawNodes(numNodes) {
    const letters = 'ABCDEFGHIJKLMN';
    let points = [];
    for (let i = 1; i <= numLines; i++) {
        for (let j = 1; j <= numLines; j++) {
            points.push({ x: i * spacing, y: j * spacing });
        }
    }

    // Wähle zufällige Punkte aus
    for (let i = 0; i < numNodes; i++) {
        let pointIndex = Math.floor(Math.random() * points.length);
        let point = points.splice(pointIndex, 1)[0];  // graphisches element
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
        // Beschriftung der Knoten
        ctx.font = '24px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText(letters[i], point.x, point.y - 20);
    }
}

// Event-Listener für den Button
document.getElementById('rndnodes').addEventListener('click', function () {
    drawGrid();
    const numNodes = Math.floor(Math.random() * (14 - 7 + 1)) + 7;
    drawNodes(numNodes);
});

// Zeichne das Gitter beim Laden der Seite
drawGrid();
