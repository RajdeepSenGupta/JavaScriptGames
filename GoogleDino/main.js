let roadHeight;
let padding;
let obstacles = [];
let dino;
let score;
let isCollided;
let movementSpeed;
let isMovementAdjusted;

function setup(){
	createCanvas(600, 400);

	roadHeight = 10;
	padding = 1;

	obstacles.push(new Obstacle());
	dino = new Dino();

	score = 0;
	isCollided = false;
	movementSpeed = 3;
	isMovementAdjusted = true;
}

function draw(){
	background(0);

	// Draw road
	fill(255);
	rect(-padding, height - roadHeight - 5 * padding, width + padding, roadHeight);

	if(!isCollided){
		// Draw obstacles
		if (frameCount % 100 == 0) {
	        obstacles.push(new Obstacle());
	    }

	    for(let i = 0; i < obstacles.length; i++){
	    	if(!obstacles[i].checkCollision(dino)){
		    	obstacles[i].show();
			    obstacles[i].update(movementSpeed);

		        if(obstacles[i].x + obstacles[i].w <= 0){
		        	obstacles.splice(i, 1);
		        	score++;
		        	isMovementAdjusted = true;
		        }
		    }
		    else{
		    	obstacles = [];
	            isCollided = true;
	            break;
		    }
	    }

		// Draw dino
		dino.show();
		dino.update();

	    // Show score
		fill(255);
	    textSize(32);
	    text(score, 32, 40);

	    if(score % 2 == 0 && isMovementAdjusted){
	    	isMovementAdjusted = false;
	    	movementSpeed += 1;
	    }
	}
    else{
    	fill(255);
	    textSize(40);
	    text("Game Over! Score: " + score, width / 5, height / 2);
    }
}

function keyPressed(){
	if ((keyCode == 32 || keyCode == 38) && !dino.isInAir) {
        dino.jump();
    }
}