function Obstacle(){
	this.h = 40;
	this.x = width;
	this.y = height - 5 * padding - roadHeight;
	this.w = 10;
	this.varyingHeight = floor(random(50));

	this.show = function(){
		rect(this.x, this.y, this.w, -(this.h + this.varyingHeight));
	}

	this.update = function(movementSpeed){
		this.x -= movementSpeed;
	}

	this.checkCollision = function(dino){
		return(dino.y + dino.r >= this.y && dino.x + dino.r / 3 >= this.x);
	}
}