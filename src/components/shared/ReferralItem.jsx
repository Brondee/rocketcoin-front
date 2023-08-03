import React from "react";

const ReferralItem = ({ name, earnedTokens, createdAt, updatedAt }) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const createdAtDate = new Date(createdAt).toLocaleDateString(
    "ru-Ru",
    options
  );
  const updatedAtDate = new Date(updatedAt).toLocaleDateString(
    "ru-Ru",
    options
  );
  return (
    <tr>
      <td>{name}</td>
      <td>{earnedTokens || 0} токенов</td>
      <td>{createdAtDate}</td>
      <td>{updatedAtDate}</td>
    </tr>
  );
};

export default ReferralItem;
