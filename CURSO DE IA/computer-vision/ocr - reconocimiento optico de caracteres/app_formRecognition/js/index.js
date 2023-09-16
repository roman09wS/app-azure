
const key = "45256b4902f24462948fda7582f21d05";
const endpoint = "https://service.cognitiveservices.azure.com/";

const img = "https://m.media-amazon.com/images/I/61jEAGLViDL._AC_UF894,1000_QL80_.jpg";

const headers = {
  "Ocp-Apim-Subscription-Key": key,
  "Content-Type": "application/json"
};

const body = JSON.stringify({ url: img });

console.log("Analyzing Image...\n");

fetch(`${endpoint}/vision/v3.2/read/analyze?language=en`, {
  method: "POST",
  headers: headers,
  body: body
})
  .then(response => response.json())
  .then(result => {
    const resultUrl = result.headers['Operation-Location'];
    console.log(resultUrl);
    const resultHeaders = {
      "Ocp-Apim-Subscription-Key": key
    };

    console.log("Getting results...");

    const getResults = async () => {
      let analysis;
      do {
        const response = await fetch(resultUrl, {
          method: "GET",
          headers: resultHeaders
        });

        const result = await response.json();
        analysis = result.analyzeResult;
      } while (analysis.status !== "succeeded");

      const analysisFields = analysis.readResults.lines;

      for (const listofdict of analysisFields) {
        for (const dict of listofdict) {
          console.log(`Text: ${dict.text} | Text Bounding Box: ${dict.boundingBox}`);
        }
      }
    };

    getResults();
  })
  .catch(error => {
    console.error("An error occurred:", error);
  });
