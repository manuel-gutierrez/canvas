/**
 * Third attempt on breathing.
 * Idea: Use two circles that act as WAVES making them intersect.
 * @author Manuel Gutierrez (@manuelgutierrez)
 */

const canvasSketch = require("canvas-sketch");
const BPM = require("./utils/bpm");
const bpm = BPM.bpmInit(6);

const settings = {
	dimensions: [800, 600],
	animate: false,
	duration: 4,
};

const sketch = () => {
	return ({ context, width, height }) => {
		console.log("Point", bpm.getSineWavePoint());
	};
};

canvasSketch(sketch, settings);
