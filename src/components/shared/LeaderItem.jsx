import React from "react";

const LeaderItem = ({ name, amount, currency, place, rewards }) => {
  return (
    <div className="leaderboard-container-block-table-line">
      <p className="leaders-name">{name}</p>
      <p className="leaderboard-container-block-table-line-collected">
        {amount} {currency}
      </p>
      <p className="leaders-reward">{rewards[place]} токенов</p>
    </div>
  );
};

export default LeaderItem;
