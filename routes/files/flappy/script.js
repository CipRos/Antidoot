const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
let frame = 0;
let score = 0;
const playerSize = 30;
canvas.width = 900;
canvas.height = 600;
let gameOver = false;
const winningScore = 50;
var spawned = false;
var started = false;
var plr;
var minHeight = 300;
var maxHeight = (canvas.height-118)-50;
var minGap;
var maxGap;
var debug = false;
var spaceClicked = false;
const times = [];
let fps;

const obstacles = [];

// Images
var bird = new Image();
var bg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var fg = new Image();

function loadImages(){
    fg.src="https://github.com/CodeExplainedRepo/FlappyBird-JavaScript/raw/master/images/fg.png"
    bird.src="https://github.com/CodeExplainedRepo/FlappyBird-JavaScript/raw/master/images/bird.png"
    bg.src="https://user-images.githubusercontent.com/18351809/46888871-624a3900-ce7f-11e8-808e-99fd90c8a3f4.png"
    pipeNorth.src="https://github.com/CodeExplainedRepo/FlappyBird-JavaScript/raw/master/images/pipeNorth.png"
    pipeSouth.src="https://github.com/CodeExplainedRepo/FlappyBird-JavaScript/raw/master/images/pipeSouth.png"
}

// Random RPS
function rps(text){
 if(!text){console.log("rock paper scissors")}
 if(text=="rock"){
    console.log("paper, you lose")
 }
 if(text=="paper"){
     console.log("scissors, you lose")
 }
 if(text=="scissors"){
     console.log("rock, you lose")
 }
}

// Player
class Player {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.speed
        this.width = 38;
        this.height = 26;
        this.speedY = 1;    
        this.speedX = 0;
        this.gravity = 0.05;
        this.gravitySpeed = 0;
    }
    // Draw player on canvas
    draw(){
        if(debug){
            ctx.fillStyle = "red";
            ctx.globalAlpha=0.5;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.globalAlpha=1;
        }
        ctx.drawImage(bird, this.x, this.y, this.width, this.height)
    }
    // Update player position
    update(){
        if(started){
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom()
        this.hitTop()
        }
    }
    hitBottom(){
        var rockbottom = (canvas.height- fg.height+17) - this.height;
        if (this.y > rockbottom) {
           gameOver = true
        }
    }
    hitTop(){
        var top = 0;
        if(this.y <= 0){
            gameOver = true
        }
    }
    accelerate(n){
        this.gravity = n
    }
}

function handlePlayer(){
    if(!spawned){
        plr = new Player(50, 300);
        spawned = true;
    }
    for(var i=0; i < obstacles.length; i++){
        if(collision(plr, obstacles[i])){
            gameOver=true;
        }
    }
    plr.update()
    plr.draw()
}

// Obstacles
class Obstacle {
    constructor(pipeType, x, y){
        this.x = x;
        this.y = y;
        this.pipeType = pipeType
        if(this.pipeType == pipeNorth){this.width = pipeNorth.width}else{this.width = pipeSouth.width};
        if(this.pipeType == pipeNorth){this.height = pipeNorth.height}else{this.height = pipeSouth.height};
    }
    // Draw player on canvas
    draw() {
        ctx.drawImage(this.pipeType, this.x, this.y);
        if(debug){
            ctx.fillStyle="red"
            ctx.globalAlpha=0.5;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.globalAlpha=1;
        }
    }
}

var x=canvas.height

// Events list
var events = ["easy", "normal", "frenzy"]//, "mario"];
var currentEvent = "normal";
function handleObstacles(){
  if(started){
    if(currentEvent == "easy"){
        if(frame == 1 || everyinterval(200)){
            var height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
            minGap = 80;
            maxGap = 150;
            var gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
            console.log("easy: "+(height+gap-fg.height))
            obstacles.push(new Obstacle(pipeSouth, 900, height+gap-fg.height, canvas.width - height - gap))
        }
    }

    if(currentEvent == "normal"){
        if(frame == 1 || everyinterval(250)){
            var height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
            minGap = 100;
            maxGap = 150;
            var gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
            console.log("normal: " + ((height+gap)-fg.height)+"\nGap: "+gap+"\nHeight: "+height)
            obstacles.push(new Obstacle(pipeNorth, canvas.width, 0))
            obstacles.push(new Obstacle(pipeSouth, 900, (height+gap)-fg.height))
        }
    }
    if(currentEvent == "frenzy"){
        if(frame == 1 || everyinterval(50)){
            var height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
            minGap = 200;
            maxGap = 500;
            var gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
            console.log("frenzy: "+(height+gap))
            obstacles.push(new Obstacle(pipeNorth ,canvas.width, 0))
            obstacles.push(new Obstacle(pipeSouth, 900, height+gap, canvas.width - height - gap))
        }
    }
    // x--
    // obstacles.push(new Obstacle(900, x, x))
    for(var i=0; i < obstacles.length; i++){
        obstacles[i].x -= 2
        obstacles[i].draw()
    }
  }
}

// Controls
document.addEventListener("keydown", event => {
    if(event.code=="Space"){
        if(!started){started = true}
        spaceClicked = true;
        plr.accelerate(-0.2)
    }
});

document.addEventListener("keyup", event => {
    if(event.code=="Space"){
        spaceClicked = false;
        plr.accelerate(0.1)
    }
});

// Handle Frames
function handleFrames(){
    ctx.drawImage(bg,0,0)
    ctx.fillStyle = "black";
    ctx.font = "20px Ubuntu"
    ctx.fillText(fps, 10, 25)
    ctx.fillText(score, canvas.width-30, 25)
    var now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;
}

function handleEvents(){
    if(started){
        if(frame >= 1000 && everyinterval(1000)){
            currentEvent = events[Math.floor(Math.random() * events.length)];
            score++
            console.log("Event: "+currentEvent+" ("+frame/1000+" total events)")
        }
    }
    ctx.drawImage(fg,0,bg.height-5)
    ctx.drawImage(fg,fg.width,bg.height-5)
    ctx.drawImage(fg,fg.width*2,bg.height-5)
}

// Initiate Game
async function init(){
    await loadImages()
    console.log("Initialized");
    animate();
}
init();

// Animation loop
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleFrames();
    handlePlayer();
    handleObstacles();
    handleEvents();
    frame++
    if (!gameOver) {requestAnimationFrame(animate);} else {
        ctx.fillStyle = "black"; 
        ctx.font = "40px Ubuntu"
        ctx.fillText("Game Over", 360, 300);
    }
}

// utilities
function collision(first, second){
    if( !(first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y)){
            return true;
        };
}

function everyinterval(n) {
    if ((frame / n) % 1 == 0) {return true;}
    return false;
}

window.addEventListener('resize', function(){
    canvasPosition = canvas.getBoundingClientRect();
})