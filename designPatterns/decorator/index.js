const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function Shape() {
    this.type = '';
    this.area = function() {
        throw new Error('Method not implemented');
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

function ColorDecorator(shape, color) {
    Shape.call(this);
    this.shape = shape;
    this.color = color;
    this.area = function() {
        return this.shape.area();
    };
    this.describe = function() {
        return `${this.shape.type} with color ${this.color}`;
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
                        rl.question('Enter color: ', (color) => {
                            const decoratedShape = new ColorDecorator(shape, color);
                            console.log(`Area of ${decoratedShape.describe()}: ${decoratedShape.area()}`);
                            rl.close();
                        });
                    });
                    break;
                case 'rectangle':
                    rl.question('Enter width: ', (width) => {
                        rl.question('Enter height: ', (height) => {
                            args.push(parseFloat(width), parseFloat(height));
                            const shape = shapeFactory.createShape(shapeType, ...args);
                            rl.question('Enter color: ', (color) => {
                                const decoratedShape = new ColorDecorator(shape, color);
                                console.log(`Area of ${decoratedShape.describe()}: ${decoratedShape.area()}`);
                                rl.close();
                            });
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
