let angle = 0;
let w = 18;
let maxD;
let magicAngle;

function setup(){
	createCanvas(500, 500, WEBGL);
	maxD = dist(0, 0, 250, 250);
	magicAngle = atan(QUARTER_PI);
}

function draw(){
	background(51);

	rotateX(-magicAngle);
	rotateY(-QUARTER_PI);
	
	ortho(-500, 500, -400, 400, 50, 800);
	normalMaterial();

	for(let z = 0; z < height; z += w){
		for(let x = 0; x < width; x += w){
			push();
			translate(x - width / 2, 0, z - height / 2);
			let d = dist(x, z, width / 2, height / 2);
			let offset = 1.5 * map(d, 0, maxD, -PI, PI);
			let h = map(sin(angle + offset), -1, 1, 100, 200);
			box(w, h, w);
			pop();
		}
	}

	angle -= 0.1;
}