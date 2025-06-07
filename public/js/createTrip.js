document.getElementById('addStopsButton').addEventListener('click', () => {
    const input = document.createElement('input');
    const container = document.getElementById('stopsContainer');
    input.type = 'text';
    input.name = 'tripStops';
    input.placeholder = 'Enter a stop';
    container.appendChild(input);
})
