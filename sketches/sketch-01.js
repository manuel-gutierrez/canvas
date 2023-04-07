const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
	dimensions: [20, 20], // 20x20 cm
	units: "cm",
	pixelsPerInch: 300,
};

/*
Idea: Create an abstraction of a trumpet,
representing Salsa Music.

Plot figures in the canvas plain by using 
basic concepts of trigonometry, applying transforms.
*/

const sketch = () => {
	return ({ context, width, height }) => {
		// Margin in inches
		const margin = 1 / 189;

		// Off-white background
		context.fillStyle = "hsl(0, 0%, 0%)";
		context.fillRect(0, 0, width, height);

		// Gradient foreground
		const fill = context.createLinearGradient(0, 0, width, height);
		fill.addColorStop(0, "#d7263d");
		fill.addColorStop(1, "#2b2d42");

		// Fill rectangle
		context.fillStyle = fill;
		context.fillRect(margin, margin, width - margin * 2, height - margin * 2);

		// context.fillStyle = '#d7263d';
		// context.fillRect(0, 0, width, height);

		//Set the filling color for the objects.
		context.fillStyle = "#370617";
		context.strokeStyle = "#ffba08";

		/* 
    Setup the center coordinates of the canvas,
    to be used as point of reference for the slices. 
    */
		const cx = width * 0.5;
		const cy = height * 0.5;

		// Rectangles Width and Height.
		const w = width * 0.01;
		const h = height * 0.14;

		/* 
    Number of Figures divided in a ful circle (360deg) 
    So 12 iterations means that the a slice will be 
    drawn every 30 degrees.
    */
		const iterations = 45;

		//To use the context.rotation we need to covert this to RAD.
		const slice = math.degToRad(360 / iterations);

		// Circle minimum Radius, for the trumpet.
		// TO DO: Play with the radius to create something like a cone.
		const radius = width * 0.45;

		// New Origins and Angles to transform the origin.
		let x;
		let y;
		let angle;

		function randomRects(x, y, angle, w, h) {
			context.save();
			//Move the origin to x and y.
			context.translate(x, y);
			context.beginPath();
			context.rotate(-angle);
			context.scale(random.range(0.1, 1.9), random.range(0.01, 0.9));
			context.rect(w * 0.5, random.range(0, h * 0.3), w, h);
			context.fill();
			context.restore();
		}

		function randomArc(cx, cy, angle) {
			context.save();
			context.translate(cx, cy);
			context.rotate(-angle);
			context.lineWidth = random.range(0.01, 0.15);
			context.beginPath();
			context.arc(
				0,
				0,
				radius * random.range(0.1, 1.2),
				slice * random.range(1, -9),
				slice * random.range(1, 3),
			);
			context.fill();
			context.stroke();
			context.restore();
		}

		function linesFromCenter(cx, cy) {
			context.beginPath();
			context.moveTo(cx, cy);
			context.lineWidth = random.range(0.01, 0.09);
			context.lineTo(x, y);
			context.stroke();
		}

		for (let i = 0; i < iterations; i++) {
			// Set the angle to the first point in the circle.
			angle = slice * i;

			// Define position in the plane.
			//Sin(0), Cos(0) = 0,1
			x = cx + radius * Math.sin(angle);
			y = cy + radius * Math.cos(angle);

			/* 
      First block: 
      Draw some random rectangles around a circle, 
      with different sizes. 
      */
			linesFromCenter(cx, cy);
			randomArc(cx, cy, angle);
			randomRects(x, y, angle, w, h);
		}
	};
};

canvasSketch(sketch, settings);
