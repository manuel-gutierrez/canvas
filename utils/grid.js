/**
 * @description: A class that creates an render a grid of nxn cells.
 * @author:  @manuel-gutierrez
 * @param {object}  gridDefinition - The definition of the grid.
 * @returns {object} grid - The BPM translated to a value between 0 and 1.
 * */

class _Grid {
	constructor(gridDefinition) {
		this.gridDefinition = gridDefinition;
		this.grid = {
			width: gridDefinition.width,
			height: gridDefinition.height,
			cols: gridDefinition.cols,
			rows: gridDefinition.rows,
			cell: { width: 0, height: 0, padding: 0, origin: { x: 0, y: 0 } },
			cellsNumber: this.cols * this.rows, // total number of cells
		};
	}
}
