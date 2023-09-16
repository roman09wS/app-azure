
// Add your key here
const key = "45256b4902f24462948fda7582f21d05";

// You need to add your resource location if you use a Cognitive Services resource
const location = "eastus";

// The endpoint is global for the Translator service, DO NOT change it
const endpoint = "https://api.cognitive.microsofttranslator.com/";

// Text to be translated
const text = "Hola";

// Code to call Text Analytics service to analyze sentiment in text
const headers = {
    'Ocp-Apim-Subscription-Key': key,
    'Ocp-Apim-Subscription-Region': location,
    'Content-Type': 'application/json'
};

const body = JSON.stringify([{ 'text': text }]);

console.log("Translating text...");
fetch(`${endpoint}/translate?api-version=3.0&from=es&to=fr&to=it&to=zh-Hans`, {
    method: 'POST',
    headers: headers,
    body: body
})
    .then(response => response.json())
    .then(analysis => {
        const french = analysis[0].translations[0];
        const italian = analysis[0].translations[1];
        const chinese = analysis[0].translations[2];
        console.log(`Original Text: ${text}\nFrench Translation: ${french.text}\nItalian Translation: ${italian.text}\nChinese Translation: ${chinese.text}`);
    });
