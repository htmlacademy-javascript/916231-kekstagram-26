const ESCAPE_KEY = 27;
const AVATAR_SIZE = '35';
const COMMENT_LOADING_STEP = 5;

const bigPictureSectionElement = document.querySelector('.big-picture');
const imageElement = bigPictureSectionElement.querySelector('.big-picture__img').children[0];
const likesCountElement = bigPictureSectionElement.querySelector('.likes-count');
const imageDescriptionElement = bigPictureSectionElement.querySelector('.social__caption');
const commentsCountElement = bigPictureSectionElement.querySelector('.comments-count');
const commentsElement = bigPictureSectionElement.querySelector('.social__comments');
const commentsLoadedCountElement = bigPictureSectionElement.querySelector('.comments-count-loaded');
const commentsLoaderElement =  bigPictureSectionElement.querySelector('.comments-loader');
const cancelButtonElement = bigPictureSectionElement.querySelector('.big-picture__cancel');

let commentsLoadedCount = 0;
let dataComments = [];

const setImageInfo = (url, likes, commentsLenght, description) => {
  imageElement.src = url;
  likesCountElement.textContent = likes;
  commentsCountElement.textContent = commentsLenght;
  imageDescriptionElement.textContent = description;
};

const getComment = (data) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = data.avatar;
  commentAvatar.alt = data.name;
  commentAvatar.width = AVATAR_SIZE;
  commentAvatar.height = AVATAR_SIZE;
  comment.appendChild(commentAvatar);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = data.message;
  comment.appendChild(commentText);
  return comment;
};

const getComments = (comments) => {
  const fragmentComments = document.createDocumentFragment();
  comments.forEach((comment) => {
    fragmentComments.appendChild(getComment(comment));
    commentsLoadedCount++;
  });

  return fragmentComments;
};

const isLoadedAllComments = (length) => {
  if(commentsElement.childNodes.length === length){
    commentsLoaderElement.classList.add('hidden');
  }
};

const loadNextComments = () =>{
  commentsElement.appendChild(getComments(dataComments.slice(commentsLoadedCount, commentsLoadedCount + COMMENT_LOADING_STEP)));
  isLoadedAllComments(dataComments.length);
  commentsLoadedCountElement.textContent = commentsLoadedCount;
};

const onCommentsLoaderClick = () => {
  loadNextComments();
};

const closeModal = () => {
  bigPictureSectionElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsLoaderElement.classList.remove('hidden');

  commentsLoadedCount = 0;

  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
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

const openBigPicture = (data) => {
  setImageInfo(data.url, data.likes, data.comments.length, data.description);
  commentsElement.innerHTML = '';
  dataComments = data.comments;
  loadNextComments();
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
  openModal();
};

function onPopupEscKeydown(evt) {
  if (evt.keyCode === ESCAPE_KEY) {
    evt.preventDefault();
    closeModal();
  }
}

export {openBigPicture};
