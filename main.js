var min = document.querySelector(".min");
var sec = document.querySelector(".sec");
var startButton = document.querySelector(".start");
var stopButton = document.querySelector(".stop");
var pauseButton = document.querySelector(".pause");
var minutesInput = document.querySelector(".minutes");
var secondsInput = document.querySelector(".seconds");
var timeDiv = document.querySelector(".time");
var catDiv = document.querySelector(".cat");
var intervalID;

function initialTimer(min, sec) {
  minutesInput.value = min;
  secondsInput.value = sec;
  setTimer();
}

function setTimer() {
  min.innerText =
    minutesInput.value >= 0 ? ("00" + minutesInput.value).slice(-2) : "00";
  sec.innerText =
    secondsInput.value >= 0 ? ("00" + secondsInput.value).slice(-2) : "00";
  catDiv.style.display = "none";
  timeDiv.style.display = "flex";
}

initialTimer(0, 3);

minutesInput.oninput = setTimer;
secondsInput.oninput = setTimer;

var spinnerHtml =
  "<div class='lds-spinner'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>";

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
pauseButton.addEventListener("click", pauseTimer);

async function showCat() {
  timeDiv.style.display = "none";
  catDiv.style.display = "flex";
  catDiv.innerHTML = spinnerHtml;
  var res = await fetch("https://aws.random.cat/meow");
  //   timeDiv.innerHTML = spinnerHtml;
  var json = await res.json();
  //   timeDiv.innerHTML = `<img src="${json.file}" width="100em" height="100em">`;
  catDiv.innerHTML = `<img src="${json.file}" width="100em" height="100em">`;
  console.log("cat", catDiv);
}

function sayMeow() {
  var meow = new Audio();
  meow.src = "/meow.mp3";
  meow.play();
}

function buttonsDisabledToggle(boolean) {
  startButton.disabled = boolean;
  minutesInput.disabled = boolean;
  secondsInput.disabled = boolean;
  startButton.style.backgroundColor = boolean ? "#cccccc" : "rgb(68, 199, 68)";
}

function stopTimer() {
  clearInterval(intervalID);
  buttonsDisabledToggle(false);
  setTimer();
}

function pauseTimer() {
  clearInterval(intervalID);
  buttonsDisabledToggle(false);
}

function startTimer() {
  buttonsDisabledToggle(true);
  intervalID = setInterval(() => {
    var seconds = +sec.innerText;
    var minutes = +min.innerText;
    if (seconds > 0) {
      seconds--;
    } else {
      if (minutes > 0) {
        minutes--;
        seconds = 59;
        min.innerText = ("00" + minutes).slice(-2);
      } else {
        stopTimer();
        sayMeow();
        showCat();
      }
    }
    sec.innerText = ("00" + seconds).slice(-2);
  }, 1000);
}
