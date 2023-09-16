const drawButton = document.getElementById('drawButton');
const image = document.getElementById('image');
const leftInput = document.getElementById('left');
const topInput = document.getElementById('top');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const imageUrlInput = document.getElementById('imageUrl');
const deleteUrl = document.getElementById('deleteUrl');
const container_marcas = document.getElementById('marcar_caras');

drawButton.addEventListener('click', () => {
    const left = parseInt(leftInput.value);
    const top = parseInt(topInput.value);
    const width = parseInt(widthInput.value);
    const height = parseInt(heightInput.value);
    let img = imageUrlInput.value;
    getAnality(img);
});

deleteUrl.addEventListener('click',() =>{
    imageUrlInput.value = '';
    image.src = imageUrlInput;
    deleteMarcas(container_marcas);
});

imageUrlInput.addEventListener('input', () => {
    image.src = imageUrlInput.value;
    if (imageUrlInput.value == '') {
        deleteMarcas(container_marcas);
    }
});

function deleteMarcas(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}


function getAnality(img) {
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

const getUser = async () => {
    try {
        const data = await fetch("https://jsonplaceholder.typicode.com/users")
        const resultado = await data.json();
        resultado.forEach(element => {
            console.log(element.name);
        });
    } catch (error) {
        console.error(error);
    }
}