let img = document.getElementById('url');

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

document.addEventListener('DOMContentLoaded', function () {
    const identifyButton = document.getElementById('identifyButton');
    const imageUrlInput = document.getElementById('imageUrl');
    const resultParagraph = document.getElementById('result');

    identifyButton.addEventListener('click', function () {
        const imageUrl = imageUrlInput.value;
        img.setAttribute("src",imageUrl)
        img.setAttribute("class","img-fluid")
        if (imageUrl) {
            identifyImage(imageUrl);
        } else {
            resultParagraph.textContent = 'Por favor, ingresa una URL de imagen válida.';
        }
    });
      
function identifyImage(imageUrl) {
    const predictionUrl = "https://clasifi-img.cognitiveservices.azure.com/customvision/v3.0/Prediction/005ead13-acc5-49be-a85f-4a0c2f0af55c/classify/iterations/animales/url";
    const predictionKey = "88f33f68abe2411e94ad38aeb988a4ab";
    const headers = {
        'Prediction-Key': predictionKey,
        'Content-Type': 'application/json'
    };
    const body = JSON.stringify({
        url: imageUrl
    });

    fetch(predictionUrl, {
        method: 'POST',
        headers: headers,
        body: body
    })
    .then(response => {
        return response.json();
    })
    .then(prediction => {
        console.log(`\n${prediction.predictions[0].tagName}\n`);
        const result = prediction.predictions[0].tagName;
        resultParagraph.textContent = result
    })
    .catch(error => {
        console.error("An error occurred:", error);
    });
}
});