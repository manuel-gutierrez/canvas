const canvasSketch = require("canvas-sketch");
const { Point } = require("../utils/point");

const settings = {
	dimensions: [1080, 1080],
};

const sketch = () => {
	let point = new Point(500, 500);
	return ({ context, width, height }) => {
		context.fillStyle = "white";
		context.fillRect(0, 0, width, height);
		point.drawPoint(context, 10, "red");
	};
};

canvasSketch(sketch, settings);
