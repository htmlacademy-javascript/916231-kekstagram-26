const bigPictureSectionElement = document.querySelector('.big-picture');
const imageElement = bigPictureSectionElement.querySelector('.big-picture__img').children[0];
const likesCountElement = bigPictureSectionElement.querySelector('.likes-count');
const imageDescriptionElement = bigPictureSectionElement.querySelector('.social__caption');
const commentsCountElement = bigPictureSectionElement.querySelector('.comments-count');
const commentsElement = bigPictureSectionElement.querySelector('.social__comments');
const cancelButtonElement = bigPictureSectionElement.querySelector('.big-picture__cancel');
const ESCAPE_KEY = 27;

const getImageInfo = (url, likes, commentsLenght, description) => {
  imageElement.src = url;
  likesCountElement.textContent = likes;
  commentsCountElement.textContent = commentsLenght;
  imageDescriptionElement.textContent = description;
};

const getComment = (data) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const AVATAR_SIZE = '35';
  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = data.avatar;
  img.alt = data.name;
  img.width = AVATAR_SIZE;
  img.height = AVATAR_SIZE;
  comment.appendChild(img);

  const description = document.createElement('p');
  description.classList.add('social__text');
  description.textContent = data.message;
  comment.appendChild(description);
  return comment;
};

const getComments = (comments) => {
  const fragmentComments = document.createDocumentFragment();
  comments.forEach((comment) => {
    fragmentComments.appendChild(getComment(comment));
  });

  return fragmentComments;
};

const closeModal = () => {
  bigPictureSectionElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
};

const openModal = () => {
  bigPictureSectionElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
  cancelButtonElement.addEventListener('click', () => {
    closeModal();
  });
};

function onPopupEscKeydown (evt) {
  if (evt.keyCode === ESCAPE_KEY) {
    evt.preventDefault();
    closeModal();
  }
}

const openBigPicture = (data) => {
  getImageInfo(data.url, data.likes, data.comments.length, data.description);

  commentsElement.innerHTML = '';
  commentsElement.appendChild(getComments(data.comments));

  bigPictureSectionElement
    .querySelector('.social__comment-count')
    .classList.add('hidden');
  bigPictureSectionElement.querySelector('.comments-loader').classList.add('hidden');

  openModal();
};

export { openBigPicture };
