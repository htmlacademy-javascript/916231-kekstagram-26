const getRandomNumber = (min, max) => {
  if (min > max || max < 0) {
    return NaN;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isValidLength = (inputString, maxLength) => (inputString.length <= maxLength);

getRandomNumber(1, 100);
isValidLength('qeqweqwe', 5);
