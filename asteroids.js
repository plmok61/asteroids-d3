var dataArray = [1,1,1,1,1,1,1,1,1,1,1,1];

var canvasWidth = 1000;
var canvasHeight = 700;

var highScore = 0;
var score = 0;
var collisionCount = 100;

var dragging = false;

var canvas = d3.select('body')
  .append('svg')
  .attr('width', canvasWidth)
  .attr('height', canvasHeight)
  .attr('class', 'gameboard')

var circles = canvas.selectAll('circle')
  .data(dataArray)
  .enter()
    .append('circle')
      .attr('cx', function(d) { return d * Math.random() * canvasWidth})
      .attr('cy', function(d) { return d * Math.random() * canvasHeight})
      .attr('r', 20)
      .attr('fill', 'red')
      .transition()
        .duration(function(d) { return d * Math.random() * 1000 + 1000})
        .ease("cubic")
        .attr("cx", Math.random() * canvasWidth)
        .attr("cy", Math.random() * canvasHeight)
        .each(slide);

var drag = d3.behavior.drag()
  .on('dragstart', function() {

    dragging = true;

    player.style('fill', '#777')
    .transition()
      .attr("width", 40)
      .ease("elastic")
      .duration("700");})
  .on('drag', function() {
    if (d3.event.x <= canvasWidth - 10 &&
        d3.event.x >= 10 &&
        d3.event.y <= canvasHeight - 10 &&
        d3.event.y >= 10) {
    player.attr('x', d3.event.x)
  .attr('y', d3.event.y);} })
  .on('dragend', function() {

    dragging = false;

      player.style('fill', 'orange')
      .transition()
      .attr('width', 40)
      .ease("elastic")
      .duration("700"); });


var player = canvas.append('rect')
  .attr('x', 500)
  .attr('y', 350)
  .attr('width', 40)
  .attr('height', 40)
  .attr('fill', 'orange')
  .attr('class', 'player')
  .call(drag);

var asteroids = canvas.selectAll('circle');
var spaceShip = canvas.select('.player');

var isAlreadyTouching = false;

function trackMove() {
  var playerX = spaceShip.node().x.animVal.value + 20;
  var playerY = spaceShip.node().y.animVal.value + 20;

  asteroids.each(function() {
  var circle = d3.select(this);
    var circleX = circle[0][0].cx.animVal.value;
    var circleY = circle[0][0].cy.animVal.value;

    if (isAlreadyTouching === false &&
        Math.abs(playerX - circleX) < 40 &&
        Math.abs(playerY - circleY) < 40 ) {
      isAlreadyTouching = true;
    console.log(isAlreadyTouching)
      collisionCount--
      d3.select('div.collisions span').text(collisionCount);
    }
    if (Math.abs(playerX - circleX) > 40 &&
        Math.abs(playerY - circleY) > 40) {
      isAlreadyTouching = false;
    console.log(isAlreadyTouching)
    }

    if (collisionCount <= 0) {
      if (score > highScore) {
        highScore = score;
        d3.select('div.highscore span').text(highScore)
      }
      score = 0;
      collisionCount = 100;
    }

  })
  requestAnimationFrame(trackMove)
}

var timer = setInterval(function() {
  score++
  d3.select('div.current span').text(score)
},100)

d3.select('body')
  .on('keydown')

trackMove();




// var t = d3.timer(function(elapsed) {

//   score = elapsed / 1000;
//   d3.select("div.current").text("Current Score: " + score);

//   if (collisionCount > 20) {
//     d3.select("div.highscore").text("High Score: " + score);
//     t.stop()
//   };

// });



// var ax = circles.each(function(){
//   this.cx.animVal.value
// })
// var xVals = [];
// ax[0].forEach(function(c){
//   xVals.push(c.cx.animVal.value)
// })


// var ay = circles.each(function(){
//   this.cy.animVal.value
// })
// var yVals = [];
// ay[0].forEach(function(c){
//   yVals.push(c.cy.animVal.value)
// })


function slide() {
  var circle = d3.select(this);
  (function repeat() {
    circle = circle.transition()
        .duration(Math.random() * 1000 + 1000)
        .attr("cx", Math.random() * canvasWidth)
        .attr("cy", Math.random() * canvasHeight)
        .each("end", repeat);
  })();
};

//////// drag functionality

















// var circle = canvas.append("circle")
//   .attr("cx", 35)
//   .attr("cy", 145)
//   .attr("r", 25)
//   .style("stroke-opacity", .9)
//   .style("stroke", "green")
//   .style("stroke-width", 2)
//   .style('cursor', 'move')
//   .style("fill", "white");

// function move() {
//   d3.select(this)
//     .attr('cx', d3.event.x)
//     .attr('cy', d3.event.y);
// };

// var drag = d3.behavior.drag()
//   .origin(function () {
//     var t = d3.select(this);
//     return {x: t.attr("x"), y: t.attr("y")};
//   })

// .on('dragend', function (d) {
//   var mouseCoordinates = d3.mouse(this);
//   if (mouseCoordinates[0] > 170) {
//       //Append new element
//     var newCircle = d3.select("svg").append("circle")
//       .classed("drg", true)
//       .attr("cx", 100)
//       .attr("cy", 100)
//       .attr("r", 20)
//       .attr("cx", mouseCoordinates[0])
//       .attr("cy", mouseCoordinates[1])
//       .style("fill", "white")
//       .style("stroke-width", 2)
//       .style("stroke", "#CDB483")
// //Calling the drag behavior after clonning         .call(
//    d3.behavior.drag()
//      .on('drag', move).origin(function () {
//        var t = d3.select(this);
//        return {x: t.attr("cx"), y: t.attr("cy")};
//      });
//   }
// });
// circle.call(drag);
