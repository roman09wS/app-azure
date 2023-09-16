(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })

    
})(jQuery);

document.addEventListener('DOMContentLoaded', function () {
    const identifyButton = document.getElementById('identifyButton');
    const imageUrlInput = document.getElementById('imageUrl');
    const resultParagraph = document.getElementById('result');

    identifyButton.addEventListener('click', function () {
        const imageUrl = imageUrlInput.value;
        if (imageUrl) {
            identifyImage(imageUrl);
        } else {
            resultParagraph.textContent = 'Por favor, ingresa una URL de imagen válida.';
        }
    });
      
    function identifyImage(imageUrl) {
        const predictionUrl = "https://cognitiveee.cognitiveservices.azure.com/customvision/v3.0/Prediction/3526890e-d8ee-413a-b9a4-9c36208a9951/detect/iterations/deteccionv1/url";
        const predictionKey = "98b7af02b5644bcfa0c7a642147c7898";
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
        .then(response => response.json())
        .then(prediction => {
            const items = prediction.predictions;
            let etq = '';
            let probabilidad = 0;
            items.forEach(valor => {      
                if (valor.probability > 0.98) {
                    etq = valor.tagName;
                    probabilidad = valor.probability;
                }          
            });
            if (probabilidad > 0.98) {
                console.log(etq+" - "+probabilidad);
                resultParagraph.innerHTML = "Resultado: "+etq;
            }
        })
        .catch(error => {
            console.error("An error occurred:", error);
        })
        
    }
});