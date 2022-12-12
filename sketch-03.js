const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");
// import { v4 as uuidv4 } from 'uuid';

const settings = {
  // Enable an animation loop

  animate: true,
  // Set loop duration to 3
  // duration: 0.2,
  // Use a small size for better GIF file size
  dimensions: [1020, 1080],
  // Optionally specify a frame rate, defaults to 30
  fps: 30,
};

// Globals
const minDistanceBetweenCircles = 90;
const circleStrokeColor = "#1d3557";
const lineColor = "#e63946";
const numberOfCirclesInScreen = 20;
const maxV = 10.3;
const minV = -2.3;

canvasSketch(({ context, width, height, playhead }) => {
  // Variables
  const randomXRangeLimit = width * 0.9;
  const randomYRangeLimit = height * 0.9;
  // Create Array of Circles.
  const circles = bulkCircleCreation(
    numberOfCirclesInScreen,
    randomXRangeLimit,
    randomYRangeLimit
  ); // create an array of points to draws
  // Loop Starts
  return ({ context, width, height, playhead }) => {
    context.fillStyle = "#f1faee";
    context.fillRect(0, 0, width, height);
    // Animate the cirles
    circles.forEach((circle) => {
      circle.update();
      circle.wrap(width, height); // pacman mode
      circle.bounce(width, height); // billard mode
      circle.draw(context, circleStrokeColor);
    });
    drawLineBetweenCircles();

    // eslint-disable-next-line require-jsdoc
    function drawLineBetweenCircles() {
      // Start with first Element.
      for (let index = 0; index < circles.length; index++) {
        const element = circles[index];
        // Start with first Element.
        for (let nextIndex = 1; nextIndex < circles.length; nextIndex++) {
          const nextElement = circles[nextIndex];
          // compare two distances
          const d = element.pos.getDistance(nextElement.pos);
          if (d < minDistanceBetweenCircles) {
            // draw a line between the two elements.
            element.drawLine(context, nextElement, d);
          } else {
            continue;
          }
        }
      }
    }
  };
}, settings);
/**
 * Add two numbers.
 * @param {x} num1 The first number.
 * @param {y} num2 The second number.
 * @return {Vector} The sum of the two numbers.
 */
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(vect) {
    const dx = this.x - vect.x;
    const dy = this.y - vect.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Circle {
  constructor(x, y) {
    // Position  and velocity
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(maxV, minV), random.range(maxV, minV));
    // Radius
    this.radius = random.range(3, 20);
  }

  draw(context, color) {
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.lineWidth = 4;
    context.lineColor = lineColor;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.strokeStyle = circleStrokeColor;
    context.stroke();
    context.restore();
  }
  drawLine(context, element, distance) {
    context.beginPath();
    context.lineWidth = math.mapRange(
      distance,
      0,
      minDistanceBetweenCircles,
      1,
      3
    );
    context.moveTo(element.pos.x, element.pos.y);
    context.lineTo(this.pos.x, this.pos.y);
    context.strokeStyle = lineColor;
    context.stroke();
  }

  // Bounce with the limits of the screen.
  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }

  // Bounce with the limits of the screen.
  wrap(width, height) {
    if (this.pos.x >= width) this.pos.x = 0;
    if (this.pos.y >= height) this.pos.y = 0;
  }

  // Move a step the position of the circle.
  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  // logs position.
  position() {
    console.log("Pos x:" + this.x, "Pos y:" + this.y);
  }
}

const bulkCircleCreation = (numberOfCircles, rangeX, rangeY) => {
  const circleArray = [];
  for (let index = 0; index < numberOfCircles; index++) {
    circleArray.push(
      new Circle(random.range(0, rangeX), random.range(0, rangeY), 20)
    );
  }
  return circleArray;
};
