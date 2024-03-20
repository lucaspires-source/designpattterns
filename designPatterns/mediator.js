const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ShapeMediator() {
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

const shapeMediator = new ShapeMediator();

rl.question('Enter shape type (Circle/Rectangle): ', (shapeType) => {
    try {
        if (shapeType) {
            const args = [];
            switch (shapeType.toLowerCase()) {
                case 'circle':
                    rl.question('Enter radius: ', (radius) => {
                        args.push(parseFloat(radius));
                        const shape = shapeMediator.createShape(shapeType, ...args);
                        console.log(`Area of ${shape.type}: ${shape.area()}`);
                        rl.close();
                    });
                    break;
                case 'rectangle':
                    rl.question('Enter width: ', (width) => {
                        rl.question('Enter height: ', (height) => {
                            args.push(parseFloat(width), parseFloat(height));
                            const shape = shapeMediator.createShape(shapeType, ...args);
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
