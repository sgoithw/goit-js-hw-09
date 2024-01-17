import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  form: document.querySelector('.form'),
};

elements.form.addEventListener('submit', handleSubmit);

/**
 * Handles the form submit
 * @param {*} event
 */
function handleSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = Object.fromEntries(
    new FormData(event.currentTarget)
  );

  const promises = [];
  const submitBtn = event.currentTarget.elements.submit;
  event.currentTarget.reset();
  submitBtn.disabled = true;

  for (let i = 1; i <= amount; i += 1) {
    promises.push(
      createPromise(i, step * (i - 1) + parseInt(delay)).then(
        onResolve,
        onReject
      )
    );
  }

  Promise.allSettled(promises).then(() => {
    submitBtn.disabled = false;
  });
}

/**
 * On promise resolve
 * @param {*} position
 * @param {*} delay
 */
function onResolve([position, delay]) {
  iziToast.show({
    position: 'topRight',
    color: 'green',
    message: `✅ Fulfilled promise ${position} in ${delay}ms`,
  });
}

/**
 * On promise reject
 * @param {*} position
 * @param {*} delay
 */
function onReject([position, delay]) {
  iziToast.show({
    position: 'topRight',
    color: 'red',
    message: `❌ Rejected promise ${position} in ${delay}ms`,
  });
}

/**
 * Creates a promise that resolves or rejects
 * after the delay
 *
 * @param {integer} position
 * @param {integer} delay
 * @returns
 */
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve([position, delay]);
      } else {
        reject([position, delay]);
      }
    }, delay);
  });
}
