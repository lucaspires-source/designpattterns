
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class ShapeObserver {
    update(shape) {
        console.log(`Area of ${shape.type}: ${shape.area()}`);
    }
}

class ShapeFactory {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers(shape) {
        this.observers.forEach(observer => observer.update(shape));
    }

    createShape(shapeType, ...args) {
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
        this.notifyObservers(shape);
        return shape;
    }
}

class Circle {
    constructor(radius) {
        this.type = 'Circle';
        this.radius = radius;
    }

    area() {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle {
    constructor(width, height) {
        this.type = 'Rectangle';
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }
}

const shapeFactory = new ShapeFactory();
const shapeObserver = new ShapeObserver();
shapeFactory.addObserver(shapeObserver);

rl.question('Enter shape type (Circle/Rectangle): ', (shapeType) => {
    try {
        if (shapeType) {
            const args = [];
            switch (shapeType.toLowerCase()) {
                case 'circle':
                    rl.question('Enter radius: ', (radius) => {
                        args.push(parseFloat(radius));
                        shapeFactory.createShape(shapeType, ...args);
                        rl.close();
                    });
                    break;
                case 'rectangle':
                    rl.question('Enter width: ', (width) => {
                        rl.question('Enter height: ', (height) => {
                            args.push(parseFloat(width), parseFloat(height));
                            shapeFactory.createShape(shapeType, ...args);
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