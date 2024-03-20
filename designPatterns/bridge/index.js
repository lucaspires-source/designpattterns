const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function DrawingAPI() {
  this.drawCircle = function(x, y, radius) {
    throw new Error('You have to implement the method drawCircle!');
  };
}

function DrawingAPI1() {
  DrawingAPI.call(this);

  this.drawCircle = function(x, y, radius) {
    console.log(`API1.circle at ${x}:${y} radius ${radius}`);
  };
}

function DrawingAPI2() {
  DrawingAPI.call(this);

  this.drawCircle = function(x, y, radius) {
    console.log(`API2.circle at ${x}:${y} radius ${radius}`);
  };
}

function Shape(drawingAPI) {
  this.drawingAPI = drawingAPI;

  this.draw = function() {
    throw new Error('You have to implement the method draw!');
  };
}

function CircleShape(x, y, radius, drawingAPI) {
  Shape.call(this, drawingAPI);

  this.x = x;
  this.y = y;
  this.radius = radius;

  this.draw = function() {
    this.drawingAPI.drawCircle(this.x, this.y, this.radius);
  };
}

const drawingAPI1 = new DrawingAPI1();
const drawingAPI2 = new DrawingAPI2();

rl.question('Enter shape type (Circle/Rectangle): ', (shapeType) => {
  try {
    switch (shapeType.toLowerCase()) {
      case 'circle':
        rl.question('Enter x coordinate: ', (x) => {
          rl.question('Enter y coordinate: ', (y) => {
            rl.question('Enter radius: ', (radius) => {
              const circle = new CircleShape(parseFloat(x), parseFloat(y), parseFloat(radius), drawingAPI1);
              circle.draw();
              rl.close();
            });
          });
        });
        break;
      default:
        throw new Error('Unsupported shape type');
    }
  } catch (error) {
    console.error(error.message);
    rl.close();
  }
});
