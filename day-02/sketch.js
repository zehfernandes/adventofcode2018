const canvasSketch = require("canvas-sketch");
const p5 = require("p5");
const mapObj = require("map-obj");

const { parser, firstAnswer, secondAnswer } = require("./index.js");

let input;

const preload = p5 => {
  input = p5.loadStrings("./day-02/inputs/input-1.txt");
};

const settings = {
  p5: { p5, preload },
  animate: true,
  dimensions: [2048, 2048]
};

countLetters = id => {
  const arr = id.split("");
  const obj = {};
  arr.forEach((letter, i) => {
    if (obj[letter]) {
      obj[letter].count = obj[letter].count + 1;
      obj[letter].index.push(i);
    } else {
      obj[letter] = { count: 1, index: [i], letter: letter };
    }
  });

  return obj;
};

const mapToPlot = input => {
  let arrID = input.map(id => {
    return Object.values(countLetters(id)).map(n => {
      if (n.count === 2 || n.count === 3) {
        return { pos: n.index, count: n.count, letter: n.letter };
      } else {
        return null;
      }
    });
  });

  return arrID;
};

const sketch = async () => {
  const plot = mapToPlot(input);
  //console.log(`First Answer: ${firstAnswer(input)}`);

  return ({ p5, time, width, height }) => {
    const row = width / input[0].length;
    const col = height / input.length;

    console.log(row);
    console.log(col);

    p5.background(0);
    p5.fill(0);
    p5.noStroke();

    plot.forEach((el, y) => {
      el.forEach((rec, x) => {
        if (rec === null) {
          return;
        }

        rec.pos.map(n => {
          let color = rec.count <= 2 ? 90 : 255;
          p5.fill(color);
          p5.rect(row * n, col * y, row - 20, 3);
          // if (rec.count > 2) {
          //   p5.rect(row * n, col * y, width, 8);
          // }
        });
      });
    });
  };
};

canvasSketch(sketch, settings);
