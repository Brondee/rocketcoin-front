import React from "react";
import { Link } from "react-router-dom";

import userIcon from "../../assets/img-icons-lk/user.svg";
import peopleIcon from "../../assets/img-icons-lk/people.svg";
import handCoinLine from "../../assets/img-icons-lk/hand-coin-line.svg";
import hoursLine from "../../assets/img-icons-lk/24-hours-line.svg";
import gitCommitsLine from "../../assets/img-icons-lk/git-repository-commits-line.svg";
import todoLine from "../../assets/img-icons-lk/todo-line.svg";
import giftLine from "../../assets/img-icons-lk/gift-line.svg";
import cardSend from "../../assets/img-icons-lk/card-send.svg";
import lineChartLine from "../../assets/img-icons-lk/line-chart-line.svg";
import awardLine from "../../assets/img-icons-lk/award-line.svg";
import vectorLine from "../../assets/img-icons-lk/Vector.svg";
import pieChartLine from "../../assets/img-icons-lk/pie-chart-line.svg";
import trophyLine from "../../assets/img-icons-lk/trophy-line.svg";
// import cardPos from "../../assets/img-icons-lk/card-pos.svg";
import archiveLine from "../../assets/img-icons-lk/archive-line.svg";

const SideBar = () => {
  return (
    <div class="left-panel-info">
      <ul>
        <li>
          <img src={userIcon} alt="" />
          <Link to="/profile">Аккаунт</Link>
        </li>
        <li>
          <img src={peopleIcon} alt="" />
          <Link to="/referrals">Рефералы</Link>
        </li>
        <li>
          <img src={handCoinLine} alt="" />
          <Link to="/offers">Офферы</Link>
        </li>
        <li>
          <img src={gitCommitsLine} alt="" />
          <Link to="/links">Ссылки</Link>
        </li>

        <li>
          <img src={todoLine} alt="" />
          <Link to="/tasks">Задания</Link>
        </li>
        <li>
          <img src={hoursLine} alt="" />
          <Link to="/bonus">Бонус</Link>
        </li>
        <li>
          <img src={giftLine} alt="" />
          <Link to="/faucet">Faucet</Link>
        </li>

        <li>
          <img src={cardSend} alt="" />
          <Link to="/withdraw">Вывод</Link>
        </li>
        <li>
          <img src={lineChartLine} alt="" />
          <Link to="/leaders">Лидеры</Link>
        </li>
        <li>
          <img src={awardLine} alt="" />
          <Link to="/challenge">Челендж</Link>
        </li>
        <li>
          <img src={vectorLine} alt="" />
          <Link to="/ptc">PTC</Link>
        </li>
        <li>
          <img src={pieChartLine} alt="" />
          <Link to="/ad">Реклама</Link>
        </li>
        <li>
          <img src={trophyLine} alt="" />
          <Link to="/levels">Уровни</Link>
        </li>
        {/* <li>
          <img src={cardPos} alt="" />
          <Link to="/support">Support</Link>
        </li> */}
        <li>
          <img src={archiveLine} alt="" />
          <Link to="/files">Файлы</Link>
        </li>

        <li>
          <img src={cardSend} alt="" />
          <Link to="/logout">Выйти</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
