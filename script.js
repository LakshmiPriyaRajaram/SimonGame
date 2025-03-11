const buttonColors = ["green","red","yellow","blue"];
let systemGeneratedColors = [];
let userClickedColors = [];
let started = false;
let level = 0;

document.addEventListener("keypress",()=>{
    if(!started){
        document.getElementById("gameStart").innerText = `Level ${level}`;
        started = true;
        nextSequence()
    }
});

document.querySelectorAll(".button").forEach((item)=>{
    item.addEventListener("click",(event)=>{
    let userChosenColor= event.target.id;
    userClickedColors.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedColors.length-1);
    });
});

function checkAnswer(currentLevel){
    if(systemGeneratedColors[currentLevel]===userClickedColors[currentLevel]){
        if(userClickedColors.length === systemGeneratedColors.length){
            setTimeout(()=>{
                nextSequence();
            },1000)
        }
    }
    else{
        playSound("wrong");
        document.querySelector("body").classList.add("gameOver");
        document.getElementById("gameStart").innerText = "Game Over, Press Any Key to restart";
        setTimeout(()=>{
            document.querySelector("body").classList.remove("gameOver");
        },200)
        startOver();
    }
};

function fadeIn(time, id){
    let fade = document.getElementById(id);
    setTimeout(()=>{
        fade.style.opacity =0.1;
    },time);
};

function fadeOut(time, id){
    let fade = document.getElementById(id);
    setTimeout(()=>{
        fade.style.opacity =1;
    },time);
};

function nextSequence(){
    userClickedColors = [];
    level ++;
    document.getElementById("gameStart").innerText = `Level ${level}`;
    let randonNumber = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColors[randonNumber];
    systemGeneratedColors.push(randomChosenColor);
    fadeIn(200,randomChosenColor);
    fadeOut(400,randomChosenColor);
    playSound(randomChosenColor);
};

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColor){
   document.getElementById(currentColor).classList.add("pressed") 
   setTimeout(()=>{
   document.getElementById(currentColor).classList.remove("pressed")  
   },200);
}

function startOver(){
    systemGeneratedColors = [];
    started = false;
    level = 0;
};

