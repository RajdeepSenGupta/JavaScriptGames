//let array = [5, 10, 2, 6, 9, 3, 8, 1, 7, 4, 20, 15, 19, 18, 14, 13, 17, 11, 12, 16];
//let array = [5, 10, 2, 6, 9, 3, 8, 1, 7, 4];
let array = [1,1,1,1,1,1,1,1,1,1];
let w;
let xLoc;
let yLoc;
let padding = 10;
let sorted = 0;

function setup(){
	createCanvas(400, 400);
	xLoc = 0;
	yLoc = height;
	w = (width - 2 * padding) / array.length;
}

function draw(){
	background(0);
	frameRate(5);

	fill(255);
	translate(padding, 0);
	for(let i = 0; i < array.length; i++){
		let x = Math.max(...array);
		let yShift = map(array[i], 0, Math.max(...array), 0, height / 3);
		rect(xLoc, yLoc - 1, w, - yLoc / 2 - yShift);
		translate(w, 0);
	}

	if(sorted < array.length){
		bubble();
	}
}

function bubble(){
	let maxValLoc = 0;
	for(let i = 0; i < array.length - sorted; i++){
		if(array[i] > array[maxValLoc]){
			maxValLoc = i;
		}
	}

	let temp = array[maxValLoc];
	array[maxValLoc] = array[array.length - sorted - 1];
	array[array.length - sorted - 1] = temp;
	sorted++;
}