let playSoundEnabled = true; /* control turn on/off */
const clickingAudio = document.querySelector(".clickSound");
const startAudio = document.querySelector(".startSound");
const snapAudio = document.querySelector(".snapSound");

const indicatorLight = document.querySelector(".light-indicator");
const message = document.querySelector(".message-box");
const muteAudio = document.querySelector(".muteButton");
muteAudio.muted = true;

const lightButton = document.querySelector(".lightButton");
const lightColors = ["default", "pink", "yellow"];
let currentColorIndex = 0;

const allKeys = document.querySelectorAll(".key");

function playSound(e) {
  if (!playSoundEnabled) return;
  if (!muteAudio.muted) return audio.muted;

  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);

  key.classList.add("playing");

  audio.currentTime = 0;
  audio.play();
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("playing");
}

const keys = Array.from(document.querySelectorAll(".key"));
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));

/* Turn machine on/off */
function startMachine(e) {
  if (e.code === "Digit1") {
    allKeys.forEach((key) => key.classList.toggle("turnOff"));

    snapAudio.currentTime = 0;
    snapAudio.play();
    playSoundEnabled = !playSoundEnabled;

    if (playSoundEnabled) {
      indicatorLight.style.backgroundColor = "greenyellow";
      message.innerText = "On";
    } else {
      indicatorLight.style.backgroundColor = "crimson";
      message.innerText = "Off";
    }
  }

  /* if want keyCode */
  /* const keyData = startKey.getAttribute("data-key"); // e.g. "49"

  if (e.keyCode.toString() === keyData) {
    startKey.classList.toggle("turnOn");
  } */
}

function toggleMute(e) {
  if (e.code === "Digit3") {
    muteAudio.muted = !muteAudio.muted;

    if (muteAudio.muted) {
      muteAudio.style.background = "";
    } else {
      muteAudio.style.background = "crimson";
    }
  }
}

function toggleLightColors(e) {
  if (e.code === "Digit2") {
    allKeys.forEach((key) => {
      key.classList.remove(...lightColors);
    });

    const nextColor = lightColors[currentColorIndex];
    allKeys.forEach((key) => {
      key.classList.add(nextColor);
    });

    currentColorIndex = (currentColorIndex + 1) % lightColors.length;
  }
}

window.addEventListener("keydown", toggleLightColors);
window.addEventListener("keydown", toggleMute);
window.addEventListener("keydown", startMachine);
window.addEventListener("keydown", playSound);
