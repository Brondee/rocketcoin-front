import React, { useCallback, useEffect, useState } from "react";
import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";
import { Range, getTrackBackground } from "react-range";
import { useAddPtcMutation } from "../../store/ptc/ptcApiSlice";

import arrowSelect from "../../assets/arr-select.svg";
import { useSelector } from "react-redux";
import {
  useGetUserInfoQuery,
  useReduceTokensMutation,
} from "../../store/user/userApiSlice";

const Ad = () => {
  const [deposit, setDeposit] = useState("");
  const [depositConverted, setDepositConverted] = useState(333330);

  const { curLang } = useSelector((state) => state.general);
  const getData = useCallback(useGetUserInfoQuery, [deposit, depositConverted]);
  const { data } = getData();
  const [reduceTokens] = useReduceTokensMutation();

  const [rangeValues, setRangeValues] = useState({ values: [20] });
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [desc, setDesc] = useState("");
  const [views, setViews] = useState("");
  const [adType, setAdType] = useState("window");
  const [viewsCount, setViewsCount] = useState("5");
  const [finalPrice, setFinalPrice] = useState(30000);
  const [error, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [notEnoughError, setNotEnoughError] = useState(false);

  const [addPtc] = useAddPtcMutation();

  const submitAd = async () => {
    if (views < 100) {
      setIsError(true);
    } else if (finalPrice > data?.investedTokens) {
      setNotEnoughError(true);
    } else if (title.length > 0 && link.length > 0 && desc.length > 0) {
      let tokensReward = 0;
      let expReward = 0;
      let secondsWait = 0;
      if (adType === "window") {
        if (viewsCount === "5") {
          tokensReward = 25;
          expReward = 10;
          secondsWait = 5;
        } else if (viewsCount === "15") {
          tokensReward = 56;
          expReward = 15;
          secondsWait = 15;
        } else if (viewsCount === "30") {
          tokensReward = 102;
          expReward = 20;
          secondsWait = 30;
        } else if (viewsCount === "60") {
          tokensReward = 192;
          expReward = 30;
          secondsWait = 60;
        }
      } else {
        if (viewsCount === "5") {
          tokensReward = 20;
          expReward = 10;
          secondsWait = 5;
        } else if (viewsCount === "10") {
          tokensReward = 32;
          expReward = 15;
          secondsWait = 10;
        } else if (viewsCount === "15") {
          tokensReward = 45;
          expReward = 20;
          secondsWait = 15;
        } else if (viewsCount === "30") {
          tokensReward = 85;
          expReward = 30;
          secondsWait = 30;
        }
      }

      try {
        const ptcData = {
          title,
          description: desc,
          link,
          tokensReward,
          expReward,
          secondsWait,
          ptcType: adType === "window" ? "link" : "iframe",
          viewsTotal: Number(views),
          interval: rangeValues.values[0],
        };
        const ptcResp = await addPtc(ptcData);
        if (ptcResp.data) {
          const resp = await reduceTokens({
            tokens: Math.round(Number(finalPrice)),
          });
          if (resp.data) {
            setIsSuccess(true);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        }
        console.log(ptcResp);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const calculatePrice = () => {
      if (adType === "window") {
        if (viewsCount === "5") {
          setFinalPrice(30 * Number(views));
        } else if (viewsCount === "15") {
          setFinalPrice(70 * Number(views));
        } else if (viewsCount === "30") {
          setFinalPrice(130 * Number(views));
        } else if (viewsCount === "60") {
          setFinalPrice(240 * Number(views));
        }
      } else {
        if (viewsCount === "5") {
          setFinalPrice(25 * Number(views));
        } else if (viewsCount === "10") {
          setFinalPrice(40 * Number(views));
        } else if (viewsCount === "15") {
          setFinalPrice(60 * Number(views));
        } else if (viewsCount === "30") {
          setFinalPrice(110 * Number(views));
        }
      }
    };
    calculatePrice();
  }, [adType, views, viewsCount]);

  useEffect(() => {
    setDepositConverted(deposit * 33333);
  }, [deposit]);

  return (
    <main>
      <Layout
        title={`Rocketcoin - ${curLang === "en" ? "Advertisement" : "Реклама"}`}
      >
        <section className="content-lk">
          <SideBar />
          <div class="right-content-lk">
            <h1 class="title-page-lk">
              {curLang === "en" ? "Advertisement" : "Реклама"}
            </h1>
            <div class="wrapper-page-lk">
              <div class="promotion-container">
                <div class="promotion-container-block">
                  <div class="promotion-container-block-top">
                    {curLang === "en"
                      ? "Buy tokens for your advertisement"
                      : "Купите токены для вашей рекламы"}
                  </div>
                  <div class="promotion-container-block-content">
                    <div class="promotion-container-block-input">
                      <input
                        type="text"
                        placeholder="0"
                        value={deposit}
                        onChange={(e) => setDeposit(e.target.value)}
                      />
                      <button type="button">
                        {depositConverted}{" "}
                        {curLang === "en" ? "tokens" : "токенов"}
                      </button>
                    </div>
                    <div class="promotion-container-block-select">
                      <select>
                        <option>FaucetPay</option>
                      </select>
                      <img src={arrowSelect} alt="" />
                    </div>
                    <form
                      action="https://faucetpay.io/merchant/webscr"
                      method="post"
                    >
                      <input
                        type="hidden"
                        value="spooner1fuck"
                        name="merchant_username"
                      />
                      <input
                        type="hidden"
                        value="Advertisement tokens"
                        name="item_description"
                      />
                      <input type="hidden" value={deposit} name="amount1" />
                      <input type="hidden" value="USDT" name="currency1" />
                      <input type="hidden" name="custom" value={data?.id} />
                      <input
                        type="hidden"
                        name="callback_url"
                        value="https://rocket-coin.online/checkdeposit.php"
                      />
                      <button class="make-depozit" type="submit">
                        {curLang === "en" ? "Make deposit" : "Сделать депозит"}
                      </button>
                    </form>
                  </div>
                </div>
                <div class="promotion-container-block">
                  <div class="promotion-container-block-top">
                    {curLang === "en"
                      ? "Place advertisement"
                      : "Разместите рекламу"}
                  </div>
                  <div class="promotion-container-block-content-form">
                    <div class="form-input-block">
                      <p>{curLang === "en" ? "Title" : "Заголовок"}</p>
                      <input
                        type="text"
                        placeholder={curLang === "en" ? "Title" : "Заголовок"}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div class="form-input-block">
                      <p>{curLang === "en" ? "Link" : "Ссылка"}</p>
                      <input
                        type="text"
                        placeholder={curLang === "en" ? "Link" : "Ссылка"}
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                      />
                    </div>
                    <div class="form-input-block form-input-block-long">
                      <p>{curLang === "en" ? "Description" : "Описание"}</p>
                      <input
                        type="text"
                        placeholder={
                          curLang === "en" ? "Description" : "Описание"
                        }
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                      />
                    </div>
                    <div class="form-input-block">
                      <p>{curLang === "en" ? "Duration" : "Длительность"}</p>
                      <div class="form-input-block-select">
                        {adType === "window" ? (
                          <select
                            value={viewsCount}
                            onChange={(e) => setViewsCount(e.target.value)}
                          >
                            <option value="5">
                              5 {curLang === "en" ? "seconds" : "секунда"} - 30{" "}
                              {curLang === "en"
                                ? "tokens per view"
                                : "токенов за просмотр"}
                            </option>
                            <option value="15">
                              15 {curLang === "en" ? "seconds" : "секунда"} - 70{" "}
                              {curLang === "en"
                                ? "tokens per view"
                                : "токенов за просмотр"}
                            </option>
                            <option value="30">
                              30 {curLang === "en" ? "seconds" : "секунда"} -
                              130{" "}
                              {curLang === "en"
                                ? "tokens per view"
                                : "токенов за просмотр"}
                            </option>
                            <option value="60">
                              60 {curLang === "en" ? "seconds" : "секунда"} -
                              240{" "}
                              {curLang === "en"
                                ? "tokens per view"
                                : "токенов за просмотр"}
                            </option>
                          </select>
                        ) : (
                          <select
                            value={viewsCount}
                            onChange={(e) => setViewsCount(e.target.value)}
                          >
                            <option value="5">
                              5 {curLang === "en" ? "seconds" : "секунда"} - 25{" "}
                              {curLang === "en"
                                ? "tokens per view"
                                : "токенов за просмотр"}
                            </option>
                            <option value="10">
                              10 {curLang === "en" ? "seconds" : "секунда"} - 40{" "}
                              {curLang === "en"
                                ? "tokens per view"
                                : "токенов за просмотр"}
                            </option>
                            <option value="15">
                              15 {curLang === "en" ? "seconds" : "секунда"} - 60{" "}
                              {curLang === "en"
                                ? "tokens per view"
                                : "токенов за просмотр"}
                            </option>
                            <option value="30">
                              30 {curLang === "en" ? "seconds" : "секунда"} -
                              110{" "}
                              {curLang === "en"
                                ? "tokens per view"
                                : "токенов за просмотр"}
                            </option>
                          </select>
                        )}
                        <img src={arrowSelect} alt="" />
                      </div>
                    </div>
                    <div class="form-input-block">
                      <p>{curLang === "en" ? "Type" : "Тип"}</p>
                      <div class="form-input-block-select">
                        <select
                          value={adType}
                          onChange={(e) => {
                            setAdType(e.target.value);
                          }}
                        >
                          <option value="window">
                            {curLang === "en" ? "Window" : "Окно"}
                          </option>
                          <option value="iframe">Iframe</option>
                        </select>
                        <img src={arrowSelect} alt="" />
                      </div>
                    </div>
                    <div class="form-input-block form-input-block-long">
                      <p>
                        {curLang === "en" ? "Total views" : "Всего просмотров"}
                      </p>
                      <input
                        type="text"
                        placeholder="1000"
                        value={views}
                        onChange={(e) => setViews(e.target.value)}
                      />
                      {error && (
                        <p className="label-error">
                          {curLang === "en"
                            ? "Minimal number of views: 100"
                            : "Минимальное количество просмотров: 100"}
                        </p>
                      )}
                    </div>

                    <div class="filters">
                      <p>{curLang === "en" ? "Interval" : "Интервал"}</p>
                      <Range
                        step={1}
                        min={1}
                        max={24}
                        values={rangeValues.values}
                        onChange={(values) => setRangeValues({ values })}
                        renderTrack={({ props, children }) => (
                          <div
                            {...props}
                            className="range-track"
                            style={{
                              ...props.style,
                              height: "6px",
                              width: "100%",
                              background: getTrackBackground({
                                values: rangeValues.values,
                                colors: ["#3E8BF3", "#E1E4E9"],
                                min: 1,
                                max: 24,
                              }),
                            }}
                          >
                            {children}
                          </div>
                        )}
                        renderThumb={({ props }) => (
                          <div
                            {...props}
                            className="range-thumb"
                            style={{
                              ...props.style,
                              height: "20px",
                              width: "20px",
                              backgroundColor: "#fff",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                top: "-25px",
                                color: "#000",
                                fontWeight: "bold",
                                fontSize: "16px",
                                fontFamily:
                                  "Arial,Helvetica Neue,Helvetica,sans-serif",
                                borderRadius: "4px",
                                left: "-3px",
                              }}
                            >
                              {rangeValues.values[0]}
                            </div>
                          </div>
                        )}
                      />
                      <div class="filters-form__price-range">
                        <div class="filters-form__price-range-block">
                          <input
                            class="filters-form__price"
                            type="number"
                            name="min-price"
                            id="min-price-field"
                            min="1"
                            max="500"
                            value="1"
                          />
                        </div>
                        <div class="filters-form__price-range-block">
                          <input
                            class="filters-form__price"
                            type="number"
                            name="max-price"
                            id="max-price-field"
                            min="0"
                            max="24"
                            value="24"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="ad-total-container">
                      <p className="ad-total">
                        {curLang === "en" ? "In total" : "Итого"}: {finalPrice}{" "}
                        {curLang === "en" ? "tokens" : "токенов"}
                      </p>
                    </div>
                    <div className="promotion-btn-error-cont">
                      <button
                        class={`buy-promotion ${notEnoughError && "error"}`}
                        type="button"
                        onClick={submitAd}
                      >
                        {isSuccess
                          ? curLang === "en"
                            ? "Success"
                            : "Успешно"
                          : curLang === "en"
                          ? "Buy ad"
                          : "Купить рекламу"}
                      </button>
                      {notEnoughError && (
                        <p className="promotion-error">
                          {curLang === "en"
                            ? "There are not enough tokens on your waller"
                            : "Не хватает токенов"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </main>
  );
};

export default Ad;
