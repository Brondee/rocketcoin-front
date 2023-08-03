const generateBonusArray = (amount, levelTokens, earningBonus) => {
  let levelsArray = [];
  for (let i = 1; i <= amount; i++) {
    const level = {
      number: i,
      levelTokens,
      earningBonus,
    };
    levelsArray.push(level);
  }
  return levelsArray;
};
export default generateBonusArray;
