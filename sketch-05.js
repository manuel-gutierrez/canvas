const canvasSketch = require("canvas-sketch");

/*
Exercise: Trying to create a circle that expands and contracts based on the BPM.
The equation that calculates the radius is:
radius = ((Math.sin(timePassed * (bpm / 60000) * 2 * Math.PI) + 1) / 2) * (maxRadius - minRadius) + minRadius;
The variables are:
The timePassed variable is the amount of time that has passed since the animation started.
The bpm variable is the desired beats per minute of the animation.
(bpm / 60000) is used to convert the BPM value to a value in beats per second.
Math.sin(timePassed * (bpm / 60000) * 2 * Math.PI) is used to create a sine wave that oscillates between -1 and 1, where the frequency of the oscillation is determined by the BPM value. The oscillation is also scaled by the timePassed variable.
(Math.sin(timePassed * (bpm / 60000) * 2 * Math.PI) + 1) / 2 is used to shift the values of the sine wave from -1 to 1 to 0 to 1.
(maxRadius - minRadius) is the range of the radius from the minimum value to the maximum value.
((Math.sin(timePassed * (bpm / 60000) * 2 * Math.PI) + 1) / 2) * (maxRadius - minRadius) this gives the radius value which oscillates between the minRadius and maxRadius.
+ minRadius is used to add the minimum radius value to the oscillating radius value, so that the final radius value is within the desired range.    
*/

const settings = {
	dimensions: [1020, 1080],
	fps: 30,
	duration: 4,
};

const sketch = ({ context, width, height }) => {
	let bpm = 6;
	let radius = 60;
	let maxRadius = 100;
	let minRadius = 40;
	let startTime = Date.now();
	const backgroundColor = "#f2f2f2";

	function animate() {
		// Get the current time
		let currentTime = Date.now();
		// Calculate the time passed since the animation started
		let timePassed = currentTime - startTime;
		// Calculate the current radius based on the BPM
		radius =
			((Math.sin(timePassed * (bpm / 60000) * 2 * Math.PI) + 1) / 2) *
				(maxRadius - minRadius) +
			minRadius;
		// Draw the circle
		context.clearRect(0, 0, width, height);
		// Set the background color
		context.fillStyle = backgroundColor;
		context.fillRect(0, 0, width, height);
		// Draw the circle
		context.beginPath();
		context.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
		context.fillStyle = "#0077be"; // Caribbean ocean blue color
		context.fill();
		// Request the next frame
		requestAnimationFrame(animate);
	}

	// Start the animation
	animate();
};

canvasSketch(sketch, settings);
