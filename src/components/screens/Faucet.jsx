import React, { useCallback, useEffect, useState } from "react";

import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";
import generateCaptcha from "../../utils/generateCaptcha";
import {
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
  useAddUserTokensMutation,
  useIncrementCountMutation,
} from "../../store/user/userApiSlice";
import Countdown from "react-countdown";

const Faucet = () => {
  const [captchaDisplayState, setcaptchaDisplayState] = useState([]);
  const [captchaResultState, setcaptchaResultState] = useState([]);
  const [captchaInputState, setCaptchaInputState] = useState([]);
  const [is1Hidden, setis1Hidden] = useState(false);
  const [is2Hidden, setis2Hidden] = useState(false);
  const [is3Hidden, setis3Hidden] = useState(false);
  const [isFaucetClaimed, setIsFaucetClaimed] = useState(false);

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
        const addTokensResp = await addUserTokens({ tokens: 150 });
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

  const countDownFunc = ({ minutes, seconds, completed }) => {
    if (completed) {
      setIsFaucetClaimed(false);
    } else {
      return (
        <span>
          {minutes} м. {seconds} с.
        </span>
      );
    }
  };

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
      Date.now()
    );
  }, [data]);

  return (
    <main>
      <Layout title="Rocketcoin - Faucet">
        <section className="content-lk">
          <a href="#!" className="btn-open-modal-panel-lk">
            Меню кабинета
          </a>
          <SideBar />
          <div className="right-content-lk">
            <h1 className="title-page-lk">Faucet</h1>
            <div className="wrapper-page-lk">
              <div className="content-block-flex-lk-white">
                <div className="faucet-title-content">
                  {isFaucetClaimed ? (
                    <>
                      <p>Faucet получен! Пожалуйста подождите</p>
                      <Countdown
                        date={
                          new Date(data?.faucetClaimed).getTime() +
                          1000 * 60 * 5
                        }
                        renderer={countDownFunc}
                      />
                    </>
                  ) : (
                    <p>
                      Пожалуйста пройдите капчу и получите бонус за выполнение
                    </p>
                  )}
                  <div className="right-btns-content-task">
                    <a href="#!" className="btn-green-task">
                      150 токенов
                    </a>
                    <a href="#!" className="btn-green-task">
                      10 exp
                    </a>
                    <a href="#!" className="btn-purple-task">
                      {1000 - data?.faucetClaimedCount}/1000 views Claim
                    </a>
                  </div>
                </div>
                {isFaucetClaimed ? (
                  <div></div>
                ) : (
                  <>
                    <p className="task-faucet-content">
                      Выделите слова в правильной послдедовательности:{" "}
                      {captchaResultState.map((number) => {
                        return <span key={number}>{number} </span>;
                      })}
                    </p>
                    <div className="numbers-content-faucet">
                      <div
                        className={`faucet-number ${
                          is1Hidden && "faucet-hidden"
                        }`}
                        onClick={() => {
                          setCaptchaNumber(0);
                        }}
                      >
                        {captchaDisplayState[0]}
                      </div>
                      <div
                        className={`faucet-number ${
                          is2Hidden && "faucet-hidden"
                        }`}
                        onClick={() => {
                          setCaptchaNumber(1);
                        }}
                      >
                        {captchaDisplayState[1]}
                      </div>
                      <div
                        className={`faucet-number ${
                          is3Hidden && "faucet-hidden"
                        }`}
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
                      Проверить капчу
                    </button>
                  </>
                )}
              </div>
              <div className="advertising-blocks">
                <div className="advertising-block">Реклама</div>
                <div className="advertising-block">Реклама</div>
                <div className="advertising-block">Реклама</div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </main>
  );
};

export default Faucet;
