const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');


const settings = {
  dimensions: [1080, 1080]
};

/*
Idea: Create an abstraction of a trompet,
representing Salsa Music, and my visit to Cali.
*/

const sketch = () => {
  return ({ context, width, height }) => {
    // Draw the white canvas with the dimensions defined in settings.
    context.fillStyle = 'red';
    context.fillRect(0, 0, width, height);
    context.fillStyle = 'white';

    /* 
    Setup the center coordinates of the canvas,
    to be used as point of reference for the slices. 
    */
    const cx = width * 0.5;
    const cy = height * 0.5;

    // Rectangles Width and Height.
    const w = width * 0.01;
    const h = height * 0.1;

    /* 
    Number of Figures divided in a ful circle (360deg) 
    So 12 iterations means that the a slice will be 
    drawn every 30 degrees.
    */
    const iterations = 100;
    //To use the context.rotation we need to covert this to RAD.  
    const slice = math.degToRad(360 / iterations);

    // Radius based on the width of the canvas.
    const radius = height * 0.5;
    console.log(radius)

    let x, y;


    for (let i = 0; i < iterations; i++) {



      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      context.save();


      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(0.1, 2), random.range(0.2, 0.5));

      context.beginPath();
      context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
      context.fill();

      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(5, 20);

      context.beginPath();
      context.arc(0, 0, radius * random.range(0.7, 1.3), slice * random.range(1, -8), slice * random.range(1, 5));
      context.fill();
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
