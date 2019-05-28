const css = require('../sass/app.sass');

//-------------------------------------------------------------
// Full menu
//-------------------------------------------------------------

document.querySelector('.header-full-menu--toggle').addEventListener('click', function() {
    document.querySelector('.header-full-menu--toggle').classList.toggle('header-full-menu--toggle--open');
    document.querySelector('.header-full-menu-nav').classList.toggle('header-full-menu-nav--open');
    document.querySelector('body').classList.toggle('scrolling--stop');
});

//-------------------------------------------------------------
// Slider
//-------------------------------------------------------------

(function() {
    function sliderObject(slide) {

        this.intervalId;
        this.selectedSlide = 0;
        this.previousSelectedSlide = 0;
        this.hover = false;

        this.element = slide;
        this.slides = this.element.querySelector('.content-full-width-slider-slides').getElementsByClassName('content-full-width-slider-slide');
        this.slidesNumber = this.slides.length;
        this.arrowsNavigation = this.element.querySelector('.content-full-width-slider-arrows-navigation');
        this.dotsNavigation = this.element.querySelector('.content-full-width-slider-dots-navigation');
        // Review if this access works for the anchor tag
        this.dotItems = this.dotsNavigation.getElementsByClassName('content-full-width-slide-dot-anchor');

        this.bindEvents();
        this.initializeAutoPlay();
    }

    sliderObject.prototype.bindEvents = function() {
        var self = this;

        this.arrowsNavigation.addEventListener('click', function(event) {
            if(event.target.tagName.toLowerCase() === 'a') {
                event.preventDefault();

                var newSlideIndex = (event.target.classList.contains('content-full-width-slider-arrows-navigation-next')) ? self.selectedSlide + 1 : self.selectedSlide - 1;

                self.showNewSlide(newSlideIndex);
            }
        });

        this.dotsNavigation.addEventListener('click', function(event) {
            if(event.target.tagName.toLowerCase() === 'a') {
                event.preventDefault();

                var newSlideIndex = slideIndex(event.target.parentElement);

                self.showNewSlide(newSlideIndex);
            }
        });

        this.element.addEventListener('mouseenter', function(){
            self.hover = true;
            clearInterval(self.intervalId);
        });

        this.element.addEventListener('mouseleave', function(){
            self.hover = false;
            self.initializeAutoPlay();
        });
    }

    sliderObject.prototype.initializeAutoPlay = function() {
        var self = this;

        this.intervalId = setInterval(function() {
            self.showNewSlide(self.selectedSlide + 1);
        }, 4000);
    }

    sliderObject.prototype.showNewSlide = function(slideIndex) {
        clearInterval(this.intervalId);

        if(slideIndex < 0) {
            slideIndex = this.slidesNumber - 1;
        }

        if(slideIndex > this.slidesNumber - 1) {
            slideIndex = 0;
        }

        this.previousSelectedSlide = this.selectedSlide;
        this.selectedSlide = slideIndex;

        for(var i = 0; i < this.slidesNumber; i++) {
            if(i < this.selectedSlide) {
                this.slides[i].classList.add('slide--move-left');
                this.slides[i].classList.remove('slide--selected', 'slide--visible');
                this.dotItems[i].classList.remove('slide--selected');
            } else if(i === this.selectedSlide) {
                this.slides[i].classList.add('slide--selected');
                this.slides[i].classList.remove('slide--move-left');
                this.dotItems[i].classList.add('slide--selected');
            } else {
                this.slides[i].classList.remove('slide--move-left', 'slide--selected', 'slide--visible');
                this.dotItems[i].classList.remove('slide--selected');
            }
        }

        this.slides[this.previousSelectedSlide].classList.add('slide--visible');

        if(!this.hover) {
            this.initializeAutoPlay();
        }
    }

    function slideIndex(element) {
    // Debug element argument
        var slideSiblings = element.parentElement.children;

        for(var i = 0; i < slideSiblings.length; i++) {
            if(slideSiblings[i] === element) {
                return 1;
            } else {
                return -1;
            }
        }
    }

    var sliders = document.getElementsByClassName('content-full-width-slider');

    for(var i = 0; i < sliders.length; i++) {
        (function(i) {
            new sliderObject(sliders[i]);
        }(i));
    }
})()

//-------------------------------------------------------------
// Error messages
//-------------------------------------------------------------

document.querySelector('input[type=text]').oninvalid = function(event) {
    event.target.setCustomValidity('Por favor, ingrese un nombre y un apellido');
};

document.querySelector('input[type=text]').oninput = function(event) {
    event.target.setCustomValidity('');
};

document.querySelector('input[type=email]').oninvalid = function(event) {
    event.target.setCustomValidity('Por favor, ingrese una cuenta de correo eléctronico válida usando el simbolo @');
};

document.querySelector('input[type=email]').oninvalid = function(event) {
    event.target.setCustomValidity('');
};

document.querySelector('input[type=tel]').oninvalid = function(event) {
    event.target.setCustomValidity('Por favor, ingrese un número de celular de 10 dígitos');
};

document.querySelector('input[type=tel]').oninput = function(event) {
    event.target.setCustomValidity('');
};

//-------------------------------------------------------------
// Get form values
//-------------------------------------------------------------

function onSubmit() {
    var name = document.querySelector('input[type=text]').value;
    var email = document.querySelector('input[type=email]').value;
    var phone = document.querySelector('input[type=tel]').value;
    var eventType = document.querySelector('event_type').value;

    console.log('Hola' + name + ', gracias por contactar a Infinity Entertaiment. Procederemos con la cotización de un evento '+ eventType +' a través de Whats App con el número de contacto ' + phone + '.')


    Email.send("from@you.com",
        "to@them.com",
        "This is a subject",
        "this is the body",
        "smtp.yourisp.com",
        "username",
        "password"
    );
}
