const Filters = {
  EFFECT_NONE: 'effect-none',
  EFFECT_CHROME: 'effect-chrome',
  EFFECT_SEPIA: 'effect-sepia',
  EFFECT_MARVIN: 'effect-marvin',
  EFFECT_PHOBOS: 'effect-phobos',
  EFFECT_HEAT: 'effect-heat',
};

const imagePreviewElement = document.querySelector('.img-upload__preview').children[0];
const sliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');
const filtersElement = document.querySelector('.effects__list');
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
  },
};

const filterFunctions = {
  setFilterNone: () => {
    imagePreviewElement.style.filter = null;
  },
  setFilterChrome: () => {
    imagePreviewElement.style.filter = `grayscale(${effectValueElement.value})`;
  },
  setFilterSepia: () => {
    imagePreviewElement.style.filter = `sepia(${effectValueElement.value})`;
  },
  setFilterMarvin: () => {
    imagePreviewElement.style.filter = `invert(${effectValueElement.value}%)`;
  },
  setFilterPhobos: () => {
    imagePreviewElement.style.filter = `blur(${effectValueElement.value}px)`;
  },
  setFilterHeat: () => {
    imagePreviewElement.style.filter = `brightness(${effectValueElement.value})`;
  },
};

let currentFilter = Filters.EFFECT_NONE;

const removeImageClass = () => {
  imagePreviewElement.className = '';
};

const hideSlider = () => {
  sliderBlockElement.classList.add('hidden');
};

const showSlider = () => {
  sliderBlockElement.classList.remove('hidden');
};

const removeFilter = () => {
  currentFilter = Filters.EFFECT_NONE;
  filterFunctions.setFilterNone();
  removeImageClass();
  hideSlider();
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

hideSlider();

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
  switch (currentFilter){
    case Filters.EFFECT_NONE:
      filterFunctions.setFilterNone();
      break;
    case Filters.EFFECT_CHROME:
      filterFunctions.setFilterChrome();
      break;
    case Filters.EFFECT_SEPIA:
      filterFunctions.setFilterSepia();
      break;
    case Filters.EFFECT_MARVIN:
      filterFunctions.setFilterMarvin();
      break;
    case Filters.EFFECT_PHOBOS:
      filterFunctions.setFilterPhobos();
      break;
    case Filters.EFFECT_HEAT:
      filterFunctions.setFilterHeat();
      break;
  }
});

filtersElement.addEventListener('change', (evt) => {
  currentFilter = evt.target.id;
  effectValueElement.value = currentFilter;
  if (currentFilter === Filters.EFFECT_NONE) {
    removeFilter();
  } else {
    showSlider();
    updateOptions(filtersOptions[currentFilter]);
    removeImageClass();
    imagePreviewElement.classList.add(filtersOptions[currentFilter].classImage);
  }
});

export {removeFilter};
