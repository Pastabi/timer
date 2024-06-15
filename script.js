// to control time output
let hours = document.querySelector(".hours");
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");

// to read time input
let hoursInput = document.querySelector(".hours-input");
let minutesInput = document.querySelector(".minutes-input");
let secondsInput = document.querySelector(".seconds-input");

// for switching input and timer
let input = document.querySelector(".input");
let timeMachine = document.querySelector(".timemachine");

// controls
let startTime = document.querySelector(".start");
let stopTime = document.querySelector(".stop");
let resetTime = document.querySelector(".reset");

resetTime.addEventListener("click", resetTimer);
startTime.addEventListener("click", timerStart);
stopTime.addEventListener("click", timerStop);

function switchTimeSet(isSetTimeFieldShown) {
  if (isSetTimeFieldShown) {
    timeMachine.style.display = "none";
    input.style.display = "grid";
  } else {
    input.style.display = "none";
    timeMachine.style.display = "grid";
  }
}

function switchPlayStop(isPlayShown) {
  if (isPlayShown) {
    stopTime.style.display = "none";
    startTime.style.display = "block";
  } else {
    startTime.style.display = "none";
    stopTime.style.display = "block";
  }
}

let totalSecondsInput;
let remainingTime;
let timerLoop;

function timerStart() {
  if (totalSecondsInput > 0) {
    timerEngine(totalSecondsInput);
    switchPlayStop(false);
    timeMachine.classList.remove("blinking");
    return;
  }

  totalSecondsInput =
    Number(secondsInput.value) + Number(minutesInput.value) * 60 + Number(hoursInput.value) * 3600;

  if (totalSecondsInput <= 0) return;

  timerEngine(totalSecondsInput);
  switchPlayStop(false);
  switchTimeSet(false);
  secondsInput.value = "";
  minutesInput.value = "";
  hoursInput.value = "";
  timeMachine.style.color = "#f1f1f6";
  timeMachine.classList.remove("blinking");
}

function timerStop() {
  clearInterval(timerLoop);
  totalSecondsInput = remainingTime / 1000;
  switchPlayStop(true);
  timeMachine.classList.add("blinking");
}

function resetTimer() {
  switchTimeSet(true);
  switchPlayStop(true);
  clearInterval(timerLoop);
  totalSecondsInput = 0;
}

function timerEngine(totalSecondsInput) {
  const setTime = totalSecondsInput * 1000;
  const startTime = Date.now();
  const futureTime = startTime + setTime;

  timerLoop = setInterval(timer);

  function timer() {
    const timeNow = Date.now();
    remainingTime = futureTime - timeNow;

    const hoursLeft = Math.floor((remainingTime / 3600000) % 24);
    const minutesLeft = Math.floor((remainingTime / 60000) % 60);
    const secondsLeft = Math.floor((remainingTime / 1000) % 60);

    hours.innerHTML = `${hoursLeft.toString().padStart(2, "0")}`;
    minutes.innerHTML = `${minutesLeft.toString().padStart(2, "0")}`;
    seconds.innerHTML = `${secondsLeft.toString().padStart(2, "0")}`;

    if (remainingTime <= 0) {
      clearInterval(timerLoop);

      timeMachine.style.color = "#a63e3e";
      hours.innerHTML = "00";
      minutes.innerHTML = "00";
      seconds.innerHTML = "00";
    }
  }
}
