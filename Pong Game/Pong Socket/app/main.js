var socket;

let puck;
let rightPaddle;
let leftPaddle;
let leftScore;
let rightScore;
let movementSteps;
let isStarted;

let startButton;
let resetButton;
let resetScoreButton;

function setup() {
    createCanvas(600, 400);
    leftScore = 0;
    rightScore = 0;
    movementSteps = 10;
    isStarted = false;

    startButton = createButton('start');
    startButton.position(250, 500);
    startButton.mousePressed(startGame);

    //resetButton = createButton('reset');
    //resetButton.position(300, 500);
    //resetButton.mousePressed(resetGame);

    //resetScoreButton = createButton('reset score');
    //resetScoreButton.position(350, 500);
    //resetScoreButton.mousePressed(resetScore);

    puck = new Puck();
    leftPaddle = new Paddle(true);
    rightPaddle = new Paddle(false);

    //socket = io.connect('http://localhost:3000');
    socket = io.connect('http://10.1.81.53:3000/');

    // Live data feed
    socket.on('liveEventData', (data) => {
        this.liveEventData(data);
    });

    // Move paddle data feed
    socket.on('movementEventData', (data) => {
        this.movementEventData(data);
    });

    // Stop movement data feed
    socket.on('stopMovementEventData', () => {
        this.stopMovementEventData();
    });

    // Start game data feed
    socket.on('startEventData', (data) => {
        isStarted = data.isStarted;
    });

    // Reset game data feed
    socket.on('resetGameEventData', (data) => {
        isStarted = data.isStarted;
        puck.x = data.puck.x;
        puck.y = data.puck.y;
        puck.xspeed = data.puck.xspeed;
        puck.yspeed = data.puck.yspeed;
    });
    
    // Reset score
    socket.on('resetScoreEventData', (data) => {
        isStarted = data.isStarted;
        puck.x = data.puck.x;
        puck.y = data.puck.y;
        puck.xspeed = data.puck.xspeed;
        puck.yspeed = data.puck.yspeed;
        puck.angle = data.puck.angle;
        leftScore = data.leftScore;
        rightScore = data.rightScore;
    });
}

function draw() {
    background(0);

    // Check collision with paddle
    puck.checkLeftPaddleCollision(leftPaddle);
    puck.checkRightPaddleCollision(rightPaddle);

    // Draw puck
    puck.show();

    // Draw paddles
    leftPaddle.show();
    rightPaddle.show();
    leftPaddle.update();
    rightPaddle.update();

    if (isStarted) {
        // Update puck
        puck.update();
        puck.checkBoundary();
    }

    // Show scores
    fill(255);
    textSize(32);
    text(rightScore, 32, 40);
    text(leftScore, width - 64, 40);

    // Emit event
    setTimeout(() => {
        var liveEventData = {
            rightScore: rightScore,
            leftScore: leftScore,
            puck: puck
        };
        socket.emit('liveEventData', liveEventData);
    }, 0);
}

function keyPressed() {
    if (key == "W") {
        leftPaddle.move(-movementSteps);
    }
    else if (key == "S") {
        leftPaddle.move(movementSteps);
    }

    if (key == "I") {
        rightPaddle.move(-movementSteps);
    }
    else if (key == "K") {
        rightPaddle.move(movementSteps);
    }

    // Send data to the clients
    var movementEventData = {
        key: key
    };
    socket.emit('movementEventData', movementEventData);
}

function keyReleased() {
    leftPaddle.move(0);
    rightPaddle.move(0);
    socket.emit('stopMovementEventData', null);
}

function liveEventData(data) {
    rightScore = data.rightScore;
    leftScore = data.leftScore;

    puck.x = data.puck.x;
    puck.y = data.puck.y;
    puck.xspeed = data.puck.xspeed;
    puck.yspeed = data.puck.yspeed;
    puck.angle = data.puck.angle;
}

function movementEventData(data) {
    if (data.key == "W") {
        leftPaddle.move(-movementSteps);
    }
    else if (data.key == "S") {
        leftPaddle.move(movementSteps);
    }

    if (data.key == "I") {
        rightPaddle.move(-movementSteps);
    }
    else if (data.key == "K") {
        rightPaddle.move(movementSteps);
    }
}

function stopMovementEventData() {
    leftPaddle.move(0);
    rightPaddle.move(0);
}

function startGame() {
    isStarted = true;

    var startEventData = {
        isStarted: isStarted
    };
    socket.emit('startEventData', startEventData);
}

function resetGame() {
    puck.reset();
    isStarted = false;

    var resetGameEventData = {
        isStarted: isStarted,
        puck: puck
    };
    socket.emit('resetGameEventData', resetGameEventData);
}

function resetScore() {
    leftScore = 0;
    rightScore = 0;
    isStarted = false;
    puck.reset();

    var resetScoreEventData = {
        isStarted: isStarted,
        puck: puck,
        leftScore: leftScore,
        rightScore: rightScore
    };
    socket.emit('resetScoreEventData', resetScoreEventData);
}