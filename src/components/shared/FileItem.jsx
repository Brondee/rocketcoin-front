import React from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

const FileItem = ({ id, title, desc, timeToComplete, tokens, exp }) => {
  const { curLang } = useSelector((state) => state.general);

  return (
    <div className="files-container-block">
      <div className="files-container-block-top">
        <div className="files-container-block-top-left">
          <h3>{title}</h3>
          <h4>{desc}</h4>
        </div>
      </div>
      <div className="files-container-block-buttons ">
        <Link to={`/files_single/${id}`} className="btn-task">
          {curLang === "en" ? "More" : "Подробнее"}
        </Link>
        <button type="button"></button>
        <div className="files-container-block-buttons-right">
          <button className="btn-ten-minutes" type="button">
            {timeToComplete} {curLang === "en" ? "minutes" : "минут"}
          </button>
          <a href="#!" className="btn-green-task">
            {tokens} {curLang === "en" ? "tokens" : "токенов"}
          </a>
          <a href="#!" className="btn-green-task">
            {exp} exp
          </a>
        </div>
      </div>
    </div>
  );
};

export default FileItem;
