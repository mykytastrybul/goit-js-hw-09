import Notiflix from 'notiflix';
const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', receiveFormData);
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
let promiseValue = {};
function receiveFormData(event) {
  promiseValue[event.target.name] = event.target.value;
}
function onFormSubmit(event) {
  event.preventDefault();
  let delay = +promiseValue.delay;
  let delayStep = +promiseValue.step;
  let amount = +promiseValue.amount;
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += delayStep;
  }
}