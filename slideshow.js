"use strict";
$(document).ready(function() {
    let slides = $('.carousel');
    let currentSlide = 0;

    function showSlide(index) {
      slides.hide();
      $(slides[index]).show();
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }

    showSlide(currentSlide);

    setInterval(nextSlide, 3000); // Change slide every 3 seconds
});
