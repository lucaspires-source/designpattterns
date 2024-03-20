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
}

const shapeFactory = new ShapeFactory();

const initialState = {
    execute: function() {
        rl.question('Enter shape type (Circle/Rectangle): ', (shapeType) => {
            try {
                if (shapeType) {
                    currentState = radiusState;
                    currentState.execute(shapeType);
                }
            } catch (error) {
                console.error(error.message);
                rl.close();
            }
        });
    }
};

const radiusState = {
    execute: function(shapeType) {
        rl.question('Enter radius: ', (radius) => {
            const shape = shapeFactory.createShape(shapeType, parseFloat(radius));
            console.log(`Area of ${shape.type}: ${shape.area()}`);
            rl.close();
        });
    }
};

const rectangleState = {
    execute: function(shapeType) {
        rl.question('Enter width: ', (width) => {
            rl.question('Enter height: ', (height) => {
                const shape = shapeFactory.createShape(shapeType, parseFloat(width), parseFloat(height));
                console.log(`Area of ${shape.type}: ${shape.area()}`);
                rl.close();
            });
        });
    }
};

let currentState = initialState;
currentState.execute();
