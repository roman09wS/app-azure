//curl -v -X POST "https://westcentralus.api.cognitive.microsoft.com/vision/v3.2/read/analyze" 
//-H "Content-Type: application/json" 
//-H "Ocp-Apim-Subscription-Key: <subscription key>" 
//--data-ascii "{'url':'https://learn.microsoft.com/azure/ai-services/computer-vision/media/quickstarts/presentation.png'}"

//curl -v -X GET "https://westcentralus.api.cognitive.microsoft.com/vision/v3.2/read/analyzeResults/{operationId}" 
//-H "Ocp-Apim-Subscription-Key: {key}" 
//--data-ascii "{body}"

const headers = {
    "Ocp-Apim-Subscription-Key":"45256b4902f24462948fda7582f21d05",
    "Content-Type":"application/json"
}

const data = JSON.stringify({
    url:"https://learn.microsoft.com/azure/ai-services/computer-vision/media/quickstarts/presentation.png"
})


const enpoint = "https://service.cognitiveservices.azure.com/";

fetch(`${enpoint}/vision/v3.2/read/analyze?language=en`,{
    headers:headers,
    method:"POST",
    body:data
})
.then( data => {
    console.log(data);
})

