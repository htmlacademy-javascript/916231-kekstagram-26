const imagePreviewElement = document.querySelector('.img-upload__preview').children[0];
const sliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');
const filters = document.querySelector('.effects__list');
const sliderBlockElement = document.querySelector('.img-upload__effect-level');
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
  }
};

let currentFilter;

const cleanFilter = () => {
  imagePreviewElement.style.filter = null;
};

const setFilterChrome = () => {
  imagePreviewElement.style.filter = `grayscale(${effectValueElement.value})`;
};

const setFilterSepia = () => {
  imagePreviewElement.style.filter = `sepia(${effectValueElement.value})`;
};

const setFilterMarvin = () => {
  imagePreviewElement.style.filter = `invert(${effectValueElement.value}%)`;
};

const setFilterPhobos = () => {
  imagePreviewElement.style.filter = `blur(${effectValueElement.value}px)`;
};

const setFilterHeat = () => {
  imagePreviewElement.style.filter = `brightness(${effectValueElement.value})`;
};

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
  switch (currentFilter) {
    case 'effect-none':
      cleanFilter();
      break;
    case 'effect-chrome':
      setFilterChrome();
      break;
    case 'effect-sepia':
      setFilterSepia();
      break;
    case 'effect-marvin':
      setFilterMarvin();
      break;
    case 'effect-phobos':
      setFilterPhobos();
      break;
    case 'effect-heat':
      setFilterHeat();
      break;
  }
});

filters.addEventListener('change', (evt) => {
  currentFilter = evt.target.id;
  effectValueElement.value = evt.target.id;
  if(evt.target.id === 'effect-none'){
    removeImageClass();
    hiddenSlider();
    cleanFilter();
  } else {
    showSlider();
    updateOptions(filtersOptions[evt.target.id]);
    removeImageClass();
    imagePreviewElement.classList.add(filtersOptions[evt.target.id].classImage);
  }
});
