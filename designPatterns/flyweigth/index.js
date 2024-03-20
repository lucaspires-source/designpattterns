const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ShapeFactory() {
    const shapes = {};

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

    this.createShape = function(shapeType, ...args) {
        if (shapes[shapeType]) {
            return shapes[shapeType];
        } else {
            let shape;
            switch (shapeType.toLowerCase()) {
                case 'circle':
                    shape = new Circle(...args);
                    break;
                case 'rectangle':
                    shape = new Rectangle(...args);
                    break;
                default:
                    throw new Error('Unsupported shape type');
            }
            shapes[shapeType] = shape;
            return shape;
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
                        console.log(`Area of ${shape.type}: ${shape.area()}`);
                        rl.close();
                    });
                    break;
                case 'rectangle':
                    rl.question('Enter width: ', (width) => {
                        rl.question('Enter height: ', (height) => {
                            args.push(parseFloat(width), parseFloat(height));
                            const shape = shapeFactory.createShape(shapeType, ...args);
                            console.log(`Area of ${shape.type}: ${shape.area()}`);
                            rl.close();
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
