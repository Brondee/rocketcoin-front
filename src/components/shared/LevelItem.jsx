import React from "react";

const LevelItem = ({ levelNum, tokens, bonus }) => {
  return (
    <div class="level-container-list">
      <p>{levelNum} уровень</p>
      <p class="level-container-list-middle">{tokens} токенов</p>
      <p>+{bonus}%</p>
    </div>
  );
};

export default LevelItem;
