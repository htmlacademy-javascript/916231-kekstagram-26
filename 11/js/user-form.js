import {isOpenErrorMessage, showSuccessMessage, showErrorMessage} from './util.js';
import {removeFilter} from './filter-image.js';
import {removeScale} from './scale-image.js';
import {sendData} from './api.js';

const ESCAPE_KEY = 27;
const RE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MAX_LENGTH_DESCRIPTION = 140;

const formUploadFileElement = document.querySelector('#upload-select-image');
const inputUploadFileElement = formUploadFileElement.querySelector('#upload-file');
const imageEditorWindowElement = formUploadFileElement.querySelector('.img-upload__overlay');
const cancelButtonElement = formUploadFileElement.querySelector('#upload-cancel');
const hashtagsElement = formUploadFileElement.querySelector('.text__hashtags');
const descriptionElement = formUploadFileElement.querySelector('.text__description');
const submitElement = formUploadFileElement.querySelector('#upload-submit');

const pristine = new Pristine(formUploadFileElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
});

const validateDescription = (value) => value.length <= MAX_LENGTH_DESCRIPTION;

const getHashtags = (value) => {
  const hashtags = value.split(' ').map((hashtag) => hashtag.toLowerCase());
  return hashtags.filter((item) => item !== '');
};

const validateHashtags = (value) => {
  const hashtags = getHashtags(value);
  for (let i = 0; i < hashtags.length; i++) {
    if (!RE.test(hashtags[i])) {
      return false;
    }
  }
  return true;
};

const validateHashtagsCount = (value) => getHashtags(value).length < 5;

const validateHashtagsRepeat = (value) => {
  const hashtags = getHashtags(value).sort();
  for (let i = 0; i < hashtags.length - 1; i++) {
    if (hashtags[i] === hashtags[i + 1]) {
      return false;
    }
  }
  return true;
};

const clearForm = () => {
  removeFilter();
  removeScale();
  formUploadFileElement.reset();
};

const closeModal = () => {
  imageEditorWindowElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  clearForm();
};

const openModal = () => {
  imageEditorWindowElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  cancelButtonElement.addEventListener('click', () => {
    closeModal();
  });
};

const blockSubmitButton = () => {
  submitElement.disabled = true;
};

const unblockSubmitButton = () => {
  submitElement.disabled = false;
};

const setUserFormSubmit = (onSuccess) => {
  formUploadFileElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          showSuccessMessage();
        },
        () => {
          unblockSubmitButton();
          showErrorMessage();
        },
        new FormData(evt.target)
      );
    }
  });
};

function onPopupEscKeydown(evt) {
  if (hashtagsElement === document.activeElement || descriptionElement === document.activeElement || isOpenErrorMessage) {
    evt.stopPropagation();
  } else if (evt.keyCode === ESCAPE_KEY) {
    evt.preventDefault();
    closeModal();
  }
}

inputUploadFileElement.addEventListener('change', () => {
  openModal();
});

pristine.addValidator(hashtagsElement, validateHashtags, 'неверный хэш-тег');
pristine.addValidator(
  hashtagsElement,
  validateHashtagsCount,
  'не больше 5 хэш-тегов'
);
pristine.addValidator(
  hashtagsElement,
  validateHashtagsRepeat,
  'хэш-тег не может повторяться'
);
pristine.addValidator(
  descriptionElement,
  validateDescription,
  'не более 140 символов'
);

export {setUserFormSubmit, closeModal};
