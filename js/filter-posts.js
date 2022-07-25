import {getRandomUniqueNumbers, debounce} from './util.js';
import {createPictures} from './picture.js';

const RANDOM_PICTURE_COUNT = 10;

const filterSectionElement = document.querySelector('.img-filters');
const formFilterElement = filterSectionElement.querySelector('.img-filters__form');
const filterDefaultElement = formFilterElement.querySelector('#filter-default');
const filterRandomElement = formFilterElement.querySelector('#filter-random');
const filterDiscussedElement = formFilterElement.querySelector('#filter-discussed');

let currentFilter = filterDefaultElement;

const getRandomPictures = (pictures) => {
  const randomUniqueNumbers = getRandomUniqueNumbers(pictures.length);
  const randomPictures = [];
  randomUniqueNumbers.slice(0, RANDOM_PICTURE_COUNT).forEach((randomNumber) => {
    randomPictures.push(pictures[randomNumber]);
  });
  return randomPictures;
};

const compareCommentsLength = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const getFilteredPictures = (pictures) => {
  switch (currentFilter){
    case filterDefaultElement:
      return pictures;
    case filterRandomElement:
      return getRandomPictures(pictures);
    case filterDiscussedElement:
      return pictures.slice().sort(compareCommentsLength);
  }
};

filterSectionElement.classList.remove('img-filters--inactive');

formFilterElement.addEventListener('click', debounce((evt) => {
  currentFilter.classList.remove('img-filters__button--active');
  currentFilter = evt.target;
  currentFilter.classList.add('img-filters__button--active');
  createPictures();
}));

export {getFilteredPictures};
