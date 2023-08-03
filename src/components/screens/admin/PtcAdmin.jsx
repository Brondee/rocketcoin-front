import React, { useCallback, useState } from "react";
import Layout from "../../layout/Layout";
import SideBarAdmin from "../../shared/SideBarAdmin";
import {
  useGetPtcQuery,
  useAddPtcMutation,
} from "../../../store/ptc/ptcApiSlice";
import PtcItem from "../../shared/PtcItem";

const PtcAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [tokensReward, setTokensReward] = useState("");
  const [expReward, setExpReward] = useState("");
  const [secondsWait, setSecondsWait] = useState("");
  const [ptcType, setPtcType] = useState("");
  const [views, setViews] = useState("");
  const [interval, setInterval] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const getData = useCallback(useGetPtcQuery, [
    isModalOpen,
    title,
    link,
    tokensReward,
    expReward,
    secondsWait,
    ptcType,
    views,
    interval,
    isSuccess,
  ]);
  const { data } = getData("iframe");
  const response = getData("link");
  console.log(data, response?.data);

  const [addPtc] = useAddPtcMutation();

  const modalClick = (e) => {
    const modalClasses = Array.from(e.target.classList);
    if (modalClasses.includes("modal-active")) {
      setIsModalOpen(false);
    }
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  const addPtcFunc = async (e) => {
    e.preventDefault();

    try {
      const addData = {
        title,
        description: title,
        link,
        tokensReward: Number(tokensReward),
        expReward: Number(expReward),
        secondsWait: Number(secondsWait),
        ptcType,
        viewsTotal: Number(views),
        interval: Number(interval),
      };
      const response = await addPtc(addData);
      console.log(response);
      if (response.data) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsModalOpen(false);
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main>
      <Layout title="Rocketcoin - PTC">
        <section className="content-lk">
          <a href="#!" className="btn-open-modal-panel-lk">
            Меню кабинета
          </a>
          <SideBarAdmin />
          <div class="right-content-lk">
            <div className="title-btn-cont">
              <h1 className="title-page-lk">PTC -- Админ</h1>
              <a
                href="#!"
                class="btn-task"
                onClick={() => setIsModalOpen(true)}
              >
                Добавить PTC
              </a>
            </div>
            <div class="wrapper-page-lk">
              <div class="challenge-lk-content">
                {data?.map((item) => {
                  const { title, link, tokensReward, expReward, interval } =
                    item;
                  return (
                    <PtcItem
                      title={title}
                      link={link}
                      tokens={tokensReward}
                      exp={expReward}
                      interval={interval}
                    />
                  );
                })}
                {response?.data?.map((item) => {
                  const { title, link, tokensReward, expReward } = item;
                  return (
                    <PtcItem
                      title={title}
                      link={link}
                      tokens={tokensReward}
                      exp={expReward}
                    />
                  );
                })}
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
            <h2>Добавить PTC</h2>
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
                Ссылка
                <input
                  type="text"
                  name="link"
                  required
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  autocomplete="one-time-code"
                />
              </label>
              <label>
                Время выполнения в секундах
                <input
                  type="text"
                  name="secondsWait"
                  required
                  value={secondsWait}
                  onChange={(e) => setSecondsWait(e.target.value)}
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
                Награда в Exp
                <input
                  type="text"
                  name="exp"
                  required
                  value={expReward}
                  onChange={(e) => setExpReward(e.target.value)}
                  autocomplete="one-time-code"
                />
              </label>
              <label>
                Тип (iframe/link)
                <input
                  type="text"
                  name="type"
                  required
                  value={ptcType}
                  onChange={(e) => setPtcType(e.target.value)}
                  autocomplete="one-time-code"
                />
              </label>
              <label>
                Количество просмотров
                <input
                  type="text"
                  name="type"
                  required
                  value={views}
                  onChange={(e) => setViews(e.target.value)}
                  autocomplete="one-time-code"
                />
              </label>
              <label>
                Интервал
                <input
                  type="text"
                  name="type"
                  required
                  value={interval}
                  onChange={(e) => setInterval(e.target.value)}
                  autocomplete="one-time-code"
                />
              </label>
            </div>

            <div className="btn-content-form-login">
              <button type="submit" onClick={(e) => addPtcFunc(e)}>
                {isSuccess ? "Успешно добавлено" : "Добавить"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default PtcAdmin;
