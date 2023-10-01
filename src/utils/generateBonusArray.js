// const generateBonusArray = (rows, tokesFirst, expFirst, bonus) => {
//   let bonusArray = [];
//   let initTokens = tokesFirst;
//   let expInit = expFirst;
//   for (let i = 1; i <= rows; i++) {
//     let bonusSingle = {};
//     if (i === 0) {
//       bonusSingle = {
//         id: i,
//         tokens: initTokens,
//         exp: expInit,
//       };
//     } else {
//       bonusSingle = {
//         id: i,
//         tokens: Math.floor(initTokens * (bonus + 1)),
//         exp: (expInit * (bonus + 1)).toFixed(1),
//       };
//     }
//     bonusArray.push(bonusSingle);
//     initTokens = Math.floor(initTokens * (bonus + 1));
//     expInit = (expInit * (bonus + 1)).toFixed(1);
//   }
//   return bonusArray;
// };

export const bonusArray = [
  {
    id: 1,
    tokens: 10,
    exp: 2,
  },
  {
    id: 2,
    tokens: 12,
    exp: 5,
  },
  {
    id: 3,
    tokens: 13,
    exp: 7,
  },
  {
    id: 4,
    tokens: 14,
    exp: 9,
  },
  {
    id: 5,
    tokens: 15,
    exp: 11,
  },
  {
    id: 6,
    tokens: 18,
    exp: 15,
  },
  {
    id: 7,
    tokens: 21,
    exp: 18,
  },
];

// export default generateBonusArray;
