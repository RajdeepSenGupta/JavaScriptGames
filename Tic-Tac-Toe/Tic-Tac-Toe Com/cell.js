function Cell(i, j, cellSize) {
    this.i = i;
    this.j = j;
    this.cellSize = cellSize;
    this.cellXPos = this.j * this.cellSize;
    this.cellYPos = this.i * this.cellSize;
    this.showCircle = false;
    this.showCross = false;
    this.isMarked = false;

    this.show = function () {
        stroke(0);
        noFill();
        rect(this.cellXPos, this.cellYPos, this.cellSize, this.cellSize);

        if (this.showCircle) {
            fill(255, 0, 0);
            ellipse(this.cellXPos + this.cellSize / 2, this.cellYPos + this.cellSize / 2, this.cellSize / 2);
        }
        else if (this.showCross) {
            fill(255, 0, 0);
            rect(this.cellXPos + this.cellSize / 3, this.cellYPos + this.cellSize / 3, this.cellSize / 3, this.cellSize / 3);
        }
    }

    this.containsMouse = function (mouseX, mouseY) {
        return (mouseX >= this.cellXPos && mouseX <= this.cellXPos + this.cellSize) && (mouseY >= this.cellYPos && mouseY <= this.cellYPos + this.cellSize);
    }

    this.drawCircle = function () {
        if (!this.isMarked) {
            this.showCircle = true;
            this.showCross = false;
            this.isMarked = true;
        }
    }

    this.drawCross = function () {
        if (!this.isMarked) {
            this.showCross = true;
            this.showCircle = false;
            this.isMarked = true;
        }
    }
}