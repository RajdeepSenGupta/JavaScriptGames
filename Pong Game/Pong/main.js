let puck;
let rightPaddle;
let leftPaddle;
let leftScore;
let rightScore;

function setup(){
	createCanvas(600, 400);
	leftScore = 0;
	rightScore = 0;

	puck = new Puck();
	leftPaddle = new Paddle(true);
	rightPaddle = new Paddle(false);
}

function draw() {
	background(0);

	// Check collision with paddle
	puck.checkLeftPaddleCollision(leftPaddle);
	puck.checkRightPaddleCollision(rightPaddle);
	
	// Draw puck
	puck.show();
	puck.update();
	puck.checkBoundary();

	// Draw paddles
	leftPaddle.show();
	rightPaddle.show();
	leftPaddle.update();
	rightPaddle.update();

	// Show scores
	fill(255);
    textSize(32);
    text(rightScore, 32, 40);
    text(leftScore, width - 64, 40);
}

function keyPressed(){
	if(key == "W"){
		leftPaddle.move(-10);
	}
	else if(key == "S"){
		leftPaddle.move(10);
	}

	if(key == "I"){
		rightPaddle.move(-10);
	}
	else if(key == "K"){
		rightPaddle.move(10);
	}
}

function keyReleased(){
	leftPaddle.move(0);
	rightPaddle.move(0);
}