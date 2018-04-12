var score = 0;
var path, car, obstacles = [];
var speed = 2;

function setup() {
    var canvas = createCanvas(700, 500);
    path = new Path;
    car = new Car;
    car.initialize(path);

    var obstacle = new Obstacle;
    obstacle.initializeSpeed(this.speed);
    obstacles.push(obstacle);
}

function draw() {
    background(0);
    path.drawPath();
    car.drawCar();

    if (frameCount % Math.floor(200 / speed) == 0) {
        var obstacle = new Obstacle;
        obstacle.initializeSpeed(this.speed);
        obstacles.push(obstacle);
    }

    for (var i = 0; i < obstacles.length; i++) {
        if (!obstacles[i].obstacleHit(car, obstacles[i])) {
            obstacles[i].drawObstacle();
            obstacles[i].moveObstacle();

            if (obstacles[i].obstacleYPos >= car.carYPos + car.carSize) {
                obstacles.splice(i, 1);
                score++;
            }

            if (score == 15) {
                score++;
                this.speed++;
                obstacles = [];
            }
        }
        else {
            obstacles = [];
            speed = 2;
            alert("Game Over! \n Score: " + score);
            score = 0;
            break;
        }
    }
}

function keyPressed() {
    if (keyCode == 37) {        // Left key
        car.moveLeft(path);
    }
    else if (keyCode == 39) {   // Right key
        car.moveRight(path);
    }
}