function setup(){
	createCanvas(400, 400);
	angleMode(DEGREES);
}

function draw() {
	background(0);
	translate(200, 200);
	rotate(-90);

	let hr = hour();
	let mn = minute();
	let sc = second();

	strokeWeight(4);
    noFill();
    
    // Second's hand
    stroke(255, 100, 150);
    let secondAngle = map(sc, 0, 60, 0, 360);
    push();
    rotate(secondAngle);
    stroke(255, 100, 150);
    line(0, 0, 100, 0);
    pop();
    arc(0, 0, 300, 300, 0, secondAngle);

    // Minute's hand
    stroke(150, 100, 255);
    let minuteAngle = map(mn, 0, 60, 0, 360);
    push();
    rotate(minuteAngle);
    stroke(150, 100, 255);
    line(0, 0, 75, 0);
    pop();
    arc(0, 0, 280, 280, 0, minuteAngle);

    // Hour's hand
    stroke(150, 255, 100);
    let hourAngle = map(hr % 12, 0, 12, 0, 360);
    push();
    rotate(hourAngle);
    stroke(150, 255, 100);
    line(0, 0, 50, 0);
    pop();
    arc(0, 0, 260, 260, 0, hourAngle);
}