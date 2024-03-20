const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class ShapeBuilder {
    constructor() {
        this.shape = {};
    }
    
    setType(type) {
        this.shape.type = type;
    }

    setRadius(radius) {
        this.shape.radius = radius;
    }

    setWidth(width) {
        this.shape.width = width;
    }

    setHeight(height) {
        this.shape.height = height;
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

    constructCircle(radius) {
        this.builder.setType('Circle');
        this.builder.setRadius(radius);
        this.builder.calculateArea();
    }

    constructRectangle(width, height) {
        this.builder.setType('Rectangle');
        this.builder.setWidth(width);
        this.builder.setHeight(height);
        this.builder.calculateArea();
    }
}

class Shape {
    constructor() {
        this.type = '';
        this.area = 0;
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.type = 'Circle';
        this.radius = radius;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.type = 'Rectangle';
        this.width = width;
        this.height = height;
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
                    director.constructCircle(parseFloat(radius));
                    const shape = builder.getResult();
                    console.log(`Area of ${shape.type}: ${shape.area}`);
                    rl.close();
                });
            } else if (shapeType === 'rectangle') {
                rl.question('Enter width: ', (width) => {
                    rl.question('Enter height: ', (height) => {
                        director.constructRectangle(parseFloat(width), parseFloat(height));
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


