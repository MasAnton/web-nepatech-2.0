// Navbar Fixed
window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
  } else {
    header.classList.remove("navbar-fixed");
  }
};

// Hamburger
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

const carouselItems = document.querySelectorAll(".carousel-item");
const carouselNavItems = document.querySelectorAll(".carousel-navigation-item");

let currentIndex = 0;

setInterval(() => {
  carouselItems[currentIndex].classList.remove("opacity-100");
  carouselItems[currentIndex].classList.add("opacity-0");
  carouselNavItems[currentIndex].classList.remove("bg-white");
  carouselNavItems[currentIndex].classList.add("bg-gray-500");

  currentIndex = (currentIndex + 1) % carouselItems.length;

  carouselItems[currentIndex].classList.remove("opacity-0");
  carouselItems[currentIndex].classList.add("opacity-100");
  carouselNavItems[currentIndex].classList.remove("bg-gray-500");
  carouselNavItems[currentIndex].classList.add("bg-white");
}, 5000);
