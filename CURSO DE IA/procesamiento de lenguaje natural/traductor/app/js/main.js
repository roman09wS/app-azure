
const text = document.getElementById('input');
const resultado = document.getElementById('result');

text.addEventListener('input',() =>{
    console.log("traduciendo.....");
    let texto = text.value;
    if (text.value == '') {
        console.log("ingresa lo que deseas traducir");
        resultado.innerHTML = '';
    }else{
        traslator(texto);
    }
})


function traslator(texto) {
    const key = '54eabc5fd95e40b5b1d528e0b9c1bc9c';
    const location = 'eastus';
    const endpoint = 'https://api.cognitive.microsofttranslator.com/';

    const text = texto;

    const headers = {
        "Ocp-Apim-Subscription-Key" : key,
        "Ocp-Apim-Subscription-Region" : location,
        "Content-Type" : "application/json"
    };

    const body = JSON.stringify([{
        'text' : text
    }]);

    fetch(`${endpoint}translate?api-version=3.0&from=es&to=fr&to=en&to=zh-Hans`,{
        method : 'POST',
        headers : headers,
        body : body
    })
    .then( response => response.json())
    .then( result => {
        console.log(result[0].translations[1].text);
        resultado.innerHTML = result[0].translations[1].text
    })
    .catch( err => console.log(err));

}

