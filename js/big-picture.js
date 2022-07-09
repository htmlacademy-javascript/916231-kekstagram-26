const getImageInfo = function(bigPictureSection,url, likes, comments, description){
  const image = bigPictureSection.querySelector('.big-picture__img').children[0];
  const likesCount = bigPictureSection.querySelector('.likes-count');
  const imageDescription =  bigPictureSection.querySelector('.social__caption');
  const commentsCount = bigPictureSection.querySelector('.comments-count');


  image.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments;
  imageDescription.textContent = description;
};

const getComment = function(data){
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = data.avatar;
  img.alt =  data.name;
  img.width = '35';
  img.height = '35';
  comment.appendChild(img);

  const description = document.createElement('p');
  description.classList.add('social__text');
  description.textContent = data.message;
  comment.appendChild(description);
  return comment;
};

const getComments = function(comments){
  const fragmentComments = document.createDocumentFragment();
  for(let i = 0; i < comments.length; i++){
    fragmentComments.appendChild(getComment(comments[i]));
  }
  return fragmentComments;
};

const openModal = function(bigPictureSection){
  bigPictureSection.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeModal = function(bigPictureSection){
  bigPictureSection.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const openBigPicture = function(data){
  const bigPictureSection = document.querySelector('.big-picture');
  getImageInfo(bigPictureSection, data.url, data.likes, data.comments.length, data.description);

  const comments = bigPictureSection.querySelector('.social__comments');
  comments.innerHTML = '';
  comments.appendChild(getComments(data.comments));

  bigPictureSection.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureSection.querySelector('.comments-loader').classList.add('hidden');

  openModal(bigPictureSection);

  const cancelButton = bigPictureSection.querySelector('.big-picture__cancel');
  cancelButton.addEventListener('click', ()=> {
    closeModal(bigPictureSection);
  });
  document.addEventListener('keydown', (evt)=> {
    if(evt.keyCode === 27){
      closeModal(bigPictureSection);
    }
  });
};

export {openBigPicture};


