const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function Shape() {
    this.type = null;
    this.area = function() {
        throw new Error('This method must be overridden by subclasses');
    };

    this.calculateArea = function() {
        console.log(`Area of ${this.type}: ${this.area()}`);
        rl.close();
    };
}

function Circle(radius) {
    this.type = 'Circle';
    this.radius = radius;

    this.area = function() {
        return Math.PI * this.radius * this.radius;
    };
}
Circle.prototype = new Shape();

function Rectangle(width, height) {
    this.type = 'Rectangle';
    this.width = width;
    this.height = height;

    this.area = function() {
        return this.width * this.height;
    };
}
Rectangle.prototype = new Shape();

const shapeFactory = new ShapeFactory();

rl.question('Enter shape type (Circle/Rectangle): ', (shapeType) => {
    try {
        if (shapeType) {
            const args = [];
            switch (shapeType.toLowerCase()) {
                case 'circle':
                    rl.question('Enter radius: ', (radius) => {
                        args.push(parseFloat(radius));
                        const shape = shapeFactory.createShape(shapeType, ...args);
                        shape.calculateArea();
                    });
                    break;
                case 'rectangle':
                    rl.question('Enter width: ', (width) => {
                        rl.question('Enter height: ', (height) => {
                            args.push(parseFloat(width), parseFloat(height));
                            const shape = shapeFactory.createShape(shapeType, ...args);
                            shape.calculateArea();
                        });
                    });
                    break;
                default:
                    throw new Error('Unsupported shape type');
            }
        }
    } catch (error) {
        console.error(error.message);
        rl.close();
    }
});
