import React from "react";
import { Link } from "react-router-dom";

const TaskItemAdmin = ({
  approveId,
  id,
  title,
  desc,
  time,
  reward,
  views,
  viewsTotal,
}) => {
  return (
    <div className="task-offers task-offers-2">
      <div className="title-task-and-star">
        <h3>{title}</h3>
        <img src="/img-all/img-all-lk/stars-task.svg" alt="" />
      </div>
      <p className="text-task-block">{desc}</p>
      <div className="btns-content-task">
        <Link to={`/task_approve/${approveId}`} className="btn-task">
          Перейти
        </Link>
        <div className="right-btns-content-task">
          <a href="#!" className="btn-time-task">
            {time} минут
          </a>
          <a href="#!" className="btn-green-task">
            {reward} токенов
          </a>
          <a href="#!" className="btn-purple-task">
            {views}/{viewsTotal} views Claim
          </a>
        </div>
      </div>
    </div>
  );
};

export default TaskItemAdmin;
