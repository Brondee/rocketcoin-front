import React, { useState, useEffect, useCallback } from "react";
import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";
import {
  useGetPtcQuery,
  useSetClaimedMutation,
} from "../../store/ptc/ptcApiSlice";
import PtcItem from "../shared/PtcItem";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import {
  useAddUserTokensMutation,
  useLevelUpUserMutation,
  useIncrementCountMutation,
} from "../../store/user/userApiSlice";
import { useSelector } from "react-redux";
import AdblockModal from "../shared/AdblockModal";

const Ptc = () => {
  const [isFirstActive, setIsFirstActive] = useState(true);
  const [isSecondActive, setIsSecondActive] = useState(false);
  const [curType, setCurType] = useState("link");
  const [captchaVal, setCaptchaVal] = useState("");
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { isModalPtcOpen, tokensPtcReward, expPtcReward, ptcId } = useSelector(
    (state) => state.general
  );

  const getData = useCallback(useGetPtcQuery, [
    captchaVal,
    error,
    isSuccess,
    isModalPtcOpen,
  ]);
  const { data } = getData(curType);
  const { curLang } = useSelector((state) => state.general);

  const [addUserTokens] = useAddUserTokensMutation();
  const [levelUpUser] = useLevelUpUserMutation();
  const [setClaimed] = useSetClaimedMutation();
  const [incrementCount] = useIncrementCountMutation();

  const changeActive = (type) => {
    if (type === "first") {
      setIsSecondActive(false);
      setIsFirstActive(true);
      setCurType("link");
    } else {
      setIsFirstActive(false);
      setIsSecondActive(true);
      setCurType("iframe");
    }
  };

  const setReward = async () => {
    const tokensResp = await addUserTokens({
      tokens: tokensPtcReward,
      type: "ptc",
    });
    const levelUpResp = await levelUpUser({ exp: expPtcReward });
    const claimedResp = await setClaimed({
      ptcId,
      lastTaken: new Date().toLocaleString("en-US"),
    });
    const incrResp = await incrementCount({ type: "ptc" });
    if (
      tokensResp.data &&
      levelUpResp.data &&
      claimedResp.data &&
      incrResp.data
    ) {
      setIsSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
    console.log({ tokensResp, levelUpResp, claimedResp, incrResp });
  };

  const submitCaptcha = () => {
    if (validateCaptcha(captchaVal) === true) {
      setReward();
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  return (
    <main>
      <Layout title="Rocketcoin - PTC">
        <section className="content-lk">
          <SideBar />
          <div class="right-content-lk">
            <h1 class="title-page-lk">PTC</h1>
            <div class="wrapper-page-lk">
              <div class="filters-offers">
                <div
                  class={`block-filter ${isFirstActive && "active-filter"}`}
                  onClick={() => changeActive("first")}
                >
                  {curLang === "en" ? "Window" : "Окно"}
                </div>
                <div
                  class={`block-filter ${isSecondActive && "active-filter"}`}
                  onClick={() => changeActive("second")}
                >
                  Iframe
                </div>
              </div>
              <div class="challenge-lk-content">
                {data?.map((item) => {
                  const {
                    id,
                    title,
                    link,
                    tokensReward,
                    expReward,
                    ptcType,
                    secondsWait,
                    ptcClaims,
                    viewsCount,
                    viewsTotal,
                    interval,
                  } = item;
                  if (viewsCount >= viewsTotal) {
                    return <></>;
                  } else {
                    return (
                      <PtcItem
                        key={id}
                        id={id}
                        title={title}
                        link={link}
                        tokens={tokensReward}
                        exp={expReward}
                        ptcType={ptcType}
                        secondsWait={secondsWait}
                        ptcClaims={ptcClaims}
                        interval={interval}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </section>
        <div className={`captcha-modal ${isModalPtcOpen && "modal-active"}`}>
          <div className="captcha-modal-inner">
            <LoadCanvasTemplateNoReload />
            <input
              type="text"
              value={captchaVal}
              onChange={(e) => setCaptchaVal(e.target.value)}
              autocomplete="one-time-code"
              required
              className="captcha-input"
              placeholder={
                curLang === "en" ? "Enter the value" : "Введите значение"
              }
            />
            {error && (
              <p className="captcha-label-error">
                {curLang === "en"
                  ? "Values dont match"
                  : "Значения не совпадают"}
              </p>
            )}
            <button className="captcha-btn btn-task" onClick={submitCaptcha}>
              {isSuccess
                ? curLang === "en"
                  ? "Success"
                  : "Успешно!"
                : curLang === "en"
                ? "Submit"
                : "Подтвердить"}
            </button>
          </div>
        </div>
        <AdblockModal />
      </Layout>
    </main>
  );
};

export default Ptc;
