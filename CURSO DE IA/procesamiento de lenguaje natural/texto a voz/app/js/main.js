const texto = document.getElementById('texto');
const boton = document.getElementById('boton').addEventListener('click', () => {
    getVoz();
});



function getVoz(){
    const headers = {
        "Ocp-Apim-Subscription-Key": "fd47efc1dd2243f485bae2aba0abf4c4",
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
        "User-Agent": "curl"
    };

    fetch("https://eastus.tts.speech.microsoft.com/cognitiveservices/v1",{
        headers:headers,
        
    })
}
//curl --location --request POST "https://%SPEECH_REGION%.tts.speech.microsoft.com/cognitiveservices/v1" ^
//--header "Ocp-Apim-Subscription-Key: %SPEECH_KEY%" ^
//--header "Content-Type: application/ssml+xml" ^
//--header "X-Microsoft-OutputFormat: audio-16khz-128kbitrate-mono-mp3" ^
//--header "User-Agent: curl" ^
//--data-raw "<speak version='1.0' xml:lang='en-US'><voice xml:lang='en-US' xml:gender='Female' name='en-US-JennyNeural'>my voice is my passport verify me</voice></speak>" --output output.mp3



