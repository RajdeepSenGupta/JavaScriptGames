function Pipe() {
    this.pipeHeight = random(height / 2);
    this.pipeWidth = 50;
    this.pipeXPos = window.innerWidth - width;
    this.pipeYPos = 0;
    this.pipeGap = 100;
    this.lowerPipeHeight = height - this.pipeHeight;
    this.lowerPipeYPos = this.pipeYPos + this.pipeHeight + this.pipeGap;

    this.speed = 3;

    this.drawPipe = function () {
        rect(this.pipeXPos, this.pipeYPos, this.pipeWidth, this.pipeHeight);
        rect(this.pipeXPos, this.lowerPipeYPos, this.pipeWidth, this.lowerPipeHeight);
    }

    this.movePipe = function () {
        this.pipeXPos -= this.speed;
    }

    this.pipeHit = function (bird) {
        // Upper pipes
        if (bird.birdYPos < (this.pipeYPos + this.pipeHeight)
            && (bird.birdXPos >= this.pipeXPos)) {
            return true;
        }
        else if (bird.birdYPos >= this.lowerPipeYPos
            && bird.birdXPos >= this.pipeXPos) {
            return true;
        }
        else {
            return false;
        }
    }
}