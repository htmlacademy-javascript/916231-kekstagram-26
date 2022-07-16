import {createPhotos} from './data.js';
import {openBigPicture} from './big-picture.js';

const listPhotos = document.querySelector('.pictures');
const fragmentPhotos = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const generatedPhotos = createPhotos();

generatedPhotos.forEach((generatedPhoto) => {
  const photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src =  generatedPhoto.url;
  photoElement.querySelector('.picture__likes').textContent = generatedPhoto.likes;
  photoElement.querySelector('.picture__comments').textContent = generatedPhoto.comments.length;

  photoElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(generatedPhoto);
  });

  fragmentPhotos.appendChild(photoElement);
});

listPhotos.appendChild(fragmentPhotos);
