/**
 * @name Wa --ves and Noise.
 * @description: A sketch that generates waves using a grid and noise.
 * @author Manuel Gutierrez (@manuel-gutierrez)
 */

const canvasSketch = require("canvas-sketch");
const { Grid } = require("../utils/grid");
const random = require("canvas-sketch-util/random");

const settings = {
	dimensions: [1080, 1080],
	animate: false,
};
const WAVES_COLORS = [
	"rgba(255, 255, 255, 0.9)", //white
	"rgba(135, 206, 235, 0.9)", // sky blue
	"rgba(0, 105, 148, 0.9)", // sea blue
	"rgba(0, 255, 255, 0.3)", // cyan
	"rgba(0, 191, 255, 0.5)", // deep sky blue
	"rgba(0, 119, 166, 0.9)", // deep sky blue
];

const sketch = () => {
	return ({ context, width, height, frame }) => {
		context.fillStyle = "rgba(0, 34, 61, 0.92)";
		context.fillRect(0, 0, width, height);

		WAVES_COLORS.forEach((color, index) => {
			const cols = random.rangeFloor(0, 110);
			const rows = random.rangeFloor(0, 110);
			const grid = new Grid(width, height, cols, rows, 8);
			grid.drawLineInCell(context, color, 0, frame);
		});
	};
};

canvasSketch(sketch, settings);
