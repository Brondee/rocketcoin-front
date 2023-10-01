import React, { useCallback, useEffect, useState } from "react";
import SideBar from "../shared/SideBar";
import Layout from "../layout/Layout";
import {
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
} from "../../store/user/userApiSlice";
import BonusItem from "../shared/BonusItem";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { useSelector } from "react-redux";
import AdblockModal from "../shared/AdblockModal";
import { bonusArray } from "../../utils/generateBonusArray";
import RotationBanner from "../shared/RotationBanner";
import FixedBanner from "../shared/FixedBanner";
import Popunder from "../shared/Popunder";

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

  const [updateUserInfo] = useUpdateUserInfoMutation();

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
    setBonusArrayState(bonusArray);
    setBonusStreak(data?.bonusStreak);
    if (data?.bonusStreak === 0) {
      setNextBonusAv(true);
    } else {
      if (
        new Date().getDate() > new Date(data?.bonusLastTaken).getDate() + 1 ||
        new Date().getMonth() > new Date(data?.bonusLastTaken).getMonth() ||
        new Date().getFullYear() > new Date(data?.bonusLastTaken).getFullYear()
      ) {
        updateUserInfo({ bonusStreak: 0 });
        window.location.reload();
      } else if (
        new Date().getDate() > new Date(data?.bonusLastTaken).getDate()
      ) {
        setNextBonusAv(true);
      } else {
        setNextBonusAv(false);
      }
    }
  }, [data?.bonusLastTaken, data?.bonusStreak, updateUserInfo]);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  return (
    <main>
      <Layout title={`Rocketcoin - ${curLang === "en" ? "Bonus" : "Бонус"}`}>
        <section className="content-lk">
          <SideBar />
          <div class="right-content-lk">
            <div className="page-title-ban-cont">
              <h1 className="title-page-lk">
                {curLang === "en" ? "Bonus" : "Бонус"}
              </h1>
              <div className="banner banner468 banner-profile">
                <RotationBanner
                  width={468}
                  dataframe="2259490"
                  datasid="382197"
                  datakey="679f64fa36a4eb3544f2a556b9240afe"
                />
              </div>
              <div className="banner banner468 banner-profile">
                <RotationBanner
                  width={468}
                  dataframe="2259492"
                  datasid="382198"
                  datakey="679f64fa36a4eb3544f2a556b9240afe"
                />
              </div>
            </div>

            <div class="wrapper-page-lk">
              <div class="content-block-flex-lk-white">
                <div class="table-ref-container">
                  <table class="table-ref table-ref-2 table-bonus">
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
            <div className="bottom-banners-cont">
              <div className="banner banner468 banner-profile">
                <RotationBanner
                  width={468}
                  dataframe="2259493"
                  datasid="382199"
                  datakey="679f64fa36a4eb3544f2a556b9240afe"
                />
              </div>
              <div className="banner banner468 banner-profile">
                <script type="text/javascript">alert("peppla")</script>
              </div>
              <div className="banner banner468 banner-profile">
                <RotationBanner
                  width={468}
                  dataframe="2259494"
                  datasid="382200"
                  datakey="679f64fa36a4eb3544f2a556b9240afe"
                />
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
        <FixedBanner page="bonus" />
        <AdblockModal />
        <Popunder />
      </Layout>
    </main>
  );
};

export default Bonus;
