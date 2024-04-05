let startTime;
let running = false;
let lapCounter = 1;

function startStop() {
    if (running) {
        clearInterval(timer);
        document.getElementById("startStopButton").textContent = "Start";
    } else {
        startTime = Date.now() - (lapCounter > 1 ? lapTimes[lapCounter - 2] : 0);
        timer = setInterval(updateDisplay, 10);
        document.getElementById("startStopButton").textContent = "Stop";
    }
    running = !running;
}

function reset() {
    clearInterval(timer);
    running = false;
    lapCounter = 1;
    lapTimes = [];
    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("startStopButton").textContent = "Start";
    document.getElementById("lapList").innerHTML = "";
}

function lap() {
    let lapTime = Date.now() - startTime;
    lapTimes.push(lapTime);
    let lapTimeStr = formatTime(lapTime);
    let lapItem = document.createElement("li");
    lapItem.textContent = "Lap " + lapCounter + ": " + lapTimeStr;
    document.getElementById("lapList").appendChild(lapItem);
    lapCounter++;
}

function updateDisplay() {
    let elapsedTime = Date.now() - startTime;
    document.getElementById("display").textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
    let hours = Math.floor(milliseconds / 3600000);
    let minutes = Math.floor((milliseconds % 3600000) / 60000);
    let seconds = Math.floor((milliseconds % 60000) / 1000);
    let millis = Math.floor(milliseconds % 1000);
    return (
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds + "." +
        (millis < 100 ? "0" : "") + (millis < 10 ? "0" : "") + millis
    );
}

document.getElementById("startStopButton").addEventListener("click", startStop);
document.getElementById("resetButton").addEventListener("click", reset);
document.getElementById("lapButton").addEventListener("click", lap);
