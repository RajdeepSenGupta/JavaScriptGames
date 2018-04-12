var bird, pipes = [];
var score = 0;

function setup() {
    var canvas = createCanvas(700, 500);
    bird = new Bird;
    pipes.push(new Pipe);
}

function draw() {
    background(0);
    bird.drawBird();
    bird.applyGravity();

    if (frameCount % 100 == 0) {
        pipes.push(new Pipe);
    }

    for (var i = 0; i < pipes.length; i++) {
        if (!pipes[i].pipeHit(bird)) {
            pipes[i].drawPipe();
            pipes[i].movePipe();

            if (pipes[i].pipeXPos == 0) {
                pipes.splice(i, 1);
                score++;
            }
        }
        else {
            pipes = [];
            alert("Game Over! \n Score: " + score);
            score = 0;
            break;
        }
    }
}

function keyPressed() {
    if (keyCode == 32 || keyCode == 38) {
        bird.jump();
    }
}