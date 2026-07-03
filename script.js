// Set your festival date here
const eventDate = new Date("December 20, 2026 10:00:00").getTime();

setInterval(() => {

    const now = new Date().getTime();

    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

},1000);
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");

const cover = document.querySelector(".cover-art");

playBtn.addEventListener("click", function () {

    if (audio.paused) {

        audio.play();
        playBtn.innerHTML = "⏸";
        cover.classList.add("playing");

    } else {

        audio.pause();
        playBtn.innerHTML = "▶";
        cover.classList.remove("playing");

    }

});
// Progress bar
const progress = document.getElementById("progress");

// Time
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

// Volume
const volume = document.getElementById("volume");

// Update progress and time
audio.addEventListener("timeupdate", () => {

    progress.max = audio.duration;

    progress.value = audio.currentTime;

    let currentMin = Math.floor(audio.currentTime / 60);
    let currentSec = Math.floor(audio.currentTime % 60);

    let totalMin = Math.floor(audio.duration / 60);
    let totalSec = Math.floor(audio.duration % 60);

    if(currentSec < 10) currentSec = "0" + currentSec;
    if(totalSec < 10) totalSec = "0" + totalSec;

    currentTime.textContent = currentMin + ":" + currentSec;

    duration.textContent = totalMin + ":" + totalSec;

});

// Seek audio
progress.addEventListener("input", () => {

    audio.currentTime = progress.value;

});

// Volume
volume.addEventListener("input", () => {

    audio.volume = volume.value;

});

// Skip Back 10 seconds
document.getElementById("backBtn").addEventListener("click", () => {

    audio.currentTime -= 10;

});

// Skip Forward 10 seconds
document.getElementById("nextBtn").addEventListener("click", () => {

    audio.currentTime += 10;

});
const faqButtons = document.querySelectorAll(".faq-question");

faqButtons.forEach(button => {

    button.addEventListener("click", function(){

        const answer = this.nextElementSibling;

        if(answer.classList.contains("active")){

            answer.classList.remove("active");

        }else{

            answer.classList.add("active");

        }

    });

});
// Scroll Reveal

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", revealSections);

revealSections();

function revealSections(){

    reveals.forEach(section => {

        const windowHeight = window.innerHeight;

        const top = section.getBoundingClientRect().top;

        const revealPoint = 120;

        if(top < windowHeight - revealPoint){

            section.classList.add("active");

        }

    });

}
const topBtn = document.getElementById("topBtn");

// Show button when scrolling
window.addEventListener("scroll", () => {

    if(document.documentElement.scrollTop > 300){

        topBtn.style.display = "block";

    }else{

        topBtn.style.display = "none";

    }

});

// Scroll to top
topBtn.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){

        themeToggle.innerHTML = "☀";

    }else{

        themeToggle.innerHTML = "🌙";

    }

});
// Preloader

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    preloader.style.opacity = "0";

    preloader.style.transition = "opacity 0.8s";

    setTimeout(() => {

        preloader.style.display = "none";

    },800);

});
const popup = document.getElementById("ticketPopup");
const closePopup = document.getElementById("closePopup");

console.log(popup);
console.log(closePopup);
console.log(document.querySelectorAll(".popupOpen"));

document.querySelectorAll(".popupOpen").forEach(button => {

    button.addEventListener("click", () => {

        popup.style.display = "flex";

    });

});

closePopup.addEventListener("click", () => {

    popup.style.display = "none";

});

window.addEventListener("click", (e) => {

    if(e.target === popup){

        popup.style.display = "none";

    }

});
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector("nav");

menuToggle.addEventListener("click", () => {

    nav.classList.toggle("active");

});
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const updateCounter = () => {

        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;

        const increment = Math.ceil(target / 100);

        if(count < target){

            counter.innerText = count + increment;

            setTimeout(updateCounter,20);

        }else{

            counter.innerText = target;

        }

    };

    updateCounter();

});
const ticketForm = document.getElementById("ticketForm");

if (ticketForm) {

    ticketForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const formData = new FormData(ticketForm);

        try {

            const response = await fetch("https://formspree.io/f/xzdlknkb", {

                method: "POST",

                body: formData,

                headers: {
                    "Accept": "application/json"
                }

            });

            if (response.ok) {

                window.location.href = "thankyou.html";

            } else {

                alert("Booking failed. Please try again.");

            }

        } catch (error) {

            alert("Network error. Please try again.");

        }

    });

}
/* ===== Hero Mouse Parallax ===== */

const hero = document.querySelector(".hero-image");

if (hero) {

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener("mousemove", (e) => {

        mouseX = (e.clientX - window.innerWidth / 2) / 60;
        mouseY = (e.clientY - window.innerHeight / 2) / 60;

    });

    function animateHero() {

        hero.style.transform =
            `translate(${mouseX}px, ${mouseY}px)`;

        requestAnimationFrame(animateHero);

    }

    animateHero();

}
