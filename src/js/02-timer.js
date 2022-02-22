import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysElem = document.querySelector('span[data-days]');
const hoursElem = document.querySelector('span[data-hours]');
const minutesElem = document.querySelector('span[data-minutes]');
const secondsElem = document.querySelector('span[data-seconds]');
const styleCounter = document.querySelector('.timer');
startBtn.addEventListener('click', onBtnClick);
startBtn.setAttribute('disabled', 'disabled');
let interval = null;
let deltaTime = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            Notiflix.Notify.failure('Please choose a date in the future', {
                clickToClose: true,
                fontSize: '14px',
            });
            return;
        } else {
            startBtn.removeAttribute('disabled', 'disabled');
            deltaTime = selectedDates[0] - Date.now();
        }
        console.log(selectedDates[0]);
    },
};
flatpickr(dateInput, options);
function onBtnClick() {
    startBtn.setAttribute('disabled', 'disabled');
    interval = setInterval(() => {
        deltaTime -= 1000;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        outputCounter(days, hours, minutes, seconds);
        if (deltaTime < 1000) {
            clearInterval(interval);
        }
    }, 1000);
    if (deltaTime < 1000) {
        clearInterval(interval);
    }
    dateInput.setAttribute('disabled', 'true');
}
function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
function outputCounter(days, hours, minutes, seconds) {
    daysElem.textContent = days;
    hoursElem.textContent = hours;
    minutesElem.textContent = minutes;
    secondsElem.textContent = seconds;
}
styleCounter.style.display = 'flex';
styleCounter.style.justifyContent = 'space-evenly';
styleCounter.style.fontWeight = '700';
styleCounter.style.padding = '50px';
dateInput.style.position = 'absolute';
dateInput.style.left = '38vw';
dateInput.style.marginLeft = 'auto';
startBtn.style.margin = 'auto';
startBtn.style.position = 'absolute';
startBtn.style.left = '50vw';