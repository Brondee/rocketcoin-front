import React, { useState, useCallback } from "react";
import Layout from "../../layout/Layout";
import SideBarAdmin from "../../shared/SideBarAdmin";
import {
  useAddTaskMutation,
  useGetApproveTasksQuery,
} from "../../../store/task/taskApiSlice";
import TaskItemAdmin from "../../shared/TaskItemAdmin";

const AdminTasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState("");
  const [tokensReward, setTokensReward] = useState("");
  const [claimsAvailable, setClaimsAvailable] = useState("");
  const [instruction, setInstruction] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const getTasks = useCallback(useGetApproveTasksQuery, [
    isModalOpen,
    title,
    desc,
    time,
    tokensReward,
    claimsAvailable,
    instruction,
  ]);
  const { data } = getTasks();

  const [addTask] = useAddTaskMutation();

  const modalClick = (e) => {
    const modalClasses = Array.from(e.target.classList);
    if (modalClasses.includes("modal-active")) {
      setIsModalOpen(false);
    }
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };
  const addTaskFunc = async (e) => {
    e.preventDefault();

    try {
      const addData = {
        title,
        description: desc,
        timeMinutes: Number(time),
        tokensReward: Number(tokensReward),
        claimsAvailable: Number(claimsAvailable),
        instruction,
      };
      const response = await addTask(addData);
      console.log(response);
      if (response.data) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsModalOpen(false);
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main>
      <Layout title="Rocketcoin - Админ">
        <section className="content-lk">
          <a href="#!" className="btn-open-modal-panel-lk">
            Меню кабинета -- Админ
          </a>
          <SideBarAdmin />
          <div className="right-content-lk">
            <div className="title-btn-cont">
              <h1 className="title-page-lk">Задания на проверку</h1>
              <a
                href="#!"
                class="btn-task"
                onClick={() => setIsModalOpen(true)}
              >
                Добавить задание
              </a>
            </div>
            <div className="wrapper-page-lk">
              <div className="content-block-flex-lk-white">
                <div className="task-offers-content">
                  {data?.map((item) => {
                    const {
                      id,
                      title,
                      tokensReward,
                      timeMinutes,
                      description,
                      claimsAvailable,
                    } = item.task;
                    return (
                      <TaskItemAdmin
                        key={id}
                        approveId={item.id}
                        id={id}
                        title={title}
                        desc={description}
                        time={timeMinutes}
                        reward={tokensReward}
                        views={2}
                        viewsTotal={claimsAvailable}
                      />
                    );
                  })}
                  {data?.length === 0 && (
                    <h3>Заданий на проверку пока что нет</h3>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
      <div
        id="modal__project2"
        className={`modal modal2 ${isModalOpen && "modal-active"}`}
        onClick={modalClick}
      >
        <div className="modal-content">
          <span className="close close2" onClick={hideModal}></span>
          <form action="#!" method="post" className="form-login">
            <h2>Добавить задание</h2>
            <div className="label-content-form">
              <label>
                Название
                <input
                  type="text"
                  name="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autocomplete="one-time-code"
                />
              </label>
              <label>
                Краткое описание
                <input
                  type="text"
                  name="desc"
                  required
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  autocomplete="one-time-code"
                />
              </label>
              <label>
                Время выполнения в минутах
                <input
                  type="text"
                  name="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  autocomplete="one-time-code"
                />
              </label>
              <label>
                Награда в токенах
                <input
                  type="text"
                  name="tokens-reward"
                  required
                  value={tokensReward}
                  onChange={(e) => setTokensReward(e.target.value)}
                  autocomplete="one-time-code"
                />
              </label>
              <label>
                Количество выполнений
                <input
                  type="text"
                  name="tokens-reward"
                  required
                  value={claimsAvailable}
                  onChange={(e) => setClaimsAvailable(e.target.value)}
                  autocomplete="one-time-code"
                />
              </label>
              <label>
                Инструкция в формате html
                <textarea
                  type="text"
                  name="instruction"
                  required
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  autocomplete="one-time-code"
                />
              </label>
            </div>

            <div className="btn-content-form-login">
              <button type="submit" onClick={(e) => addTaskFunc(e)}>
                {isSuccess ? "Успешно добавлено" : "Добавить"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AdminTasks;
