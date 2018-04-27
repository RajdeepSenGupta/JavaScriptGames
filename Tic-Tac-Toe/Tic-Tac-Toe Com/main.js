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

    if (!player1 && win === null) {
        let suitablePosition = getSuitablePosition();
        let randomI = Math.floor(random(0, 3));
        let randomJ = Math.floor(random(0, 3));
        if (suitablePosition === null ||
            (suitablePosition !== null && grid[suitablePosition.possibleI][suitablePosition.possibleJ].isMarked)) {
            while (grid[randomI][randomJ].isMarked && !isAllMarked()) {
                randomI = Math.floor(random(0, 3));
                randomJ = Math.floor(random(0, 3));
            }
        }
        else {
            randomI = suitablePosition.possibleI;
            randomJ = suitablePosition.possibleJ;
        }
        grid[randomI][randomJ].drawCross();
        player1 = !player1;
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
            if (grid[i][j].containsMouse(mouseX, mouseY) && player1 && !isAlertShown) {
                grid[i][j].drawCircle();
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
                winArray.push("Computer");
            }
        }
        if (winArray.length === 3) {
            if (winArray.every(x => x === "Player 1")) {
                return "Player 1";
            }
            else if (winArray.every(x => x === "Computer")) {
                return "Computer";
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
                winArray.push("Computer");
            }
        }
        if (winArray.length === 3) {
            if (winArray.every(x => x === "Player 1")) {
                return "Player 1";
            }
            else if (winArray.every(x => x === "Computer")) {
                return "Computer";
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
                    winArray.push("Computer");
                }
            }
        }
        if (winArray.length === 3) {
            if (winArray.every(x => x === "Player 1")) {
                return "Player 1";
            }
            else if (winArray.every(x => x === "Computer")) {
                return "Computer";
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
                    winArray.push("Computer");
                }
            }
        }
        if (winArray.length === 3) {
            if (winArray.every(x => x === "Player 1")) {
                return "Player 1";
            }
            else if (winArray.every(x => x === "Computer")) {
                return "Computer";
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

function isAllMarked() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (!grid[i][j].isMarked) {
                return false;
            }
        }
    }
    return true;
}

function getSuitablePosition() {
    let posArray = [];
    let noPosArray = [];

    // Columns
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (!grid[i][j].isMarked) {
                posArray.push({ possibleI: i, possibleJ: j });
            }
            else if (grid[i][j].showCircle) {
                noPosArray.push({ possibleI: i, possibleJ: j });
            }
        }
        if (posArray.length === 1 && noPosArray.length === 2) {
            return posArray[0];
        }
        posArray = [];
        noPosArray = [];
    }

    // Rows
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            if (!grid[i][j].isMarked) {
                posArray.push({ possibleI: i, possibleJ: j });
            }
            else if (grid[i][j].showCircle) {
                noPosArray.push({ possibleI: i, possibleJ: j });
            }
        }
        if (posArray.length === 1 && noPosArray.length === 2) {
            return posArray[0];
        }
        posArray = [];
        noPosArray = [];
    }

    // Major Diagonal
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (i === j) {
                if (!grid[i][j].isMarked) {
                    posArray.push({ possibleI: i, possibleJ: j });
                }
                else if (grid[i][j].showCircle) {
                    noPosArray.push({ possibleI: i, possibleJ: j });
                }
            }
        }
    }
    if (posArray.length === 1 && noPosArray.length === 2) {
        return posArray[0];
    }
    posArray = [];
    noPosArray = [];

    // Minor Diagonal
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (i + j == rows - 1) {
                if (!grid[i][j].isMarked) {
                    posArray.push({ possibleI: i, possibleJ: j });
                }
                else if (grid[i][j].showCircle) {
                    noPosArray.push({ possibleI: i, possibleJ: j });
                }
            }
        }
    }
    if (posArray.length === 1 && noPosArray.length === 2) {
        return posArray[0];
    }
    posArray = [];
    noPosArray = [];

    return null;
}