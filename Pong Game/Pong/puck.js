class Puck{

	constructor(){
		this.xspeed = 0;
        this.yspeed = 0;
        this.r = 12;

        this.reset();
	}

	show(){
		// Draw puck
		fill(255);
		ellipse(this.x, this.y, this.r);
	}

	update(){
		// Update puck's speed
		this.x += this.xspeed;
		this.y += this.yspeed;
	}

	reset(){
		// Reset puck location
		this.x = width / 2;
        this.y = height / 2;
        let angle = random(-PI / 4, PI / 4);
        this.xspeed = 5 * Math.cos(angle);
        this.yspeed = 5 * Math.sin(angle);
        
        if (random(1) < 0.5) {
            this.xspeed *= -1;
        }
	}

	checkBoundary(){
		// Upper and lower boundaries
		if(this.y < 0 || this.y > height){
			this.yspeed *= -1;
		}

		// Right boundary
		if(this.x > width){
			this.reset();
			rightScore++;
		}

		// Left boundary
		if(this.x < 0){
			this.reset();
			leftScore++;
		}
	}

	checkLeftPaddleCollision(paddle){
		if((this.y - this.r < paddle.y + paddle.h / 2) && (this.y + this.r > paddle.y - paddle.h / 2)){
			if(this.x - this.r < paddle.x + paddle.w / 2 && this.x > paddle.x){
				let diff = this.y - (paddle.y - paddle.h / 2);
                let angle = map(diff, 0, paddle.h, radians(-45), radians(45));
                this.xspeed = 5 * cos(angle);
                this.yspeed = 5 * sin(angle);
                this.x = paddle.x + paddle.w / 2 + this.r;
			}
		}
	}

	checkRightPaddleCollision(paddle){
		if((this.y - this.r < paddle.y + paddle.h / 2) && (this.y + this.r > paddle.y - paddle.h / 2)){
			if(this.x + this.r > paddle.x - paddle.w / 2 && this.x < paddle.x){
				let diff = this.y - (paddle.y - paddle.h / 2);
                let angle = map(diff, 0, paddle.h, radians(225), radians(135));
                this.xspeed = 5 * cos(angle);
                this.yspeed = 5 * sin(angle);
                this.x = paddle.x - paddle.w / 2 - this.r;
			}
		}
	}
}