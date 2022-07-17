import {createPhotos} from './data.js';
import {openBigPicture} from './big-picture.js';

const photosElement = document.querySelector('.pictures');
const fragmentPhotos = document.createDocumentFragment();
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const generatedPhotos = createPhotos();

generatedPhotos.forEach((generatedPhoto) => {
  const photoElement = pictureTemplateElement.cloneNode(true);
  photoElement.querySelector('.picture__img').src =  generatedPhoto.url;
  photoElement.querySelector('.picture__likes').textContent = generatedPhoto.likes;
  photoElement.querySelector('.picture__comments').textContent = generatedPhoto.comments.length;

  photoElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(generatedPhoto);
  });

  fragmentPhotos.appendChild(photoElement);
});

photosElement.appendChild(fragmentPhotos);
