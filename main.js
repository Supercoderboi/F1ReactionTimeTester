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
let reset = function() {
    light1.style.backgroundColor = 'red';
    light2.style.backgroundColor = 'red';
    light3.style.backgroundColor = 'red';
    light4.style.backgroundColor = 'red';
    light5.style.backgroundColor = 'red';
    angle = 270;
    needle.style.transform = `translate(-50%, -100%) rotate(${angle}deg)`;
    tim =0;
    speedText.textContent = tim;

}

reset();
function rotateNeedle() {
    angle += 1;
    tim+=0.1;
    needle.style.transform = `translate(-50%, -100%) rotate(${angle}deg)`;
    speedText.textContent = tim;
    console.log(tim);
}
// setInterval(rotateNeedle, 100);
// rotateNeedle();
let clicked = false;

speedometer.addEventListener('click', async (e) => {
   

    if(!clicked){
    light1.style.backgroundColor = '#111';
    await delay(1000);
    light2.style.backgroundColor = '#111';
    await delay(1000);
    light3.style.backgroundColor = '#111';
    await delay(1000);
    light4.style.backgroundColor = '#111';
    const randomDelay = Math.random() * 3000 + 1000; ;
    console.log(`Random delay: ${randomDelay}ms`);
    await delay(randomDelay);
    light5.style.backgroundColor = '#111';
    }
    

    if(clicked){
        if(tim>highscore){
            highscore = tim;
            hi.textContent = highscore;
            reset();
        }
    }
    clicked= !clicked;

});

while (true) {
    if (clicked) {
        console.log("Clicked again!");
        // clicked = false;
        rotateNeedle(); 
    }

    await new Promise(resolve => setTimeout(resolve, 100));
    
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

