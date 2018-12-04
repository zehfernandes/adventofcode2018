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

/*   
p2min        p2max
     .------------.
     |       |
.-----------.
p1min    p1max 
*/
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

getShapes = input => {
  let grid = {};
  let shapes = [];
  let overlapShapes = [];

  for (let i = 0; i < input.length; i++) {
    let shape = input[i];
    let rectA = new Rect(shape.id, shape.x, shape.y, shape.width, shape.height);

    shapes.push(rectA);

    for (let j = i + 1; j < input.length; j++) {
      let shapeB = input[j];
      rectB = overlap2d(
        rectA,
        new Rect(shape.id, shapeB.x, shapeB.y, shapeB.width, shapeB.height)
      );

      if (rectB != null) {
        overlapShapes.push(rectB);

        //Answer
        for (let x = rectB.x; x < rectB.x + rectB.w; x++) {
          for (let y = rectB.y; y < rectB.y + rectB.h; y++) {
            grid[`${x},${y}`] = 1;
          }
        }
      }
    }
  }

  return {
    shapes,
    overlapShapes,
    grid
  };
};

const firstAnswer = input => {
  // Get the overlap area without repeat same shapes
  let { grid } = getShapes(input);
  console.log(Object.values(grid).filter(v => v == 1).length);
};

const parser = input => {
  return input.slice(0, input.length - 1).map(o => {
    const match = /(#\d*)\s@\s(\d*),(\d*):\s(\d*)x(\d*)/g.exec(o);
    return {
      id: match[1],
      x: Number(match[2]),
      y: Number(match[3]),
      width: Number(match[4]),
      height: Number(match[5])
    };
  });
};

module.exports = {
  firstAnswer,
  getShapes,
  parser
};
