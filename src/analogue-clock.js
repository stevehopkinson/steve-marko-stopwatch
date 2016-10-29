function Clock () {
  this.radius = 50;

  this.clockContainer = document.createElementNS("http://www.w3.org/2000/svg", "SVG");
  this.clockContainer.setAttribute("width", "" + this.radius * 2 + "%");
  this.clockContainer.setAttribute("height", "" + this.radius * 2 + "%");
  this.clockContainer.setAttribute("viewbox", "0 0 100 100");
  this.clockContainer.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  this.clockFace = document.createElementNS("http://www.w3.org/2000/svg", "CIRCLE");
  this.clockFace.setAttribute("cx", this.radius);
  this.clockFace.setAttribute("cy", this.radius);
  this.clockFace.setAttribute("r", this.radius);
  this.clockFace.setAttribute("fill", "black");

  this.clockContainer.appendChild(this.clockFace);

  var longMark = this.radius * 0.9;
  var shortMark = this.radius * 0.95;

  for (var degs = 0; degs < 360; degs += 6) {
    var rads = toRads(degs);
    var mark = document.createElementNS("http://www.w3.org/2000/svg", "LINE");
    mark.setAttribute("x1", this.radius + this.radius * Math.sin(rads));
    mark.setAttribute("y1", this.radius - this.radius * Math.cos(rads));
    mark.setAttribute("x2", this.radius + (degs % 30 === 0 ? longMark : shortMark) * Math.sin(rads));
    mark.setAttribute("y2", this.radius - (degs % 30 === 0 ? longMark : shortMark) * Math.cos(rads));
    mark.setAttribute("style", "stroke: white; stroke-width: 2");
    this.clockContainer.appendChild(mark);
  }

  for (var hour = 1; hour < 13; hour++) {
    var rads = toRads(hour * 30);
    var hourMark = document.createElementNS("http://www.w3.org/2000/svg", "TEXT");
    var offset = 0.75;
    var x = this.radius + this.radius * offset * Math.sin(rads);
    var y = this.radius - this.radius * offset * Math.cos(rads);
    hourMark.setAttribute("text-anchor", "middle");
    hourMark.setAttribute("dominant-baseline", "central");
    hourMark.setAttribute("x", x);
    hourMark.setAttribute("y", y);
    hourMark.setAttribute("style", "fill: white; font-size: 80%; font-family: sans-serif");
    hourMark.innerHTML = hour;
    this.clockContainer.appendChild(hourMark);
  }

  this.hourHand = document.createElementNS("http://www.w3.org/2000/svg", "LINE");
  this.hourHandLength = 0.5;
  this.hourHand.setAttribute("x1", this.radius);
  this.hourHand.setAttribute("y1", this.radius);
  this.hourHand.setAttribute("x2", this.radius);
  this.hourHand.setAttribute("y2", this.radius - this.radius * this.hourHandLength);
  this.hourHand.setAttribute("style", "stroke: white; stroke-width: 3");
  this.clockContainer.appendChild(this.hourHand);

  this.minuteHand = document.createElementNS("http://www.w3.org/2000/svg", "LINE");
  this.minuteHandLength = 0.8;
  this.minuteHand.setAttribute("x1", this.radius);
  this.minuteHand.setAttribute("y1", this.radius);
  this.minuteHand.setAttribute("x2", this.radius);
  this.minuteHand.setAttribute("y2", this.radius - this.radius * this.minuteHandLength);
  this.minuteHand.setAttribute("style", "stroke: white; stroke-width: 2");
  this.clockContainer.appendChild(this.minuteHand);

  this.secondHand = document.createElementNS("http://www.w3.org/2000/svg", "LINE");
  this.secondHandLength = 0.8;
  this.secondHand.setAttribute("x1", this.radius);
  this.secondHand.setAttribute("y1", this.radius);
  this.secondHand.setAttribute("x2", this.radius);
  this.secondHand.setAttribute("y2", this.radius - this.radius * this.secondHandLength);
  this.secondHand.setAttribute("style", "stroke: white; stroke-width: 1");
  this.clockContainer.appendChild(this.secondHand);

  this.centreRadius = 1.5;
  this.clockCentre = document.createElementNS("http://www.w3.org/2000/svg", "CIRCLE");
  this.clockCentre.setAttribute("cx", this.radius);
  this.clockCentre.setAttribute("cy", this.radius);
  this.clockCentre.setAttribute("r", this.centreRadius);
  this.clockCentre.setAttribute("fill", "white");
  this.clockContainer.appendChild(this.clockCentre);
}

Clock.prototype.update = function (time) {
  var hours = (time / (60 * 60 * 1000)) % 12;
  var minutes = (time / (60 * 1000)) % 60;
  var seconds = (time / 1000) % 60;
  var hourRads = toRads(hours * 30);
  var minuteRads = toRads(minutes * 6);
  var secondRads = toRads(seconds * 6);
  this.hourHand.setAttribute("x2", this.radius + this.radius * this.hourHandLength * Math.sin(hourRads));
  this.hourHand.setAttribute("y2", this.radius -  this.radius * this.hourHandLength * Math.cos(hourRads));
  this.minuteHand.setAttribute("x2", this.radius + this.radius * this.minuteHandLength * Math.sin(minuteRads));
  this.minuteHand.setAttribute("y2", this.radius -  this.radius * this.minuteHandLength * Math.cos(minuteRads));
  this.secondHand.setAttribute("x2", this.radius + this.radius * this.secondHandLength * Math.sin(secondRads));
  this.secondHand.setAttribute("y2", this.radius -  this.radius * this.secondHandLength * Math.cos(secondRads));
}

Clock.prototype.getDOM = function (time) {
  return this.clockContainer;
}
