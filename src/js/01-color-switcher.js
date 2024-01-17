const elements = {
  body: document.body,
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
let timer;

elements.startBtn.addEventListener('click', startBtnClickHandler);

elements.stopBtn.addEventListener('click', stopBtnClickHandler);

function startBtnClickHandler() {
  elements.body.style.backgroundColor = getRandomHexColor();
  timer = setInterval(() => {
    elements.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  elements.startBtn.disabled = true;
  elements.stopBtn.disabled = false;
}

function stopBtnClickHandler() {
  clearInterval(timer);
  elements.startBtn.disabled = false;
  elements.stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
