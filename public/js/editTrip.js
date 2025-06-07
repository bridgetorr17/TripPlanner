document.getElementById('editTrip').addEventListener('click', () => {
    document.getElementById('addStopsEdit').classList = '';
    document.getElementById('saveEdits').classList = '';
    document.getElementById('editTrip').classList = 'hidden';
})

document.getElementById('addStopsEdit').addEventListener('click', () => {
    const input = document.createElement('input');
    const container = document.getElementById('editsContainer');
    input.type = 'text';
    input.name = 'tripStops';
    input.placeholder = 'Enter a stop';
    container.appendChild(input)
})

document.getElementById('saveEdits').addEventListener('click', async () => {
    const tripId = document.body.dataset.tripId;

    //collect all user added stops
    const inputs = document.querySelectorAll('input[name="tripStops"]');
    const inputsCleaned = Array.from(inputs)
                                .map(input => input.value.trim())
                                .filter(val => val.length > 0);
    console.log(tripId);
    try{
        const response = await fetch(`/trips/edit/${tripId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({newStops: inputsCleaned})
        });

        if(response.ok){
            window.location.reload();
        }
        else{
            const errorText = await response.text();
            console.error('update failed', errorText);
        }
        window.location.reload();
    }
    catch(err){
        console.error(err);
    }
})