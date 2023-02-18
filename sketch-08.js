/**
 * Third attempt on breathing.
 * Idea: Use two circles that act as waves making them intersect.
 * @author Manuel Gutierrez (@manuelgutierrez)
 */
const canvasSketch = require("canvas-sketch");
const settings = {
	dimensions: [1020, 1080],
	duration: 200,
	animate: true,
};

const sketch = ({ context, width, height }) => {

// Create a conic gradient
// The start angle is 0
// The center position is 100, 100
const gradient = context.createConicGradient(height, width/2, height/2);

// Add five color stops
gradient.addColorStop(0, "cyan");
gradient.addColorStop(0.25, "green");
gradient.addColorStop(0.5, "yellow");
gradient.addColorStop(0.75, "red");
gradient.addColorStop(1, "magenta");

// Set the fill style and draw a rectangle
context.fillStyle = gradient;
context.fillRect(0, 0, width, height);


};

canvasSketch(sketch, settings);
