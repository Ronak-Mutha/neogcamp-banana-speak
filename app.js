const btnTranslate = document.querySelector('#btn-translate');
const translateInput = document.querySelector('#translate-input');
const alertContainer = document.querySelector('.alert');
const btnClose = document.querySelector('.close-btn');
const msg = document.querySelector('.msg');
const translateOutput = document.querySelector('#translate-output');

const url = "https://api.funtranslations.com/translate/minion.json";

function constructURL(inputText) {
    const encodedURI = encodeURI(inputText);
    return `${url}?text=${encodedURI}`;
}

function showAlert() {
    alertContainer.classList.add('show');
    alertContainer.classList.remove('hide');
    alertContainer.classList.add('showAlert');
    setTimeout(function () {
        closeAlert();
    }, 4000);
};

function closeAlert() {
    alertContainer.classList.remove('show');
    alertContainer.classList.add('hide');
}

function fetchingDataFromURL(url) {
    return fetch(url).then(response => {
            const json = response.json();
            return json;
        })

}

function clickEventHandler(event) {
    translateOutput.innerText = '';
    console.log("button clicked");
    const translateInputValue = translateInput.value;
    const finalURL = constructURL(translateInputValue);

    fetchingDataFromURL(finalURL)
    .then(json => {
        if(json.success) {
            translateOutput.innerText = json.contents.translated;
        } else {
            showAlert();
            msg.innerText = `Error: ${json.error.code} - ${json.error.message}`;
        }
    })
};

btnTranslate.addEventListener('click', clickEventHandler);

btnClose.addEventListener('click', closeAlert);