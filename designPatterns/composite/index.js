const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Shape {
    constructor(type) {
        this.type = type;
    }

    area() {
        throw new Error('Method area() must be implemented');
    }
}

class Circle extends Shape {
    constructor(radius) {
        super('Circle');
        this.radius = radius;
    }

    area() {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super('Rectangle');
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }
}

class CompositeShape extends Shape {
    constructor() {
        super('Composite');
        this.shapes = [];
    }

    addShape(shape) {
        this.shapes.push(shape);
    }

    area() {
        let totalArea = 0;
        this.shapes.forEach(shape => {
            totalArea += shape.area();
        });
        return totalArea;
    }
}

const composite = new CompositeShape();
composite.addShape(new Circle(5));
composite.addShape(new Rectangle(3, 4));

console.log(`Area of composite shape: ${composite.area()}`);

rl.close();
