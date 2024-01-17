const elements = {
  body: document.body,
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
let timer;

elements.startBtn.addEventListener('click', startBtnClickHandler);

elements.stopBtn.addEventListener('click', stopBtnClickHandler);

/**
 * Click handler for the start button.
 */
function startBtnClickHandler() {
  elements.body.style.backgroundColor = getRandomHexColor();
  timer = setInterval(() => {
    elements.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  elements.startBtn.disabled = true;
  elements.stopBtn.disabled = false;
}

/**
 * Click handler for the stop button.
 */
function stopBtnClickHandler() {
  clearInterval(timer);
  elements.startBtn.disabled = false;
  elements.stopBtn.disabled = true;
}

/**
 * Generates random hex color.
 * @returns {string} Hex color.
 */
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
