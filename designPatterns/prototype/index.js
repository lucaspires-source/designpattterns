const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class ShapePrototype {
    clone() {
        throw new Error('clone method must be implemented');
    }
}

class CirclePrototype extends ShapePrototype {
    constructor(radius) {
        super();
        this.type = 'Circle';
        this.radius = radius;
    }

    clone() {
        return new CirclePrototype(this.radius);
    }
}


class RectanglePrototype extends ShapePrototype {
    constructor(width, height) {
        super();
        this.type = 'Rectangle';
        this.width = width;
        this.height = height;
    }

    clone() {
        return new RectanglePrototype(this.width, this.height);
    }
}

class ShapeBuilder {
    constructor() {
        this.shape = {};
    }

    setShapePrototype(prototype) {
        this.shape = prototype.clone();
    }

    calculateArea() {
        if (this.shape.type === 'Circle') {
            this.shape.area = Math.PI * this.shape.radius * this.shape.radius;
        } else if (this.shape.type === 'Rectangle') {
            this.shape.area = this.shape.width * this.shape.height;
        }
    }

    getResult() {
        return this.shape;
    }
}

class ShapeDirector {
    constructor(builder) {
        this.builder = builder;
    }

    constructShape(prototype) {
        this.builder.setShapePrototype(prototype);
        this.builder.calculateArea();
    }
}

const builder = new ShapeBuilder();
const director = new ShapeDirector(builder);

rl.question('Enter shape type (Circle/Rectangle): ', (shapeType) => {
    try {
        if (shapeType) {
            shapeType = shapeType.toLowerCase();
            if (shapeType === 'circle') {
                rl.question('Enter radius: ', (radius) => {
                    const circlePrototype = new CirclePrototype(parseFloat(radius));
                    director.constructShape(circlePrototype);
                    const shape = builder.getResult();
                    console.log(`Area of ${shape.type}: ${shape.area}`);
                    rl.close();
                });
            } else if (shapeType === 'rectangle') {
                rl.question('Enter width: ', (width) => {
                    rl.question('Enter height: ', (height) => {
                        const rectanglePrototype = new RectanglePrototype(parseFloat(width), parseFloat(height));
                        director.constructShape(rectanglePrototype);
                        const shape = builder.getResult();
                        console.log(`Area of ${shape.type}: ${shape.area}`);
                        rl.close();
                    });
                });
            } else {
                throw new Error('Unsupported shape type');
            }
        }
    } catch (error) {
        console.error(error.message);
        rl.close();
    }
});
