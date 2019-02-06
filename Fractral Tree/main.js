let angle = 0;
var slider;

function setup(){
	createCanvas(400, 400);
	slider = createSlider(0, TWO_PI, PI / 4, 0.01);
}

function draw(){
	background(51);
	angle = slider.value();
	stroke(255);
	strokeWeight(1);
	translate(width / 2, height);
	drawLine(100);
}

function drawLine(len){
	line(0, 0, 0, -len);

	translate(0, -len);
	len = len * 0.67;

	if(len > 4)
	{
		push();
		rotate(angle);
		drawLine(len);
		pop();

		push();
		rotate(-angle);
		drawLine(len);
		pop();
	}
}