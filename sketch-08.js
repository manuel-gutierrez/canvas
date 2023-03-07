/**
 * Third attempt on breathing.
 * Idea: Use two circles that act as WAVES making them intersect.
 * @author Manuel Gutierrez (@manuelgutierrez)
 */

const canvasSketch = require("canvas-sketch");

const settings = {
	dimensions: [800, 600],
	animate: false,
	duration: 4,
};

class Wave {
	constructor(points, lineWidth, color) {
		this.points = points;
		this.lineWidth = lineWidth;
		this.color = color;
	}
}

const sketch = () => {
	// TO DO: Refactor waves to have a single object with all the properties.
	const CANVAS_BACKGROUND_COLOR = "000";
	// Fill the canvas with a background color.

	return ({ context, width, height, playhead }) => {
		const WAVES_COLORS = [
			"white",
			"lightblue",
			"skyblue",
			"cyan",
			"deepskyblue",
		];
		const WAVE_POINTS = [
			{ x: 0, y: 0 }, // starting point
			{ x: 200, y: -400 }, // control point 1
			{ x: width - 200, y: -400 }, // control point 2
			{ x: width, y: 0 }, // ending point
		];
		fillCanvas(context, CANVAS_BACKGROUND_COLOR);
		// Draw the waves based on the number of colors.
		WAVES_COLORS.forEach((color, i) => {
			context.save();
			context.translate(0, height / 2 + i * 100);
			// WAVE_POINTS.forEach((point, index) => {
			// 	drawPoint(context, point.x, point.y, 10, "red");
			// });
			const WAVE = new Wave(WAVE_POINTS, 4, color);
			drawWave(context, WAVE);
			context.restore();
		});
	};
	function drawWave(context, wave) {
		const POINTS = wave.points;
		context.fillStyle = wave.color;
		context.beginPath();
		context.moveTo(POINTS[0].x, POINTS[0].y);
		context.bezierCurveTo(
			POINTS[1].x,
			POINTS[1].y,
			POINTS[2].x,
			POINTS[2].y,
			POINTS[3].x,
			POINTS[3].y,
		);
		context.lineWidth = wave.lineWidth;
		context.color = wave.color;
		context.fill();
		context.stroke();
	}

	function drawPoint(context, x, y, size, fill) {
		context.fillStyle = fill;
		context.beginPath();
		context.arc(x, y, size, 0, 2 * Math.PI, false);
		context.fill();
	}
	/*
	Helper function that fills the canvas with a background color.
	*/
	function fillCanvas(context, color) {
		context.clearRect(0, 0, width, height);
		context.fillStyle = color;
		context.fillRect(0, 0, width, height);
	}
};

canvasSketch(sketch, settings);
