let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 20;
let snake = [];
const value = document.querySelector('.score');
let score = 0;

// posição inicial da cobrinha
snake[0] = {
    x: 5 * box,
    y: 10 * box
}

let direction = "left";

// cria a food aleatoriamente
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1)* box
}


function background(){
    context.fillStyle = "#1877f2";
    context.fillRect(0, 0, 21*box, 21*box);
}
function createSnake(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';

}


function startGame(){

    if(snake[0].x > 20*box && direction == "right")snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left")snake[0].x = 20* box;
    if(snake[0].y > 20*box && direction == "down")snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up")snake[0].y = 20* box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game);
            alert('Game Over!!!')
        }       
        
    }

    background();
    createSnake();
    drawFood();

    let snakex = snake[0].x;
    let snakey = snake[0].y;
    if(direction =="right") snakex += box;
    if(direction =="left") snakex -= box;
    if(direction == "up") snakey -= box;
    if(direction == "down") snakey += box;
    

    if(snakex != food.x || snakey != food.y){
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random() * 19 + 1) * box;
        food.y = Math.floor(Math.random() * 19 + 1)* box;
        score++;        
        console.log(score);
        value.textContent = `Score:${score}`;
    }

    let newHead = {
        x: snakex,
        y: snakey
        
    }

    snake.unshift(newHead);
    
}

let game = setInterval(startGame, 100);

