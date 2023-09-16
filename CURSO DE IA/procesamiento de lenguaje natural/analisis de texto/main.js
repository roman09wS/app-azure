const boton = document.getElementById('iniciar');
const imgUrl = document.getElementById('url');
const file = document.getElementById('file');

boton.addEventListener('click',async () => {
    let img = imgUrl.value;
    getAnalisis(img);
    getAnalityLanguage(img);
});

async function getAnalisis(img) {
    const key = '45256b4902f24462948fda7582f21d05';
    const endpoint = 'https://service.cognitiveservices.azure.com/';

    const headers = {
        "Ocp-Apim-Subscription-Key" : key,
        "Content-Type" : "application/json"
    };

    const texto = await descargarContenidoDesdeURL(img);
    const data = {documents: [{id: "1",text: texto}]};
    //sentiment
    //keyPhrases
    //languages
    //entities/linking
    fetch(`${endpoint}text/analytics/v3.1/sentiment`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log("Sentimiento detectado:");
        console.log("positive: "+result.documents[0].confidenceScores.positive);
        console.log("neutral: "+result.documents[0].confidenceScores.neutral);
        console.log("negative: "+result.documents[0].confidenceScores.negative);
        console.log(result.documents[0].sentiment);
    })
    .catch(error => {
        console.error("Error al detectar el lenguaje:", error);
    });
}

async function getAnalityLanguage(img) {
    const key = '45256b4902f24462948fda7582f21d05';
    const endpoint = 'https://service.cognitiveservices.azure.com/';

    const headers = {
        "Ocp-Apim-Subscription-Key" : key,
        "Content-Type" : "application/json"
    };

    const texto = await descargarContenidoDesdeURL(img);
    const data = {documents: [{id: "1",text: texto}]};

    //sentiment
    //keyPhrases
    //languages
    //entities/linking

    fetch(`${endpoint}text/analytics/v3.1/languages`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log("Lenguaje detectado:");
        const detectedLanguage = result.documents[0].detectedLanguage;
        const langName = detectedLanguage.name;
        const langCode = detectedLanguage.iso6391Name;
        const langScore = detectedLanguage.confidenceScore;

        console.log("Nombre del lenguaje:", langName);
        console.log("Código del lenguaje:", langCode);
        console.log("Puntuación de confianza:", langScore);
    })
    .catch(error => {
        console.error("Error al detectar el lenguaje:", error);
    });
}


async function descargarContenidoDesdeURL(endpoint){
    try {
        const response = await fetch(endpoint);
        const data = await response.text();
        return data;
    } catch (error) {
        console.error("Ocurrio un error: "+error);
    }
}

//Cargar un arhivo txt del computador
document.getElementById('leerArchivo').addEventListener('click',async function () {
    const archivoInput = document.getElementById('archivoInput');
    const contenidoArchivo = document.getElementById('contenidoArchivo');

    const archivo = archivoInput.files[0]; // Obtener el primer archivo seleccionado

    if (archivo) {
        const lector = new FileReader();

        lector.onload = function (e) {
            // El contenido del archivo se encuentra en e.target.result
            contenidoArchivo.textContent = e.target.result;
            getAnalityLanguage(e.target.result);
            getAnalisis(e.target.result);
            // console.log(e.target.result);
        };

        // Leer el archivo como texto
        lector.readAsText(archivo);
    } else {
        contenidoArchivo.textContent = 'No se ha seleccionado ningún archivo.';
    }
});	
  