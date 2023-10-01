import React, { useCallback, useEffect, useState } from "react";

import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";
import { useGetUserInfoQuery } from "../../store/user/userApiSlice";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AdblockModal from "../shared/AdblockModal";
import RotationBanner from "../shared/RotationBanner";
import FixedBanner from "../shared/FixedBanner";
import Popunder from "../shared/Popunder";

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
            <div className="page-title-ban-cont">
              <h1 className="title-page-lk">Faucet</h1>

              <div className="banner banner468 banner-profile">
                <RotationBanner
                  width={468}
                  dataframe="2259499"
                  datasid="382267"
                  datakey="679f64fa36a4eb3544f2a556b9240afe"
                />
              </div>
              <div className="banner banner468 banner-profile">
                <RotationBanner
                  width={468}
                  dataframe="2259500"
                  datasid="382268"
                  datakey="679f64fa36a4eb3544f2a556b9240afe"
                />
              </div>
            </div>
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
                      <div className="banner banner120 banner-faucet">
                        <iframe
                          title="banner"
                          data-aa="2256203"
                          src="//ad.a-ads.com/2256203?size=120x60"
                        ></iframe>
                      </div>
                      <Countdown
                        date={
                          new Date(data?.faucetClaimed).getTime() +
                          1000 * 60 * 5
                        }
                        renderer={countDownFunc}
                      />
                    </>
                  ) : (
                    <>
                      <p>
                        {curLang === "en"
                          ? "Click to claim Faucet"
                          : "Кликните, чтобы получить Faucet"}
                      </p>
                      <div className="banner banner120 banner-faucet">
                        <iframe
                          title="faucet banner"
                          data-aa="2259501"
                          src="//ad.a-ads.com/2259501?size=120x60"
                        ></iframe>
                      </div>
                    </>
                  )}

                  <div className="banner banner120 banner-faucet">
                    <iframe
                      title="faucet banner"
                      data-aa="2259502"
                      src="//ad.a-ads.com/2259502?size=120x60"
                    ></iframe>
                  </div>
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
                <div className="promotion-block block300">
                  <RotationBanner
                    width={300}
                    datasid="382271"
                    datakey="74f5fd8cb2210ae903b1c609be6726ea"
                    dataframe="2259503"
                  />
                </div>
                <div className="promotion-block block300">
                  <RotationBanner
                    width={300}
                    datasid="382272"
                    datakey="74f5fd8cb2210ae903b1c609be6726ea"
                    dataframe="2259504"
                  />
                </div>
                <div className="promotion-block block300">
                  <RotationBanner
                    width={300}
                    datasid="382273"
                    datakey="74f5fd8cb2210ae903b1c609be6726ea"
                    dataframe="2259505"
                  />
                </div>
              </div>
            </div>
            <div className="bottom-banners-cont">
              <div className="banner banner468 banner-profile">
                <RotationBanner
                  width={468}
                  dataframe="2260884"
                  datasid="382269"
                  datakey="679f64fa36a4eb3544f2a556b9240afe"
                />
              </div>
              <div className="banner banner468 banner-profile">
                <script type="text/javascript">alert("peppla")</script>
              </div>
              <div className="banner banner468 banner-profile">
                <RotationBanner
                  width={468}
                  dataframe="2260885"
                  datasid="382270"
                  datakey="679f64fa36a4eb3544f2a556b9240afe"
                />
              </div>
            </div>
          </div>
        </section>
        <AdblockModal />
        <FixedBanner page="faucet" />
        <Popunder />
      </Layout>
    </main>
  );
};

export default Faucet;
