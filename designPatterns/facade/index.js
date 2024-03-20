const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function ShapeFacade() {
    const shapeFactory = new ShapeFactory();

    this.createShape = function(shapeType, ...args) {
        return shapeFactory.createShape(shapeType, ...args);
    };

    this.askForInput = function(shapeType, callback) {
        switch (shapeType.toLowerCase()) {
            case 'circle':
                rl.question('Enter radius: ', (radius) => {
                    callback(parseFloat(radius));
                });
                break;
            case 'rectangle':
                rl.question('Enter width: ', (width) => {
                    rl.question('Enter height: ', (height) => {
                        callback(parseFloat(width), parseFloat(height));
                    });
                });
                break;
            default:
                throw new Error('Unsupported shape type');
        }
    };
}

// Shape Factory
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
}

const shapeFacade = new ShapeFacade();

rl.question('Enter shape type (Circle/Rectangle): ', (shapeType) => {
    try {
        if (shapeType) {
            shapeFacade.askForInput(shapeType, (...args) => {
                const shape = shapeFacade.createShape(shapeType, ...args);
                console.log(`Area of ${shape.type}: ${shape.area()}`);
                rl.close();
            });
        }
    } catch (error) {
        console.error(error.message);
        rl.close();
    }
});
 