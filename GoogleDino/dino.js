function Dino(){
	this.r = 15;
	this.x = 4 * roadHeight;
	this.y = height - roadHeight - 5 * padding - this.r / 2;
	
	this.isInAir = false;
	this.GRAVITY = 1.0;
    this.jumpHeight = -30;
    this.velocity = 0;
	
	this.show = function(){
		fill(255);
		ellipse(this.x, this.y + this.velocity, this.r);
	}

	this.update = function(){
		if(this.isInAir){
			this.applyGravity();
		}
		if(this.y + this.r / 2 > (height - roadHeight - 5 * padding - this.r / 2)){
			this.isInAir = false;
			this.velocity = 0;
		}
	}

	this.jump = function(){
		this.isInAir = true;
		this.velocity += this.jumpHeight;
	}

	this.applyGravity = function(){
		this.velocity += this.GRAVITY;
        this.y += this.velocity;
        this.velocity *= 0.9;
	}
}