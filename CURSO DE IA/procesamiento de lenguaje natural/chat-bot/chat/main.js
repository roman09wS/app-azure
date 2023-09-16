
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




    