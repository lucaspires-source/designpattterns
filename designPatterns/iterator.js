const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ShapeFactory() {
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
        switch (shapeType.toLowerCase()) {
            case 'circle':
                return new Circle(...args);
            case 'rectangle':
                return new Rectangle(...args);
            default:
                throw new Error('Unsupported shape type');
        }
    };

    // Iterator class
    this.ShapeIterator = function(shapes) {
        this.shapes = shapes;
        this.index = 0;
    };

    this.ShapeIterator.prototype.hasNext = function() {
        return this.index < this.shapes.length;
    };

    this.ShapeIterator.prototype.next = function() {
        if (this.hasNext()) {
            return this.shapes[this.index++];
        }
        return null;
    };
}

const shapeFactory = new ShapeFactory();
const shapes = [];

rl.question('Enter shape type (Circle/Rectangle): ', (shapeType) => {
    try {
        if (shapeType) {
            const args = [];
            switch (shapeType.toLowerCase()) {
                case 'circle':
                    rl.question('Enter radius: ', (radius) => {
                        args.push(parseFloat(radius));
                        const shape = shapeFactory.createShape(shapeType, ...args);
                        shapes.push(shape);
                        rl.close();
                    });
                    break;
                case 'rectangle':
                    rl.question('Enter width: ', (width) => {
                        rl.question('Enter height: ', (height) => {
                            args.push(parseFloat(width), parseFloat(height));
                            const shape = shapeFactory.createShape(shapeType, ...args);
                            shapes.push(shape);
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

rl.on('close', () => {
    const iterator = new shapeFactory.ShapeIterator(shapes);
    console.log('Iterating through shapes:');
    while (iterator.hasNext()) {
        const shape = iterator.next();
        console.log(`${shape.type}: ${shape.area()}`);
    }
});
