import React from "react";
import { useSelector } from "react-redux";

const LeaderItem = ({ name, amount, currency, place, rewards }) => {
  const { curLang } = useSelector((state) => state.general);

  return (
    <div className="leaderboard-container-block-table-line">
      <p className="leaders-name">{name}</p>
      <p className="leaderboard-container-block-table-line-collected">
        {amount} {currency}
      </p>
      <p className="leaders-reward">
        {rewards[place]} {curLang === "en" ? "tokens" : "токенов"}
      </p>
    </div>
  );
};

export default LeaderItem;
