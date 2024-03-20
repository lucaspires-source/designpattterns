const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

function ShapeState(type, state) {
    this.type = type;
    this.state = state;
}

function Circle(radius) {
    this.type = 'Circle';
    this.radius = radius;
    this.area = function() {
        return Math.PI * this.radius * this.radius;
    };
    this.saveState = function() {
        return new ShapeState(this.type, { radius: this.radius });
    };
    this.restoreState = function(state) {
        this.radius = state.radius;
    };
}

function Rectangle(width, height) {
    this.type = 'Rectangle';
    this.width = width;
    this.height = height;
    this.area = function() {
        return this.width * this.height;
    };
    this.saveState = function() {
        return new ShapeState(this.type, { width: this.width, height: this.height });
    };
    this.restoreState = function(state) {
        this.width = state.width;
        this.height = state.height;
    };
}

function Caretaker() {
    this.mementos = [];
    this.addMemento = function(memento) {
        this.mementos.push(memento);
    };
    this.getMemento = function(index) {
        return this.mementos[index];
    };
}

const shapeFactory = new ShapeFactory();
const caretaker = new Caretaker();

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

                        const state = shape.saveState();
                        caretaker.addMemento(state);

                        rl.close();
                    });
                    break;
                case 'rectangle':
                    rl.question('Enter width: ', (width) => {
                        rl.question('Enter height: ', (height) => {
                            args.push(parseFloat(width), parseFloat(height));
                            const shape = shapeFactory.createShape(shapeType, ...args);
                            console.log(`Area of ${shape.type}: ${shape.area()}`);

                            const state = shape.saveState();
                            caretaker.addMemento(state);

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
