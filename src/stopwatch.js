var stopwatchContainer = document.getElementById("stopwatchContainer");
var newStopwatchButton = document.getElementById("newStopwatchButton");

newStopwatchButton.onclick = createStopwatch;

var stopwatches = [];
var startIconClass = "fa fa-play-circle";
var pauseIconClass = "fa fa-pause-circle";
var stopIcon = '<i class="fa fa-stop-circle" aria-hidden="true"></i>';

var Stopwatch = function () {
  var running, watch, timePassed, prevTime, currTime;

  var wrapper = document.createElement("DIV");
  wrapper.setAttribute("class", "stopwatch__wrapper col-4 col-m-6");

  var section = document.createElement("SECTION");
  section.setAttribute("class", "stopwatch");
  wrapper.appendChild(section);

  var name = document.createElement("H2");
  name.setAttribute("class", "stopwatch__name");
  name.textContent = "Stopwatch " + (stopwatches.length + 1);
  section.appendChild(name);

  var display = document.createElement("P");
  display.setAttribute("class", "stopwatch__display");
  section.appendChild(display);

  var startStop = document.createElement("BUTTON");
  startStop.setAttribute("class", "stopwatch__button fade-on-hover");
  section.appendChild(startStop);

  var startStopIcon = document.createElement("I");
  startStopIcon.setAttribute("class", "fa fa-play-circle");
  startStopIcon.setAttribute("aria-hidden", "true");
  startStop.appendChild(startStopIcon);

  var reset = document.createElement("BUTTON");
  reset.setAttribute("class", "stopwatch__button fade-on-hover");
  reset.innerHTML = stopIcon;
  section.appendChild(reset);

  startStop.addEventListener("click", function() {
      handleInput("startStop");
  });

  reset.addEventListener("click", function() {
      handleInput("reset");
  });

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
    update();
  }

  function stopTimer () {
    running = false;
    window.clearInterval(watch);
    update();
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

    return `${hours}:${minutes}:${seconds}.${centiseconds}`.replace(/(^|\:|\.)(\d)(?!\d)/g, (x,a,b) => a+'0'+b);
  }

  function updateDOM () {
    display.textContent = formatTime(timePassed);
    startStopIcon.setAttribute("class", running ? pauseIconClass : startIconClass);
  }

  function handleInput (id) {
    var inputs = {
      startStop : running ? stopTimer : startTimer,
      reset : initialise
    };

    inputs[id]();
    updateDOM();
  }

  this.getDOM = function () {
    return wrapper;
  }

  initialise();
};

function createStopwatch() {
  var stopwatch = new Stopwatch();
  stopwatches.push(stopwatch);
  stopwatchContainer.appendChild(stopwatch.getDOM());
};

createStopwatch();
