let dimension;
let array = [];
let shuffleCount;
let padding;

function setup() {
    let canvas = createCanvas(800, 600);
    this.dimension = 3;
    this.shuffleCount = 100;
    this.padding = 60;

    setArray();
    shuffleNumbers();
}

function draw() {
    background(100);

    show();
}

function keyPressed() {
    // Right
    if (keyCode === 39) {
        shiftEmptySpace(-1, 0);
    }
    // Down
    else if (keyCode === 40) {
        shiftEmptySpace(0, -1);
    }
    // Left
    else if (keyCode === 37) {
        shiftEmptySpace(1, 0);
    }
    // Up
    else if (keyCode === 38) {
        shiftEmptySpace(0, 1);
    }
}

function setArray(){
    let val = 1;
    for(let i = 0; i < this.dimension; i++){
        let ar = [];
        for(let j = 0; j < this.dimension; j++){
            if(i == this.dimension - 1 && j == this.dimension - 1 && j == j){
                ar.push({ value: 0, isEmpty: true });
            }
            else{
                ar.push({ value: val++, isEmpty: false });
            }
        }
        array.push(ar);
    }
}

function show(){
    for(let i = 0; i < this.dimension; i++){
        for(let j = 0; j < this.dimension; j++){
            fill(255);
            textSize(30);
            if(!array[i][j].isEmpty){
                text(array[i][j].value, 300, 250);
            }
            else{
                text('', 300, 250);
            }
            translate(this.padding, 0);
        }
        translate(-(this.dimension * this.padding), this.padding);
    }
}

function shuffleNumbers(){
    for(let k = 0; k < this.shuffleCount; k++){
        let ith1 = floor(random(this.dimension));
        let jth1 = floor(random(this.dimension));
        let ith2 = floor(random(this.dimension));
        let jth2 = floor(random(this.dimension));

        let temp = array[ith1][jth1];
        array[ith1][jth1] = array[ith2][jth2];
        array[ith2][jth2] = temp;
    }
}

function shiftEmptySpace(jShift, iShift){
    let emptyCellI;
    let emptyCellJ;
    for(let i = 0; i < this.dimension; i++){
        let index = array[i].indexOf(array[i].filter(x => x.isEmpty)[0]);
        if(index >= 0){
            emptyCellI = i;
            emptyCellJ = index;
        }
    }

    let shiftingCellI = emptyCellI + iShift;
    let shiftingCellJ = emptyCellJ + jShift;
    
    let temp = array[shiftingCellI][shiftingCellJ];
    array[shiftingCellI][shiftingCellJ] = array[emptyCellI][emptyCellJ];
    array[emptyCellI][emptyCellJ] = temp;
}