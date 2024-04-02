


const inputField = document.getElementById('inputf');
inputField.addEventListener('keydown', function (event) {

    if (event.key === 'Enter') {
        event.preventDefault();
        validateInput();
    }
});

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

        // Formatiert die Benutzereingabe > Zahlenwerte in Klammern
        let formattedUserInput = userInputArray.map(element => {
            let letter = element.charAt(0);
            let number = element.slice(1);
            return `${letter}(${number})`;
        }).join(',');

        document.getElementById('priorityQueue' + (currentIndex + 1)).value = formattedUserInput;
        document.getElementById('Element' + (currentIndex + 1)).value = output;

        if (userInput.length === 2 || userInput.length === 3) {
            alert('Glückwunsch! Dies war der letzte Knoten in der P.Q. und du hast alle kürzesten Distanzen bestimmt! Dijkstars Algorithmus wurde erfolgreich gelöst :-)!');
        } else {
            alert('Korrekt! Der Knoten mit der höchsten Priorität wird nun entnommen: ' + output + ' .Bitte gib nun die P.Q. für diesen Knoten ein!');
        }

        document.getElementById('inputf').value = ''; // Leerung des Eingabef. nach korrekter Eingabe
        currentIndex++;
    }
    else {

        alert('Bitte nochmal versuchen');
        document.getElementById('inputf').value = '';

    }
}

let nodeCountElement = document.getElementById('nodeCount');

nodeCountElement.addEventListener('change', function () {
    const selectedNodeCount = parseInt(this.value);
    createGraph(selectedNodeCount);
    dijkstra(graph, 'A', selectedNodeCount);
    drawGraph(selectedNodeCount);
    assignNewWeights(selectedNodeCount);

    // Clear input fields when node count changes
    for (let i = 1; i <= 13; i++) {
        document.getElementById(`Element${i}`).value = '';
        document.getElementById(`priorityQueue${i}`).value = '';
    }



    // Add edge between nodes 'I' and 'H' if node count is 9 and the edge doesn't exist
    if (selectedNodeCount === 9 && !edges.some(edge => (edge.from === 'I' && edge.to === 'H') || (edge.from === 'H' && edge.to === 'I'))) {
        let edge = { from: 'I', to: 'H' };
        drawConnection('I', 'H', '#8a8a8a', 1);
        edges.push(edge);
        let key = [edge.from, edge.to].sort().join('-');
        weights[key] = Math.floor(Math.random() * 10) + 1;
        edge.weight = weights[key];
        drawWeight(edge.from, edge.to, edge.weight);
    }
});

