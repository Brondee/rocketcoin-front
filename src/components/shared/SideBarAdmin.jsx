import React from "react";
import { Link } from "react-router-dom";

import userIcon from "../../assets/img-icons-lk/user.svg";
import todoLine from "../../assets/img-icons-lk/todo-line.svg";
import cardSend from "../../assets/img-icons-lk/card-send.svg";
import vectorLine from "../../assets/img-icons-lk/Vector.svg";
import archiveLine from "../../assets/img-icons-lk/archive-line.svg";
import gitCommitsLine from "../../assets/img-icons-lk/git-repository-commits-line.svg";

const SideBarAdmin = () => {
  return (
    <div class="left-panel-info">
      <ul>
        <li>
          <img src={userIcon} alt="" />
          <Link to="/profile">Аккаунт</Link>
        </li>
        <li>
          <img src={todoLine} alt="" />
          <Link to="/admin_tasks">Задания</Link>
        </li>
        <li>
          <img src={vectorLine} alt="" />
          <Link to="/admin_ptc">PTC</Link>
        </li>
        <li>
          <img src={archiveLine} alt="" />
          <Link to="/admin_files">Файлы</Link>
        </li>
        <li>
          <img src={gitCommitsLine} alt="" />
          <Link to="/admin_article">Статьи</Link>
        </li>
        <li>
          <img src={cardSend} alt="" />
          <Link to="/logout">Выйти</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBarAdmin;
