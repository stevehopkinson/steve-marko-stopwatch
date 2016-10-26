jasmine.getFixtures().fixturesPath = 'src/';

describe('JavaScript tests', function() {
  it('timePassed should equal 0', function () {
    expect(timePassed).toEqual(0);
  });

});

describe('Async tests', function() {
  it('timePassed should equal ~3000 after 3 sec of running', function(done) {
    startTimer();
    setTimeout(function () {
      stopTimer();
      expect(timePassed).toBeCloseTo(1000, -2);
      done();
    }, 1000);
  });
});

describe('HTML tests', function() {
  beforeEach(function() {
    loadFixtures('index.html');
  });

  it('should have a p tag with id watchDisplay', function () {
      expect(document.getElementById('watchDisplay').tagName).toEqual('P');
  });

  it('should have a button with id startStop', function () {
      expect(document.getElementById('startStop').tagName).toEqual('BUTTON');
  });

  it('should have a button with id reset', function () {
      expect(document.getElementById('reset').tagName).toEqual('BUTTON');
  });
});
