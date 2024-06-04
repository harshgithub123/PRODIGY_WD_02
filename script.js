let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStopButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const laps = document.getElementById('laps');

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateTime, 10);
        startStopButton.textContent = 'Pause';
        resetButton.disabled = false;
        lapButton.disabled = false;
        running = true;
    } else {
        clearInterval(timerInterval);
        startStopButton.textContent = 'Start';
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00.00';
    startStopButton.textContent = 'Start';
    difference = 0;
    running = false;
    resetButton.disabled = true;
    lapButton.disabled = true;
    laps.innerHTML = '';
    lapCount = 0;
}

function lapStopwatch() {
    lapCount++;
    const lapTime = document.createElement('div');
    lapTime.className = 'lap';
    lapTime.textContent = `Lap ${lapCount}: ${display.textContent}`;
    laps.appendChild(lapTime);
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(number, length = 2) {
    let str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

startStopButton.addEventListener('click', startStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', lapStopwatch);
