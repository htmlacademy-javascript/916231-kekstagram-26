import {onPopupEscKeydown} from './user-form.js';

const ALERT_SHOW_TIME = 5000;
const ESCAPE_KEY = 27;
const TIMEOUT_DELAY = 500;

const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');

let successElement;
let errorElement;

const getRandomNumber = (min, max) => {
  if (min > max || min < 0 || max < 0) {
    throw 'Неверные данные';
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomUniqueNumbers = (length) => {
  const numbers = [];
  for (let i = 0; i < length; i++) {
    numbers[i] = i;
  }
  for (let i = length - 1; i > 0; i--) {
    const j = getRandomNumber(0, i);
    const swap = numbers[j];
    numbers[j] = numbers[i];
    numbers[i] = swap;
  }
  return numbers;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '15px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'LightCoral';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const onSuccessButtonClick = () => {
  document.body.removeChild(successElement);
};

const onErrorButtonClick = () => {
  document.body.removeChild(errorElement);
  document.addEventListener('keydown', onPopupEscKeydown);
};

const showSuccessMessage = () => {
  successElement = successTemplateElement.cloneNode(true);
  const successButtonElement = successElement.querySelector('.success__button');
  successButtonElement.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('click', onSuccessDocumentClick);
  document.addEventListener('keydown', onSuccessEscKeydown);
  document.body.appendChild(successElement);
};

const showErrorMessage = () => {
  errorElement = errorTemplateElement.cloneNode(true);
  errorElement.style.zIndex = '100';
  const errorButtonElement =  errorElement.querySelector('.error__button');
  document.removeEventListener('keydown', onPopupEscKeydown);
  errorButtonElement.addEventListener('click', onErrorButtonClick);
  document.addEventListener('click', onErrorDocumentClick);
  document.addEventListener('keydown', onErrorEscKeydown);
  document.body.appendChild(errorElement);
};

function onSuccessDocumentClick (evt) {
  if (evt.target === successElement) {
    document.body.removeChild(successElement);
    document.removeEventListener('click', onSuccessDocumentClick);
    document.removeEventListener('keydown', onSuccessEscKeydown);
  }
}

function onSuccessEscKeydown (evt) {
  if (evt.keyCode === ESCAPE_KEY) {
    document.body.removeChild(successElement);
    document.removeEventListener('keydown', onSuccessEscKeydown);
    document.removeEventListener('click', onSuccessDocumentClick);
  }
}

function onErrorDocumentClick (evt) {
  if (evt.target === errorElement) {
    document.body.removeChild(errorElement);
    document.removeEventListener('click', onErrorDocumentClick);
    document.removeEventListener('keydown', onErrorEscKeydown);
    document.addEventListener('keydown', onPopupEscKeydown);
  }
}

function onErrorEscKeydown (evt) {
  if (evt.keyCode === ESCAPE_KEY) {
    document.body.removeChild(errorElement);
    document.removeEventListener('keydown', onErrorEscKeydown);
    document.removeEventListener('click', onErrorDocumentClick);
    document.addEventListener('keydown', onPopupEscKeydown);
  }
}

function debounce (callback) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), TIMEOUT_DELAY);
  };
}

export {
  getRandomUniqueNumbers,
  showAlert,
  showSuccessMessage,
  showErrorMessage,
  debounce
};
