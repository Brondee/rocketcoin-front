import React, { useCallback, useEffect, useRef, useState } from "react";
import Countdown from "react-countdown";
import {
  useAddUserTokensMutation,
  useGetUserInfoQuery,
  useIncrementCountMutation,
  useUpdateUserInfoMutation,
} from "../../store/user/userApiSlice";
import generateCaptcha from "../../utils/generateCaptcha";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const FaucetClaim = () => {
  const [isCaptchaOpen, setIsCaptchaOpen] = useState(false);
  const [captchaDisplayState, setcaptchaDisplayState] = useState([]);
  const [captchaResultState, setcaptchaResultState] = useState([]);
  const [captchaInputState, setCaptchaInputState] = useState([]);
  const [is1Hidden, setis1Hidden] = useState(false);
  const [is2Hidden, setis2Hidden] = useState(false);
  const [is3Hidden, setis3Hidden] = useState(false);
  const [isFaucetClaimed, setIsFaucetClaimed] = useState(false);

  const clockRef = useRef();

  const [updateUserInfo] = useUpdateUserInfoMutation();
  const [addUserTokens] = useAddUserTokensMutation();
  const [incrementCount] = useIncrementCountMutation();

  const getInfo = useCallback(useGetUserInfoQuery, [
    captchaDisplayState,
    captchaResultState,
    captchaInputState,
    is1Hidden,
    is2Hidden,
    is3Hidden,
  ]);
  const { data } = getInfo();
  const { curLang } = useSelector((state) => state.general);

  const setCaptchaNumber = (index) => {
    let captchaInputArray = captchaInputState.concat(
      captchaDisplayState[index]
    );
    setCaptchaInputState(captchaInputArray);
    if (index === 0) {
      setis1Hidden(true);
    } else if (index === 1) {
      setis2Hidden(true);
    } else if (index === 2) {
      setis3Hidden(true);
    }
  };

  const submitCaptcha = async () => {
    if (
      captchaInputState[0] === captchaResultState[0] &&
      captchaInputState[1] === captchaResultState[1] &&
      captchaInputState[2] === captchaResultState[2]
    ) {
      try {
        const updateData = {
          faucetClaimed: new Date().toLocaleString("en-US"),
          faucetClaimedCount: data?.faucetClaimedCount + 1,
        };
        const response = await updateUserInfo(updateData);
        const addTokensResp = await addUserTokens({
          tokens: 150,
          type: "faucet",
        });
        const incrResp = await incrementCount({ type: "faucet" });

        console.log(response, addTokensResp, incrResp);
        if (response.data && incrResp.data && addTokensResp.data) {
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log({ captchaInputState, captchaResultState });
    }
  };

  // const checkDocumentFocus = () => {
  //   if (document.hasFocus()) {
  //     clockRef.current.start();
  //   } else {
  //     clockRef.current.pause();
  //   }
  // };

  const countDownFunc = ({ seconds, completed }) => {
    if (completed) {
      setIsCaptchaOpen(true);
    } else {
      return <span className="count-down">{seconds}</span>;
    }
  };

  const countDownFuncSecond = ({ minutes, seconds, completed }) => {
    return (
      <span className="count-down">
        {minutes}м. {seconds}с.
      </span>
    );
  };

  // useEffect(() => {
  //   setInterval(checkDocumentFocus, 500);
  // }, []);

  useEffect(() => {
    const { captchaResultArray, captchaDisplayArray } = generateCaptcha();
    setcaptchaDisplayState(captchaDisplayArray);
    setcaptchaResultState(captchaResultArray);

    if (Date.now() - new Date(data?.faucetClaimed) <= 5 * 60 * 1000) {
      setIsFaucetClaimed(true);
    }
    console.log(
      Date.now() - new Date(data?.faucetClaimed),
      new Date(data?.faucetClaimed),
      data?.faucetClaimed,
      Date.now()
    );
  }, [data]);

  return (
    <main className="faucet-claim-main">
      <div className="faucet-claim-inner">
        {isFaucetClaimed ? (
          <>
            <p className="faucet-claimed-text">
              {curLang === "en"
                ? "Faucet claimed! Please wait"
                : "Faucet получен! Пожалуйста подождите"}
            </p>
            <Countdown
              date={new Date(data?.faucetClaimed).getTime() + 1000 * 60 * 5}
              renderer={countDownFuncSecond}
            />
            <Link className="btn-lk-account btn-lk-account-2" to="/faucet">
              {curLang === "en" ? "Home" : "На главную"}
            </Link>
          </>
        ) : (
          <>
            <div
              className={`faucet-claim-countdown ${isCaptchaOpen && "hidden"}`}
            >
              <Countdown
                date={new Date().getTime() + 1000 * 10}
                renderer={countDownFunc}
                ref={clockRef}
              />
            </div>
            <div className={`captcha ${isCaptchaOpen && "open"}`}>
              <p className="task-faucet-content">
                {curLang === "en"
                  ? "Select the numbers in the correct sequence:"
                  : "Выделите цифры в правильной последовательности:"}{" "}
                {captchaResultState.map((number) => {
                  return <span key={number}>{number} </span>;
                })}
              </p>
              <div className="numbers-content-faucet">
                <div
                  className={`faucet-number ${is1Hidden && "faucet-hidden"}`}
                  onClick={() => {
                    setCaptchaNumber(0);
                  }}
                >
                  {captchaDisplayState[0]}
                </div>
                <div
                  className={`faucet-number ${is2Hidden && "faucet-hidden"}`}
                  onClick={() => {
                    setCaptchaNumber(1);
                  }}
                >
                  {captchaDisplayState[1]}
                </div>
                <div
                  className={`faucet-number ${is3Hidden && "faucet-hidden"}`}
                  onClick={() => {
                    setCaptchaNumber(2);
                  }}
                >
                  {captchaDisplayState[2]}
                </div>
              </div>
              <button
                className="btn-lk-account btn-lk-account-2"
                onClick={submitCaptcha}
              >
                {curLang === "en" ? "Check" : "Проверить капчу"}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default FaucetClaim;
