import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import transferIcon from "../../assets/transfer.svg";

const TaskItem = ({ id, title, desc, time, reward, approves, interval }) => {
  const [isAvailable, setIsAvailable] = useState(false);

  const { curLang } = useSelector((state) => state.general);

  useEffect(() => {
    if (approves.length === 0) {
      setIsAvailable(true);
    } else if (
      new Date().getTime() >=
      new Date(approves[0]?.sent).getTime() + interval * 60 * 60 * 1000
    ) {
      setIsAvailable(true);
    }
  }, [interval, approves]);
  return (
    <>
      {isAvailable && (
        <div className="task-offers task-offers-2">
          <div className="title-task-and-star">
            <h3>{title}</h3>
            <div className="challenge-lk-content-block-top-right">
              {interval !== 0 && (
                <>
                  <img src={transferIcon} alt="" />
                  <span>{interval} ч</span>
                </>
              )}
            </div>
          </div>
          <p className="text-task-block">{desc}</p>
          <div className="btns-content-task">
            <Link to={`/tasks_single/${id}`} className="btn-task">
              {curLang === "en" ? "More" : "Подробнее о задании"}
            </Link>
            <div className="right-btns-content-task">
              <a href="#!" className="btn-time-task">
                {time} {curLang === "en" ? "minutes" : "минут"}
              </a>
              <a href="#!" className="btn-green-task">
                {reward} {curLang === "en" ? "tokens" : "токенов"}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskItem;
