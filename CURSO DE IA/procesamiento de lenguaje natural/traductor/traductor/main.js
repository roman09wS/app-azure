let texto = document.getElementById('texto');
let resultado = document.getElementById('resultado');
let idioma = document.getElementById('idioma');
let limpiar = document.getElementById('limpiar');

limpiar.addEventListener('click',() =>{
    resultado.textContent = '';
    texto.value = '';
});

texto.addEventListener("input",() => {
    let textarea = texto.value;
    if (textarea != '') {        
        traslator(textarea,idioma.value);
    }
});

idioma.addEventListener('click',() => {
    traslator(texto.value,idioma.value);
});

async function traslator(texto,idioma) {
    const headers = {
        "Ocp-Apim-Subscription-Key":"68ecc8fdd30345b1a63e6e9304d3a31f",
        "Ocp-Apim-Subscription-Region":"eastus",
        "Content-Type":"application/json"
    }

    const endpoint = "https://api.cognitive.microsofttranslator.com/";

    const body = JSON.stringify([{'text':texto}]);

    fetch(`${endpoint}translate?api-version=3.0&from=es&to=${idioma}`,{
        method:"POST",
        headers:headers,
        body:body
    })
    .then(respuesta => respuesta.json())
    .then(data => {
        console.log(data[0].translations[0].text);
        resultado.textContent = data[0].translations[0].text;
    })

}



