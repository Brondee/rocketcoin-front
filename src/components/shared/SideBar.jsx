import React, { useState } from "react";
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
import { useSelector } from "react-redux";

const SideBar = () => {
  const [isMobActive, setIsMobActive] = useState(false);

  const { curLang } = useSelector((state) => state.general);

  return (
    <>
      <a
        href="#!"
        className="btn-open-modal-panel-lk"
        onClick={() => setIsMobActive(!isMobActive)}
      >
        {curLang === "en" ? "Cabinet menu" : "Меню кабинета"}
      </a>
      <div class={`left-panel-info ${isMobActive && "active"}`}>
        <ul>
          <li>
            <img src={userIcon} alt="" />
            <Link to="/profile">
              {curLang === "en" ? "Account" : "Аккаунт"}
            </Link>
          </li>
          <li>
            <img src={peopleIcon} alt="" />
            <Link to="/referrals">
              {curLang === "en" ? "Referrals" : "Рефералы"}
            </Link>
          </li>
          <li>
            <img src={handCoinLine} alt="" />
            <Link to="/offers">
              {curLang === "en" ? "Offerwall" : "Офферы"}
            </Link>
          </li>
          <li>
            <img src={gitCommitsLine} alt="" />
            <Link to="/links">
              {curLang === "en" ? "Shortlinks" : "Ссылки"}
            </Link>
          </li>

          <li>
            <img src={todoLine} alt="" />
            <Link to="/tasks">{curLang === "en" ? "Tasks" : "Задания"}</Link>
          </li>
          <li>
            <img src={hoursLine} alt="" />
            <Link to="/bonus">{curLang === "en" ? "Bonus" : "Бонус"}</Link>
          </li>
          <li>
            <img src={giftLine} alt="" />
            <Link to="/faucet">Faucet</Link>
          </li>

          <li>
            <img src={cardSend} alt="" />
            <Link to="/withdraw">
              {curLang === "en" ? "Withdraw" : "Вывод"}
            </Link>
          </li>
          <li>
            <img src={lineChartLine} alt="" />
            <Link to="/leaders">{curLang === "en" ? "Leaders" : "Лидеры"}</Link>
          </li>
          <li>
            <img src={awardLine} alt="" />
            <Link to="/challenge">
              {curLang === "en" ? "Challenge" : "Челендж"}
            </Link>
          </li>
          <li>
            <img src={vectorLine} alt="" />
            <Link to="/ptc">PTC</Link>
          </li>
          <li>
            <img src={pieChartLine} alt="" />
            <Link to="/ad">{curLang === "en" ? "Ad" : "Реклама"}</Link>
          </li>
          <li>
            <img src={trophyLine} alt="" />
            <Link to="/levels">{curLang === "en" ? "Levels" : "Уровни"}</Link>
          </li>
          {/* <li>
          <img src={cardPos} alt="" />
          <Link to="/support">Support</Link>
        </li> */}
          <li>
            <img src={archiveLine} alt="" />
            <Link to="/files">
              {curLang === "en" ? "Support us" : "Поддержать"}
            </Link>
          </li>

          <li>
            <img src={cardSend} alt="" />
            <Link to="/logout">{curLang === "en" ? "Log out" : "Выйти"}</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
