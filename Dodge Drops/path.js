function Path() {
    var car = new Car;

    this.pathXPos = Math.round(width / 3, 2);
    this.pathWidth = 10;
    this.pathGap = this.pathWidth + (car.carSize * 3);

    this.drawPath = function () {
        rect(this.pathXPos, 0, this.pathWidth, height)
        rect(this.pathXPos + this.pathGap, 0, this.pathWidth, height)
    }
}