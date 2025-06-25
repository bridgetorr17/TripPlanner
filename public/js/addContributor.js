document.getElementById('addContributors').addEventListener('click', () => {
    const input = document.createElement('input');
    const container = document.getElementById('addContributorsContainer');

    input.type = "text";
    input.name = "contributor";
    input.placeholder = "Add a contributor";
    container.appendChild(input);

    document.getElementById('saveContributors').classList = '';
})

document.getElementById('saveContributors').addEventListener('click', async () => {
    const tripId = document.body.dataset.tripId;

    //collect new contributors
    const inputs = document.querySelectorAll('input[name="contributor"]');
    const inputsCleaned = Array.from(inputs)
                                .map(input => input.value.trim())
                                .filter(val => val.length > 0);

    //add new contributors to the mongoose document
    try{
        const response = await fetch(`/trips/edit/${tripId}/friends`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({newContributors: inputsCleaned})
        });
    }
    catch(err){
        console.err(err);
    }
})