const secondHand = document.querySelector(".second-hand");
const minsHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");

function setDate() {
    const now = new Date(); //to get the real times

    const seconds = now.getSeconds(); // seconds
    const secondsDegrees = ((seconds / 60) * 360) + 90; //90 deg is correction for the css transform
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const mins = now.getMinutes(); // minutes
    const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;

    const hour = now.getHours(); // hours
    const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}
setInterval(setDate, 1000);



function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);

    document.querySelector(".dig-clock").innerHTML = h + ":" + m + ":" + s;

    setTimeout(startTime, 1000);
}

function checkTime(i) {
    return i < 10 ? "0" + i : i;
}

startTime();




let StopWatch = document.querySelector(".stopWatch");
let start = document.querySelector("#start-stopwatch");
let stop = document.querySelector("#stop-stopwatch");
let reset = document.querySelector("#reset-stopwatch");

let seconds = 0;
let minutes = 0;
let hours = 0;
let stopwatchInterval = null;
let isRunning = false;

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        stopwatchInterval = setInterval(() => {
            seconds++;

            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }

            console.clear(); // Clears previous log

            StopWatch.innerText = ` ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
            console.log(
                `⏱️ Stopwatch: ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
            );
        }, 1000);
    }
}
start.addEventListener("click", startStopwatch);

function stopStopwatch() {
    clearInterval(stopwatchInterval);
    isRunning = false;
}
stop.addEventListener("click", stopStopwatch);

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    isRunning = false;
    console.clear();
    StopWatch.innerText = "00:00:00";
    console.log("⏱️ Stopwatch reset to 00:00:00");
}
reset.addEventListener("click", resetStopwatch);

function formatTime(unit) {
    return unit < 10 ? "0" + unit : unit;
}




let hrInput = document.querySelector("#timerHr");
let minInput = document.querySelector("#timerMin");
let secInput = document.querySelector("#timerSec");

let timerStart = document.querySelector("#start-timer");
let timerStop = document.querySelector("#stop-timer");
let timerReset = document.querySelector("#reset-timer");

let timerInterval = null;
let isTimerRunning = false;

function formatTime(time) {
    return time.toString().padStart(2, '0');
}

function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;

        timerInterval = setInterval(() => {
            let hr = parseInt(hrInput.value) || 0;
            let min = parseInt(minInput.value) || 0;
            let sec = parseInt(secInput.value) || 0;

            min += Math.floor(sec / 60);
            sec = sec % 60;

            hr += Math.floor(min / 60);
            min = min % 60;

            if (hr === 0 && min === 0 && sec === 0) {
                clearInterval(timerInterval);
                isTimerRunning = false;
                alert("⏰ Timer Finished!");
                return;
            }

            if (sec === 0) {
                if (min === 0) {
                    if (hr > 0) {
                        hr--;
                        min = 59;
                        sec = 59;
                    }
                } else {
                    min--;
                    sec = 59;
                }
            } else {
                sec--;
            }

            hrInput.value = formatTime(hr);
            minInput.value = formatTime(min);
            secInput.value = formatTime(sec);

            console.clear();
            console.log(`⏱️ Timer: ${formatTime(hr)}:${formatTime(min)}:${formatTime(sec)}`);
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    hrInput.value = "00";
    minInput.value = "00";
    secInput.value = "00";
    console.clear();
    console.log("⏱️ Timer: 00:00:00");
}

timerStart.addEventListener("click", startTimer);
timerStop.addEventListener("click", stopTimer);
timerReset.addEventListener("click", resetTimer);
