/**
 * @description: A function that creates a line between two points.
 * @author:  @manuel-gutierrez
 * @param {object}  context - The context of the canvas.
 * @param {object}  origin - The origin of the line.
 * @param {object}  destination - The destination of the line.
 * @param {string}  lineColor - The color of the line.
 * */

export function drawLine(
	context,
	origin,
	destination,
	lineColor = "red",
	lineWidth = 1,
) {
	context.beginPath();
	context.lineWidth = lineWidth;
	context.moveTo(origin.x, origin.y);
	context.lineTo(destination.x, destination.y);
	context.strokeStyle = lineColor;
	context.stroke();
}
