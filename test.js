
<select id="nodeCount">
    <option value="7">7</option>
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

    document.getElementById('nodeCount').addEventListener('change', function() {
    if (this.value === '7') {
        const message = "Die Anzahl der Knoten ist 7.\nBeginn der Visualisierung.";
    drawMessage(message, 'black');
    } else {
        // Optional: Canvas bereinigen, wenn ein anderer Wert als 7 gewählt wird
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    }
});