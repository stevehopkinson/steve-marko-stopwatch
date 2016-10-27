jasmine.getFixtures().fixturesPath = '.';

describe('HTML tests', function() {
  beforeEach(function() {
    loadFixtures('index.html');
  });

  it('should have a div tag with id stopwatchContainer', function () {
      expect(document.getElementById('stopwatchContainer').tagName).toEqual('DIV');
  });

  it('should be instantiated with a single clock', function () {
      expect(stopwatches.length).toEqual(1);
  });

  it('first clock display should instantiate to 00:00:00.00', function () {
      expect(document.getElementsByClassName('stopwatch__display')[0].textContent).toEqual('00:00:00.00');
  });

  it('should be able to create a second stopwatch', function () {
      createStopwatch();
      expect(stopwatches.length).toEqual(2);
  });

  it('timePassed should equal 0 on new clock', function () {
      createStopwatch();
      expect(stopwatches[1].getTimePassed()).toEqual(0);
  })
});

// describe('JavaScript tests', function() {
//   beforeEach(function() {
//     loadFixtures('index.html');
//   });
//
//   it('timePassed should equal 0', function () {
//     expect(timePassed).toEqual(0);
//   });
//   it('formatTime should return 01:20:27.46 for 4827463', function () {
//     expect(formatTime(4827463)).toEqual('01:20:27.46');
//   })
//
// });

describe('Async tests', function() {
  beforeEach(function() {
    loadFixtures('index.html');
  });

  it('timePassed should equal ~500 after 0.5 sec of running', function(done) {
    stopwatches[0].start();
    setTimeout(function () {
      stopwatches[0].stop();
      expect(stopwatches[0].getTimePassed()).toBeCloseTo(500, -2);
      done();
    }, 500);
  });

  it('timePassed should equal ~1000 after 1 sec of running', function(done) {
    startTimer();
    setTimeout(function () {
      stopTimer();
      expect(timePassed).toBeCloseTo(1000, -2);
      done();
    }, 1000);
  });

  it('timePassed should equal ~2000 after 2 sec of running', function(done) {
    startTimer();
    setTimeout(function () {
      stopTimer();
      expect(timePassed).toBeCloseTo(2000, -2);
      done();
    }, 2000);
  });
});

describe('DOM manipulation tests', function() {
  beforeEach(function() {
    loadFixtures('index.html');
  });

  it('start icon changes to pause icon when timer started', function (done) {
    startTimer();
    expect(document.getElementById('buttonText').innerHTML).toEqual('<i class="fa fa-pause-circle" aria-hidden="true"></i>');
    done();
  });

  it('pause icon changes to start icon when timer stopped', function (done) {
    startTimer();
    stopTimer();
    expect(document.getElementById('buttonText').innerHTML).toEqual('<i class="fa fa-play-circle" aria-hidden="true"></i>');
    done();
  });
});
