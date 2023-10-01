import React from "react";
import { useSelector } from "react-redux";

const LinkItem = ({ linkName, link, reward, claimed, claimOut, disabled }) => {
  const { curLang } = useSelector((state) => state.general);

  return (
    <div className="task-offers">
      <div className="title-task-and-star">
        <div className="link-name-desc">
          <h3>{linkName}</h3>
        </div>
        <img src="/img-all/img-all-lk/stars-task.svg" alt="" />
      </div>
      <div className="btns-content-task">
        <a href={link} className={`btn-task ${disabled && "btn-disabled"}`}>
          {curLang === "en" ? "Visit" : "Посетить сайт"}
        </a>
        <div className="right-btns-content-task">
          <a href="#!" className="btn-green-task">
            {reward} {curLang === "en" ? "tokens" : "токенов"}
          </a>
          <a href="#!" className="btn-purple-task">
            {claimed}/{claimOut}{" "}
            {curLang === "en" ? "views Claim" : "просмотров"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default LinkItem;
