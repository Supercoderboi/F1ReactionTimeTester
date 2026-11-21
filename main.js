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

            if(highscoreList.length>10){
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
        
        hs.innerHTML = "";
        let ordered = [...hsArr].sort((a, b) => a - b);

        console.log(ordered);
        let i =1;
        // Display scores
        ordered.forEach(score => {
            hs.insertAdjacentHTML("beforeend", `<div class="item">${i}. ${score}</div>`)
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


