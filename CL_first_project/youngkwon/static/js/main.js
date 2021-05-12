let GAME_STARTED = false;
let XPOS = [];
let TIME = -10000;
let SCORE = 0;
let RESULTFLAG = true;
let S_PRESSED = false;
const FORWARD_DEADLINE = 130;


const scoreUpdate = () => {
    for(let i = 0; i < XPOS.length; i++) {
        if(XPOS[i] > FORWARD_DEADLINE) {
            if (XPOS[i] < FORWARD_DEADLINE + 50) {
                SCORE += 1;
            }
        }
    }
}

const spacePressed = () => {
    if(S_PRESSED == true){
        console.log("space!");
    }else {
        console.log("not space");
    }
}

const keyDownHandler = (e) => {
    if(e.key == " ") {
        S_PRESSED = true;
    }
}

const keyUpHandler = (e) => {
    if(e.key == " ") {
        S_PRESSED = false;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

const setCookieAni = () => {
    cookie01 = document.querySelector('#cookie01');
    cookie01.style.animation = "ani_cookie01 2.5s linear forwards";

    cookie02 = document.querySelector('#cookie02');
    cookie02.style.animation = "ani_cookie02 2.5s linear forwards";

    cookie03 = document.querySelector('#cookie03');
    cookie03.style.animation = "ani_cookie03 2.5s linear forwards";

    cookie04 = document.querySelector('#cookie04');
    cookie04.style.animation = "ani_cookie04 2.5s linear forwards";

    cookie05 = document.querySelector('#cookie05');
    cookie05.style.animation = "ani_cookie05 2.5s linear forwards";

    cookie06 = document.querySelector('#cookie06');
    cookie06.style.animation = "ani_cookie06 2.5s linear forwards";
}

const pauseAnimation = (element) => {
    console.log(element);
    elem = document.querySelector(element);
    console.log(elem);
    elem.style.animation = "none";
    elem.style.animation = "btnPause 3s ease infinite";
    setCookieAni();
    setTimeout(() => {
        document.querySelector('.intro').style.animation = "introFadeout 3s forwards ease-in-out";
        let timer = 3;
        setInterval(() => {
            document.querySelector('#waitingTime').innerHTML = timer;
            timer -= 1
            if(timer == 2) {
                document.querySelector('#waitingTime').style.color = 'red';
            }
            if(timer == -1) {
                location.href = "http://localhost:8000/youngkwon/introduction/";
            }
        }, 1000)
    },2000);
}

const go = () => {
    pauseAnimation('#indexBtn')
}

const readyToRun = () => {
    console.log("Ready To Run!");
    window.scroll(0, 800);
    setTimeout(() => {
        window.scroll(0, 1600);
    }, 3000);
}

const unrollSuggestion = () => {
    let paper = document.querySelectorAll('.suggestion_paper')[0];
    paper.style.animationName = "unroll_suggestion";
    paper.style.animationDuration = ".7s";
    paper.style.animationTimingFunction = "linear";
    paper.style.animationFillMode = "forwards";
}

const listAllDisappear = (list) => {
    for(let i = 0; i < list.length; i++) {
        list[i].style.display = "none";
    }
}

const createObstacle = () => {
    setInterval(() => {
        var x_val = (Math.random() + 1) * 800;
        XPOS.push(x_val);
    }, 3000);
}

const drawObstacle = () => {
    let canvas = document.querySelector(".canvas_game");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 150, canvas.width, canvas.height-150);
    for(let i = 0; i < XPOS.length; i++) {
        ctx.beginPath();
        var img = new Image();
        img.onload = () => {
            ctx.drawImage(img, XPOS[i], 220);
        }
        img.src = '/static/' + 'image/obstacle.png';
    }
    drawCharacter();
    drawMap();
}

const decreaseXpos = () => {
    for(let i = 0; i < XPOS.length; i++) {
        XPOS[i] -= 5;
        if((XPOS[i] < FORWARD_DEADLINE && XPOS[i] >10) && S_PRESSED == false && RESULTFLAG) {
            RESULTFLAG = false;
            alert("Survive Time: " + TIME / 1000 + "초\n" + "Score: " + SCORE + "점");
            location.href = "";
        }
    }
}

const drawCharacter = () => {
    let canvas = document.querySelector(".canvas_game");
    let ctx = canvas.getContext("2d");
    if(S_PRESSED == false) {
        var img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 90);
        };
        img.src = '/static/' + 'image/game_character.png';
    }
}

const drawMap = () => {
    let canvas = document.querySelector(".canvas_game");
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.rect(0, 330, 800, 3);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

const drawCanvas = () => {
    drawCharacter();
    drawMap();
    createObstacle();
    setInterval(() => {
        drawObstacle();
        decreaseXpos();
        spacePressed();
        if(S_PRESSED == false) {
            scoreUpdate();
        }
        TIME += 50;
    }, 50);
}

const activeGameStartCounter = () => {
    let target = document.querySelector('.game_start_counter');
    let counter = 2;
    let interval = setInterval(() => {
        target.innerHTML = counter;
        counter -= 1;
        if(counter == -1) {
            target.innerHTML = "GO!";
            clearInterval(interval);
        }
    }, 700);
    setTimeout(() => {
        target.style.display = "none";
        document.querySelector(".canvas_game").style.display = "block";
        drawCanvas();
    }, 700 * (counter + 2));
}

const startGame = () => {
    document.querySelector('.game_console').style.display = "block";
    activeGameStartCounter();
}

const startFadeText = () => {
    let fade_text = document.querySelectorAll('.fade_text');
    let ft_length = fade_text.length;
    let index = 0;
    let interval = setInterval(() => {
        listAllDisappear(fade_text);
        fade_text[index].style.display = 'inline';
        index += 1;
        if(index == ft_length) {
            clearInterval(interval);
        }
    },700);
    setTimeout(() => {
        listAllDisappear(fade_text);
        startGame();
    }, 700 * (ft_length + 1));

}

const introGame = () => {
    GAME_STARTED = true;
    unrollSuggestion();
    startFadeText();
    setTimeout(() => {
        startGame();
    }, 700 * (5));
}

window.onscroll = (ev) => {
    if(GAME_STARTED == false && window.scrollY > 1099) {
        introGame();
    }
};