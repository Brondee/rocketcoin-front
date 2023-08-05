import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import transferIcon from "../../assets/transfer.svg";

const TaskItem = ({
  id,
  title,
  desc,
  time,
  reward,
  approves,
  viewsTotal,
  interval,
}) => {
  const [isAvailable, setIsAvailable] = useState(true);
  useEffect(() => {
    if (interval === 0 && viewsTotal - approves.length <= 0) {
      setIsAvailable(false);
    } else if (
      new Date().getTime() <=
        new Date(approves[0].sent).getTime() + 1 * interval * 60 * 60 * 1000 &&
      viewsTotal - approves.length <= 0
    ) {
      setIsAvailable(false);
    }
  }, [interval, viewsTotal, approves]);
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
              Подробнее о задании
            </Link>
            <div className="right-btns-content-task">
              <a href="#!" className="btn-time-task">
                {time} минут
              </a>
              <a href="#!" className="btn-green-task">
                {reward} токенов
              </a>
              <a href="#!" className="btn-purple-task">
                {viewsTotal - approves.length}/{viewsTotal} views Claim
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskItem;
