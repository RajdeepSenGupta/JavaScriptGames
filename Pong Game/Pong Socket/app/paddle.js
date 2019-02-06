class Paddle{

	constructor(isLeftPaddle){
		this.w = 10;
		this.h = 100;
		this.x = isLeftPaddle ? (this.w) : (width - this.w);
		this.y = height / 2;
		this.ychange = 0;
	}

	show(){
		fill(255);
		rectMode(CENTER);
		rect(this.x, this.y, this.w, this.h);
	}

	update(){
		this.y += this.ychange;
		this.y = constrain(this.y, this.h / 2, height - this.h / 2);
	}

	move(shift){
		this.ychange = shift;
	}
}