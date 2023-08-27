import React, { useCallback, useEffect, useState } from "react";
import SideBar from "../shared/SideBar";
import Layout from "../layout/Layout";
import { useGetUserInfoQuery } from "../../store/user/userApiSlice";
import generateBonusArray from "../../utils/generateBonusArray";
import BonusItem from "../shared/BonusItem";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { useSelector } from "react-redux";

const Bonus = () => {
  const [bonusStreak, setBonusStreak] = useState(0);
  const [isNextBonusAv, setNextBonusAv] = useState(false);
  const [bonusArrayState, setBonusArrayState] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isCaptchaOpen, setIsCaptchaOpen] = useState(false);
  const [captchaVal, setCaptchaVal] = useState("");
  const [captchaApproved, setIsCaptchaApproved] = useState("");
  const [curBonusId, setCurBonusId] = useState(-1);
  const [error, setError] = useState(false);

  const getInfo = useCallback(useGetUserInfoQuery, [
    bonusStreak,
    captchaVal,
    error,
    isCaptchaOpen,
  ]);
  const { data } = getInfo();
  const { curLang } = useSelector((state) => state.general);

  const openCaptcha = (bonusId) => {
    setCurBonusId(bonusId);
    setIsCaptchaOpen(true);
  };
  const closeCaptcha = () => {
    setIsCaptchaOpen(false);
  };

  const submitCaptcha = async () => {
    if (validateCaptcha(captchaVal) === true) {
      setIsCaptchaApproved(true);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    setBonusArrayState(generateBonusArray(50, 200, 12, 0.1));
    setBonusStreak(data?.bonusStreak);
    if (data?.bonusStreak === 0) {
      setNextBonusAv(true);
    } else {
      if (
        new Date().getDate() > new Date(data?.bonusLastTaken).getDate() ||
        new Date().getMonth() > new Date(data?.bonusLastTaken).getMonth() ||
        new Date().getFullYear() > new Date(data?.bonusLastTaken).getFullYear()
      ) {
        setNextBonusAv(true);
      } else {
        setNextBonusAv(false);
      }
    }
  }, [data?.bonusLastTaken, data?.bonusStreak]);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  return (
    <main>
      <Layout title={`Rocketcoin - ${curLang === "en" ? "Bonus" : "Бонус"}`}>
        <section className="content-lk">
          <SideBar />
          <div class="right-content-lk">
            <h1 class="title-page-lk">
              {curLang === "en" ? "Bonus" : "Бонус"}
            </h1>
            <div class="wrapper-page-lk">
              <div class="content-block-flex-lk-white">
                <div class="table-ref-container">
                  <table class="table-ref table-ref-2">
                    <tr class="title-table-ref">
                      <th>{curLang === "en" ? "Number" : "Номер"}</th>
                      <th>
                        {curLang === "en"
                          ? "Reward - tokens"
                          : "Награда - токены"}
                      </th>
                      <th>
                        {curLang === "en" ? "Reward - exp" : "Награда - опыт"}
                      </th>
                      <th>{curLang === "en" ? "Action" : "Действие"}</th>
                    </tr>
                    {bonusArrayState.map((bonusSingle, index) => {
                      const { id, tokens, exp } = bonusSingle;
                      let isAvailable = false;
                      let bonusTaken = false;
                      if (index === bonusStreak && isNextBonusAv) {
                        isAvailable = true;
                      }
                      if (index < bonusStreak) {
                        bonusTaken = true;
                      }
                      return (
                        <BonusItem
                          key={id}
                          number={id}
                          tokens={tokens}
                          exp={exp}
                          bonusAvailable={isAvailable}
                          bonusTaken={bonusTaken}
                          ptcDayCount={data?.ptcDayCount}
                          setIsModalActive={setIsModalActive}
                          openCaptcha={openCaptcha}
                          captchaApproved={captchaApproved}
                          curBonusId={curBonusId}
                          closeCaptcha={closeCaptcha}
                        />
                      );
                    })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className={`bonus-modal ${isModalActive && "active"}`}>
          <div className="bonus-modal-inner">
            <p>
              {curLang === "en"
                ? "You have to do 2 PTC to get a daily bonus"
                : "Вы должны пройти 2 PTC, чтобы получить ежедневный бонус"}
            </p>
            <button onClick={() => setIsModalActive(false)}>ОK</button>
          </div>
        </div>
        <div className={`captcha-modal ${isCaptchaOpen && "modal-active"}`}>
          <div className="captcha-modal-inner">
            <LoadCanvasTemplateNoReload />
            <input
              type="text"
              value={captchaVal}
              onChange={(e) => setCaptchaVal(e.target.value)}
              autocomplete="one-time-code"
              required
              className="captcha-input"
              placeholder={curLang === "en" ? "Enter a value" : "Enter a value"}
            />
            {error && (
              <p className="captcha-label-error">
                {curLang === "en"
                  ? "Values dont match"
                  : "Значения не совпадают"}
              </p>
            )}
            <button className="captcha-btn btn-task" onClick={submitCaptcha}>
              {curLang === "en" ? "Submit" : "Подтвердить"}
            </button>
          </div>
        </div>
      </Layout>
    </main>
  );
};

export default Bonus;
