var running;
var watch;
var timePassed;
var prevTime;
var currTime;

var watchDisplay = document.getElementById("watchDisplay");
var buttons = document.querySelectorAll("button");
for (var i = 0; i < buttons.length; i++) {
  var button = buttons[i];
  button.onclick = function() {
    handleInput(this.id);
  };
};

function initialise () {
  running = false;
  window.clearInterval(watch);
  timePassed = 0;
  prevTime = 0;
  currTime = 0;
  updateDOM();
};

function startTimer () {
  running = true;
  prevTime = (new Date).getTime();
  watch = window.setInterval(update, 11);
}

function stopTimer () {
  running = false;
  window.clearInterval(watch);
}

function update () {
  currTime = (new Date).getTime();
  var difference = currTime - prevTime;
  timePassed += difference;
  prevTime = currTime;
  updateDOM();
}

function formatTime (time) {
  var hours = Math.floor(time / 3600000);
  time -= hours * 3600000;
  var minutes = Math.floor(time / 60000);
  time -= minutes * 60000;
  var seconds = Math.floor(time / 1000);
  time -= seconds * 1000;
  var centiseconds = Math.floor(time/10);

  while (hours.toString().length < 2) {
    hours = "0" + hours;
  }
  while (minutes.toString().length < 2) {
    minutes = "0" + minutes;
  }
  while (seconds.toString().length < 2) {
    seconds = "0" + seconds;
  }
  while (centiseconds.toString().length < 2) {
    centiseconds = "0" + centiseconds;
  }
  return `${hours}:${minutes}:${seconds}.${centiseconds}`;
}

function updateDOM () {
  watchDisplay.textContent = formatTime(timePassed);
}

function handleInput (id) {
  var inputs = {
    startStop : function () {
      running ? stopTimer() : startTimer();
    },
    reset : initialise
  };

  inputs[id]();
}

initialise();
