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
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const answer = question.nextElementSibling;

        if(answer.style.display === "block"){

            answer.style.display = "none";

        }else{

            answer.style.display = "block";

        }

    });

});
