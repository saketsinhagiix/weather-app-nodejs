console.log('Client side javascript file is loaded!!');

const weatherForm = document.querySelector('form');
const searchedElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = searchedElement.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    if(location) {
        fetch('/weather?address=' + location)
            .then((response) => {
                response.json().then((data) => {
                    if(data.weatherError || data.locationError) {
                        messageOne.textContent = '';
                        messageTwo.textContent = data.weatherError || data.locationError;
                    } else {
                        messageTwo.textContent = '';
                        messageOne.textContent = data.location + '. ' + data.forecast;
                    }
                });
            });
    } else {
        messageOne.textContent = '';
        messageTwo.textContent = 'Please enter a location!!';
    }
});