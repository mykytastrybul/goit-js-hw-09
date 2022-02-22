const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);
stopBtn.setAttribute('disabled', 'disabled');
let timerId = null;
function onStartBtnClick() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.setAttribute('disabled', 'disabled');
  stopBtn.removeAttribute('disabled', 'disabled');
}
function onStopBtnClick() {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled', 'disabled');
  stopBtn.setAttribute('disabled', 'disabled');
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}