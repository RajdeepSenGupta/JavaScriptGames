function Cell(i, j, cellSize) {
    this.i = i;
    this.j = j;
    this.cellSize = cellSize;
    this.cellXPos = this.j * this.cellSize;
    this.cellYPos = this.i * this.cellSize;
    this.mine = false;
    this.value = 0;
    this.hidden = true;
    this.marked = false;

    this.show = function () {
        stroke(0);
        noFill();
        rect(this.cellXPos, this.cellYPos, this.cellSize, this.cellSize);

        // Show mines/values
        if (!this.hidden) {
            if (this.mine) {
                fill(255, 30, 30);
                ellipse(this.cellXPos + this.cellSize / 2, this.cellYPos + this.cellSize / 2, this.cellSize / 2);
            }
            else {
                textAlign(CENTER);
                fill(0);
                text(this.value, this.cellXPos + this.cellSize / 2, this.cellYPos + this.cellSize / 2);
            }
        }
        else if (this.marked) {
            fill(255, 30, 255);
            ellipse(this.cellXPos + this.cellSize / 2, this.cellYPos + this.cellSize / 2, this.cellSize / 2);
        }
    }

    this.calculateMines = function (rows, cols, grid) {
        let mineCount = 0;
        for (let i = this.i - 1; i <= this.i + 1; i++) {
            for (let j = this.j - 1; j <= this.j + 1; j++) {
                if (((i >= 0 && j >= 0) && (i < rows && j < cols)) && grid[i][j].mine) {
                    mineCount++;
                }
            }
        }
        return mineCount;
    }

    this.containsMouse = function (mouseX, mouseY) {
        return (mouseX >= this.cellXPos && mouseX <= this.cellXPos + this.cellSize) && (mouseY >= this.cellYPos && mouseY <= this.cellYPos + this.cellSize);
    }

    this.reveal = function () {
        this.hidden = false;
    }

    this.flood = function (grid) {
        for (let i = this.i - 1; i <= this.i + 1; i++) {
            for (let j = this.j - 1; j <= this.j + 1; j++) {
                if (((i >= 0 && j >= 0) && (i < rows && j < cols)) && !grid[i][j].mine) {
                    grid[i][j].reveal();
                }
            }
        }
    }

    this.mark = function () {
        this.marked = !this.marked;
    }
}