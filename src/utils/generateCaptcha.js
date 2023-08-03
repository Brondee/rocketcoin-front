const generateCaptcha = () => {
  let captchaResultArray = [];
  let captchaDisplayArray = [0, 0, 0];

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  for (let i = 0; i < 3; i++) {
    captchaResultArray.push(getRandomInt(1000, 99999));
  }
  for (let i = 0; i < captchaResultArray.length; i++) {
    let randInt = getRandomInt(0, 3);
    if (
      captchaDisplayArray[randInt] === 0 &&
      captchaDisplayArray[randInt] !== captchaResultArray[randInt]
    ) {
      captchaDisplayArray[randInt] = captchaResultArray[i];
    } else {
      while (
        captchaDisplayArray[randInt] !== 0 ||
        captchaDisplayArray[randInt] === captchaResultArray[randInt]
      ) {
        randInt = getRandomInt(0, 3);
      }
      if (
        captchaDisplayArray[randInt] === 0 &&
        captchaDisplayArray[randInt] !== captchaResultArray[randInt]
      ) {
        captchaDisplayArray[randInt] = captchaResultArray[i];
      }
    }
  }

  return { captchaResultArray, captchaDisplayArray };
};
export default generateCaptcha;
