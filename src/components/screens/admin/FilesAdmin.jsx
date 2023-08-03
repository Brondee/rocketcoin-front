import React, { useState, useCallback } from "react";
import Layout from "../../layout/Layout";
import SideBarAdmin from "../../shared/SideBarAdmin";
import {
  useAddFileMutation,
  useGetApproveFilesQuery,
} from "../../../store/file/fileApiSlice";
import FileItemAdmin from "../../shared/FileItemAdmin";

const FilesAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState("");
  const [tokensReward, setTokensReward] = useState("");
  const [expReward, setExpReward] = useState("");
  const [interval, setInterval] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const getData = useCallback(useGetApproveFilesQuery, [
    title,
    desc,
    time,
    tokensReward,
    expReward,
    interval,
    fileLink,
  ]);
  const { data } = getData();

  const [addFile] = useAddFileMutation();

  const modalClick = (e) => {
    const modalClasses = Array.from(e.target.classList);
    if (modalClasses.includes("modal-active")) {
      setIsModalOpen(false);
    }
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };
  const addFileFunc = async (e) => {
    e.preventDefault();

    try {
      const addData = {
        title,
        description: desc,
        timeToComplete: Number(time),
        tokensReward: Number(tokensReward),
        expReward: Number(expReward),
        interval: Number(interval),
        link: fileLink,
      };
      const response = await addFile(addData);
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
              <h1 className="title-page-lk">Файлы на проверку</h1>
              <a
                href="#!"
                class="btn-task"
                onClick={() => setIsModalOpen(true)}
              >
                Добавить файл
              </a>
            </div>
            <div className="wrapper-page-lk">
              <div className="files-container">
                {data?.map((item) => {
                  const {
                    id,
                    title,
                    description,
                    tokensReward,
                    expReward,
                    timeToComplete,
                    interval,
                  } = item.file;
                  return (
                    <FileItemAdmin
                      key={id}
                      id={id}
                      title={title}
                      desc={description}
                      tokens={tokensReward}
                      exp={expReward}
                      timeToComplete={timeToComplete}
                      interval={interval}
                    />
                  );
                })}
                {data?.length === 0 && <h3>Файлов на проверку пока что нет</h3>}
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
                Награда в exp
                <input
                  type="text"
                  name="exp-reward"
                  required
                  value={expReward}
                  onChange={(e) => setExpReward(e.target.value)}
                  autocomplete="one-time-code"
                />
              </label>
              <label>
                Интервал
                <input
                  type="text"
                  name="interval"
                  required
                  value={interval}
                  onChange={(e) => setInterval(e.target.value)}
                  autocomplete="one-time-code"
                />
              </label>
              <label>
                Ссылка на файл
                <input
                  type="text"
                  name="file"
                  required
                  value={fileLink}
                  onChange={(e) => setFileLink(e.target.value)}
                  autocomplete="one-time-code"
                />
              </label>
            </div>

            <div className="btn-content-form-login">
              <button type="submit" onClick={(e) => addFileFunc(e)}>
                {isSuccess ? "Успешно добавлено" : "Добавить"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default FilesAdmin;
