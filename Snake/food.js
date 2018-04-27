function Food() {
    this.foodSize = 10;
    this.foodXPos = Math.floor(random(width - this.foodSize));
    this.foodYPos = Math.floor(random(height - this.foodSize));

    this.drawFood = function () {
        fill(255);
        rect(this.foodXPos, this.foodYPos, this.foodSize, this.foodSize);
    }
}