import React from "react";
import { useSelector } from "react-redux";
import ShowMoreText from "react-show-more-text";

const LinkItem = ({ linkName, link, reward, claimed, claimOut, disabled }) => {
  const { curLang } = useSelector((state) => state.general);

  return (
    <div className="task-offers">
      <div className="title-task-and-star">
        <div className="link-name-desc">
          <h3>{linkName}</h3>
          <ShowMoreText
            /* Default options */
            lines={2}
            more={curLang === "en" ? "More" : "Показать еще"}
            less={curLang === "en" ? "Less" : "Скрыть"}
            className="link-desc"
            anchorClass="show-more-less-clickable"
            expanded={false}
            truncatedEndingComponent={"... "}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </ShowMoreText>
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
