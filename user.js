
let canvas2 = document.getElementById('canvas2');
let ctx2 = canvas2.getContext('2d');


const inputField = document.getElementById('inputf');
inputField.addEventListener('keydown', function (event) {

    if (event.key === 'Enter') {
        event.preventDefault();
        validateInput();
    }
});

function drawMessage(message, color) {
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.fillStyle = color;
    ctx2.font = '18px Arial';

    // Split the message into lines
    const lines = message.split('\n');
    let yOffset = 30; // Initial vertical position
    const lineHeight = 26; // Height of each line, adjust as needed

    // Draw each line separately
    lines.forEach((line) => {
        ctx2.fillText(line, 10, yOffset);
        yOffset += lineHeight; // Move to the next line position
    });
}

let showExpectedStateCount = 0;
function showExpectedState() {

    if (showExpectedStateCount >= 3) {
        document.getElementById("expectedStateButton").disabled = true;

        const message = "Alle Hilfen wurden aufgebraucht. Versuche es nun selbst!";
        drawMessage(message, 'red');

        return;
    }

    const remainingUses = 3 - showExpectedStateCount;

    const sortedKeys = Object.keys(pqStates);
    if (currentIndex >= sortedKeys.length) {
        currentIndex = sortedKeys.indexOf(startingNode);
    }

    const key = sortedKeys[currentIndex];
    let expectedState = pqStates[key]
        .map(element => `${element.node}${element.distance}`)
        .sort()
        .join(', ');

    let message = `Die P.Q. für Knoten ${key} lautet: ${expectedState}.\n\nVerbleibende Nutzungen der Hilfe: ${remainingUses}.\n\nDie nächste Eingabe klappt bestimmt wieder ohne Hilfe! :-)`;

    if (remainingUses === 0) {
        message += "\nAlle Hilfen wurden aufgebraucht.";
    }

    drawMessage(message, 'red');

    showExpectedStateCount++;
}

let currentIndex = 0;
let startingNode = 'A';

function validateInput() {
    const sortedKeys = Object.keys(pqStates);
    if (currentIndex >= sortedKeys.length) {
        currentIndex = sortedKeys.indexOf(startingNode);
    }

    const key = sortedKeys[currentIndex];
    let userInput, userEntries, expectedState;
    userInput = document.getElementById('inputf').value.toUpperCase().replace(/\s+/g, '');
    // Methoden zur Angleichung der Eingabe und des erwarteten Zustands
    userEntries = userInput
        .toLowerCase()
        .replace(/\s+/g, '')
        .split(',')
        .sort()
        .join(',');

    expectedState = pqStates[key]
        .map(element => `${element.node.toLowerCase()}${element.distance}`)
        .sort()
        .join(',');


    if (userEntries === expectedState) {

        // Benutzereingabe > Array, sortieren und dann wieder in String umwandeln
        userInput = userInput.split(',')
            .sort((a, b) => {
                // Extrahiert numerischen Werte und vergleicht sie
                let numA = parseInt(a.slice(1));
                let numB = parseInt(b.slice(1));

                // Zahlen gleich > vergleichen Buchstaben
                if (numA === numB) {

                    return a[0].localeCompare(b[0]);
                }

                return numA - numB;
            })
            .join(',');

        let userInputArray = userInput.split(',');

        // Formatiert die Ausgabe
        let letter = userInputArray[0].charAt(0);
        let number = userInputArray[0].slice(1);
        let output = `${letter}(${number})`;

        let formattedUserInput = userInputArray.map(element => {
            let letter = element.charAt(0);
            let number = element.slice(1);
            return `${letter}(${number})`;
        }).join(',');

        document.getElementById('priorityQueue' + (currentIndex + 1)).value = formattedUserInput;
        document.getElementById('Element' + (currentIndex + 1)).value = output;

        drawMessage(`Element ${currentIndex + 1}: ${output}`, 'black');

        if (userInput.length === 2 || userInput.length === 3) {
            drawMessage('Glückwunsch! Dies war der letzte Knoten in der Priority Queue und du hast alle kürzesten Distanzen bestimmt!\n Dijkstras Algorithmus wurde erfolgreich gelöst! :-)', 'green');
        } else {
            drawMessage(`Korrekt! Der Knoten mit der höchsten Priorität wird nun entnommen: ${output}.\n Bitte gib nun die Priority Queue für diesen Knoten ein!`, 'blue');
        }

        document.getElementById('inputf').value = ''; // Leerung des Eingabefelds nach korrekter Eingabe
        currentIndex++;
    } else {
        drawMessage('Die Eingabe war nicht korrekt! Bitte versuche es nochmal!\n\nDu kannst dir per "Hilf mir" Button die korrekte Antwort anzeigen lassen!\n\nDies geht aber nur 3 mal pro Spiel!\n\nSetze ihn Weise ein :-)', 'red');
    }
}

const longText = "Willkommen bei Dijkstras Algorithmus welcher aus der Vorlesung bereits\nbekannt sein sollte.\nDazu muss die Priority Queue aller Knoten ausgehend vom Startknoten A \nin das Eingabefeld eingegeben werden. Die Eingabe muss im Format B11,c12, ...\nerfolgen, Groß- und Kleinschreibung und auch Reihenfolge der Eingabe ist egal!\nBei gleichen Kosten der Knoten wird alphabetisch entschieden!\n\nViel Spass und gutes Gelingen :-)";

document.getElementById("nodeCount").addEventListener("change", function () {
    if (this.value === "7") {
        drawMessage(longText, "black");
    } else {
        // Clear the canvas if a different value is selected
        const canvas2 = document.getElementById("canvas2");
        const ctx2 = canvas2.getContext("2d");
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    }
});

drawMessage(longText, "black");
let nodeCountElement = document.getElementById('nodeCount');

nodeCountElement.addEventListener('change', function () {
    const selectedNodeCount = parseInt(this.value);
    createGraph(selectedNodeCount);
    dijkstra(graph, 'A', selectedNodeCount);
    drawGraph(selectedNodeCount);

    const nodeCount = parseInt(this.value);

    const edges = graphConfigurations[nodeCount].edges; // Für vordefinierte Kanten
    createGraph(nodes, edges);

    // Clear input fields when node count changes
    for (let i = 1; i <= 13; i++) {
        document.getElementById(`Element${i}`).value = '';
        document.getElementById(`priorityQueue${i}`).value = '';
    }
});

