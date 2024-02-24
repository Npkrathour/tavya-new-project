AOS.init({
  offset: 120,
  delay: 0,
  duration: 1000,
  easing: "ease",
  once: false,
  mirror: false,
  anchorPlacement: "top-bottom",
});

$(document).ready(function () {
  // Set a delay of 3 seconds (3000 milliseconds)
  setTimeout(function () {
    // Show the modal using Bootstrap's modal method
    $("#exampleModal").modal("show");
  }, 1000);
});

// The Slideshow class.
$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  autoplay: true,
  nav: true,
  navText: [
    '<span class="iconify" data-icon="fluent:ios-arrow-left-24-filled"></span>',
    '<span class="iconify" data-icon="fluent:ios-arrow-right-24-filled"></span>',
  ],
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 1,
    },
  },
});

// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
