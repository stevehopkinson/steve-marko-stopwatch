var running, watch, timePassed, prevTime, currTime;

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
  var centiseconds = Math.floor((time / 10) % 100);
  var seconds = Math.floor((time / 1000) % 60);
  var minutes = Math.floor((time / (60 * 1000)) % 60);
  var hours = Math.floor((time / (60 * 60 * 1000)) % 24);

  return `${hours}:${minutes}:${seconds}.${centiseconds}`.replace(/(^|\:|\.)(\d)(?!\d)/g, (x,a,b) => a+'0'+b);;
}

function updateDOM () {
  watchDisplay.textContent = formatTime(timePassed);
  clock.update(timePassed);
  clockDiv.innerHTML = clockContainer.outerHTML;
  // startStop.innerHTML = running ? 'Stop' : 'Start';
}

function handleInput (id) {
  var inputs = {
    startStop : running ? stopTimer : startTimer,
    reset : initialise
  };

  inputs[id]();
}

initialise();
