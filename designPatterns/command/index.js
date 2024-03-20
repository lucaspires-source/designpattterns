const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Command {
    execute() {
        throw new Error('execute() method must be implemented by subclasses');
    }
}

class CircleCommand extends Command {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    execute() {
        const circle = new Circle(this.radius);
        console.log(`Area of Circle: ${circle.area()}`);
        rl.close();
    }
}

class RectangleCommand extends Command {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    execute() {
        const rectangle = new Rectangle(this.width, this.height);
        console.log(`Area of Rectangle: ${rectangle.area()}`);
        rl.close();
    }
}

class ShapeFactory {
    constructor() {
        this.commands = {
            'circle': CircleCommand,
            'rectangle': RectangleCommand
        };
    }

    createShape(shapeType, ...args) {
        const CommandClass = this.commands[shapeType.toLowerCase()];
        if (CommandClass) {
            const command = new CommandClass(...args);
            command.execute();
        } else {
            console.error('Unsupported shape type');
            rl.close();
        }
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
    shapeType = shapeType.toLowerCase();
    if (shapeType === 'circle') {
        rl.question('Enter radius: ', (radius) => {
            shapeFactory.createShape(shapeType, parseFloat(radius));
        });
    } else if (shapeType === 'rectangle') {
        rl.question('Enter width: ', (width) => {
            rl.question('Enter height: ', (height) => {
                shapeFactory.createShape(shapeType, parseFloat(width), parseFloat(height));
            });
        });
    } else {
        console.error('Unsupported shape type');
        rl.close();
    }
});
