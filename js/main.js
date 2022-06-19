const getRandomNumber = (min, max) => {
  if (min > max || max < 0) {
    return NaN;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayNumbers = (length, minNumber, maxNumber) => {
  const arrayNumber = [];
  while(arrayNumber.length < length){
    arrayNumber.push(getRandomNumber(minNumber, maxNumber));
  }
  return arrayNumber;
};

const getRandomArrayUniqueNumbers = (length, minNumber, maxNumber) => {
  const arrayNumber = [];
  while(arrayNumber.length < length){
    const randomNumber = getRandomNumber(minNumber, maxNumber);
    if(arrayNumber.indexOf(randomNumber) === -1){
      arrayNumber.push(randomNumber);
    }
  }
  return arrayNumber;
};

const isValidLength = (inputString, maxLength) => (inputString.length <= maxLength);
isValidLength('qeqweqwe', 5);


const getComments = (countComments) => {
  const comments = [];
  const id = getRandomArrayUniqueNumbers(countComments, 0, countComments + 50);
  const messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];
  const names  = [
    'Александр',
    'Михаил',
    'Даниил',
    'Иван',
    'Матвей',
    'Егор',
    'Кирилл',
    'Дмитрий',
    'Роман',
    'Артем',
    'Вера',
    'Ника',
    'Екатерина',
    'Евгения',
    'Мирослава',
    'Юлия',
    'Ульяна',
    'Кристина',
    'Кира',
    'Любовь',
  ];

  for(let i = 0; i < countComments; i++) {
    const comment = {
      id: id[i],
      avatar: `img/avatar-${  getRandomNumber(1, 6)  }.svg`,
      message: messages[getRandomNumber(0, messages.length - 1)],
      name: names[getRandomNumber(0, names.length - 1)],
    };
    comments.push(comment);
  }

  return comments;
};

const PHOTO_COUNT = 25;

const createPhotos = () => {
  const photos = [];
  const id = getRandomArrayUniqueNumbers(PHOTO_COUNT, 1, 25);
  const descriptions = [
    'Если смогу, я сделаю это. Конец истории.',
    'Смейтесь как только умеете, любите столько, сколько живете.',
    'Помните: вы единственный человек, который может наполнить ваш мир солнечным светом.',
    'Я полностью уверена, что я — диснеевская принцесса, которую еще не придумали.',
    'Не позволяйте кому-то затушить ваши искры только потому, что их свет сияет в чьих-то глазах.',
    'Делайте в вашей жизни то, что меньше заставляет вас смотреть в свой телефон.',
    'Улыбка — единственный тренд в моде, который актуален всегда.',
    'Никогда не ищите свое счастье там, где вы его однажды потеряли.',
    'Жизнь похожа на фотокамеру: вам просто нужно смотреть на нее с улыбкой.',
    'Моя жизнь меняется, потому что меняю ее я.',
    'Всегда начинайте свой день с хороших людей и кофе.',
    'Ни о чем не беспокойтесь. Потому что все лучшие умы на работе.',
    'Жизнь — это всего лишь серия крошечных чудес, поэтому обратите внимание на них.',
    'Живите во всех тех моментах, которые вы не можете выразить словами.',
    'Не ждите идеального момента. Берите каждый момент и делайте его идеальным.',
    'Признай это. Без меня, твоя жизнь была бы действительно скучной.',
    'Будьте счастливы в этот момент, потому что этот момент — и есть ваша жизнь.',
    'Я пыталась заниматься йогой, но в позе лотоса уснула.',
    'Я, возможно, никогда не буду лучшей, но я стараюсь быть лучшей твоей.',
    'Если вам никто не улыбнулся утром, я подарю вам одну из своих.',
    'Никогда не позволяйте никому скучать.',
    'Все только начинает становиться действительно хорошим.',
    'Я опять съела сладкое. А все потому, что каждую секунду в мире 200 человек празднуют свой день рождения!',
    'Мечтайте. Поверьте, в это. Добейтесь этого.',
    'Утром только одна хорошая мысль меняет смысл целого дня.',
    'Надейтесь на лучшее, но не ждите этого. Смотрите вперед в будущее, но никогда не ждите, пока это произойдет.',
    'Любите меня, от этого я буду сиять еще ярче.',
    'Я точно знаю, кто я, и я чертовски горжусь этим.',
  ];
  const likes = getRandomArrayNumbers(PHOTO_COUNT, 15, 200);

  for(let i = 0; i < PHOTO_COUNT; i++) {
    const photo = {
      id: id[i],
      url: `photos/${  id[i]  }.jpg`,
      description: descriptions[i],
      likes: likes[i],
      comments: getComments(getRandomNumber(1, 10)),
    };
    photos.push(photo);
  }

  return photos;
};

createPhotos();
