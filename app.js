let body = document.querySelector('body');
let gameSequence = [];
let userSequence = [];
let boxIds = ["red","green","yellow","blue"];
let isGameStarted = false;
let gameLevel = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(!isGameStarted){
        gameStart();
        isGameStarted = true;
    }
});

function gameStart(){
    levelUp();
}

function gameBoxFlash(box){
    box.classList.add("game-flash");
    setTimeout(function(){
    box.classList.remove("game-flash");
    },400)
}

function userBoxFlash(box){
    box.classList.add("user-flash");
    setTimeout(function(){
    box.classList.remove("user-flash");
    },400)
}

function levelUp(){
    userSequence = [];
    gameLevel++;
    h2.innerText = `Level ${gameLevel}`;

    let randIdx = Math.floor(Math.random()*boxIds.length);
    let randColor = boxIds[randIdx];
    let randBox = document.querySelector(`.${randColor}`);

    gameSequence.push(randColor);

    setTimeout(function(){
        gameBoxFlash(randBox);
    },600);
}

function checkSequence(idx){
    if(userSequence[idx] == gameSequence[idx]){
        if(userSequence.length == gameLevel){
            levelUp();
        }
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${gameLevel}</b>. <br> Press any Key to restart`;
        body.style.backgroundColor = "red";
        setTimeout(function(){
            body.style.backgroundColor = "transparent";
        },500);
        resetGame();
    }
}

function boxPress(){
    let btn = this;
    userBoxFlash(btn);

    let userColor = btn.id;
    userSequence.push(userColor);
     
    checkSequence(userSequence.length-1);
}

let allBoxes = document.querySelectorAll(".box");
for(box of allBoxes){
    box.addEventListener("click",boxPress);
}

let highestScoreDiv = document.querySelector('.highest-score .score');
let highestScore = 0;

function resetGame(){
    if(gameLevel>highestScore){
        highestScore = gameLevel;
        highestScoreDiv.innerText = highestScore;
    }
    isGameStarted = false;
    gameSequence = [];
    userSequence = [];
    gameLevel = 0;
}
