

// Jetzt können Sie auf 'graph' zugreifen
console.log(graph);
class PriorityQueue {
    constructor() {
        this.heap = [];
    }
    // fügt per push Methode Element ans Ende der PQ und dann heapifyUp Methode auf  
    enqueue(node, distance) {
        const element = { node, distance };
        this.heap.push(element);
        this.heapifyUp();
    }
    // entfernt das erste Element aus der PQ und dann heapifyDown Methode auf
    dequeue() {
        const root = this.heap[0];
        if (this.heap.length > 1) {
            this.heap[0] = this.heap.pop();
            this.heapifyDown();
        } else {
            this.heap.pop();
        }
        return root;

    }

    isEmpty() {
        return this.heap.length === 0;
    }
    //tauscht die Positionen von betrachtetem Element zu Elternknoten solange bis Heapbedingung (index niedriger Elternknoten) erfüllt
    heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].distance < this.heap[parentIndex].distance) {
                this.swap(index, parentIndex);
                index = parentIndex;
            } else { break; }
        }
    }
    // tauscht die Positionen von betrachtetem Element zu Kindknoten (niedrigste Prio) solange bis Heapbedingung (index niedriger Kindknoten) erfüllt
    heapifyDown() {
        let index = 0; while (index < this.heap.length) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let smallestChildIndex = index; if (leftChildIndex < this.heap.length &&
                this.heap[leftChildIndex].distance < this.heap[smallestChildIndex].distance) {
                smallestChildIndex = leftChildIndex;
            } if (rightChildIndex < this.heap.length &&
                this.heap[rightChildIndex].distance < this.heap[smallestChildIndex].distance) {
                smallestChildIndex = rightChildIndex;
            } if (smallestChildIndex !== index) {
                this.swap(index,
                    smallestChildIndex); index = smallestChildIndex;
            } else { break; }
        }
    }
    // Tausch Methode
    swap(index1, index2) {
        const temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }
    //vertauscht solange mit Elternknoten bis Heapbedingung (index niedriger Elternknoten, höher Kinderknoten) erfüllt
    heapifyUpFrom(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].distance < this.heap[parentIndex].distance) {
                this.swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }
    //verringert Distanz Knoten in der PQ und ruft dann heapifyUpFrom Methode auf	
    decreaseKey(node, newDistance) {
        let index = this.heap.findIndex(element => element.node === node);
        if (index === -1) return;
        this.heap[index].distance = newDistance;
        this.heapifyUpFrom(index);
    }
    getQueueContents() {
        return this.heap.map(element => ({ node: element.node, distance: element.distance }));
    }
}

////////////////////////* Eigentlicher Dijkstra Algorithmus */
function dijkstra(nodes, startNode, selectedNodeCount) {
    const distances = {};
    const visited = {};
    let pq = new PriorityQueue();
    let shortestPaths = [];
    pqStates = {};

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
            if (neighbor.charCodeAt(0) - 65 < selectedNodeCount) {
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

    console.log(pqStates);
    console.log(selectedNodeCount);

    for (let path of shortestPaths) {
        console.log(`- ${path.node} mit Distanz: ${path.distance}`);
        console.log(" - Priority Queue:");
        let queueString = pqStates[path.node].map(element => `${element.node} (${element.distance})`).join(', ');
        console.log(` - ${queueString}`);
    }
}


const selectedNodeCount = parseInt(document.getElementById('nodeCount').value);
createGraph(selectedNodeCount);
dijkstra(graph, 'A', selectedNodeCount);
drawGraph(selectedNodeCount);
assignNewWeights(selectedNodeCount);




