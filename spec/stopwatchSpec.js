jasmine.getFixtures().fixturesPath = '.';

describe('DOM tests', function() {
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

  it('stopwatch__name element should be editable', function () {
      expect(document.querySelector('.stopwatch__name').getAttribute("contenteditable")).toEqual('true');
  })
});

describe('Stopwatch tests', function() {
  beforeEach(function() {
    loadFixtures('index.html');
  });

  it('timePassed should equal 0', function () {
    expect(stopwatches[0].getTimePassed()).toEqual(0);
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
    createStopwatch();
    stopwatches[1].start();
    setTimeout(function () {
      stopwatches[1].stop();
      expect(stopwatches[1].getTimePassed()).toBeCloseTo(1000, -2);
      done();
    }, 1000);
  });

  it('timePassed should equal ~2000 after 2 sec of running', function(done) {
    createStopwatch();
    createStopwatch();
    stopwatches[2].start();
    setTimeout(function () {
      stopwatches[2].stop();
      expect(stopwatches[2].getTimePassed()).toBeCloseTo(2000, -2);
      done();
    }, 2000);
  });

  it('watchDisplay should show the correct time', function(done) {
    stopwatches[0].start();
    setTimeout(function () {
      stopwatches[0].stop();
      expect(document.getElementsByClassName('stopwatch__display')[0].textContent).toEqual('00:00:03.50');
      done();
    }, 3505);
  });

});

describe('DOM manipulation tests', function() {
  beforeEach(function() {
    loadFixtures('index.html');
  });

  it('start icon changes to pause icon when timer started', function (done) {
    stopwatches[0].start();
    expect(document.getElementById('startStopIcon').className).toEqual('fa fa-pause-circle');
    done();
  });

  it('pause icon changes to start icon when timer stopped', function (done) {
    stopwatches[0].start();
    stopwatches[0].stop();
    expect(document.getElementById('startStopIcon').className).toEqual('fa fa-play-circle');
    done();
  });
});
