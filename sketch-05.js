const canvasSketch = require("canvas-sketch");

/*
Exercise: Trying to create a circle that expands and contracts based on the BPM.

Parameters to play with:

	timePassed: This value represents the time elapsed in milliseconds. As time passes, the value of timePassed increases, which results in the oscillation of the equation.

	bpmInterval: This value represents the time interval between each beat in milliseconds. The greater the value of bpmInterval, the slower the oscillation of the equation.

	RADIAN: This value is a constant representing the number of radians in a circle, which is 2 * Math.PI. It affects the frequency of the oscillation but not its magnitude.

By changing the values of timePassed, bpmInterval, and/or RADIAN, you can control the oscillation of the equation and affect the waveform that it generates.



*/

const settings = {
	dimensions: [1020, 1080],
	duration: 200,
	animate: true,
};
const RADIAN = 2 * Math.PI; // 360 degrees or full circle.

const sketch = ({ context, width, height }) => {
	const bpm = 6;
	const bpmInterval = bpm / 60000; // The time interval between each beat in milliseconds
	const maxRadius = 100;
	const minRadius = 40;
	const backgroundColor = "#f2f2f2";

	let radius = 60;
	let startTime = Date.now();

	return ({ context, width, height }) => {
		// Get the current time
		let currentTime = Date.now();
		// Calculate the time passed since the animation started
		let timePassed = currentTime - startTime;

		/* The equation let wave = (Math.sin(timePassed * bpmInterval * RADIAN) + 1) / 2 scales the output of the Math.sin()
		function from a range of [-1, 1] to [0, 1], which is more useful in many applications, such as audio or graphics.
		The wave variable now represents a value between 0 and 1 that can be used to control the amplitude of a waveform.*/

		let wave = (Math.sin(timePassed * bpmInterval * RADIAN) + 1) / 2;
		radius = wave * (maxRadius - minRadius) + minRadius;

		// Draw the circle
		context.clearRect(0, 0, width, height);
		// Set the background color
		context.fillStyle = backgroundColor;
		context.fillRect(0, 0, width, height);
		// Draw the circle
		drawFilledCircle(width / 2, height / 2, radius, "#0077be");
	};

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
};

canvasSketch(sketch, settings);
