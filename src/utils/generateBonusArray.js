const generateBonusArray = (rows, tokesFirst, expFirst, bonus) => {
  let bonusArray = [];
  let initTokens = tokesFirst;
  let expInit = expFirst;
  for (let i = 1; i <= rows; i++) {
    let bonusSingle = {};
    if (i === 0) {
      bonusSingle = {
        id: i,
        tokens: initTokens,
        exp: expInit,
      };
    } else {
      bonusSingle = {
        id: i,
        tokens: Math.floor(initTokens * (bonus + 1)),
        exp: (expInit * (bonus + 1)).toFixed(1),
      };
    }
    bonusArray.push(bonusSingle);
    initTokens = Math.floor(initTokens * (bonus + 1));
    expInit = (expInit * (bonus + 1)).toFixed(1);
  }
  return bonusArray;
};
export default generateBonusArray;
