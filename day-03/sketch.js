const canvasSketch = require("canvas-sketch");
const p5 = require("p5");
const random = require("canvas-sketch-util/random");
const { parser, getShapes } = require("./index.js");

let data;

const preload = p5 => {
  data = p5.loadStrings("./day-03/inputs/input-1.txt");
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
  let colors = [[0, 79, 170, 255], [255, 205, 0, 255], [255, 0, 16, 255]];

  return ({ p5, time, width, height }) => {
    //p5.blendMode(p5.HARD_LIGHT);
    p5.background("#fff");
    p5.noStroke();

    shapes.map(sq => {
      p5.noStroke();
      p5.fill(0, 0, 0);
      p5.rect(sq.x * mult, sq.y * mult, sq.w * mult, sq.h * mult);
    });

    overlapShapes.map(elem => {
      p5.noStroke();
      p5.fill("#fff");
      p5.rect(elem.x * mult, elem.y * mult, elem.w * mult, elem.h * mult);
    });
  };
};

canvasSketch(sketch, settings);
