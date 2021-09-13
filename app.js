const btnTranslate = document.querySelector('#btn-translate');
const translateInput = document.querySelector('#translate-input');
const translateOutput = document.querySelector('#translate-output');

const url = "https://api.funtranslations.com/translate/minion.json";

function constructURL(inputText) {
    const encodedURI = encodeURI(inputText);
    return `${url}?text=${encodedURI}`;
}

function clickEventHandler(event) {
    console.log("button clicked");
    const translateInputValue = translateInput.value;
    const finalURL = constructURL(translateInputValue);

    fetch(finalURL)
    .then(response => {
        var json = response.json();
        return json;
    })
    .then(json => {
        translateOutput.innerText = json.contents.translated;
    })
    .catch((err) => alert("Some error occured, Try again later!"));


};

btnTranslate.addEventListener('click', clickEventHandler);