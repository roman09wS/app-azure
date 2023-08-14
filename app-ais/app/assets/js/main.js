const drawButton = document.getElementById('drawButton');
        const image = document.getElementById('image');
        const line = document.getElementById('line');
        const leftInput = document.getElementById('left');
        const topInput = document.getElementById('top');
        const widthInput = document.getElementById('width');
        const heightInput = document.getElementById('height');
        const imageUrlInput = document.getElementById('imageUrl');
        const prueba = document.getElementById('prueba');

        drawButton.addEventListener('click', () => {
            const left = parseInt(leftInput.value);
            const top = parseInt(topInput.value);
            const width = parseInt(widthInput.value);
            const height = parseInt(heightInput.value);
            let img = imageUrlInput.value;
            getAnality(img);
        });

        imageUrlInput.addEventListener('input', () => {
            if (imageUrlInput.value == '') {
                
                line.style.left = 0 + 'px';
                line.style.top = 0 + 'px';
                line.style.width = 0 + 'px';
                line.style.height = 0 + 'px';
            }
            image.src = imageUrlInput.value;
            
        });

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
                        line.style.left = face.faceRectangle.left + 'px';
                        line.style.top = face.faceRectangle.top + 'px';
                        line.style.width = face.faceRectangle.width + 'px';
                        line.style.height = face.faceRectangle.height + 'px';
                    });
                })
                .catch(error => console.error('Error:', error));

        }