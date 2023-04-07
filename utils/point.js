/**
 * @description: A class of a point and a method to draw it.
 * @author:  @manuel-gutierrez
 * @param {number} x - x position of the point.
 * @param {number} y - y position of the point.
 * */

export class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	drawPoint(context, size, fill) {
		context.fillStyle = fill;
		context.beginPath();
		context.arc(this.x, this.y, size, 0, 2 * Math.PI, false);
		context.fill();
	}
}
