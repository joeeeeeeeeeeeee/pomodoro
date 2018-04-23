function twoDigits(number) {
  return `0${number}`.slice(-2);
}

function update(timeInSeconds) {
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds % 60;
  document.querySelector('#minutes').textContent = twoDigits(minutes);
  document.querySelector('#seconds').textContent = twoDigits(seconds);
  return timeInSeconds;
}

function initializeClock(timeInSeconds) {
  clearAllIntervals();
  update(timeInSeconds);
  timeInterval = setInterval(function() {
    timeInSeconds--;
    update(timeInSeconds);
    if (timeInSeconds < 1) {
      clearInterval(timeInterval);
      audio.play();
    }
  }, 1000);
  timeIntervals.push(timeInterval);
}

function clearAllIntervals() { //and stop alarm
  timeIntervals.forEach(e => {
    clearInterval(e);
    update(0);
    audio.pause();
    audio.currentTime = 0;
  });
}


var timeIntervals = [];
var audio = new Audio("assets/audio/alarm_clock.ogg");
document.querySelector("#start_pomodoro").addEventListener("click", () => initializeClock(60 * 25));
document.querySelector("#start_break").addEventListener("click", () => initializeClock(60 * 5));
document.querySelector("#start_long_break").addEventListener("click", () => initializeClock(60 * 15));
document.querySelector("#stop").addEventListener("click", () => clearAllIntervals());