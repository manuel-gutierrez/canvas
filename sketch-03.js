const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
import { v4 as uuidv4 } from 'uuid';
const settings = {
  dimensions: [2048, 2048],
  animate: true,
};


const sketch = ({ context, width, height }) => {
  // hold the points. 
  const points = []
  // Number of points
  const numberOfPoints = 6;


  for (let index = 0; index < numberOfPoints; index++) {
    let v = { x: random.range(0, width), y: random.range(0, height), r: random.range(0, 20) }
    points.push(new Point(v.x, v.y, v.r))
  }
  console.log(points)

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    // Draw points per frame
    points.forEach(point => {
      point.updatePosition();
      point.edgeContain(width, height);
      point.collide(points, context);
      point.lineBetweenToPoints(context, points)
      point.drawPoint(context);
    }
    );
  };
};


canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
class Point {
  constructor(x, y, r) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(random.range(-10, 10), random.range(-1, 1));
    this.r = r;
    this.id = uuidv4();
  }

  updatePosition() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  drawLine(context, target, lineWidht) {
    context.lineWidth = lineWidht;
    context.beginPath();
    context.moveTo(this.position.x, this.position.y);
    context.lineTo(target.x, target.y);
    context.stroke();
    context.restore();
  }
  drawPoint(context) {
    context.beginPath();
    context.save();
    context.translate(this.position.x, this.position.y);
    context.arc(0, 0, this.r, 0, Math.PI * 2);
    context.fillStyle = "darkgreen";
    context.fill();
    context.restore();
  }
  // Chage the velocity vector by x value
  changeVelocity(value) {
    const newVelocity = new Vector(this.velocity.x *= value, this.velocity.y *= value)
    return newVelocity;
  }
  //bounce when it touches the edge.
  edgeContain(width, height) {
    if (this.position.x <= 0 || this.position.x >= width) this.velocity.x *= -1;
    if (this.position.y <= 0 || this.position.y >= height) this.velocity.y *= -1;
  }

  collide(points) {
    // To calculate if the circles collide, the distance between centers > R+R == true 
    // https://www.youtube.com/watch?v=LPzyNOHY3A4

    // remove the instance of the actual point.
    let data = points.filter(point => this.id !== point.id);

    data.forEach(otherPoint => {
      // Calculate the distance between two centres.
      const distance = this.position.getDistance(otherPoint.position);
      // Calculate the sum of the radius
      const radius = otherPoint.r + this.r
      // Check if the condition is met.
      if (distance < radius) {
        otherPoint.changeVelocity(-1);
        this.changeVelocity(-1);
      }
    })
  }
  // Draw a line based on the distance between to points.
  lineBetweenToPoints(context, points) {
    let data = points.filter(point => this.id !== point.id);
    data.forEach(point => {
      const dist = this.position.getDistance(point.position);
      this.drawLine(context, point.position, math.mapRange(dist, 0, 200, 12, 0));
    })
  }
}