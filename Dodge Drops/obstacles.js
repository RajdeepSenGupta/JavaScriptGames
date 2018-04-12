function Obstacle() {
    var car = new Car;
    var path = new Path;

    this.obstacleXPos = (path.pathXPos + path.pathWidth) + (car.carSize * Math.round(random(0, 2)));
    this.obstacleYPos = 0;
    this.obstacleShift = car.carSize * Math.round(random(0, 2));
    this.obstacle2XPos = 0;

    this.speed = 0;

    this.initializeSpeed = function (speed) {
        this.speed = speed;
    }

    this.drawObstacle = function () {
        rect(this.obstacleXPos, this.obstacleYPos, car.carSize, car.carSize);

        this.obstacle2XPos = this.obstacleXPos + this.obstacleShift;
        if (this.obstacle2XPos < (path.pathXPos + path.pathGap)) {
            rect(this.obstacle2XPos, this.obstacleYPos, car.carSize, car.carSize);
        }
        else {
            this.obstacle2XPos = 0;
        }
    }

    this.moveObstacle = function () {
        this.obstacleYPos += this.speed;
    }

    this.obstacleHit = function (car, obstacle) {
        if ((car.carYPos < obstacle.obstacleYPos + car.carSize) && (obstacle.obstacleYPos + car.carSize < height)
            && ((car.carXPos == obstacle.obstacleXPos) || (car.carXPos == obstacle.obstacle2XPos))) {
            return true;
        }
        else {
            return false;
        }
    }
}