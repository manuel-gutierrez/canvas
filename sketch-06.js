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
	const MIN_EXPANSION = height;
	const RADIAN = 2 * Math.PI; // 360 degrees or full circle.
	const CANVAS_BACKGROUND_COLOR = "#000";
	const LINE_COLOR = "#FFF";

	let startTime = Date.now();
	let currentTime; // The current time in milliseconds
	let controlPoint = { x: width / 2, y: 0 }; // The control point of the quadratic curve. This pull the line towards it.

	return ({ context, width, height }) => {
		// Get the current time
		currentTime = Date.now();

		// Calculate the time passed since the animation started
		let timePassed = currentTime - startTime;
		let amplitude = getSineWavePoint(timePassed, BPM_MILLISECONDS);

		// Calculate the control point
		controlPoint.y = amplitude * MIN_EXPANSION * 0.5 + height / 2; // To make the line expand and contract in the opposite direction, we need to add  (height / 2).
		// Refresh the canvas and set the background color.
		fillCanvas(CANVAS_BACKGROUND_COLOR);
		// Draw the line.
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
	Helper function to get the sine wave point. 
	This is used to calculate the control point of the quadratic curve.

	@param {number} timePassed - The time passed in milliseconds.
	@param {number} bpmInterval - The time interval between each beat in milliseconds.

	*/
	function getSineWavePoint(timePassed, bpmInterval) {
		return (Math.sin(timePassed * bpmInterval * RADIAN) + 1) / 2;
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

	/*Helper function to draw a quadratic curve with a stroke color in a x,y position.
	REF: https://www.w3schools.com/tags/canvas_quadraticcurveto.asp
	The curve is centered in the x,y position.
		@param {object} start - The x,y position where the line starts.
	 	@param {object} controlPoint - The control point that pulls the curve towards it.
		@param {object} finish - The x,y position where the line ends.
	 	@param {string} color - The stroke color of the curve
	 */
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
		context.lineWidth = 4;
		context.stroke();
	}
};

canvasSketch(sketch, settings);
