const canvasSketch = require("canvas-sketch");
const p5 = require("p5");
const random = require("canvas-sketch-util/random");
const { parser, getShapes } = require("./index.js");

let data;

const preload = p5 => {
  data = p5.loadStrings("./day-03/inputs/input-2.txt");
};

const settings = {
  p5: { p5, preload },
  dimensions: [1000, 1000]
};

const sketch = async () => {
  let input = parser(data);
  let { shapes, overlapShapes } = getShapes(input);

  // Parameters
  let mult = 1;

  return ({ p5 }) => {
    p5.blendMode(p5.HARD_LIGHT);
    p5.background("#000");
    p5.noFill();

    overlapShapes.map(elem => {
      p5.strokeWeight(1);
      p5.stroke("#00D5FC");
      p5.rect(elem.x * mult, elem.y * mult, elem.w * mult, elem.h * mult);
    });
  };
};

canvasSketch(sketch, settings);
