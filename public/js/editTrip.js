
//edit trip buttons
document.getElementById('editTrip').addEventListener('click', () => {
    document.getElementById('addStopsEdit').classList = '';
    document.getElementById('saveEdits').classList = '';
    document.getElementById('editTrip').classList = 'hidden';
    document.getElementById('deleteTrip').classList = '';
    document.getElementById('aiLocationSuggestion').classList = '';
    document.querySelectorAll('img.trash').forEach(img => {
        img.classList.remove('hidden');
    })
})

//add stops
document.getElementById('addStopsEdit').addEventListener('click', () => {
    const input = document.createElement('input');
    const container = document.getElementById('editsContainer');
    input.type = 'text';
    input.name = 'tripStops';
    input.placeholder = 'Enter a stop';
    container.appendChild(input)
});

//remove icons
document.querySelectorAll('img.trash').forEach(trashIcon => {
    trashIcon.addEventListener('click', function() {
        const location = this.closest('li.location');
        location.classList.add('remove');
    }); 
});

//save edits actions
document.getElementById('saveEdits').addEventListener('click', async () => {
    const tripId = document.body.dataset.tripId;

    //collect all user added stops
    const inputs = document.querySelectorAll('input[name="tripStops"]');
    const inputsCleaned = Array.from(inputs)
                                .map(input => input.value.trim())
                                .filter(val => val.length > 0);

    //get all stops that were not removed
    const remainingStops = Array.from(document.querySelectorAll('li.location:not(.remove) span'))
                                .map(span => span.textContent.trim())
                                .filter(val => val.length > 0);

    const updatedStops = remainingStops.concat(inputsCleaned);

    try{
        const response = await fetch(`/trips/edit/${tripId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({newStops: updatedStops})
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
});

//ai GET request (from server)
document.getElementById('aiLocationSuggestion').addEventListener('click', async () => {
    const tripId = document.body.dataset.tripId;
    const response = await fetch(`/trips/edit/aiSuggestion/${tripId}`);
    const sug = await response.json();
    
    const parsedSuggestion = JSON.parse(sug.aiSuggestion);

    let container = document.getElementById('aiSuggestion')
    let spanLoc = document.createElement('span');
    let reasonLoc = document.createElement('p');
    let question = document.createElement('span');
    spanLoc.innerHTML = 'Suggested stop: ' + parsedSuggestion.addedStop;
    reasonLoc.innerHTML = 'Reason: ' + parsedSuggestion.reason;
    question.innerHTML = 'Do you want to add this stop to the trip?'
    container.append(spanLoc);
    container.append(reasonLoc);
    container.append(question);

    //user chooses if they want to add the stop
    let yes = document.createElement('button');
    let no = document.createElement('button');
    yes.innerHTML = 'Yes';
    no.innerHTML = 'No';

    yes.addEventListener('click', () => {
        const ul = document.querySelector('ul');
        ul.innerHTML = ''; // Clear current list

        // Rebuild list from updated stops
        parsedSuggestion.tripStops.forEach(stop => {
            const li = document.createElement('li');
            li.classList.add('location');

            const span = document.createElement('span');
            span.textContent = stop;

            const img = document.createElement('img');
            img.src = '/images/trash.jpg';
            img.alt = 'Remove stop';
            img.classList.add('trash');

            // Add remove functionality
            img.addEventListener('click', function () {
                const location = this.closest('li.location');
                location.classList.add('remove');
            });

            li.appendChild(span);
            li.appendChild(img);
            ul.appendChild(li);
        });

        // Clear the AI suggestion UI
        container.innerHTML = 'AI stop added in the correct location. You can now save your edits.';
    });


    no.addEventListener('click', () => {
        container.innerHTML = 'Ok, thanks for using our AI suggestion';
    });
    container.append(yes);
    container.append(no);
})

//DELETE request
document.getElementById('deleteTrip').addEventListener('click', async () => {
    try{
        const tripId = document.body.dataset.tripId;
        const response = await fetch('/trips/delete', {
            method: 'DELETE',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'tripId': tripId
            })
        })

        if (response.redirected){
            window.location.href = response.url;
        }
        else {
            window.location.href = '/dashboard';
        }
    }
    catch(err){
        console.error(err);
    }
})