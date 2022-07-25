const SCALE_VALUE_STEP = 0.25;
const MAX_SCALE_VALUE = 1;
const MIN_SCALE_VALUE = 0.25;
const SCALE_COEFFICIENT = 100;

const imagePreviewElement = document.querySelector('.img-upload__preview');
const scaleValueElement = document.querySelector('.scale__control--value');
const smallerScaleElement = document.querySelector('.scale__control--smaller');
const biggerScaleElement = document.querySelector('.scale__control--bigger');

let scaleValue = MAX_SCALE_VALUE;

const setScaleValue = () => {
  scaleValueElement.value = `${scaleValue*SCALE_COEFFICIENT}%`;
};

const scaleImage = () => {
  imagePreviewElement.style.transform = `scale(${scaleValue})`;
};

setScaleValue();

smallerScaleElement.addEventListener('click', () => {
  if(scaleValue > MIN_SCALE_VALUE){
    scaleValue -= SCALE_VALUE_STEP;
    scaleImage();
    setScaleValue();
  }
});

biggerScaleElement.addEventListener('click', () => {
  if(scaleValue < MAX_SCALE_VALUE){
    scaleValue += SCALE_VALUE_STEP;
    scaleImage();
    setScaleValue();
  }
});

const removeScale = () => {
  scaleValue = 1;
  scaleImage();
  setScaleValue();
};

export {removeScale};

