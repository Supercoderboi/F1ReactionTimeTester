const highscorebtn = document.getElementById("score-panel")
const needle = document.getElementById('needle');
const speedText = document.getElementById('speed-text');
const speedometer = document.getElementById('speedometer');
const light1 = document.getElementById('light1');
const light2 = document.getElementById('light2');
const light3 = document.getElementById('light3');
const light4 = document.getElementById('light4');
const light5 = document.getElementById('light5');
const hi = document.getElementById('HighScore');
const hs = document.getElementById("hs");
const instruction = document.getElementById("instruction")
const highscoreListt = document.getElementById("highscorelist");


let pastScore=0;
let openedList = false;
let  highscore = 0;
let highscoreList= JSON.parse(localStorage.getItem('Highscore')) || [];
let angle = 270;
let tim = 0;
let needleInterval;
let gameActive = false;
let lightsRunning = false;
let startTime;
let stored = localStorage.getItem("Highscore");

if (stored !== null) {
    try {
        let parsed = JSON.parse(stored);

        if (!Array.isArray(parsed)) {
            localStorage.removeItem("Highscore");
        }
    } catch (e) {
        localStorage.removeItem("Highscore");
    }
}

const getHighest = function(arr) {
    let validScores = arr.filter(score => score > 0);

    if(validScores.length === 0) return 0;

    return Math.min(...validScores);
}



// console.log(localStorage.getItem("Highscore"));
if(localStorage.getItem("Highscore") === null){
     localStorage.setItem('Highscore', JSON.stringify([0]))
    highscore = 0;


} else{
    highscore = getHighest(JSON.parse(localStorage.getItem('Highscore')));
    hi.textContent = highscore
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
    pastScore = tim;
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
            
        }
         //aim is to push the highscore int oarray and remove the slowest one

            if(highscoreList.length -1 >10){
            let temp =highscoreList[0];
            for(let i = highscoreList.length; i!=0; i--){
                if(highscoreList[i] > temp){
                    temp=highscoreList[i]
                }
                
                
            }
            highscoreList.splice(highscoreList.indexOf(temp),1); 
        }
            highscoreList.push(tim);
            // localStorage.setItem("Highscore", highscoreList);
            localStorage.setItem('Highscore', JSON.stringify(highscoreList));
            console.log(highscoreList); 
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

highscorebtn.addEventListener("click", (e) => {
    console.log("cli");

    openedList = true;
    hs.classList.remove("hidden");

    let hsArr = JSON.parse(localStorage.getItem("Highscore")) || [];

    if (hsArr.length > 0) {
        
        highscoreListt.innerHTML = "";
        let ordered = [...hsArr].sort((a, b) => a - b);

        console.log(ordered);
        let i =1;
        // Display scores
        ordered.forEach(score => {
            highscoreListt.insertAdjacentHTML("beforeend", 
                `<li>
                <span>#${i}</span>
                <strong>${score.toFixed(3)}s</strong>
                </li>`);
            i++;
        });

    
    } else {
        lbl.classList.remove("hidden");
    }
});

document.addEventListener("click", (e)=>{
    // console.log(e.target.className) 
    
    if(openedList && e.target.className!="score-panel"){
        openedList = false;
        hs.classList.add("hidden");
    }
})

function createShareCard(reactionTime, personalBest) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width=1080;
    canvas.height=600;

    const difference = reactionTime - personalBest;

    
    ctx.fillStyle ="#111318";
    ctx.fillRect(0,0, canvas.width,canvas.height);
    ctx.fillStyle="#e10600";
    ctx.fillRect(0,0, 14, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 34px Arial";
    ctx.fillText("F1 REACTION TIME TESTER", 55, 75);


    ctx.fillStyle = "#e10600"
    ctx.font = "bold 22px Arial"
    ctx.fillText("CURRENT SCORE", 55, 115);

    ctx.fillStyle = "#303238";
    ctx.fillRect(55,145,970,2);

    ctx.fillStyle = "#ffffff";
    ctx.font="bold 48px Arial";
    ctx.fillText(`${reactionTime.toFixed(3)}s`, 55, 310);

    // ctx.fillStyle = "#e10600";
    // ctx.font = "bold 48ps Arial";
    // ctx.fillText("s", 620, 305);

    ctx.fillStyle = "#999da5";
    ctx.font="22px Arial";
    ctx.fillText("PERSONAL BEST", 80, 445);

    CSSTransformComponent.fillStyle = "#ffffff";
    ctx.font = "bold 42px Arial";
    ctx.fillText(`${personalBest.toFixed(3)} s`, 80, 490);

    ctx.fillStyle = "#24262b"
    ctx.fillRect(540,400,485,115);

    ctx.fillStyle = "#999da5"
    ctx.font = "22px Arial";
    ctx.fillText("DIFFERENCE FROM PB", 565, 445)

    ctx.fillStyle = difference <=0?"#35d07f":"#ff6464";
    ctx.font = "bold 42px Arial";

    const delta = difference === 0
        ?"NEW PB SET!":`${difference > 0? "+" : " "}${difference.toFixed(3)}s`;

    ctx.fillText(delta,565,490);

    ctx.fillStyle = "#777b83";
    ctx.font = "20px Arial";
    ctx.fillText("MADE BY ETHAN PAUL K", 55, 565);

    const link = document.createElement("a");
    link.download = "reaction-result.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

instruction.addEventListener("click", (e)=>{
    createShareCard(pastScore, highscore);
})