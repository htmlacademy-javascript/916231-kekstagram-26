const imagePreviewElement = document.querySelector('.img-upload__preview')
  .children[0];
const sliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');
const filtersElement = document.querySelector('.effects__list');
const sliderBlockElement = document.querySelector('.img-upload__effect-level');
const cancelButtonElement = document.querySelector('#upload-cancel');
const Filters = {
  'effect-none': () => {
    imagePreviewElement.style.filter = null;
  },
  'effect-chrome': () => {
    imagePreviewElement.style.filter = `grayscale(${effectValueElement.value})`;
  },
  'effect-sepia': () => {
    imagePreviewElement.style.filter = `sepia(${effectValueElement.value})`;
  },
  'effect-marvin': () => {
    imagePreviewElement.style.filter = `invert(${effectValueElement.value}%)`;
  },
  'effect-phobos': () => {
    imagePreviewElement.style.filter = `blur(${effectValueElement.value}px)`;
  },
  'effect-heat': () => {
    imagePreviewElement.style.filter = `brightness(${effectValueElement.value})`;
  },
};
const filtersOptions = {
  'effect-chrome': {
    min: 0,
    max: 1,
    step: 0.1,
    classImage: 'effects__preview--chrome',
  },
  'effect-sepia': {
    min: 0,
    max: 1,
    step: 0.1,
    classImage: 'effects__preview--sepia',
  },
  'effect-marvin': {
    min: 0,
    max: 100,
    step: 1,
    classImage: 'effects__preview--marvin',
  },
  'effect-phobos': {
    min: 0,
    max: 3,
    step: 0.1,
    classImage: 'effects__preview--phobos',
  },
  'effect-heat': {
    min: 1,
    max: 3,
    step: 0.1,
    classImage: 'effects__preview--heat',
  },
};

let currentFilter = 'effect-none';

const removeImageClass = () => {
  imagePreviewElement.className = '';
};

const hiddenSlider = () => {
  sliderBlockElement.classList.add('hidden');
};

const showSlider = () => {
  sliderBlockElement.classList.remove('hidden');
};

const updateOptions = (options) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: options.min,
      max: options.max,
    },
    start: options.max,
    step: options.step,
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return value;
      },
    },
  });
};

hiddenSlider();

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  effectValueElement.value = sliderElement.noUiSlider.get();
  Filters[currentFilter]();
});

filtersElement.addEventListener('change', (evt) => {
  currentFilter = evt.target.id;
  effectValueElement.value = evt.target.id;
  if (evt.target.id === 'effect-none') {
    removeImageClass();
    hiddenSlider();
    Filters[currentFilter]();
  } else {
    showSlider();
    updateOptions(filtersOptions[evt.target.id]);
    removeImageClass();
    imagePreviewElement.classList.add(filtersOptions[evt.target.id].classImage);
  }
});

cancelButtonElement.addEventListener('click', ()=>{
  currentFilter = 'effect-none';
  Filters[currentFilter]();
  removeImageClass();
});
