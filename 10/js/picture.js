import {openBigPicture} from './big-picture.js';

const picturesElement = document.querySelector('.pictures');
const fragmentPictures = document.createDocumentFragment();
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const createPictures = (pictures) => {
  pictures.forEach((picture) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);
    pictureElement.querySelector('.picture__img').src =  picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(picture);
    });

    fragmentPictures.appendChild(pictureElement);
  });
  picturesElement.appendChild(fragmentPictures);
};

export {createPictures};
