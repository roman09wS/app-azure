
// const predictionUrl = "https://cognitiveee.cognitiveservices.azure.com/customvision/v3.0/Prediction/3526890e-d8ee-413a-b9a4-9c36208a9951/detect/iterations/deteccionv1/url";
// const predictionKey = "5a1431cf61bb464781b0863a5dbf282f";

// // Código para llamar al servicio Custom Vision para la detección de objetos
// const img = 'https://crc891.com/wp-content/uploads/2021/03/rs170858_dsc_1114-scr538caadebd5bf.jpeg';

// const headers = {
//     "Prediction-Key": predictionKey,
//     "Content-Type": "application/json"
// };

// const body = JSON.stringify({ url: img });

// console.log("Analyzing image...\n");

// fetch(predictionUrl, {
//     method: 'POST',
//     headers: headers,
//     body: body
// })
// .then(response => response.json())
// .then(prediction => {
//     console.log(prediction);
// })
// .catch(error => console.error('Error:', error));






const endpoint = "https://cognitiveee.cognitiveservices.azure.com/customvision/v3.0/Prediction/3526890e-d8ee-413a-b9a4-9c36208a9951/detect/iterations/deteccionv1/url";
const key = "98b7af02b5644bcfa0c7a642147c7898";

const imgUrl = "https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2020/10/posibilidades-peaton-sobrevivirpaso-cebra-2094413.jpg";

const headers = {
    "Prediction-Key" : key,
    "Content-Type": "application/json"
};

const body = JSON.stringify({
    url : imgUrl
});

fetch(endpoint,{
    method : 'POST',
    headers : headers,
    body : body
})
.then( resultado => resultado.json())
.then( response => {
    console.log(response);
    const items = response.predictions;
    items.forEach(element => {
        if (element.probability > 0.9) {
            console.log(element.tagName+": "+element.probability);
        }
    });
})
.catch( err => console.error(err));








































// const items = prediction.predictions;

// let highestProbability = 0;
// let bestTag = "";

// items.forEach(item => {
//     if (item.probability > highestProbability) {
//         highestProbability = item.probability;
//         bestTag = item.tagName;
//     }
// });

// if (highestProbability > 0.9) {
//     console.log(bestTag + " (" + highestProbability + "%)");
// } else {
//     console.log("No se encontraron resultados con alta probabilidad.");
// }