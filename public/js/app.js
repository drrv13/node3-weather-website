const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = 'from javascript'
console.log(document.URL)
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = search.value;
    fetch(document.URL +'weather?address='+ location)
    .then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                [messageOne.textContent, messageTwo.textContent] = [data.error, '']
            } else {
                console.log(data.location);
                console.log(data.forecast);
                [messageOne.textContent, messageTwo.textContent] = [data.location, data.forecast]
            }
        })
    })
})