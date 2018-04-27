let snake;
let food;
let score = 0;

function setup() {
    var canvas = createCanvas(800, 600);
    frameRate(10);

    food = new Food;
    snake = new Snake;
}

function draw() {
    background(0);
    food.drawFood();
    snake.drawSnake(score);
    snake.moveSnake(score);

    if (snake.eatFood(food)) {
        score++;
        food = new Food;
    }
}

function keyPressed() {
    if (keyCode === 39 && snake.xSpeed === 0) {
        snake.redirectSnake(1, 0);
    }
    else if (keyCode === 40 && snake.ySpeed === 0) {
        snake.redirectSnake(0, 1);
    }
    else if (keyCode === 37 && snake.xSpeed === 0) {
        snake.redirectSnake(-1, 0);
    }
    else if (keyCode === 38 && snake.ySpeed === 0) {
        snake.redirectSnake(0, -1);
    }
}