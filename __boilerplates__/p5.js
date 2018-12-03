const canvasSketch = require("canvas-sketch");
const p5 = require("p5");

let data;

const preload = p5 => {
  data = p5.loadStrings("./day-01/input.txt");
};

const settings = {
  p5: { p5, preload },
  dimensions: [2048, 2048]
};

const sketch = async () => {
  return ({ p5, time, width, height }) => {
    console.log(data);

    p5.background(0);
    p5.fill(0);
    p5.noStroke();
  };
};

canvasSketch(sketch, settings);
