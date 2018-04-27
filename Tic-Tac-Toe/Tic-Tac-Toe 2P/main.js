let grid = [];
let cellSize = 100;
let rows, cols;
let player1 = true;
let win = null;
isAlertShown = false;

function setup() {
    var canvas = createCanvas(501, 501);

    rows = 3;
    cols = 3;

    grid = createGrid(rows, cols);

    // Initialize grid
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = new Cell(i, j, cellSize);
        }
    }
}

function draw() {
    background(255);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].show();
        }
    }

    if (!isAlertShown) {
        if (win === null) {
            win = checkStatus();
        }
        else {
            if (win === "Draw") {
                alert(win);
            }
            else {
                alert(win + " wins!!");
            }
            isAlertShown = true;
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
            if (grid[i][j].containsMouse(mouseX, mouseY)) {
                if (player1) {
                    grid[i][j].drawCircle();
                }
                else if (!player1) {
                    grid[i][j].drawCross();
                }
                player1 = !player1;
            }
        }
    }
}

function checkStatus() {
    let winArray = [];

    // Columns
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j].isMarked && grid[i][j].showCircle) {
                winArray.push("Player 1");
            }
            else if (grid[i][j].isMarked && grid[i][j].showCross) {
                winArray.push("Player 2");
            }
        }
        if (winArray.length === 3) {
            if (winArray.every(x => x === "Player 1")) {
                return "Player 1";
            }
            else if (winArray.every(x => x === "Player 2")) {
                return "Player 2";
            }
        }
        winArray = [];
    }

    // Rows
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            if (grid[i][j].isMarked && grid[i][j].showCircle) {
                winArray.push("Player 1");
            }
            else if (grid[i][j].isMarked && grid[i][j].showCross) {
                winArray.push("Player 2");
            }
        }
        if (winArray.length === 3) {
            if (winArray.every(x => x === "Player 1")) {
                return "Player 1";
            }
            else if (winArray.every(x => x === "Player 2")) {
                return "Player 2";
            }
        }
        winArray = [];
    }

    // Major Diagonal
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (i === j) {
                if (grid[i][j].isMarked && grid[i][j].showCircle) {
                    winArray.push("Player 1");
                }
                else if (grid[i][j].isMarked && grid[i][j].showCross) {
                    winArray.push("Player 2");
                }
            }
        }
        if (winArray.length === 3) {
            if (winArray.every(x => x === "Player 1")) {
                return "Player 1";
            }
            else if (winArray.every(x => x === "Player 2")) {
                return "Player 2";
            }
        }
    }
    winArray = [];

    // Minor Diagonal
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (i + j == rows - 1) {
                if (grid[i][j].isMarked && grid[i][j].showCircle) {
                    winArray.push("Player 1");
                }
                else if (grid[i][j].isMarked && grid[i][j].showCross) {
                    winArray.push("Player 2");
                }
            }
        }
        if (winArray.length === 3) {
            if (winArray.every(x => x === "Player 1")) {
                return "Player 1";
            }
            else if (winArray.every(x => x === "Player 2")) {
                return "Player 2";
            }
        }
    }
    winArray = [];

    // Draw
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j].isMarked) {
                winArray.push("Draw");
            }
        }
    }
    if (winArray.length === rows * cols && winArray.every(x => x === "Draw")) {
        return "Draw";
    }

    return null;
}