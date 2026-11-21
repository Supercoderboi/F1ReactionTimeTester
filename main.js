const needle = document.getElementById('needle');
const speedText = document.getElementById('speed-text');
const speedometer = document.getElementById('speedometer');
const light1 = document.getElementById('light1');
const light2 = document.getElementById('light2');
const light3 = document.getElementById('light3');
const light4 = document.getElementById('light4');
const light5 = document.getElementById('light5');
let hi = document.getElementById('HighScore');
let  highscore = 0;
let angle = 270;
let tim = 0;
let needleInterval;
let gameActive = false;
let lightsRunning = false;
let startTime;
hi.textContent = localStorage.getItem("Highscore");
// console.log(localStorage.getItem("Highscore"));
if(localStorage.getItem("Highscore") === null){
    localStorage.setItem("Highscore", 0);
    highscore = 0;
} else{
    highscore = localStorage.getItem("Highscore");
// console.log(highscore);
}

let reset = function() {
    light1.classList.add('active');
    light2.classList.add('active');
    light3.classList.add('active');
    light4.classList.add('active');
    light5.classList.add('active');
    angle = 270;

    needle.style.transform = `translate(-50%, -100%) rotate(${angle}deg)`;
    tim =0;
    speedText.textContent = tim;

}

reset();
function rotateNeedle() {
    angle += 1;
    tim+=(Date.now() - startTime)/1000;
    needle.style.transform = `translate(-50%, -100%) rotate(${angle}deg)`;
    speedText.textContent = tim.toFixed(3)
    console.log(tim);
}
// setInterval(rotateNeedle, 100);
// rotateNeedle();
let clicked = false;

speedometer.addEventListener('click', async (e) => {
    console.log("Clicked!");

    if(lightsRunning) return;
    
    if(!gameActive && !lightsRunning){
    lightsRunning = true;
    light1.classList.remove('active');
    await delay(1000);
    light2.classList.remove('active');
    await delay(1000);
    light3.classList.remove('active');
    await delay(1000);
    light4.classList.remove('active');
    const randomDelay = Math.random() * 500 + 1000; ;
    console.log(`Random delay: ${randomDelay}ms`);
    await delay(randomDelay);
    light5.classList.remove('active');
    startTime = Date.now();
    lightsRunning = false;
    gameActive = true;
    startNeedle();
    } else if(gameActive){
        if(tim<highscore || highscore==0){
            highscore = tim;
            hi.textContent = highscore;
            localStorage.setItem("Highscore", highscore);
            
        }
        stopNeedle();
            gameActive = false;
            reset();
    }
    
});

// while (true) {
//     if (clicked) {
//         console.log("Clicked again!");
//         // clicked = false;
//         rotateNeedle(); 
//     }

//     await new Promise(resolve => setTimeout(resolve, 100));
    
// }

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function startNeedle() {
    needleInterval = setInterval(rotateNeedle, 100);
}

function stopNeedle() {
    clearInterval(needleInterval);
}