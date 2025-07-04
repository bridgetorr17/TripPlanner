document.getElementById('addStopsButton').addEventListener('click', () => {
    const input = document.createElement('input');
    const container = document.getElementById('stopsContainer');
    input.type = 'text';
    input.name = 'tripStops';
    input.placeholder = 'Enter a stop';
    container.appendChild(input);
})

document.getElementById('addContributorsButton').addEventListener('click', () => {
    const input = document.createElement('input');
    const container = document.getElementById('contributorsContainer');
    input.type = 'text';
    input.name = 'tripContributors';
    input.placeholder = 'Add a contributor';
    container.appendChild(input);
})