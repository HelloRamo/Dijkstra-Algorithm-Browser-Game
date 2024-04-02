
const { JSDOM } = require('jsdom');
console.log(dom.window.document.querySelector("p").textContent); // "Hello world"
const { window } = new JSDOM(`...`);
// or even
const { document } = (new JSDOM(`...`)).window;
// Simulieren Sie das HTML-Dokument
const dom = new JSDOM(`
    <html>
        <body>
            <select id="nodeCount">
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
            </select>
        </body>
    </html>
`);

// Stellen Sie das globale `document`-Objekt zur Verfügung
global.document = dom.window.document;

test('set and check nodeCount value', () => {
    // Setzen Sie den Wert des Elements
    const nodeCount = document.getElementById('nodeCount');
    nodeCount.value = '9';

    // Überprüfen Sie, ob der Wert korrekt gesetzt wurde
    expect(nodeCount.value).toBe('9');
});

// Event-Listener für Änderungen im Dropdown-Menü
document.getElementById('nodeCount').addEventListener('change', function () {
    const selectedNodeCount = parseInt(this.value);

    // Graph und Priority Queue neu berechnen
    createGraph(selectedNodeCount);
    dijkstra(graph, 'A');
});

function createGraph(selectedNodeCount) {
    graph = {};

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

function dijkstra(nodes, startNode) {
    const distances = {};
    const visited = {};
    let pq = new PriorityQueue();
    let shortestPaths = [];
    let pqStates = {};

    for (const node in nodes) {
        if (node.charCodeAt(0) - 65 < selectedNodeCount) {
            distances[node] = Infinity;
            visited[node] = false;
        }
    }

    distances[startNode] = 0;
    visited[startNode] = false;
    pq.enqueue(startNode, 0);

    for (const neighbor in nodes[startNode]) {
        if (neighbor.charCodeAt(0) - 65 < selectedNodeCount) {
            const newDistance = distances[startNode] + nodes[startNode][neighbor];
            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                pq.enqueue(neighbor, newDistance);
            }
        }
    }

    while (!pq.isEmpty()) {
        const { node, distance } = pq.dequeue();

        for (const neighbor in nodes[node]) {
            const newDistance = distance + nodes[node][neighbor];
            if (!visited[neighbor] && newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                if (pq.heap.some(element => element.node === neighbor)) {
                    pq.decreaseKey(neighbor, newDistance);
                } else {
                    pq.enqueue(neighbor, newDistance);
                }
            }
        }

        pq.heap.sort((a, b) => {
            if (a.distance !== b.distance) {
                return a.distance - b.distance;
            }
            return a.node.localeCompare(b.node);
        });

        pqStates[node] = pq.getQueueContents();
        visited[node] = true;
        shortestPaths.push({ node, distance, pq: [...pq.heap] });
    }

    console.log(shortestPaths);
    console.log(pqStates);
}