import React, { useCallback, useEffect, useState } from "react";

import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";
import { useGetUserInfoQuery } from "../../store/user/userApiSlice";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Faucet = () => {
  const [isFaucetClaimed, setIsFaucetClaimed] = useState(false);

  const getInfo = useCallback(useGetUserInfoQuery, []);
  const { data } = getInfo();
  const { curLang } = useSelector((state) => state.general);

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
          <SideBar />
          <div className="right-content-lk">
            <h1 className="title-page-lk">Faucet</h1>
            <div className="wrapper-page-lk">
              <div className="content-block-flex-lk-white">
                <div className="faucet-title-content">
                  {isFaucetClaimed ? (
                    <>
                      <p>
                        {curLang === "en"
                          ? "Faucet claimed! Please wait"
                          : "Faucet получен! Пожалуйста подождите"}
                      </p>
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
                      {curLang === "en"
                        ? "Click to claim Faucet"
                        : "Кликните, чтобы получить Faucet"}
                    </p>
                  )}
                  <div className="right-btns-content-task">
                    <a href="#!" className="btn-green-task">
                      150 {curLang === "en" ? "tokens" : "токены"}
                    </a>
                    <a href="#!" className="btn-green-task">
                      10 exp
                    </a>
                    <a href="#!" className="btn-purple-task">
                      {1000 - data?.faucetClaimedCount}/1000{" "}
                      {curLang === "en" ? "views Claim" : "просмотров"}
                    </a>
                  </div>
                </div>
                {isFaucetClaimed ? (
                  <div></div>
                ) : (
                  <>
                    <Link
                      className="btn-lk-account btn-lk-account-2"
                      to="/faucet_claim"
                    >
                      {curLang === "en" ? "Claim" : "Получить"}
                    </Link>
                  </>
                )}
              </div>
              <div className="promotion-blocks">
                <div className="promotion-block">Реклама</div>
                <div className="promotion-block">Реклама</div>
                <div className="promotion-block">Реклама</div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </main>
  );
};

export default Faucet;
