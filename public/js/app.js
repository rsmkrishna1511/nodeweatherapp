console.log('Client side javascript loaded....')

const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const Display = document.querySelector('#errorMsg');
const weatherDisplay = document.querySelector('#forcast');
const placeDisplay = document.querySelector('#placeMsg');

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();
    fetch('/weather?address='+input.value).then((response) => {
        response.json().then((data) => {
            if(data.error){
                Display.textContent = data.error;
                weatherDisplay.textContent = null;
                placeDisplay.textContent = null;
            }else{
                placeDisplay.textContent = data.place;
                Display.textContent = data.summary;
                weatherDisplay.textContent = data.temperature;
            }
            console.log(data);
        })
    })
    console.log('submitting');
})