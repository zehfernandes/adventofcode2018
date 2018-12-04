const canvasSketch = require("canvas-sketch");
const p5 = require("p5");
const { parser } = require("./index.js");

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Rect {
  constructor(id, x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.id = id;
  }
}

//   p2min        p2max
//     .------------.
//     |       |
// .-----------.
// p1min    p1max
function overlap1d(p1min, p1max, p2min, p2max) {
  var intersects = p1max >= p2min && p2max >= p1min;

  let a = p1min < p2min ? p2min : p1min;
  let b = p1max > p2max ? p2max : p1max;

  return {
    intersects: intersects,
    range: { a: a, b: b }
  };
}

function overlap2d(rectA, rectB) {
  pointA = new Point(rectA.x, rectA.y);
  pointAA = new Point(rectA.x + rectA.w, rectA.y + rectA.h);

  pointB = new Point(rectB.x, rectB.y);
  pointBB = new Point(rectB.x + rectB.w, rectB.y + rectB.h);

  A = overlap1d(pointA.x, pointAA.x, pointB.x, pointBB.x);
  B = overlap1d(pointA.y, pointAA.y, pointB.y, pointBB.y);

  if (A.intersects == false || B.intersects == false) {
    return null;
  }

  return new Rect(
    -1,
    A.range.a,
    B.range.a,
    A.range.b - A.range.a,
    B.range.b - B.range.a
  );
}

let data;

const preload = p5 => {
  data = p5.loadStrings("./day-03/inputs/input-1.txt");
};

const settings = {
  p5: { p5, preload },
  dimensions: [1000, 1000]
};

const sketch = async () => {
  const input = parser(data);
  // const input = [
  //   { id: "#1", x: 1, y: 3, width: 4, height: 4 },
  //   { id: "#2", x: 3, y: 1, width: 4, height: 4 },
  //   { id: "#3", x: 4, y: 4, width: 2, height: 2 },
  //   { id: "#9", x: 10, y: 10, width: 2, height: 2 }
  // ];

  let grid = Object.create(null);
  let overlaps = [];
  let mult = 1;

  return ({ p5, time, width, height }) => {
    //p5.blendMode(p5.HARD_LIGHT);
    p5.background("#000");
    p5.noStroke();

    for (let i = 0; i < input.length; i++) {
      let shape = input[i];
      let rectA = new Rect(
        shape.id,
        shape.x,
        shape.y,
        shape.width,
        shape.height
      );
      //p5.fill(0, 0, 0, 0);
      //p5.fill("#000");
      //p5.noStroke();
      //p5.rect(rectA.x * mult, rectA.y * mult, rectA.w * mult, rectA.h * mult);
      p5.strokeWeight(2);
      p5.stroke("#00D5FC");
      p5.noFill();
      p5.rect(
        rectA.x * mult,
        rectA.y * mult,
        rectA.w * mult,
        rectA.h * mult,
        10
      );

      p5.blendMode(p5.LIGHTEST);
      p5.stroke(p5.alpha("#0058AC", 0.1));
      p5.rect(
        (rectA.x + 0.5) * mult,
        (rectA.y + 0.5) * mult,
        rectA.w * mult,
        rectA.h * mult,
        10
      );
      p5.blendMode(p5.NORMAL);

      for (let j = i + 1; j < input.length; j++) {
        let shapeB = input[j];
        rectB = overlap2d(
          rectA,
          new Rect(shape.id, shapeB.x, shapeB.y, shapeB.width, shapeB.height)
        );

        if (rectB != null) {
          overlaps.push(rectB);
        }
      }
    }

    overlaps.map(elem => {
      p5.noStroke();
      p5.fill("#000");
      p5.rect(
        elem.x * mult - 2 * mult / 2,
        elem.y * mult - 2 * mult / 2,
        elem.w * mult + 2 * mult,
        elem.h * mult + 2 * mult,
        10
      );
    });

    console.log(Object.values(grid).filter(v => v == 1).length);
  };
};

canvasSketch(sketch, settings);
