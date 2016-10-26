// var running;
// var watch;
var timePassed;
var prevTime;
var currTime;
//
// var watchDisplay = document.getElementById('watchDisplay');
// var buttons = document.querySelectorAll("button");
// for (var i = 0; i < buttons.length; i++) {
//   var button = buttons[i];
//   button.onclick = function() {
//     handleInput(this.id);
//   };
// };

function initialise () {
  // running = false;
  // window.clearInterval(watch);
  timePassed = 0;
  prevTime = 0;
  currTime = 0;
  // update();
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
}

function handleInput () {
  // Handle JavaScript events
}

initialise();
