
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ShapeFactory() {
    this.createShape = function() {
        throw new Error('This method should be implemented by subclasses');
    };
}

function CircleFactory() {
    ShapeFactory.call(this);

    this.createShape = function(radius) {
        return new Circle(radius);
    };
}

function RectangleFactory() {
    ShapeFactory.call(this);

    this.createShape = function(width, height) {
        return new Rectangle(width, height);
    };
}

function Shape() {
    this.type = '';
    this.area = function() {
        throw new Error('This method should be implemented by subclasses');
    };
}

function Circle(radius) {
    Shape.call(this);

    this.type = 'Circle';
    this.radius = radius;
    this.area = function() {
        return Math.PI * this.radius * this.radius;
    };
}

function Rectangle(width, height) {
    Shape.call(this);

    this.type = 'Rectangle';
    this.width = width;
    this.height = height;
    this.area = function() {
        return this.width * this.height;
    };
}

rl.question('Enter shape type (Circle/Rectangle): ', (shapeType) => {
    try {
        if (shapeType) {
            const shapeFactory = createFactory(shapeType.toLowerCase());
            rl.question(`Enter ${shapeType.toLowerCase() === 'circle' ? 'radius' : 'width'}: `, (dimension1) => {
                if (shapeType.toLowerCase() === 'circle') {
                    const shape = shapeFactory.createShape(parseFloat(dimension1));
                    console.log(`Area of ${shape.type}: ${shape.area()}`);
                    rl.close();
                } else {
                    rl.question('Enter height: ', (dimension2) => {
                        const shape = shapeFactory.createShape(parseFloat(dimension1), parseFloat(dimension2));
                        console.log(`Area of ${shape.type}: ${shape.area()}`);
                        rl.close();
                    });
                }
            });
        }
    } catch (error) {
        console.error(error.message);
        rl.close();
    }
});

function createFactory(shapeType) {
    switch (shapeType) {
        case 'circle':
            return new CircleFactory();
        case 'rectangle':
            return new RectangleFactory();
        default:
            throw new Error('Unsupported shape type');
    }
}
