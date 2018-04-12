function Car() {
    this.carSize = 50;
    this.carXPos;
    this.carYPos = 400;

    this.initialize = function () {
        this.carXPos = path.pathXPos + path.pathWidth;
    }

    this.drawCar = function (path) {
        rect(this.carXPos, this.carYPos, this.carSize, this.carSize);
    }

    this.moveRight = function (path) {
        if ((this.carXPos + this.carSize) < (path.pathXPos + path.pathGap)) {
            this.carXPos += this.carSize;
        }
    }

    this.moveLeft = function (path) {
        if(this.carXPos > (path.pathXPos + path.pathWidth))
            this.carXPos -= this.carSize;
    }
}