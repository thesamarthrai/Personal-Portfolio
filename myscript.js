//preloader
const tl = gsap.timeline();

tl.to("body", {
  overflow: "hidden",
})
  .to(".preloader .text-container", {
    duration: 0,
    opacity: 1,
    ease: "Power3.easeOut",
  })
  .from(".preloader .text-container h1", {
    duration: 1.5,
    delay: 1,
    y: 70,
    skewY: 10,
    stagger: 0.4,
    ease: "Power3.easeOut",
  })
  .to(".preloader .text-container h1", {
    duration: 1.2,
    y: 70,
    skewY: -20,
    stagger: 0.2,
    ease: "Power3.easeOut",
  })
  .to(".preloader", {
    duration: 1.5,
    height: "0vh",
    ease: "Power3.easeOut",
  })
  .to(
    "body",
    {
      overflow: "auto",
    },
    "-=2"
  )
  .to(".preloader", {
    display: "none",
  });

//Play -Pause button
const dictationText = document.getElementById("dictation-text");
const playButton = document.querySelector(".bx.bx-play");
const pauseButton = document.querySelector(".bx.bx-pause");

let isPlaying = false;

playButton.addEventListener("click", () => {
  if (!isPlaying) {
    responsiveVoice.speak(dictationText.textContent, {
      pitch: 1,
      rate: 1,
      volume: 1,
      voice: "Matthew",
    });
    isPlaying = true;
  }
});

pauseButton.addEventListener("click", () => {
  if (isPlaying) {
    responsiveVoice.pause();
    isPlaying = false;
  }
});

//Menu-Icon

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

//Scroll Section JS

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);
};

// ###########################################################################################################################

// image slider (Project section) JS

let slideIndex = 1;
const slides = document.getElementsByClassName("slide");

// Function to show a specific slide
function showSlides(n) {
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Display the current slide
  slides[slideIndex - 1].style.display = "block";

  // Remove the "active" class from all dots
  let dots = document.getElementsByClassName("dot");
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  // Add the "active" class to the corresponding dot
  if (dots.length > 0) {
    dots[slideIndex - 1].classList.add("active");
  }
}

// Function to advance to the next slide
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Function to navigate to a specific slide
function currentSlide(n) {
  showSlides((slideIndex = n));
}

// Automatically advance to the next slide every 3 seconds (3000 milliseconds)
setInterval(function () {
  plusSlides(1);
}, 5000);

// Initialize the slider
showSlides(slideIndex);

// ##############################################################################################################

// Fullstack Developer
const textArray = [
  "Full Stack developer",
  "Software Engineer",
  "Database Manager",
  "Compiler Designer",
  "Web Developer",
  " and Coder",
  // Add more strings as needed
];

// Initialize variables
let typeJsText = document.querySelector(".animatedText1");
let stringIndex = 0; // Index of the current string in the array
let charIndex = 0; // Index of the current character in the current string
let isTyping = true; // Whether we are currently typing or erasing

function typeJs() {
  if (stringIndex < textArray.length) {
    // Check if there are more strings to display or erase
    const currentString = textArray[stringIndex];

    if (isTyping) {
      // Typing animation
      if (charIndex < currentString.length) {
        typeJsText.innerHTML += currentString.charAt(charIndex);
        charIndex++;
      } else {
        isTyping = false; // Switch to erasing mode
      }
    } else {
      // Erasing animation
      if (charIndex > 0) {
        typeJsText.innerHTML = currentString.substring(0, charIndex - 1);
        charIndex--;
      } else {
        isTyping = true; // Switch back to typing mode
        stringIndex++; // Move to the next string

        if (stringIndex >= textArray.length) {
          stringIndex = 0; // Reset to the beginning of the array
        }

        charIndex = 0; // Reset character index
        typeJsText.innerHTML = ""; // Clear the content for the new string
      }
    }
  }
}

// Set an interval to call the typeJs function
setInterval(typeJs, 100); // You can adjust the animation speed as needed

// Typewriting JS

class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 8);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Initial Type Speed
    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 300;
    }

    // Combine both modifications into a single line
    this.txtElement.innerHTML = `<span class="txt" style="color: #00abf0;">${this.txt}</span>`;

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}
