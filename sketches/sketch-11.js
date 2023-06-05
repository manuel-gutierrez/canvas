/* 
Desc:  The golden circle of the coffee cup. Is there a way to make it glow?
*/
const canvasSketch = require("canvas-sketch");
const { Point } = require("../utils/point");

const settings = {
	dimensions: [1000, 1000],
};
// explain the context and the settings
const sketch = () => {
	return ({ context, width, height }) => {
	// Set the background
	context.fillStyle = "rgba(0, 34, 61, 0.92)";
	context.fillRect(0, 0, width, height);
		
	// Variables
	
	 const centerX = width / 2;
	 const centerY = height / 2;
	 const radius = Math.min(width, height) * 0.3;
	 const glowSize = radius * 0.9;
	 const glowAlpha = 0.9; 

	 const coffeeColor = `rgba(22,14,13, ${glowAlpha}`// RGB(63, 34, 15);
	 const coffeeShadowColor = `rgba(63, 34, 15, ${glowAlpha})` // RGB(63, 34, 15);
	 
	 const goldenCoffeeHaloColor = `rgba(146,100,51, ${glowAlpha})` // RGB(255, 215, 0);
	 const goldenCoffeeHaloShadowColor = `rgba(217,165,86, ${glowAlpha})` // RGB(255, 215, 0);
	;
	 

	// function draw a circle with a glow. 
	function drawCircle(radius,fillColor, lineWidth, centerX, centerY) {
		context.beginPath();
		context.arc(centerX, centerY, radius, 0, Math.PI * 2);
		context.lineWidth = lineWidth;
		context.strokeStyle = fillColor;
		context.stroke();
	}

	function gradientCircle(x0, y0, r0, x1, y1, r1,r, c0,c1, shadowColor, glowSize){
		
		context.beginPath();	
		context.arc(centerX, centerY, r, 0, Math.PI * 2);
		const gradient = context.createRadialGradient(x0, y0, r0, x1, y1, r1);

		// Add three color stops
		gradient.addColorStop(0, c0);
		gradient.addColorStop(1, c1);
	
	

		// Set the fill style and draw a crimson circle
		context.fillStyle = gradient;
		context.shadowColor = shadowColor;
		context.shadowBlur = glowSize;
		context.fill();

		console.log(radius)
	}
	// drawCircle(radius * 1.1, goldenCoffeeHaloColor, goldenCoffeeHaloShadowColor, glowSize,centerX, centerY);
	gradientCircle(centerX, centerY, (radius/2) + 80, centerX, centerY, (radius/2)+120, radius, coffeeColor,goldenCoffeeHaloColor,goldenCoffeeHaloShadowColor, glowSize);
	// drawCircle(radius, "hsl(219,19%,80%)", 6,  centerX, centerY);
	};
};

canvasSketch(sketch, settings);
