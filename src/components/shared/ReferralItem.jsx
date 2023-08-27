import React from "react";
import { useSelector } from "react-redux";

const ReferralItem = ({ name, earnedCoins, createdAt, updatedAt }) => {
  const { curLang } = useSelector((state) => state.general);

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

  const createdAtDateEn = new Date(createdAt).toLocaleDateString(
    "en-US",
    options
  );
  const updatedAtDateEn = new Date(updatedAt).toLocaleDateString(
    "en-US",
    options
  );
  return (
    <tr>
      <td>{name}</td>
      <td>
        {earnedCoins} {curLang === "en" ? "tokens" : "токенов"}
      </td>
      <td>{curLang === "en" ? createdAtDateEn : createdAtDate}</td>
      <td>{curLang === "en" ? updatedAtDateEn : updatedAtDate}</td>
    </tr>
  );
};

export default ReferralItem;
