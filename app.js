let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let allBtns = document.querySelectorAll(".btn");
let btns = ["yellow", "red", "purple", "green"];


document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}


function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => btn.classList.remove("userFlash"), 250);
}


function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    
    disableButtons();

    
    let randomIdx = Math.floor(Math.random() * btns.length);
    let randomCol = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomCol}`);
    gameSeq.push(randomCol);

    
    setTimeout(() => gameFlash(randomBtn), 500);
    setTimeout(enableButtons, 500 * gameSeq.length);
}


function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000); 
        }
    } else {
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br>Press any key to start`;
        document.querySelector("body").classList.add("game-over");
        setTimeout(() => document.querySelector("body").classList.remove("game-over"), 500);
        reset();
    }
}


function btnPress() {
    if (!started) return; // Ignore clicks if the game hasn't started

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}


for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}


function disableButtons() {
    for (let btn of allBtns) {
        btn.style.pointerEvents = "none";
    }
}

function enableButtons() {
    for (let btn of allBtns) {
        btn.style.pointerEvents = "auto";
    }
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}