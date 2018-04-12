function Bird() {
    this.birdSize = 20;
    this.birdXPos = 50;
    this.birdYPos = height / 2;

    this.GRAVITY = 0.7;
    this.jumpHeight = -15;
    this.velocity = 0;

    this.drawBird = function () {
        ellipse(this.birdXPos, this.birdYPos, this.birdSize, this.birdSize);
    }

    this.jump = function () {
        this.velocity += this.jumpHeight;
    }

    this.applyGravity = function () {
        this.velocity += this.GRAVITY;
        this.birdYPos += this.velocity;
        this.velocity *= 0.9;

        if (this.birdYPos > height) {
            this.velocity = 0;
            this.birdYPos = height;
        }
        else if (this.birdYPos < 0) {
            this.velocity = 0;
            this.birdYPos = 0;
        }
    }
}