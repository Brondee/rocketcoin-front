import React, { useCallback, useEffect, useState } from "react";
import SideBar from "../shared/SideBar";
import Layout from "../layout/Layout";
import { useSelector } from "react-redux";
import axios from "axios";

import walletLine from "../../assets/img-all-lk/wallet-3-line-2.svg";
import {
  useGetUserInfoQuery,
  useReduceTokensMutation,
} from "../../store/user/userApiSlice";
import RotationBanner from "../shared/RotationBanner";
import Popunder from "../shared/Popunder";

const Withdraw = () => {
  const [userWallet, setUserWallet] = useState("");
  const [tokensNumber, setTokensNumber] = useState("0");
  const [currencies, setCurrencies] = useState([0, 0, 0, 0, 0, 0]);
  const [curActive, setCurActive] = useState(0.1);
  const [minimalError, setMinimalError] = useState(false);
  const [walletError, setWalletError] = useState(false);
  const [tokensError, setTokensError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [btcPercent, setBtcPercent] = useState(0);
  const [trxPercent, setTrxPercent] = useState(0);
  const [dogePercent, setDogePercent] = useState(0);
  const [solPercent, setSolPercent] = useState(0);
  const [usdtPercent, setUsdtPercent] = useState(0);
  const [bnbPercent, setBnbPercent] = useState(0);
  const [ltcPercent, setLtcPercent] = useState(0);

  const { curLang } = useSelector((state) => state.general);
  const [reduceTokens] = useReduceTokensMutation();

  const getData = useCallback(useGetUserInfoQuery, [userWallet, tokensNumber]);
  const { data } = getData();

  const submitWithdraw = async (e) => {
    e.preventDefault();

    let walletExists = {};
    try {
      let bodyFormData = new FormData();
      bodyFormData.append(
        "api_key",
        "3a433c998fecf83ae928f86e494ef06cbb4aa066cf61c594873d9d2b86e67392"
      );
      bodyFormData.append("address", userWallet);
      walletExists = await axios.post(
        "https://faucetpay.io/api/v1/checkaddress",
        bodyFormData,
        { "Content-Type": "multipart/form-data" }
      );
      console.log(walletExists.data);
    } catch (err) {
      console.log(err);
    }

    if (Number(tokensNumber) < 1000) {
      setMinimalError(true);
    } else if (walletExists.data.status !== 200) {
      setWalletError(true);
    } else if (Number(tokensNumber) > data?.curTokens) {
      setTokensError(true);
    } else if (curActive !== 0.1) {
      let curCurrency = "BTC";
      if (curActive === 6) {
        curCurrency = "USDT";
      } else if (curActive === 1) {
        curCurrency = "TRX";
      } else if (curActive === 2) {
        curCurrency = "DOGE";
      } else if (curActive === 3) {
        curCurrency = "SOL";
      } else if (curActive === 4) {
        curCurrency = "LTC";
      } else if (curActive === 5) {
        curCurrency = "BNB";
      }
      try {
        let bodyFormData = new FormData();
        bodyFormData.append(
          "api_key",
          "3a433c998fecf83ae928f86e494ef06cbb4aa066cf61c594873d9d2b86e67392"
        );
        bodyFormData.append("to", userWallet);
        bodyFormData.append("currency", curCurrency);
        if (curActive === 6) {
          bodyFormData.append(
            "amount",
            (Number(tokensNumber) / 33333).toFixed(8)
          );
        } else {
          bodyFormData.append(
            "amount",
            convertToSatoshi(currencies[curActive])
          );
          console.log(currencies[curActive]);
        }
        const sendPayment = await axios.post(
          "https://faucetpay.io/api/v1/send",
          bodyFormData,
          { "Content-Type": "multipart/form-data" }
        );
        console.log(sendPayment.data);
        if (sendPayment.data.status === 200) {
          const resp = await reduceTokens({
            tokens: tokensNumber,
            type: "withdraw",
          });
          console.log(resp.data);
          setSuccess(true);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const convertToSatoshi = (amount) => {
    let stAmount = String(amount);
    for (let i = 0; i < stAmount.length; i++) {
      if (stAmount[0] === "0") {
        stAmount = stAmount.substring(1);
      }
      if (stAmount[0] === ".") {
        stAmount = stAmount.substring(1);
      } else {
        stAmount = stAmount.replace(".", "");
      }
      console.log(stAmount);
    }
    return Number(stAmount);
  };

  useEffect(() => {
    // const getCurrencies = async () => {
    //   const tokensToUsd = (Number(tokensNumber) / 33333).toFixed(5);
    //   // console.log(tokensToUsd);
    //   try {
    //     let currenciesArray = [];
    //     const btcAmount = await axios(
    //       `https://api.coinconvert.net/convert/usd/btc?amount=${tokensToUsd}`
    //     );
    //     const tronAmount = await axios(
    //       `https://api.coinconvert.net/convert/usd/trx?amount=${tokensToUsd}`
    //     );
    //     const dogeAmount = await axios(
    //       `https://api.coinconvert.net/convert/usd/doge?amount=${tokensToUsd}`
    //     );
    //     const solanaAmount = await axios(
    //       `https://api.coinconvert.net/convert/usd/sol?amount=${tokensToUsd}`
    //     );
    //     const ltcAmount = await axios(
    //       `https://api.coinconvert.net/convert/usd/ltc?amount=${tokensToUsd}`
    //     );
    //     currenciesArray.push(
    //       btcAmount.data.BTC,
    //       tronAmount.data.TRX,
    //       dogeAmount.data.DOGE,
    //       solanaAmount.data.SOL,
    //       ltcAmount.data.LTC
    //     );
    //     setCurrencies(currenciesArray);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // if (tokensNumber.length > 2) getCurrencies();
    // else setCurrencies([0, 0, 0, 0, 0]);

    const tokensToUsd = (Number(tokensNumber) / 33333).toFixed(5);
    const btcAmount = (tokensToUsd * 0.0000357974).toFixed(8);
    const trxAmount = (tokensToUsd * 12.91).toFixed(8);
    const dogeAmount = (tokensToUsd * 14.94).toFixed(8);
    const solAmount = (tokensToUsd * 0.045977).toFixed(8);
    const ltcAmount = (tokensToUsd * 0.0143781).toFixed(8);
    const bnbAmount = (tokensToUsd * 0.00446987).toFixed(8);
    setCurrencies([
      btcAmount,
      trxAmount,
      dogeAmount,
      solAmount,
      ltcAmount,
      bnbAmount,
    ]);
  }, [tokensNumber]);

  useEffect(() => {
    const reqBalance = async (name) => {
      try {
        let bodyFormData = new FormData();
        bodyFormData.append(
          "api_key",
          "3a433c998fecf83ae928f86e494ef06cbb4aa066cf61c594873d9d2b86e67392"
        );
        bodyFormData.append("currency", name);
        const response = await axios.post(
          "https://faucetpay.io/api/v1/getbalance",
          bodyFormData,
          { "Content-Type": "multipart/form-data" }
        );
        // console.log(response.data);

        return response.data.balance;
      } catch (error) {
        console.log(error);
      }
    };
    const walletReq = async () => {
      const btcBalance = await reqBalance("BTC");
      setBtcPercent((btcBalance * 100) / 100000);
      const trxBalance = await reqBalance("TRX");
      setTrxPercent((trxBalance * 100) / 30000000000);
      const dogeBalance = await reqBalance("DOGE");
      setDogePercent((dogeBalance * 100) / 50000000000);
      const solBalance = await reqBalance("SOL");
      setSolPercent((solBalance * 100) / 100000000);
      const usdtBalance = await reqBalance("USDT");
      setUsdtPercent((usdtBalance * 100) / 3000000000);
      const bnbBalance = await reqBalance("BNB");
      setBnbPercent((bnbBalance * 100) / 10000000);
      const ltcBalance = await reqBalance("LTC");
      setLtcPercent((ltcBalance * 100) / 40000000);
    };
    walletReq();
  }, []);

  return (
    <main>
      <Layout title={`Rocketcoin - ${curLang === "en" ? "Withdraw" : "Вывод"}`}>
        <section className="content-lk">
          <SideBar />
          <div class="right-content-lk">
            <div className="page-title-ban-cont">
              <h1 class="title-page-lk">
                {curLang === "en" ? "Withdraw" : "Вывод"}
              </h1>
              <div className="banner banner468 banner-profile">
                <RotationBanner
                  width={468}
                  dataframe="2259512"
                  datasid="382310"
                  datakey="679f64fa36a4eb3544f2a556b9240afe"
                />
              </div>
              <div className="banner banner468 banner-profile">
                <RotationBanner
                  width={468}
                  dataframe="2259513"
                  datasid="382311"
                  datakey="679f64fa36a4eb3544f2a556b9240afe"
                />
              </div>
            </div>
            <div class="wrapper-page-lk">
              <div class="content-block-flex-lk-white">
                <div class="block-info-your-balance">
                  <div className="banner banner468 banner-withdraw">
                    <RotationBanner
                      width={468}
                      dataframe="2259514"
                      datasid="382312"
                      datakey="679f64fa36a4eb3544f2a556b9240afe"
                    />
                  </div>
                  <img src={walletLine} alt="" />
                  <div class="text-block-info-your-balance">
                    <p>
                      {curLang === "en"
                        ? "On your account:"
                        : "На вашем аккаунте:"}
                    </p>
                    <h2>
                      {data?.curTokens}{" "}
                      {curLang === "en" ? "tokens" : "токенов"}
                    </h2>
                  </div>
                </div>

                <div class="flex-info-your-wallet">
                  <div className="withdraw-banners">
                    <div className="banner banner120 banner-withdraw-mid">
                      <iframe
                        title="banner"
                        data-aa="2259515"
                        src="//ad.a-ads.com/2259515?size=120x60"
                      ></iframe>
                    </div>
                    <div className="banner banner120 banner-withdraw-mid">
                      <iframe
                        title="banner"
                        data-aa="2259516"
                        src="//ad.a-ads.com/2259516?size=120x60"
                      ></iframe>
                    </div>
                  </div>
                  <div class="block-info-your-wallet">
                    <p>{curLang === "en" ? "Your wallet" : "Ваш кошелёк"}</p>
                    <input
                      type="text"
                      value={userWallet}
                      required
                      onChange={(e) => setUserWallet(e.target.value)}
                    />
                    {walletError && (
                      <p className="withdraw-minimal-error">
                        {curLang === "en"
                          ? "Current wallet does not exist"
                          : "Данного кошелька не существует"}
                      </p>
                    )}
                  </div>
                  <div class="block-info-your-wallet">
                    <p>
                      {curLang === "en"
                        ? "Number of tokens to withdraw"
                        : "Количество токеннов на вывод"}
                    </p>
                    <input
                      type="number"
                      value={tokensNumber}
                      required
                      onChange={(e) => setTokensNumber(e.target.value)}
                    />
                    {minimalError && (
                      <p className="withdraw-minimal-error">
                        {curLang === "en"
                          ? "The minimal number of tokens to withdraw: 1000"
                          : "Миниальное количество токенов на вывод: 1000"}
                      </p>
                    )}
                    {tokensError && (
                      <p className="withdraw-minimal-error">
                        {curLang === "en"
                          ? "The number of tokens exceeds the number of tokens on the account"
                          : "Количество токенов превышает количество токенов на счету"}
                      </p>
                    )}
                  </div>
                </div>
                <div class="flex-blocks-wallet-you-can">
                  <div
                    class={`flex-blocks-wallet-you-can-block ${
                      curActive === 0 && "active"
                    }`}
                    onClick={() => setCurActive(0)}
                  >
                    <img src="img-all-lk/b1.png" alt="" />
                    <div class="text-flex-blocks-wallet-you-can">
                      <p>BTC - FaucetPay</p>
                      <h3>~{currencies[0]} BTC</h3>
                      <div className="percent-wallet">
                        <div
                          className="percent-wallet-inner"
                          style={{ width: btcPercent }}
                        ></div>
                      </div>
                      {btcPercent.toFixed(1)} %
                    </div>
                  </div>
                  <div
                    class={`flex-blocks-wallet-you-can-block ${
                      curActive === 1 && "active"
                    }`}
                    onClick={() => setCurActive(1)}
                  >
                    <img src="tron.png" alt="" />
                    <div class="text-flex-blocks-wallet-you-can">
                      <p>Tron (TRX)</p>
                      <h3>~{currencies[1]} TRX</h3>
                      <div className="percent-wallet">
                        <div
                          className="percent-wallet-inner"
                          style={{ width: trxPercent }}
                        ></div>
                      </div>
                      {trxPercent.toFixed(1)} %
                    </div>
                  </div>
                  <div
                    class={`flex-blocks-wallet-you-can-block ${
                      curActive === 2 && "active"
                    }`}
                    onClick={() => setCurActive(2)}
                  >
                    <img src="dog.png" alt="" />
                    <div class="text-flex-blocks-wallet-you-can">
                      <p>Dogecoin (DOGE)</p>
                      <h3>~{currencies[2]} DOGE</h3>
                      <div className="percent-wallet">
                        <div
                          className="percent-wallet-inner"
                          style={{ width: dogePercent }}
                        ></div>
                      </div>
                      {dogePercent.toFixed(1)} %
                    </div>
                  </div>
                  <div
                    class={`flex-blocks-wallet-you-can-block ${
                      curActive === 3 && "active"
                    }`}
                    onClick={() => setCurActive(3)}
                  >
                    <img src="img-all-lk/b6.png" alt="" />
                    <div class="text-flex-blocks-wallet-you-can">
                      <p>Solana (SOL)</p>
                      <h3>~{currencies[3]} SOL</h3>
                      <div className="percent-wallet">
                        <div
                          className="percent-wallet-inner"
                          style={{ width: solPercent }}
                        ></div>
                      </div>
                      {solPercent.toFixed(1)} %
                    </div>
                  </div>
                  <div
                    class={`flex-blocks-wallet-you-can-block ${
                      curActive === 6 && "active"
                    }`}
                    onClick={() => setCurActive(6)}
                  >
                    <img src="img-all-lk/b3.png" alt="" />
                    <div class="text-flex-blocks-wallet-you-can">
                      <p>Tether (USDT)</p>
                      <h3>~{(Number(tokensNumber) / 33333).toFixed(5)} USDT</h3>
                      <div className="percent-wallet">
                        <div
                          className="percent-wallet-inner"
                          style={{ width: usdtPercent }}
                        ></div>
                      </div>
                      {usdtPercent.toFixed(1)} %
                    </div>
                  </div>
                  <div
                    class={`flex-blocks-wallet-you-can-block ${
                      curActive === 5 && "active"
                    }`}
                    onClick={() => setCurActive(5)}
                  >
                    <img src="img-all-lk/b5.png" alt="" />
                    <div class="text-flex-blocks-wallet-you-can">
                      <p>BNB</p>
                      <h3>~{currencies[5]} BNB</h3>
                      <div className="percent-wallet">
                        <div
                          className="percent-wallet-inner"
                          style={{ width: bnbPercent }}
                        ></div>
                      </div>
                      {bnbPercent.toFixed(1)} %
                    </div>
                  </div>
                  <div
                    class={`flex-blocks-wallet-you-can-block ${
                      curActive === 4 && "active"
                    }`}
                    onClick={() => setCurActive(4)}
                  >
                    <img src="Litecoin.png" alt="" />
                    <div class="text-flex-blocks-wallet-you-can">
                      <p>Litecoin (LTC)</p>
                      <h3>~{currencies[4]} LTC</h3>
                      <div className="percent-wallet">
                        <div
                          className="percent-wallet-inner"
                          style={{ width: ltcPercent }}
                        ></div>
                      </div>
                      {ltcPercent.toFixed(1)} %
                    </div>
                  </div>
                </div>

                <div class="btn-content-output">
                  <a
                    href="#!"
                    class="btn-output"
                    onClick={(e) => submitWithdraw(e)}
                  >
                    {success
                      ? curLang === "en"
                        ? "Success"
                        : "Успешно"
                      : curLang === "en"
                      ? "Withdraw"
                      : "Вывести на кошелёк"}
                  </a>
                  {/* <p>
                    {curLang === "en"
                      ? "When withdrawing less than 5,000 tokens, the commission will be 5%. When withdrawing more than 5,000 tokens, the bonus will be 5%"
                      : "При выводе менее 5000 токенов комиссия составит 5% при выводе более 5000 токенов бонус составит 5%"}
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Popunder />
      </Layout>
    </main>
  );
};

export default Withdraw;
