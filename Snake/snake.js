function Snake() {
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.xPos = 0;
    this.yPos = 0;
    this.snakeSize = 10;
    this.snakeLengthArray = [];

    this.drawSnake = function (score) {
        // Print tail
        for (let i = 0; i < score; i++) {
            rect(Math.floor(this.snakeLengthArray[i].xPos), Math.floor(this.snakeLengthArray[i].yPos), this.snakeSize, this.snakeSize);
        }

        // Print head
        rect(Math.floor(this.xPos), Math.floor(this.yPos), this.snakeSize, this.snakeSize);
    }

    this.moveSnake = function (score) {
        for (let i = 0; i < this.snakeLengthArray.length - 1; i++) {
            this.snakeLengthArray[i] = this.snakeLengthArray[i + 1];
        }
        this.snakeLengthArray[score] = { xPos: this.xPos, yPos: this.yPos };

        this.xPos += this.xSpeed * this.snakeSize;
        this.yPos += this.ySpeed * this.snakeSize;
        
        if (this.xPos > width) {
            this.xPos = 0;
        }
        else if (this.xPos < 0) {
            this.xPos = width;
        }
        else if (this.yPos > height) {
            this.yPos = 0;
        }
        else if (this.yPos < 0) {
            this.yPos = height
        }
    }

    this.redirectSnake = function (x, y) {
        this.xSpeed = x;
        this.ySpeed = y;
    }

    this.eatFood = function (food) {
        return (Math.floor(dist(food.foodXPos, food.foodYPos, this.xPos, this.yPos)) <= this.snakeSize);
    }
}