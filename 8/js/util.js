const getRandomNumber = (min, max) => {
  if (min > max || min < 0 || max < 0) {
    throw 'Неверные данные';
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayNumbers = (length, minNumber, maxNumber) => {
  const numbers = [];
  while(numbers.length < length){
    numbers.push(getRandomNumber(minNumber, maxNumber));
  }
  return numbers;
};

const getRandomArrayUniqueNumbers = (length) => {
  const numbers = [];
  for(let i = 0; i < length; i++){
    numbers[i] = i;
  }
  for(let i = length - 1; i > 0; i--){
    const j = getRandomNumber(0, i);
    const swap = numbers[j];
    numbers[j] = numbers[i];
    numbers[i] = swap;
  }
  return numbers;
};

const isValidLength = (inputString, maxLength) => (inputString.length <= maxLength);
isValidLength('qeqweqwe', 5);

export {getRandomNumber, getRandomArrayNumbers, getRandomArrayUniqueNumbers};
