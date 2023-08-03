import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  useGetPtcByIdQuery,
  useSetClaimedMutation,
} from "../../store/ptc/ptcApiSlice";
import Countdown from "react-countdown";
import {
  useAddUserTokensMutation,
  useLevelUpUserMutation,
  useIncrementCountMutation,
} from "../../store/user/userApiSlice";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";

import { ReactComponent as Logo } from "../../assets/img/logo.svg";

const PtcIframe = () => {
  const [captchaVal, setCaptchaVal] = useState("");
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clockRef = useRef();

  const getData = useCallback(useGetPtcByIdQuery, [
    captchaVal,
    error,
    isModalOpen,
  ]);
  const { data } = getData(Number(window.location.href.split("/")[4]));

  const [addUserTokens] = useAddUserTokensMutation();
  const [levelUpUser] = useLevelUpUserMutation();
  const [setClaimed] = useSetClaimedMutation();
  const [incrementCount] = useIncrementCountMutation();

  const handleStart = () => clockRef.current.start();
  const handlePause = () => clockRef.current.pause();

  window.onfocus = function () {
    handleStart();
  };

  window.onblur = function () {
    handlePause();
  };

  const setReward = async () => {
    const tokensResp = await addUserTokens({ tokens: data?.tokensReward });
    const levelUpResp = await levelUpUser({ exp: data?.expReward });
    const claimedResp = await setClaimed({
      ptcId: Number(window.location.href.split("/")[4]),
      lastTaken: new Date().toLocaleString("en-US"),
    });
    const incrResp = await incrementCount({ type: "ptc" });
    if (
      tokensResp.data &&
      levelUpResp.data &&
      claimedResp.data &&
      incrResp.data
    ) {
      window.open(data?.link, "_blank").focus();
      window.location.href = "https://rocket-coin.online/ptc";
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

  const countDownFunc = ({ seconds, completed }) => {
    if (completed) {
      setIsModalOpen(true);
    } else {
      return <span className="count-down">{seconds}</span>;
    }
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  return (
    <main>
      <div className="ptc-counter-container">
        <a href="https://rocket-coin.online/ptc">
          <Logo />
        </a>
        <Countdown
          date={
            new Date().getTime() +
            1000 * Number(window.location.href.split("/")[5])
          }
          renderer={countDownFunc}
          ref={clockRef}
        />
      </div>
      <iframe
        title={`ptc-${data?.id}`}
        src={data?.link}
        frameborder="0"
        className="ptc-iframe"
      ></iframe>
      <div className={`captcha-modal ${isModalOpen && "modal-active"}`}>
        <div className="captcha-modal-inner">
          <LoadCanvasTemplateNoReload />
          <input
            type="text"
            value={captchaVal}
            onChange={(e) => setCaptchaVal(e.target.value)}
            autocomplete="one-time-code"
            required
            className="captcha-input"
            placeholder="Введите значение"
          />
          {error && (
            <p className="captcha-label-error">Значения не совпадают</p>
          )}
          <button className="captcha-btn btn-task" onClick={submitCaptcha}>
            Подтвердить
          </button>
        </div>
      </div>
    </main>
  );
};

export default PtcIframe;
