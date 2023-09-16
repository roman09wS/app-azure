
import requests

url = 'https://jeffry-lemguaje.cognitiveservices.azure.com/language/:analyze-conversations?api-version=2022-10-01-preview'
headers = {
    'Ocp-Apim-Subscription-Key': '3635e1fb9387423d8637a195261e97ef',
    'Apim-Request-Id': '4ffcac1c-b2fc-48ba-bd6d-b69d9942995a',
    'Content-Type': 'application/json'
}
data = {
    "kind":"Conversation",
    "analysisInput":{
        "conversationItem":{
            "id":"jeffry",
            "text":"quiero comprar un curso mañana",
            "modality":"text",
            "language":"es",
            "participantId":"PARTICIPANT_ID_HERE"
        }
    },
    "parameters":{
        "projectName":"jeffry-lemguaje",
        "verbose":True,
        "deploymentName":"jeffry-cursos",
        "stringIndexType":"TextElement_V8"
    }
}

response = requests.post(url, headers=headers, json=data)

if response.status_code >= 200:
    response_data = response.json()
    respuesta = response_data['result']['prediction']['intents']
    for respuetas in respuesta:
        for clave, valor in respuetas.items():
            print(f"{clave}  {valor}")
else:
    print('Error:', response.status_code)



url = "https://jeffry-lemguaje.cognitiveservices.azure.com/language/:analyze-conversations?api-version=2022-10-01-preview"

headers={
    "Ocp-Apim-Subscription-Key:" "3635e1fb9387423d8637a195261e97ef",
    "Apim-Request-Id:" "4ffcac1c-b2fc-48ba-bd6d-b69d9942995a",
    "Content-Type:" "application/json"
}
