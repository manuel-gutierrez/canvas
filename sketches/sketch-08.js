/**
 * Third attempt on breathing.
 * Idea: Use bezier curves that act as WAVES making them intersect.
 * @author Manuel Gutierrez @manuel-gutierrez
 */

const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

// Variables
const BPM = require("./utils/bpm");
const bpm = BPM.bpmInit(4);
const CANVAS_BACKGROUND_COLOR = "#FFBA42";
const WAVE_LINE_WIDTH = 1;

const settings = {
	dimensions: [1024, 1024],
	animate: true /* Set this to true to see the animation */,
};

class Wave {
	constructor(points, lineWidth, color) {
		this.points = points;
		this.lineWidth = lineWidth;
		this.color = color;
	}
	drawWave(context, offsetBetweenWaves) {
		context.save();
		context.translate(0, offsetBetweenWaves);
		context.beginPath();
		context.moveTo(this.points[0].x, this.points[0].y);
		context.bezierCurveTo(
			this.points[1].x,
			this.points[1].y,
			this.points[2].x,
			this.points[2].y,
			this.points[3].x,
			this.points[3].y,
		);
		context.lineWidth = this.lineWidth;
		context.strokeStyle = this.color;
		context.fillStyle = this.color;
		context.fill();
		context.stroke();
		context.restore();
	}
}

const sketch = () => {
	return ({ context, width, height }) => {
		fillCanvas(CANVAS_BACKGROUND_COLOR);
		const offsetBetweenWaves = 80;
		const controlOffset = 180 * bpm.getDataPoint();
		const waves = [];
		const WAVES_COLORS = [
			"rgba(255, 255, 255, 0.9)", //white
			"rgba(173, 216, 230, 0.3)", // light blue
			"rgba(135, 206, 235, 0.25)", // sky blue
			"rgba(0, 255, 255, 0.18)", // cyan
			"rgba(0, 191, 255, 0.3)", // deep sky blue
		];
		const WAVE_POINTS = [
			{ x: width / 4, y: height + controlOffset }, // starting point
			{
				x: 0.2 * bpm.getDataPoint() + controlOffset,
				y: height * 0.6 * bpm.getDataPoint() + controlOffset,
			}, // control point 1
			{
				x: width * 0.3 * bpm.getDataPoint() + controlOffset,
				y: height * 0.4 * bpm.getDataPoint() + controlOffset,
			}, // control point 2
			{ x: width + 400, y: height + controlOffset }, // ending point
		];

		WAVES_COLORS.forEach((color) => {
			waves.push(new Wave(WAVE_POINTS, WAVE_LINE_WIDTH, color));
		});

		waves.forEach((wave, index) => {
			wave.drawWave(context, offsetBetweenWaves * index);
		});
		// WAVE_POINTS.forEach((point, index) => {
		// 	const color = WAVES_COLORS[index];
		// 	drawPoint(context, point.x, point.y, 10, color);
		// });
		/*
		Helper function that fills the canvas with a background color.
		*/
		function fillCanvas(color) {
			context.clearRect(0, 0, width, height);
			context.fillStyle = color;
			context.fillRect(0, 0, width, height);
		}
	};

	function drawPoint(context, x, y, size, fill) {
		context.fillStyle = fill;
		context.beginPath();
		context.arc(x, y, size, 0, 2 * Math.PI, false);
		context.fill();
	}
};

canvasSketch(sketch, settings);
