// Logica para el detector de caras
const drawButton = document.getElementById('drawButton');
const image = document.getElementById('image');
const line = document.getElementById('line');
const leftInput = document.getElementById('left');
const topInput = document.getElementById('top');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const imageUrlInput = document.getElementById('imageUrl');
const deleteUrl = document.getElementById('deleteUrl');
const container_marcas = document.getElementById('marcar_caras');

//Cuando le de click al boton start
drawButton.addEventListener('click', () => {
    const left = parseInt(leftInput.value);
    const top = parseInt(topInput.value);
    const width = parseInt(widthInput.value);
    const height = parseInt(heightInput.value);
    let img = imageUrlInput.value;
    getDeteccion(img);
});
//Cuando le de click al boton X
deleteUrl.addEventListener('click',() =>{
    imageUrlInput.value = '';
    image.src = imageUrlInput;
    deleteMarcas(container_marcas);
});
//Cuando ingrese la URL de la imagen cargue de una vez la imagen
imageUrlInput.addEventListener('input', () => {
    image.src = imageUrlInput.value;
    if (imageUrlInput.value == '') {
        deleteMarcas(container_marcas);
    }
});
//Funcion para quitar las marcas de la caras detectadas
function deleteMarcas(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
//Funcion para consumir el API del recurso
function getDeteccion(img) {
    const key = "c6a14306daad4cd2a91b18d3dafb0149";
    const endpoint = "https://face-recognitionv1.cognitiveservices.azure.com/";

    const headers = {
        "Ocp-Apim-Subscription-Key": key,
        "Content-Type": "application/json"
    };

    const body = JSON.stringify({ url: img });

    console.log("Analyzing image...\n");

    fetch(`${endpoint}/face/v1.0/detect?detectionModel=detection_01`, {
        method: 'POST',
        headers: headers,
        body: body
    })
        .then(response => response.json())
        .then(result => {
            const analysis = result;
            console.log(result);
            analysis.forEach(face => {
                console.log(`Face location: ${JSON.stringify(face.faceRectangle)}\n`);
                let newDiv = document.createElement('div');
                newDiv.classList.add('position-absolute');
                newDiv.style.left = `${(face.faceRectangle.left / image.naturalWidth) * 50}%`;
                newDiv.style.top = `${(face.faceRectangle.top / image.naturalHeight) * 100}%`;
                newDiv.style.width = `${(face.faceRectangle.width / image.naturalWidth) * 50}%`;
                newDiv.style.height = `${(face.faceRectangle.height / image.naturalHeight) * 100}%`;
                newDiv.style.border = "2px solid red";
                container_marcas.appendChild(newDiv);
            });
        })
        .catch(error => console.error('Error:', error));
}


// Logica para el traductor
const text = document.getElementById('texto_user');
const resultado = document.getElementById('result');
const cambioIdioma = document.getElementById('cambioIdioma');
const etq_español = document.getElementById('es');
const etq_ingles = document.getElementById('en');
let count = 1;
let es = 'es';
let en = 'en';

text.addEventListener('input',() =>{
    console.log("traduciendo.....");
    let texto = text.value;
    if (text.value == '') {
        console.log("ingresa lo que deseas traducir");
        resultado.textContent = '';
    }else{
        if (count % 2 == 0) {
            ( async () => {
                const traduccion = await traslator(en,es,texto);
                resultado.textContent = traduccion;
            })();
        }else{
            ( async () => {
                const traduccion = await traslator(es,en,texto);
                resultado.textContent = traduccion;
            })();
        }
    }
})

cambioIdioma.addEventListener('click',() => {
    count += 1;
    let contentEnglis = resultado.value;
    let contentSpanish = text.value;
    if (count % 2 == 0) {
        etq_español.textContent = "Ingles";
        etq_ingles.textContent = "Español";
        resultado.textContent = contentSpanish;
        text.value = contentEnglis;
    }else{
        etq_español.textContent = "Español";
        etq_ingles.textContent = "Ingles";
        resultado.textContent = contentSpanish;
        text.value = contentEnglis;
    }
    console.log("cambio de idioma");
})

async function traslator(from,to,texto) {
    const key = '45256b4902f24462948fda7582f21d05';
    const location = 'eastus';
    const endpoint = 'https://api.cognitive.microsofttranslator.com/';
    const headers = {
        "Ocp-Apim-Subscription-Key" : key,
        "Ocp-Apim-Subscription-Region" : location,
        "Content-Type" : "application/json"
    };
    const body = JSON.stringify([{
        'text' : texto
    }]);

    try {
        const response = await fetch(`${endpoint}translate?api-version=3.0&from=${from}&to=fr&to=${to}&to=zh-Hans`, {
            method: 'POST',
            headers: headers,
            body: body
        });
        
        const result = await response.json();
        const respuesta = result[0].translations[1].text;
        return respuesta;
    } catch (error) {
        console.log(error);
    }
}


//logica para el analisis de imagenes
const etqImg = document.getElementById('imageAnalisis');
const imgUrlAnalisis = document.getElementById('imageUrlAnalisis');
const deleteUrlAnalisis = document.getElementById('deleteUrlAnalisis');
const botonAnalisis = document.getElementById('botonAnalisis');
const description = document.getElementById('description');
const objects = document.getElementById('objects');
const ul = document.getElementById('listaObjects');

imgUrlAnalisis.addEventListener('input', () => {
    etqImg.src = imgUrlAnalisis.value; 
});

deleteUrlAnalisis.addEventListener('click',() => {
    imgUrlAnalisis.value = '';
    etqImg.src = imgUrlAnalisis;
    description.textContent = 'Descripcion de la imagen . . . .';
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
});

botonAnalisis.addEventListener('click',() => {
    let img = imgUrlAnalisis.value;
    getAnalisis(img);
});


function getAnalisis(img) {
    const key = '45256b4902f24462948fda7582f21d05';
    const endpoint = 'https://service.cognitiveservices.azure.com/';
    const headers = {
        "Ocp-Apim-Subscription-Key": key,
        "Content-Type": "application/json"
    };
    const body = JSON.stringify({ url: img });
    fetch(`${endpoint}vision/v3.2/analyze?visualFeatures=Categories,Description,Objects`,{
        method : 'POST',
        headers : headers,
        body : body
    })
    .then(resultado => resultado.json())
    .then( response => {        
        (async () => {
            console.log(response);
            let textoDescription = response.description.captions[0].text;
            const descripcionTraslator = await traslator(en,es,textoDescription);
            description.textContent = descripcionTraslator;
            
            let items = response.description.tags;
            items.forEach(async element => {
                const li = document.createElement("li");
                
                // Traducir el texto del elemento antes de asignarlo al <li>
                const translatedText = await traslator(en,es,element);
                li.textContent = translatedText;
                
                li.classList.add("list-group-item");
                ul.appendChild(li);
            });
        })();
    })
    .catch( err => console.error(err));  
}

//logica para el chat bot
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
sendButton.addEventListener('click', sendMessage);
function sendMessage() {
    const userMessage = messageInput.value;
    if (userMessage.trim() !== '') {
        displayMessage('Tú: ' + userMessage, 'user');
        getBotResponse(userMessage);
        messageInput.value = '';
    }
}

function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = sender === 'user' ? 'alert alert-primary mb-2' : 'alert alert-warning mb-2';
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getBotResponse(userMessage) {
    console.log(userMessage);
    data = {
        "top":1,
        "question": " "+userMessage+" ",
        "includeUnstructuredSources": true,
        "confidenceScoreThreshold": 0,
        "answerSpanRequest": {
            "enable": true,
            "topAnswersWithSpan": 0,
            "confidenceScoreThreshold": 1
        },
        "filters": {
            "metadataFilter":{
                "logicalOperation": "AND"
            }
        }
    }

    url = "https://chat-bot-v1.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=chat-bot-v1&api-version=2021-10-01&deploymentName=production"
    fetch(url,{
        method: 'POST',
        headers: {
            "Ocp-Apim-Subscription-Key": "4ef77b5607554d15ab48f373dd444b6f",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
        
    })
    .then(response => response.json())
    .then(data =>{
        console.log(data.answers[0].answer);
        const botResponse = data.answers[0].answer;
        displayMessage('Bot: ' + botResponse, 'bot');

    })
    .catch(error => {
        console.error("Error:", error);
    });
}

    