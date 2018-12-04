const canvasSketch = require("canvas-sketch");
const p5 = require("p5");
const { parser } = require("./index.js");

let data;

const preload = p5 => {
  data = p5.loadStrings("./day-03/input.txt");
};

class Point{
    constructor(x, y){
      this.x = x;
      this.y = y;
    }

}

class Rect{
  constructor(id, x, y, w, h){
    this.x = x;
    this.y =  y;
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
function overlap1d(p1min, p1max, p2min, p2max){

  var intersects = p1max >= p2min && p2max >= p1min;

  let a = ( p1min < p2min ) ? p2min : p1min;
  let b = ( p1max > p2max ) ? p2max : p1max;

  return {
      intersects : intersects,
      range : {a: a, b: b}
    }
}


function overlap2d( rectA, rectB )  { 

    pointA = new Point(rectA.x, rectA.y);
    pointAA = new Point(rectA.x + rectA.w, rectA.y + rectA.h)

    pointB =  new Point(rectB.x, rectB.y);
    pointBB =  new Point(rectB.x + rectB.w, rectB.y + rectB.h)

    A = overlap1d( pointA.x, pointAA.x, pointB.x, pointBB.x );
    B = overlap1d( pointA.y, pointAA.y, pointB.y, pointBB.y );

    // console.log(rectA);
    // console.log(rectB);
    // console.log(A);
    // console.log(B);

  if( A.intersects == false || B.intersects == false)  {
    return null;
  }
  return new Rect(-1, A.range.a, B.range.a, A.range.b - A.range.a, B.range.b - B.range.a );

}

function drawRect(p5, rect ){
  p5.rect(rect.x, rect.y, rect.w, rect.h);
}



const settings = {
  p5: { p5, preload },
  dimensions: [1000, 1000]
};

const sketch = async () => {
  const input = parser(data);
  // const input = [
  //   {id: "#1", x: 1, y: 3, width: 4, height: 4},
  //   {id: "#2", x: 3, y: 1, width: 4, height: 4},
  //   {id: "#3", x: 5, y: 5, width: 2, height: 2} 
  // ]

  return ({ p5, time, width, height }) => {

    p5.background(0);
    p5.noStroke();


    let overlaping_inches = 0;

    for(var i=0; i<input.length; i++){
      let shape = input[i];
      let rectA = new Rect(shape.id, shape.x, shape.y, shape.width, shape.height);
      console.log( "area: ", rectA );
      // p5.fill(255, 0, 0, 127);
      // drawRect(p5, rectA);

      for(var j= i + 1; j<input.length; j++){
        let shapeB = input[j];
        rectB = overlap2d(  rectA, new Rect(shapeB.id, shapeB.x, shapeB.y, shapeB.width, shapeB.height) );

        if( rectB !=  null ){
          p5.fill(255, 255, 0);
          drawRect(p5, rectB );

          let area = rectB.w * rectB.h;
          overlaping_inches += area;
        }
      }

    }

    console.log( overlaping_inches );
  
  };
};

canvasSketch(sketch, settings);
