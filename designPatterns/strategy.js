const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function Circle(radius) {
  this.type = 'Circle';
  this.radius = radius;
  this.area = function() {
    return Math.PI * this.radius * this.radius;
  };
}

function Rectangle(width, height) {
  this.type = 'Rectangle';
  this.width = width;
  this.height = height;
  this.area = function() {
    return this.width * this.height;
  };
}

function ShapeFactory() {
  this.createShape = function(shapeType, ...args) {
    switch (shapeType.toLowerCase()) {
      case 'circle':
        return new Circle(...args);
      case 'rectangle':
        return new Rectangle(...args);
      default:
        throw new Error('Unsupported shape type');
    }
  };
}

function ShapeCalculator(strategy) {
  this.calculateArea = function(shapeType, ...args) {
    try {
      const shape = strategy.createShape(shapeType, ...args);
      console.log(`Area of ${shape.type}: ${shape.area()}`);
      rl.close();
    } catch (error) {
      console.error(error.message);
      rl.close();
    }
  };
}

const shapeFactory = new ShapeFactory();
const shapeCalculator = new ShapeCalculator(shapeFactory);

rl.question('Enter shape type (Circle/Rectangle): ', (shapeType) => {
  if (shapeType) {
    switch (shapeType.toLowerCase()) {
      case 'circle':
        rl.question('Enter radius: ', (radius) => {
          shapeCalculator.calculateArea(shapeType, parseFloat(radius));
        });
        break;
      case 'rectangle':
        rl.question('Enter width: ', (width) => {
          rl.question('Enter height: ', (height) => {
            shapeCalculator.calculateArea(shapeType, parseFloat(width), parseFloat(height));
          });
        });
        break;
      default:
        console.error('Unsupported shape type');
        rl.close();
    }
  }
});
