import {openBigPicture} from './big-picture.js';
import {getFilteredPictures} from './filter-posts.js';

const picturesElement = document.querySelector('.pictures');
const fragmentPictures = document.createDocumentFragment();
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

let pictures;

const removePictures = () => {
  const pictureElements = picturesElement.querySelectorAll('.picture');
  pictureElements.forEach((pictureElement) => {
    picturesElement.removeChild(pictureElement);
  });
};

const createPictures = () => {
  getFilteredPictures(pictures)
    .forEach((picture) => {
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
  removePictures();
  picturesElement.appendChild(fragmentPictures);
};

const getPicturesFromServer = (picturesFromServer) => {
  pictures = picturesFromServer;
  createPictures();
};

export {getPicturesFromServer, createPictures};
