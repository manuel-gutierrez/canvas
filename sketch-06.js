const canvasSketch = require("canvas-sketch");

/*
Exercise: Trying to create a line that expands and contracts based on the BPM represent different types of breathing and movement.

Parameters to play with:

	timePassed: This value represents the time elapsed in milliseconds. As time passes, the value of timePassed increases, which results in the oscillation of the equation.

	bpmInterval: This value represents the time interval between each beat in milliseconds. The greater the value of bpmInterval, the slower the oscillation of the equation.

	
*/

const settings = {
	dimensions: [1020, 1080],
	duration: 200,
	animate: true,
};

const sketch = ({ context, width, height }) => {
	const BPM = 6;
	const BPM_MILLISECONDS = BPM / 60000; // The time interval between each beat in milliseconds
	const START_POSITION = { x: 0, y: height / 2 };
	const END_POSITION = { x: width, y: height / 2 };
	const MIN_EXPANSION = { x: 0, y: height / 2 };
	const RADIAN = 2 * Math.PI; // 360 degrees or full circle.
	const CANVAS_BACKGROUND_COLOR = "#000";
	const LINE_COLOR = "#fff";

	let startTime = Date.now();
	let currentTime; // The current time in milliseconds
	let controlPoint = { x: width / 2, y: 0 }; // The control point of the quadratic curve. This pull the line towards it.

	return ({ context, width, height }) => {
		// Get the current time
		currentTime = Date.now();
		// Calculate the time passed since the animation started
		let timePassed = currentTime - startTime;

		// Refresh the canvas and set the background color.
		fillCanvas(CANVAS_BACKGROUND_COLOR);
		// drawLine(START_POSITION, END_POSITION, LINE_COLOR);
		drawQuadraticCurve(START_POSITION, controlPoint, END_POSITION, LINE_COLOR);
	};
	/*
	Helper function that fills the canvas with a background color.
	*/
	function fillCanvas(color) {
		context.clearRect(0, 0, width, height);
		context.fillStyle = color;
		context.fillRect(0, 0, width, height);
	}

	/* 
	Helper function that draws a line with a stroke color in a x,y position..
	*/
	function drawLine(start, finish, color) {
		context.beginPath();
		context.moveTo(start.x, start.y);
		context.lineTo(finish.x, finish.y);
		context.strokeStyle = color;
		context.stroke();
	}

	/* 
	Helper function to draw a circle with a fill color a given radius in a x,y position.
	The circle is centered in the x,y position.
	
	Parameters:
		x: The x position of the circle
		y: The y position of the circle
		radius: The radius of the circle	
		color: The fill color of the circle
	*/

	function drawFilledCircle(x, y, radius, color) {
		context.beginPath();
		context.arc(x, y, radius, 0, RADIAN);
		context.fillStyle = color;
		context.fill();
	}

	// Helper function to draw a quadratic curve with a stroke color in a x,y position.
	// The curve is centered in the x,y position.
	// @param {number} x - The x position of the curve
	// @param {number} y - The y position of the curve
	// @param {number} radius - The radius of the curve
	// @param {string} color - The stroke color of the curve
	function drawQuadraticCurve(start, controlPoint, finish, color) {
		context.beginPath();
		context.moveTo(start.x, start.y);
		context.quadraticCurveTo(
			controlPoint.x,
			controlPoint.y,
			finish.x,
			finish.y,
		);
		context.strokeStyle = color;
		context.stroke();
	}
};

canvasSketch(sketch, settings);
