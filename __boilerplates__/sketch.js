const canvasSketch = require("canvas-sketch");
const load = require("load-asset");

const settings = {
  dimensions: [2048, 2048]
};

canvasSketch(async ({ update }) => {
  const data = await load("./day-01/input.txt");

  update(settings);

  return ({ context, width, height }) => {
    console.log(data);

    context.fillStyle = "red";
    context.fillRect(0, 0, width, height);
  };
});
