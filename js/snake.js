var blocksize = 25;
var rows = 30;
var cols = 50;
var screen;
var ctx;
var flag;


var snakeX = blocksize*5;
var snakeY = blocksize*5;

var foodX;
var foodY;

var variableX = 0;
var variableY = 0;

var snakeBody = [];

var gameOver = false;

window.onload = function() {
    screen = document.getElementById('screen-game');
    screen.width = cols * blocksize;
    screen.height = rows * blocksize;
    ctx = screen.getContext('2d');

    
    ramdomFood();
    document.addEventListener('keyup', controlFlag);
    setInterval(background, 1000/10);
    
}

function background() {
    if(gameOver) {
        return;
    }
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, screen.width, screen.height);

    ctx.fillStyle = 'white';
    ctx.fillRect(foodX, foodY, blocksize, blocksize);

    if(snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        ramdomFood();
    }

    for(let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    ctx.fillStyle = 'pink';
    snakeX += variableX * blocksize;
    snakeY += variableY * blocksize;
    ctx.fillRect(snakeX, snakeY, blocksize, blocksize);
    
    for(let i = 0 ; i < snakeBody.length; i++) {
        ctx.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
    }

    if(snakeX < 0 || snakeX > cols * blocksize || snakeY < 0 || snakeY > rows * blocksize){
        gameOver = true;
        alert('Game Over!');
    }
    
    for(let i = 0; i < snakeBody.length; i++) {
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert('Game Over!');
        }
    }

    
}




function ramdomFood() {
    foodX = Math.floor(Math.random() * cols) * blocksize;
    foodY = Math.floor(Math.random() * rows) * blocksize;
}

function controlFlag(evt) { 
    if(evt.code == "ArrowUp" && variableY !== 1) {
        variableX = 0;
        variableY = -1;
    }else if(evt.code == "ArrowDown" && variableY !== -1) {
        variableX = 0;
        variableY = 1;
    }else if(evt.code == "ArrowLeft" && variableX !== 1) {
        variableX = -1;
        variableY = 0;
    }else if(evt.code == "ArrowRight" && variableX !== -1) {
        variableX = 1;
        variableY = 0;
    }
}

