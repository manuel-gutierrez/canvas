/* 
Desc: Unit 5 creating grids. This will create a grid and add some 
randomness to the mix to create noise and movement felling.
*/
const canvasSketch = require("canvas-sketch");

const settings = {
	dimensions: [1000, 1000],
};

const sketch = () => {
	return ({ context, width, height }) => {
		// Context
		context.fillStyle = "red";
		context.fillRect(0, 0, width, height);

		// Grid Object init
		let grid = {
			width: width * 0.9,
			height: height * 0.9,
			cols: 4,
			rows: 4,
			cell: { width: 0, height: 0 },
			cellsNumber: 0,
		};

		// Calculate margins.
		grid.yMargin = (height - grid.height) * 0.5;
		grid.xMargin = (width - grid.width) * 0.5;

		//
		context.fillStyle = "white";
		context.fillRect(grid.xMargin, grid.yMargin, grid.width, grid.height);
		console.log(grid);

		// Calculate cells property.
		grid.cellsNumber = grid.cols * grid.rows;
		grid.cell.width = grid.width / grid.cols;
		grid.cell.height = grid.height / grid.rows;

		for (let index = 0; index < grid.cellsNumber; index++) {
			// Lopping col and row
			const col = index % grid.cols; // 0 to cols
			const row = Math.floor(index / grid.cols); // 0 to row , then  +1

			// x,y Position of the cell
			let x = col * grid.cell.width;
			y = row * grid.cell.height; // Horizontal line.ine.

			// Reduce the Area of the cell so they do not overlap.
			const w = grid.cell.width * 0.9;
			const h = grid.cell.height * 0.9;

			//Draw line
			context.save();
			context.translate(x, y); // Translate to cell top left

			context.translate(grid.xMargin, grid.yMargin); //
			context.translate(grid.cell.width * 0.5, grid.cell.height * 0.5); // translate to cell center
			drawLine(w * -0.5, 0, w * 0.5, 0, context); // Horizontal line.
			drawLine(0, h * -0.5, 0, h * 0.5, context); // Vertical line.
			context.restore();
		}
	};
};
function drawLine(cx, cy, x, y, context) {
	context.beginPath();
	context.moveTo(cx, cy);
	context.lineWidth = 5;
	context.lineTo(x, y);
	context.stroke();
}

canvasSketch(sketch, settings);
