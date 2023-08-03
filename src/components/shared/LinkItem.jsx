import React from "react";

const LinkItem = ({ linkName, link, reward, claimed, claimOut, disabled }) => {
  return (
    <div className="task-offers">
      <div className="title-task-and-star">
        <h3>{linkName}</h3>
        <img src="/img-all/img-all-lk/stars-task.svg" alt="" />
      </div>
      <div className="btns-content-task">
        <a href={link} className={`btn-task ${disabled && "btn-disabled"}`}>
          Посетить сайт
        </a>
        <div className="right-btns-content-task">
          <a href="#!" className="btn-green-task">
            {reward} токенов
          </a>
          <a href="#!" className="btn-purple-task">
            {claimed}/{claimOut} views Claim
          </a>
        </div>
      </div>
    </div>
  );
};

export default LinkItem;
