import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';
import 'flatpickr/dist/flatpickr.min.css';

const elements = {
  dateTimePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let timer;

flatpickr(elements.dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onDatesSelectedHandler,
});

elements.startBtn.addEventListener('click', onStartBtnClick);

/**
 * Handles date change.
 *
 * @param {*} param0
 */
function onDatesSelectedHandler([selectedDates]) {
  if (new Date() - selectedDates > 0) {
    iziToast.show({
      position: 'topRight',
      color: 'red',
      message: 'Please choose a date in the future',
    });
    resetTimer();
    return;
  } else {
    elements.startBtn.disabled = false;
  }
}

/**
 * Resets timer to initial state.
 */
function resetTimer() {
  clearInterval(timer);
  elements.startBtn.disabled = true;
  elements.days.textContent = '00';
  elements.hours.textContent = '00';
  elements.minutes.textContent = '00';
  elements.seconds.textContent = '00';
}

/**
 * Handles click on start button.
 */
function onStartBtnClick() {
  elements.startBtn.disabled = true;
  elements.dateTimePicker.disabled = true;
  const selectedDate = new Date(elements.dateTimePicker.value);
  renderTimer(selectedDate - new Date());

  timer = setInterval(() => {
    const time = selectedDate - new Date();
    if (time <= 0) {
      clearInterval(timer);
      elements.dateTimePicker.disabled = false;
      return;
    }
    renderTimer(time);
  }, 1000);
}

/**
 * Renders timer
 * @param {integer} time
 */
function renderTimer(time) {
  const { days, hours, minutes, seconds } = convertMs(time);
  elements.days.textContent = addLeadingZero(days);
  elements.hours.textContent = addLeadingZero(hours);
  elements.minutes.textContent = addLeadingZero(minutes);
  elements.seconds.textContent = addLeadingZero(seconds);
}

/**
 * Converts milliseconds to object which contains
 * days, hours, minutes and seconds.
 * @param {integer} ms
 * @returns {object} Object with days, hours, minutes and seconds.
 */
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

/**
 * Adds leading zero to the value.
 *
 * @param {integer} value
 */
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
