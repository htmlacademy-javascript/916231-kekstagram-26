const getRandomNumber = (min, max) => {
  if (min > max || min < 0 || max < 0) {
    throw 'Неверные данные';
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

const getRandomArrayUniqueNumbers = (length) => {
  const arrayNumber = [];
  for(let i = 0; i < length; i++){
    arrayNumber[i] = i;
  }
  for(let i = length - 1; i > 0; i--){
    const j = getRandomNumber(0, i);
    const swap = arrayNumber[j];
    arrayNumber[j] = arrayNumber[i];
    arrayNumber[i] = swap;
  }
  return arrayNumber;
};

const isValidLength = (inputString, maxLength) => (inputString.length <= maxLength);
isValidLength('qeqweqwe', 5);

export {getRandomNumber, getRandomArrayNumbers, getRandomArrayUniqueNumbers};
