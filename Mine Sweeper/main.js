let grid = [];
let cellSize = 50;
let rows, cols;
let mineCount = 20;
let isGameOver = false;

function setup() {
    var canvas = createCanvas(501, 501);

    rows = Math.floor(height / cellSize);
    cols = Math.floor(width / cellSize);

    grid = createGrid(rows, cols);

    // Initialize grid
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = new Cell(i, j, cellSize);
        }
    }

    // Set mines
    for (let x = 0; x < mineCount;) {
        let i = Math.floor(random(rows));
        let j = Math.floor(random(cols));

        if (!grid[i][j].mine) {
            grid[i][j].mine = true;
            x++;
        }
    }

    // Calculate mines
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].value = grid[i][j].calculateMines(rows, cols, grid);
        }
    }
}

function draw() {
    background(180);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].show();
        }
    }
}

function createGrid(rows, cols) {
    let arr = new Array(rows);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(cols);
    }
    return arr;
}

function mousePressed() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j].containsMouse(mouseX, mouseY) && !isGameOver) {
                if (mouseButton === LEFT && grid[i][j].hidden) {
                    grid[i][j].reveal();
                    grid[i][j].flood(grid);

                    if (grid[i][j].mine) {
                        gameOver();
                        break;
                    }
                }
                else if (mouseButton === CENTER) {
                    grid[i][j].mark();
                }
            }
        }
    }
}

function gameOver() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].reveal();
        }
    }
    setTimeout(() => {
        isGameOver = true;
        alert("Game Over!");
    }, 100);
}