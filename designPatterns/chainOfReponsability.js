const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class ShapeHandler {
    constructor(successor = null) {
        this.successor = successor;
    }

    handle(shapeType) {
        if (this.canHandle(shapeType)) {
            this.process(shapeType);
        } else if (this.successor) {
            this.successor.handle(shapeType);
        } else {
            console.error('Unsupported shape type');
            rl.close();
        }
    }

    canHandle(shapeType) {
        return false;
    }

    process(shapeType) {
        throw new Error('process() method must be implemented by subclasses');
    }
}

class CircleHandler extends ShapeHandler {
    canHandle(shapeType) {
        return shapeType.toLowerCase() === 'circle';
    }

    process(shapeType) {
        rl.question('Enter radius: ', (radius) => {
            const circle = new Circle(parseFloat(radius));
            console.log(`Area of Circle: ${circle.area()}`);
            rl.close();
        });
    }
}

class RectangleHandler extends ShapeHandler {
    canHandle(shapeType) {
        return shapeType.toLowerCase() === 'rectangle';
    }

    process(shapeType) {
        rl.question('Enter width: ', (width) => {
            rl.question('Enter height: ', (height) => {
                const rectangle = new Rectangle(parseFloat(width), parseFloat(height));
                console.log(`Area of Rectangle: ${rectangle.area()}`);
                rl.close();
            });
        });
    }
}

class ShapeFactory {
    constructor() {
        this.handlers = new CircleHandler(new RectangleHandler());
    }

    createShape(shapeType) {
        this.handlers.handle(shapeType);
    }
}

class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    area() {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }
}

const shapeFactory = new ShapeFactory();

rl.question('Enter shape type (Circle/Rectangle): ', (shapeType) => {
    shapeFactory.createShape(shapeType);
});
