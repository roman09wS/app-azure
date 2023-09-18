

let user_input = document.getElementById("user_input")
let boton_bot = document.getElementById("boton_bot")
let chat = document.getElementById("chat")
let cartas_registros = document.getElementById("cartas_registros")
let boton_modal_bot = document.getElementById("boton_modal_bot")
let boton_microfono = document.getElementById("boton_microfono")
let texto_de_voz = ""
idioma_detectado = "es"
texto_labels = "Nombre Usuario--Telefono Usuario--Precio telefono--Marca telefono--Correo electronico"
// traerRegistros()
let formular_pregunta_saludo = ""
let marca = " "
let intencion = ""
let precio = " "
let nombreUsuario = ""
let precio_texto = ""
let marca_texto = ""



boton_modal_bot.addEventListener('click', ()=>{
    let label_saludo = document.createElement('label')
    label_saludo.classList.add("alert", "alert-primary")
    label_saludo.textContent = "Bienvenido soy el bot charlitos compro y vendo celulares"
    chat.append(label_saludo)
    document.addEventListener("keyup", function(event) {  
        if (event.code === 'Enter') {
            if(user_input.value != null && user_input.value != ""){
                traducir(user_input.value,"entidad") 
            }
              
        }
    });
})

boton_bot.addEventListener("click",()=>{
    if(user_input.value != null && user_input.value != ""){
        traducir(user_input.value,"entidad") 
    } 
})


function peticionDeIntenciones(texto_intencio_detectar) {
    let data_intenciones = {
        "kind":"Conversation",
        "analysisInput":{
            "conversationItem":{
                "id":"1",
                "text": texto_intencio_detectar,
                "modality":"text",
                "language":"en",
                "participantId":"1"
            }
        },
        "parameters":{
            "projectName":"lunaluis",
            "verbose":true,
            "deploymentName":"lunadeploy",
            "stringIndexType":"TextElement_V8"
        }
    }
    if(user_input.value != null && user_input.value != ""){
        let label_chat_usuario = document.createElement("div");
        label_chat_usuario.classList.add("alert", "alert-warning")
        label_chat_usuario.textContent = user_input.value
        chat.append(label_chat_usuario)
    }else if(texto_de_voz != ""){
        let label_chat_usuario = document.createElement("div");
        label_chat_usuario.classList.add("alert", "alert-warning")
        label_chat_usuario.textContent = texto_de_voz
        chat.append(label_chat_usuario)
    }
 
    url = "https://bot-celulares.cognitiveservices.azure.com/language/:analyze-conversations?api-version=2022-10-01-preview"
    user_input.value = ""
    fetch(url,{
        method: "POST",
        headers: {
            "Ocp-Apim-Subscription-Key": "0f2504649e384ee1a5adebdc5fde163a",
            "Apim-Request-Id": "4ffcac1c-b2fc-48ba-bd6d-b69d9942995a",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data_intenciones)
    })
    .then(respuesta => respuesta.json())
    .then(data_intenciones => {
        let formular_pregunta = ""
        console.log(data_intenciones);
        intencion = data_intenciones.result.prediction.topIntent
        console.log(intencion);
        
        data_intenciones.result.prediction.entities.forEach(element => {
            if(element.category == "Saludo"){
                formular_pregunta_saludo = "Saludo"
                if (element.text == "buenos dias") {
                    formular_pregunta_saludo += " buenos dias"
                }else if(element.text == "Buenas tardes"){
                    formular_pregunta_saludo += " Buenas tardes"
                }else if(element.text == "hola"){
                    formular_pregunta_saludo += " hola"
                }
                console.log(formular_pregunta_saludo);
                peticionPreguntasrespuestas(formular_pregunta_saludo)
            }
            if(element.category == "Telefono"){
                marca += element.category
                marca_texto = element.text
            }
            if(element.category == "Precio"){
                precio += element.category
                precio_texto = element.text
            }
            if(element.category == "NombreUsuario"){
                nombreUsuario = element.text
            }
            
            formular_pregunta = intencion+marca+precio
            console.log(formular_pregunta);
        });
        if(formular_pregunta_saludo != ""){
            setTimeout(() => {
                peticionPreguntasrespuestas(formular_pregunta)
            }, 3500);
        }else{
            peticionPreguntasrespuestas(formular_pregunta)
        }
         
    })
    .catch(error => {
        console.log(error);
    })    
}


function peticionPreguntasrespuestas(pregunta) {
    let data_preguntas_respuestas = {
        "top":3,
        "question":pregunta,
        "includeUnstructuredSources":true,
        "confidenceScoreThreshold":"0.8",
        "answerSpanRequest":{
            "enable":false,
        "topAnswersWithSpan":1,
        "confidenceScoreThreshold":"0.8"
        },
        "filters":{
            "metadataFilter":{
            "logicalOperation":"AND",
            }
        }
    }

    url = "https://bot-celulares.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=lunarespuestas&api-version=2021-10-01&deploymentName=test"
    fetch(url,{
        method: "POST",
        headers: {
            "Ocp-Apim-Subscription-Key": "0f2504649e384ee1a5adebdc5fde163a",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data_preguntas_respuestas)
    })
    .then(respuesta => respuesta.json())
    .then(data_preguntas_respuestas => {
        console.log(data_preguntas_respuestas.answers[0].answer); 
        traducir(data_preguntas_respuestas.answers[0].answer,"respuesta") 
    })
    .catch(error => {
        console.log(error);
    })    
}

function crearRegistros(nombre_usuario,telefono,correo,precio,marca) {
    data = {
        "nombre_usuario": nombre_usuario,
        "telefono": telefono,
        "correo": correo,
        "precio": parseInt(precio),
        "marca": marca
    }

    fetch("http://127.0.0.1:8000/",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(respuesta => respuesta.json())
    .then(data =>{
        console.log(data);
    })
    .catch(error =>{
        console.log(error);
    })
}


function traerRegistros() {
    fetch("http://127.0.0.1:8000/usuarios"
    )
    .then(respuesta => respuesta.json())
    .then(data =>{
        console.log(data.registros);
        let htmlCartasString = ""
        data.registros.forEach(element => {
            htmlCartasString += `<div class="col-lg-4">
                                    <div class="bg-light rounded">
                                        <div class="border-bottom p-4 mb-4">
                                            <h4 class="text-primary-gradient mb-1">Registro ID: ${element[0]}</h4>
                                            <span>Powerful & Awesome Features</span>
                                        </div>
                                        <div class="p-4 pt-0">
                                            <h1 class="mb-3">
                                                <small class="align-top" style="font-size: 22px; line-height: 45px;">$</small>14.99<small
                                                    class="align-bottom" style="font-size: 16px; line-height: 40px;">/ Month</small>
                                            </h1>
                                            <div class="d-flex justify-content-between mb-3"><span>${element[1]}</span><i class="fa fa-check text-primary-gradient pt-1"></i></div>
                                            <div class="d-flex justify-content-between mb-3"><span>${element[2]}</span><i class="fa fa-check text-primary-gradient pt-1"></i></div>
                                            <div class="d-flex justify-content-between mb-3"><span>${element[3]}</span><i class="fa fa-check text-primary-gradient pt-1"></i></div>
                                            <div class="d-flex justify-content-between mb-2"><span>${element[4]}</span><i class="fa fa-check text-primary-gradient pt-1"></i></div>
                                            <div class="d-flex justify-content-between mb-2"><span>${element[5]}</span><i class="fa fa-check text-primary-gradient pt-1"></i></div>
                                            <a href="" class="btn btn-primary-gradient rounded-pill py-2 px-4 mt-4">Get Started</a>
                                        </div>
                                    </div>
                                </div>`
        });
        cartas_registros.innerHTML = htmlCartasString
    })
    .catch(error =>{
        console.log(error);
    })

}

function hablar(texto_hablar, idioma_hablar) {
    const apiUrl = 'https://eastus.tts.speech.microsoft.com/cognitiveservices/v1'; // Reemplaza con la URL correcta
    const subscriptionKey = '64bd01cdd7d94e569857f92701fd3a38'; // Reemplaza con tu clave de suscripción

    const headers = new Headers();
    headers.append('Ocp-Apim-Subscription-Key', subscriptionKey);
    headers.append('Content-Type', 'application/ssml+xml');
    headers.append('X-Microsoft-OutputFormat', 'audio-16khz-128kbitrate-mono-mp3');
    headers.append('User-Agent', 'curl');

    const ssml = "<speak version='1.0' xml:lang='en-US'><voice xml:lang='es-CO' xml:gender='Female' name='es-CO-SalomeNeural'>"+texto_hablar+"</voice></speak>";

    fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: ssml,
    })
    .then((response) => {
        if (response.ok) {
            return response.blob();
        } else {
            throw new Error('Error en la solicitud a la API.');
        }
    })
    .then((blob) => {
        const url = URL.createObjectURL(blob);

        // Crea un nuevo elemento de audio
        const audio = new Audio(url);
    
        // Reproduce automáticamente el audio
        audio.play();
        texto_de_voz=""
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
function traducir(texto_traducir,accion) {
    
    fetch("https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to="+((accion=="entidad") ? "es": idioma_detectado),{
        method: "POST",
        headers: {
            "Ocp-Apim-Subscription-Key": "8f42c7167e9c40d2913ca997ea4b4cb8",
            "Ocp-Apim-Subscription-Region": "eastus",
            "Content-Type": "application/json"
            
        },
        body: JSON.stringify([{'text': texto_traducir}]) 
    })
    .then(respuesta => respuesta.json())
    .then(data =>{
        console.log(data);
        if(accion == "entidad"){
            idioma_detectado = data[0].detectedLanguage.language
            console.log(idioma_detectado);
            peticionDeIntenciones(data[0].translations[0].text);
        }else if(accion == "respuesta"){
            let label_chat = document.createElement("div");
            label_chat.classList.add("alert", "alert-primary")
            if(formular_pregunta_saludo != ""){
                label_chat.textContent = data[0].translations[0].text+" "+nombreUsuario
                hablar(textContent = data[0].translations[0].text+" "+nombreUsuario, idioma_detectado)
                formular_pregunta_saludo = ""
            }else{
                label_chat.textContent = data[0].translations[0].text
                hablar(textContent = data[0].translations[0].text, idioma_detectado)
            }
            chat.append(label_chat)
            
            console.log(intencion+"--"+marca+"--"+precio);
            if(intencion != "" && precio != " " && marca != " "){
                traducir(texto_labels, "formulario")
            }
        }else if(accion == "formulario"){
            console.log(data[0].translations[0].text);
            arreglo_palabras_label = data[0].translations[0].text.split('--'); 
            console.log(arreglo_palabras_label);
            let form_guardar_registro = document.createElement('form')
            form_guardar_registro.classList.add("alert", "alert-primary")
            let label_nombre = document.createElement("label")
            label_nombre.textContent =  arreglo_palabras_label[0]+" :"
            let input_nombre = document.createElement("input")
            input_nombre.setAttribute("id", "input_nombre")
            input_nombre.setAttribute("value", nombreUsuario)
            let label_telefono = document.createElement("label")
            label_telefono.textContent =  arreglo_palabras_label[1]+" :"
            let input_telefono = document.createElement("input")
            input_telefono.setAttribute("id", "input_telefono")
            let label_precio = document.createElement("label")
            label_precio.textContent =  arreglo_palabras_label[2]+" :"
            let input_precio = document.createElement("input")
            input_precio.setAttribute("id", "input_precio")
            input_precio.setAttribute("value", precio_texto)
            let label_marca = document.createElement("label")
            label_marca.textContent =  arreglo_palabras_label[3]+" :"
            let input_marca = document.createElement("input")
            input_marca.setAttribute("id", "input_marca")
            input_marca.setAttribute("value", marca_texto)
            let label_correo = document.createElement("label")
            label_correo.textContent =  arreglo_palabras_label[4]+" :"
            let input_correo = document.createElement("input")
            input_correo.setAttribute("id", "input_correo")
            let boton_sutmit = document.createElement("button")
            boton_sutmit.classList.add("btn", "btn-primary","m-1")
            boton_sutmit.setAttribute("id", "boton_sutmit")
            boton_sutmit.textContent = "Enviar"
            let br = []
            for (let index = 0; index < 11; index++) {
                br[index]= document.createElement("br")
            }
            
            form_guardar_registro.append(label_nombre)
            form_guardar_registro.append(br[0])
            form_guardar_registro.append(input_nombre)
            form_guardar_registro.append(br[1])
            form_guardar_registro.append(label_telefono)
            form_guardar_registro.append(br[2])
            form_guardar_registro.append(input_telefono)
            form_guardar_registro.append(br[3])
            form_guardar_registro.append(label_precio)
            form_guardar_registro.append(br[4])
            form_guardar_registro.append(input_precio)
            form_guardar_registro.append(br[5])
            form_guardar_registro.append(label_marca)
            form_guardar_registro.append(br[6])
            form_guardar_registro.append(input_marca)
            form_guardar_registro.append(br[7])
            form_guardar_registro.append(label_correo)
            form_guardar_registro.append(br[8])
            form_guardar_registro.append(input_correo)
            form_guardar_registro.append(br[9])
            form_guardar_registro.append(boton_sutmit)
            form_guardar_registro.append(br[10])
            chat.append(form_guardar_registro)
            boton_sutmit.addEventListener("click",()=>{
                crearRegistros(input_nombre.value,input_telefono.value,input_correo.value,input_precio.value,input_marca.value)
            })
        }
    })
    .catch(error => {
        console.log(error);
    })
}





let audioContext = null;
let recognizer = null;

// Función para iniciar el AudioContext después de una interacción del usuario
function iniciarAudioContext() {
    // Verificar si el contexto ya está creado para evitar errores
    if (audioContext === null) {
        // Crear el contexto de audio
        audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Configuración de reconocimiento de voz
        const speechConfig = SpeechSDK.SpeechConfig.fromSubscription("64bd01cdd7d94e569857f92701fd3a38", "eastus");

        // Configura el idioma deseado (por ejemplo, español)
        speechConfig.speechRecognitionLanguage = "es-ES"; // Cambia a tu idioma deseado

        const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();

        // Crear el reconocedor de voz
        recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
        

        recognizer.recognized = (s, e) => {
            if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
                console.log(e.result.text);
                texto_de_voz = e.result.text
                traducir(texto_de_voz,"entidad") 
            }
        };

        recognizer.canceled = (s, e) => {
            console.log(`CANCELED: Reason=${e.reason}`);

            if (e.reason === SpeechSDK.CancellationReason.Error) {
                console.log(`CANCELED: ErrorCode=${e.ErrorCode}`);
                console.log(`CANCELED: ErrorDetails=${e.ErrorDetails}`);
            }
        };
    }
}

// Agregar un evento de clic al botón para iniciar el reconocimiento
document.getElementById('boton_microfono_star').addEventListener('click', () => {
    iniciarAudioContext();

    // Ocultar el botón de inicio y mostrar el botón de detener
    document.getElementById('boton_microfono_star').style.display = 'none';
    document.getElementById('boton_microfono_end').style.display = 'block';

    // Iniciar el reconocimiento de voz continuo
    recognizer.startContinuousRecognitionAsync();
});

// Agregar un evento de clic al botón para detener el reconocimiento
document.getElementById('boton_microfono_end').addEventListener('click', () => {
    // Detener el reconocimiento de voz
    recognizer.stopContinuousRecognitionAsync();

    // Ocultar el botón de detener y mostrar el botón de inicio
    document.getElementById('boton_microfono_end').style.display = 'none';
    document.getElementById('boton_microfono_star').style.display = 'block';
});