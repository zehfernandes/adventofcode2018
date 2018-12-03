const canvasSketch = require("canvas-sketch");
const load = require("load-asset");
const { parser, firstAnswer, secondAnswer } = require("./index.js");

const settings = {
  dimensions: [2048, 2048]
  //animate: true
  //duration: 3
};

canvasSketch(async ({ update }) => {
  const data = await load("./day-01/inputs/input-1.txt");
  const input = parser(data);

  //console.log(`First Answer: ${firstAnswer(input)}`);
  //console.log(`Second Answer: ${secondAnswer(input)}`);

  return ({ context, width, height, time }) => {
    //console.log(time);
    context.fillStyle = "#38121e";
    context.fillRect(0, 0, width, height);
    context.translate(width / 2, height - 100);

    context.strokeStyle = "rgba(210,100,58,0.4)";
    context.lineWidth = 5;
    context.globalCompositeOperation = "lighter";
    let soma = 0;

    input.forEach((x, index) => {
      soma = x + soma;
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(x * 60, -soma);
      context.stroke();
      context.closePath();

      context.arc(x * 60, -soma, 5, 0, 2 * Math.PI);
      context.fill();
    });
  };
}, settings);
