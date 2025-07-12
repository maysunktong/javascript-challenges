let playSoundEnabled = true; /* control turn on/off */
const clickingAudio = document.querySelector(".clickSound");
const startAudio = document.querySelector(".startSound");
const snapAudio = document.querySelector(".snapSound");


function playSound(e) {
  if (!playSoundEnabled) return;
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);

  key.classList.add("playing");

  audio.currentTime = 0;
  audio.play();
}

function removePlaying(e) {
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("playing");
}
const keys = Array.from(document.querySelectorAll(".key"));
keys.forEach((key) => key.addEventListener("transitionend", removePlaying));

/* Turn machine on/off */
function startMachine(e) {
  if (e.code === "Digit1") {
    const allKeys = document.querySelectorAll(".key");
    allKeys.forEach((key) => key.classList.toggle("turnOff"));

    snapAudio.currentTime = 0;
    snapAudio.play();
    playSoundEnabled = !playSoundEnabled;
  }

  /* if want keyCode */
  /* const keyData = startKey.getAttribute("data-key"); // e.g. "49"

  if (e.keyCode.toString() === keyData) {
    startKey.classList.toggle("turnOn");
  } */
}



window.addEventListener("keydown", startMachine);
window.addEventListener("keydown", playSound);
