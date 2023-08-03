import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "../layout/Layout";
import {
  useLoginMutation,
  useSignupMutation,
  useResetMutation,
} from "../../store/auth/authApiSlice";
import { setCredentials } from "../../store/auth/authSlice";
import { setModalOpen } from "../../store/generalSlice";
import accordionArray from "../../utils/accordionArray";

import logoRocketcoin from "../../assets/logo-rocketcoin.svg";
import offersMain1 from "../../assets/offers-main1.svg";
import offersMain2 from "../../assets/offers-main2.svg";
import bgMain from "../../assets/img/bg-main.svg";
import rocet from "../../assets/img/rocet.svg";
import social1 from "../../assets/img/social1.svg";
import social1Active1 from "../../assets/img/social-active1.svg";
import social2 from "../../assets/img/social2.svg";
import social2Active2 from "../../assets/img/social-active2.svg";
import social3 from "../../assets/img/social3.svg";
import social3Active3 from "../../assets/img/social-active3.svg";
import bitcoinRefresh from "../../assets/bitcoin-refresh.svg";
import AccordionItem from "../shared/AccordionItem";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailTakenError, setEmailTakenError] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [userLogin, setUserLogin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginTakenError, setLoginTakenError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordSecond, setPasswordSecond] = useState("");
  const [pwdNotMatch, setPwdNotMatch] = useState(false);
  const [isTickActive, setIsTickActive] = useState(false);
  const [tickError, setTickError] = useState(false);
  const [crIncorrect, setCrIncorrect] = useState(false);
  const [cantFindUser, setCantFindUser] = useState(false);

  const [emailHome, setEmailHome] = useState("");
  const [emailHomeError, setEmailHomeError] = useState(false);
  const [passwordHome, setPasswordHome] = useState("");
  const [passwordHomeError, setPasswordHomeError] = useState(false);
  const [crIncorrectHome, setCrIncorrectHome] = useState(false);
  const [cantFindUserHome, setCantFindUserHome] = useState(false);

  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();
  const [resetPassword] = useResetMutation();

  const {
    isModalSingInOpen,
    isModalSingUpOpen,
    isModalResetOpen,
    isModalSentMailOpen,
  } = useSelector((state) => state.general);

  const hideModal = () => {
    dispatch(setModalOpen({ type: "signin", status: false }));
    dispatch(setModalOpen({ type: "signup", status: false }));
    dispatch(setModalOpen({ type: "reset", status: false }));
    dispatch(setModalOpen({ type: "sentMail", status: false }));
  };

  const modalClick = (e) => {
    const modalClasses = Array.from(e.target.classList);
    if (modalClasses.includes("modal-active")) {
      dispatch(setModalOpen({ type: "sentMail", status: false }));
      dispatch(setModalOpen({ type: "signin", status: false }));
      dispatch(setModalOpen({ type: "signup", status: false }));
      dispatch(setModalOpen({ type: "reset", status: false }));
    }
  };

  const showSignupModal = (e) => {
    e.preventDefault();
    setEmail("");
    setEmailError(false);
    setPassword("");
    setPasswordError(false);

    dispatch(setModalOpen({ type: "sentMail", status: false }));
    dispatch(setModalOpen({ type: "reset", status: false }));
    dispatch(setModalOpen({ type: "signin", status: false }));
    dispatch(setModalOpen({ type: "signup", status: true }));
  };
  const showSigninModal = (e) => {
    e.preventDefault();
    setEmail("");
    setEmailError(false);
    setPassword("");
    setPasswordError(false);
    setCantFindUser(false);
    dispatch(setModalOpen({ type: "sentMail", status: false }));
    dispatch(setModalOpen({ type: "reset", status: false }));
    dispatch(setModalOpen({ type: "signup", status: false }));
    dispatch(setModalOpen({ type: "signin", status: true }));
  };
  const showResetModal = (e) => {
    e.preventDefault();
    setEmail("");
    setEmailError(false);
    dispatch(setModalOpen({ type: "sentMail", status: false }));
    dispatch(setModalOpen({ type: "signup", status: false }));
    dispatch(setModalOpen({ type: "signin", status: false }));
    dispatch(setModalOpen({ type: "reset", status: true }));
  };
  const showSentMailModal = (e) => {
    e.preventDefault();
    dispatch(setModalOpen({ type: "signup", status: false }));
    dispatch(setModalOpen({ type: "signin", status: false }));
    dispatch(setModalOpen({ type: "reset", status: false }));
    dispatch(setModalOpen({ type: "sentMail", status: true }));
  };

  const onChangeName = (e) => {
    setName(e.target.value);
    if (name.length > 0) {
      setNameError(false);
    }
  };

  const onChangeTick = () => {
    if (!isTickActive) {
      setTickError(false);
    }
    setIsTickActive(!isTickActive);
  };

  const loginFunc = async (e) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    setCrIncorrect(false);
    setCantFindUser(false);

    if (email.length === 0 && password.length === 0) {
      setEmailError(true);
      setPasswordError(true);
    } else if (email.length === 0) {
      setEmailError(true);
    } else if (password.length === 0) {
      setPasswordError(true);
    } else {
      try {
        const response = await login({ email, password });
        if (response.error) {
          const errMessage = response.error.data.message;
          if (errMessage === "credentials incorrect") {
            setEmailError(true);
            setPasswordError(true);
            setCrIncorrect(true);
          } else if (errMessage === "cant find user") {
            setEmailError(true);
            setCantFindUser(true);
          } else if (errMessage[0] === "email must be an email") {
            setEmailError(true);
          }
          console.log(errMessage);
        } else {
          const data = {
            email: null,
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
          };
          dispatch(setCredentials(data));
          localStorage.setItem("accessToken", response.data.access_token);
          localStorage.setItem("refreshToken", response.data.refresh_token);
          navigate("/profile");
          window.location.reload();
          dispatch(setModalOpen({ type: "signin", status: false }));
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const loginHomeFunc = async (e) => {
    e.preventDefault();
    setEmailHomeError(false);
    setPasswordHomeError(false);
    setCrIncorrectHome(false);
    setCantFindUserHome(false);

    if (emailHome.length === 0 && passwordHome.length === 0) {
      setEmailHomeError(true);
      setPasswordHomeError(true);
    } else if (emailHome.length === 0) {
      setEmailHomeError(true);
    } else if (passwordHome.length === 0) {
      setPasswordHomeError(true);
    } else {
      try {
        const response = await login({
          email: emailHome,
          password: passwordHome,
        });
        if (response.error) {
          const errMessage = response.error.data.message;
          if (errMessage === "credentials incorrect") {
            setEmailHomeError(true);
            setPasswordHomeError(true);
            setCrIncorrectHome(true);
          } else if (errMessage === "cant find user") {
            setEmailHomeError(true);
            setCantFindUserHome(true);
          } else if (errMessage[0] === "email must be an email") {
            setEmailHomeError(true);
          }
          console.log(errMessage);
        } else {
          const data = {
            email: null,
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
          };
          dispatch(setCredentials(data));
          localStorage.setItem("accessToken", response.data.access_token);
          localStorage.setItem("refreshToken", response.data.refresh_token);

          navigate("/profile");
          window.location.reload();
          dispatch(setModalOpen({ type: "signin", status: false }));
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const resetPasswordFunc = async (e) => {
    e.preventDefault();
    setEmailError(false);
    setCantFindUser(false);

    if (email.length === 0) {
      setEmailError(true);
    } else {
      try {
        const response = await resetPassword({ email });
        if (response.error) {
          const errMsg = response.error.data.message;
          if (errMsg === "cant find user") {
            setEmailError(true);
            setCantFindUser(true);
          }
        } else {
          showSentMailModal(e);
        }
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const singupFunc = async (e) => {
    e.preventDefault();
    setNameError(false);
    setLoginError(false);
    setEmailError(false);
    setPasswordError(false);
    setPwdNotMatch(false);
    setTickError(false);

    if (name.length === 0) {
      setNameError(true);
    } else if (userLogin.length === 0) {
      setLoginError(true);
    } else if (email.length === 0) {
      setEmailError(true);
    } else if (
      password.length < 8 ||
      (!password.includes("!") &&
        !password.includes("$") &&
        !password.includes("#") &&
        !password.includes("%")) ||
      !/\d+/g.test(password) ||
      /^[A-Z]/.test(password)
    ) {
      setPasswordError(true);
      console.log("password error");
    } else if (password !== passwordSecond) {
      setPwdNotMatch(true);
      console.log("pwd match error");
      console.log(password, passwordSecond);
    } else if (!isTickActive) {
      setTickError(true);
      console.log("tick not active error");
    } else {
      try {
        const response = await signup({
          email,
          login: userLogin,
          name,
          password,
        });
        if (response.error || !response.data) {
          const errMessage = response.error.data.message;
          if (errMessage === "Credentials taken in email") {
            setEmailError(true);
            setEmailTakenError(true);
          } else if (errMessage === "Credentials taken in login") {
            setLoginError(true);
            setLoginTakenError(true);
          }
          console.log(errMessage);
        } else {
          const data = {
            email: null,
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
          };
          dispatch(setCredentials(data));
          navigate("/profile");
          window.location.reload();
          localStorage.setItem("accessToken", response.data.access_token);
          localStorage.setItem("refreshToken", response.data.refresh_token);
          dispatch(setModalOpen({ type: "signup", status: false }));
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <Layout title="Rocketcoin - Главная">
        <section className="main-section__main">
          <div className="container">
            <div className="main-section-container__main">
              <div className="main-section-container-left__main">
                <div className="main-section-container-left-content__main">
                  <img
                    src={logoRocketcoin}
                    alt=""
                    className="logo-rocketcoin"
                  />
                  <div className="offers-main-container">
                    <div className="offers-main-container-block">
                      <div className="offers-main-container-block-img">
                        <img src={offersMain1} alt="" />
                      </div>
                      <div className="offers-main-container-block-text">
                        <h3>Рекламодателям</h3>
                        <p>
                          Staking is a method of verifying and securing
                          transactions on proof of stake blockchains. It’s
                          faster and more energy efficient than other methods
                          such as proof of work.
                        </p>
                      </div>
                    </div>
                    <div className="offers-main-container-block">
                      <div className="offers-main-container-block-img">
                        <img src={offersMain2} alt="" />
                      </div>
                      <div className="offers-main-container-block-text">
                        <h3>Заработок</h3>
                        <p>
                          Staking is a method of verifying and securing
                          transactions on proof of stake blockchains. It’s
                          faster and more energy efficient than other methods
                          such as proof of work.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <a href="#!" className="learn-more-btn">
                  Узнать больше
                </a>
              </div>
              <div className="main-section-container-right__main">
                <img src={bgMain} alt="" className="bg-main-sign-in" />
                <img src="img/dollar-coin.png" alt="" className="coin-dollar" />
                <img src="img/mini=coin.png" alt="" className="mini-coin" />
                <div className="block-sign-in-main">
                  <form>
                    <h4>Авторизация</h4>
                    <div className="block-sign-in-main-input">
                      <p className={`${emailHomeError && "label-error"}`}>
                        Email
                      </p>
                      <input
                        type="email"
                        placeholder="maksimfrolov@gmail.com"
                        required
                        onChange={(e) => setEmailHome(e.target.value)}
                        value={emailHome}
                        autocomplete="one-time-code"
                        className={`${emailHomeError && "inp-error"}`}
                      />
                    </div>
                    <div className="block-sign-in-main-input">
                      <p className={`${passwordHomeError && "label-error"}`}>
                        Пароль
                      </p>
                      <input
                        type="password"
                        placeholder="************"
                        required
                        onChange={(e) => setPasswordHome(e.target.value)}
                        value={passwordHome}
                        autocomplete="one-time-code"
                        className={`${passwordHomeError && "inp-error"}`}
                      />
                      {crIncorrectHome && (
                        <p className="label-error">Email либо пароль неверны</p>
                      )}
                      {cantFindUserHome && (
                        <p className="label-error">
                          Аккаунта с данным Email не существует
                        </p>
                      )}
                    </div>
                    <button
                      className="btn-submit-main"
                      type="submit"
                      onClick={(e) => loginHomeFunc(e)}
                    >
                      Войти
                    </button>
                    <button
                      className="btn-submit-main2"
                      onClick={(e) => showSignupModal(e)}
                    >
                      Зарегистрироваться
                    </button>
                  </form>
                </div>
                <img src={rocet} alt="" className="rocket" />
              </div>
            </div>
            <div className="main-section-bottom__main">
              <a href="#why-are-we" className="main-section-bottom-left__main">
                <div className="arrow-down-ellipse">
                  <svg
                    className="arrow-down-ellipse-img"
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="path-arrow"
                      d="M8.44531 0.433594L5 3.87891L1.55469 0.433594L0.5 1.48828L5 5.98828L9.5 1.48828L8.44531 0.433594Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <p className="main-section-bottom-left__main-p">
                  Листайте вниз
                </p>
              </a>
              <div className="main-section-bottom-right__main">
                <p>Наши социальные сети</p>
                <div className="social-media-main">
                  <a href="#!" className="social-media-main-ellipse">
                    <img src={social1} alt="" className="social-usually" />
                    <img src={social1Active1} alt="" className="social-hover" />
                  </a>
                  <a href="#!" className="social-media-main-ellipse">
                    <img src={social2} alt="" className="social-usually" />
                    <img src={social2Active2} alt="" className="social-hover" />
                  </a>
                  <a href="#!" className="social-media-main-ellipse">
                    <img src={social3} alt="" className="social-usually" />
                    <img src={social3Active3} alt="" className="social-hover" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="why-are-we-section" id="why-are-we">
          <div className="container">
            <div className="map-section-title__main">
              <h2>
                Our <span>Features</span> <br />
                <span>Why</span> us?
              </h2>
              <p>We have got All the Earning Options Covered For You</p>
            </div>
            <div className="why-are-we-section-container">
              <div className="why-are-we-section-container-left">
                <img src="cosmic.png" alt="" />
                <div className="main-content"></div>
              </div>

              <div className="why-are-we-section-container-right">
                <div className="why-are-we-section-container-right-block">
                  <div className="why-are-we-section-container-right-block-img-parent">
                    <div className="why-are-we-section-container-right-block-img">
                      <img src={bitcoinRefresh} alt="" />
                    </div>
                  </div>
                  <p>Faucet</p>
                </div>
                <div className="why-are-we-section-container-right-block">
                  <div className="why-are-we-section-container-right-block-img-parent">
                    <div className="why-are-we-section-container-right-block-img">
                      <img src={bitcoinRefresh} alt="" />
                    </div>
                  </div>
                  <p>Faucet</p>
                </div>
                <div className="why-are-we-section-container-right-block">
                  <div className="why-are-we-section-container-right-block-img-parent">
                    <div className="why-are-we-section-container-right-block-img">
                      <img src={bitcoinRefresh} alt="" />
                    </div>
                  </div>
                  <p>Faucet</p>
                </div>
                <div className="why-are-we-section-container-right-block">
                  <div className="why-are-we-section-container-right-block-img-parent">
                    <div className="why-are-we-section-container-right-block-img">
                      <img src={bitcoinRefresh} alt="" />
                    </div>
                  </div>
                  <p>Faucet</p>
                </div>
                <div className="why-are-we-section-container-right-block">
                  <div className="why-are-we-section-container-right-block-img-parent">
                    <div className="why-are-we-section-container-right-block-img">
                      <img src={bitcoinRefresh} alt="" />
                    </div>
                  </div>
                  <p>Faucet</p>
                </div>
                <div className="why-are-we-section-container-right-block">
                  <div className="why-are-we-section-container-right-block-img-parent">
                    <div className="why-are-we-section-container-right-block-img">
                      <img src={bitcoinRefresh} alt="" />
                    </div>
                  </div>
                  <p>Faucet</p>
                </div>
                <div className="why-are-we-section-container-right-block">
                  <div className="why-are-we-section-container-right-block-img-parent">
                    <div className="why-are-we-section-container-right-block-img">
                      <img src={bitcoinRefresh} alt="" />
                    </div>
                  </div>
                  <p>Faucet</p>
                </div>
                <div className="why-are-we-section-container-right-block">
                  <div className="why-are-we-section-container-right-block-img-parent">
                    <div className="why-are-we-section-container-right-block-img">
                      <img src={bitcoinRefresh} alt="" />
                    </div>
                  </div>
                  <p>Faucet</p>
                </div>
                <div className="why-are-we-section-container-right-block">
                  <div className="why-are-we-section-container-right-block-img-parent">
                    <div className="why-are-we-section-container-right-block-img">
                      <img src={bitcoinRefresh} alt="" />
                    </div>
                  </div>
                  <p>Faucet</p>
                </div>
                <div className="why-are-we-section-container-right-block">
                  <div className="why-are-we-section-container-right-block-img-parent">
                    <div className="why-are-we-section-container-right-block-img">
                      <img src={bitcoinRefresh} alt="" />
                    </div>
                  </div>
                  <p>Faucet</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="map-section__main">
          <div className="container">
            <div className="map-section-title__main">
              <h2>
                <span>We Are</span> Just <br />
                Loved By <span>Tons Of You</span>
              </h2>
              <p>Here Are This Stats Which Prove It</p>
            </div>
            <div className="map-section-blocks__main">
              <div className="map-section-block__main">
                <div className="map-section-block-img__main">
                  <img src={bitcoinRefresh} alt="" />
                </div>
                <div className="map-section-block-text__main">
                  <h3>4192</h3>
                  <p>Active uesers</p>
                </div>
              </div>
              <div className="map-section-block__main">
                <div className="map-section-block-img__main">
                  <img src={bitcoinRefresh} alt="" />
                </div>
                <div className="map-section-block-text__main">
                  <h3>4192</h3>
                  <p>Active uesers</p>
                </div>
              </div>
              <div className="map-section-block__main">
                <div className="map-section-block-img__main">
                  <img src={bitcoinRefresh} alt="" />
                </div>
                <div className="map-section-block-text__main">
                  <h3>4192</h3>
                  <p>Active uesers</p>
                </div>
              </div>
              <div className="map-section-block__main">
                <div className="map-section-block-img__main">
                  <img src={bitcoinRefresh} alt="" />
                </div>
                <div className="map-section-block-text__main">
                  <h3>4192</h3>
                  <p>Active uesers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="slider-section__main">
          <div className="container">
            <div className="keywords-container">
              <table id="keywords" cellSpacing="0" cellPadding="0">
                <thead>
                  <tr>
                    <th>
                      <span>Валюта</span>
                    </th>
                    <th>
                      <span>Стоимость</span>
                    </th>
                    <th>
                      <span>Капитализация</span>
                    </th>
                    <th>
                      <span>Объём (24ч.)</span>
                    </th>
                    <th>
                      <span>Изменение (24 ч.)</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="lalign">Bitcoin</td>
                    <td>26796.3$</td>
                    <td>519 313 091 662$</td>
                    <td>310 703 000$</td>
                    <td className="table-td-minus">-1.1803%</td>
                  </tr>
                  <tr>
                    <td className="lalign">Ethereum</td>
                    <td>1807.58$</td>
                    <td>217 177 253 436$</td>
                    <td>106 927 000$</td>
                    <td className="table-td-minus">-0.6835%</td>
                  </tr>
                  <tr>
                    <td className="lalign">Tether</td>
                    <td>1$</td>
                    <td>85 356 868 965$</td>
                    <td>60 484 300$</td>
                    <td>+0%</td>
                  </tr>
                  <tr>
                    <td className="lalign">Tronix</td>
                    <td>0.07507$</td>
                    <td>6 782 388 730$</td>
                    <td>55 800 600$</td>
                    <td className="table-td-plus">+3.445%</td>
                  </tr>
                  <tr>
                    <td className="lalign">Litecoin</td>
                    <td>92.67$</td>
                    <td>6 762 333 378$</td>
                    <td>14 461 000$</td>
                    <td className="table-td-plus">+0.2488%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <div className="container">
            <div className="faq-section-container">
              <div className="faq-section-container-left">
                <h3>FAQ</h3>
                <p>
                  Найдите ответы, на <br />
                  интересующие вопросы
                </p>
              </div>
              <div className="faq-section-container-right">
                {accordionArray?.map((item) => {
                  const { id, title, text } = item;
                  return <AccordionItem key={id} title={title} text={text} />;
                })}
              </div>
            </div>
          </div>
        </section>
      </Layout>

      <div
        id="modal__project"
        className={`modal modal1 ${isModalSingInOpen && "modal-active"}`}
        onClick={(e) => modalClick(e)}
      >
        <div className="modal-content">
          <span className="close close1" onClick={hideModal}></span>
          <form action="#!" method="post" className="form-login">
            <h2>Авторизация</h2>
            <div className="label-content-form">
              <label className={`${emailError && "label-error"}`}>
                Email
                <input
                  type="email"
                  name="email-login"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  autocomplete="one-time-code"
                  className={`${emailError && "inp-error"}`}
                />
              </label>
              <label className={`${passwordError && "label-error"}`}>
                Password
                <input
                  type="password"
                  name="password-login"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autocomplete="one-time-code"
                  className={`${passwordError && "inp-error"}`}
                />
                <a href="#!" onClick={(e) => showResetModal(e)}>
                  {" "}
                  Восстановить пароль{" "}
                </a>
                {cantFindUser && (
                  <p className="label-error">
                    Аккаунта с данным Email не существует
                  </p>
                )}
                {crIncorrect && (
                  <p className="label-error">Email либо пароль неверны</p>
                )}
              </label>
            </div>
            <div className="btn-content-form-login">
              <button type="submit" onClick={(e) => loginFunc(e)}>
                Войти
              </button>
              <a href="#!" onClick={(e) => showSignupModal(e)}>
                Зарегистрироваться
              </a>
            </div>
          </form>
        </div>
      </div>
      <div
        id="modal__project2"
        className={`modal modal2 ${isModalSingUpOpen && "modal-active"}`}
        onClick={modalClick}
      >
        <div className="modal-content">
          <span className="close close2" onClick={hideModal}></span>
          <form action="#!" method="post" className="form-login">
            <h2>Регистрация</h2>
            <div className="label-content-form">
              <label className={`${nameError && "label-error"}`}>
                Имя
                <input
                  type="text"
                  name="name-reg"
                  required
                  value={name}
                  onChange={(e) => onChangeName(e)}
                  className={`${nameError && "inp-error"}`}
                  autocomplete="one-time-code"
                />
              </label>
              <label className={`${loginError && "label-error"}`}>
                Логин
                <input
                  type="text"
                  name="login-reg"
                  required
                  value={userLogin}
                  onChange={(e) => setUserLogin(e.target.value)}
                  className={`${loginError && "inp-error"}`}
                  autocomplete="one-time-code"
                />
                {loginTakenError && (
                  <span className="label-error">
                    Аккаунт с таким логином уже существует
                  </span>
                )}
              </label>
              <label className={`${emailError && "label-error"}`}>
                Email
                <input
                  type="email"
                  name="email-reg"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${emailError && "inp-error"}`}
                  autocomplete="one-time-code"
                />
                {emailTakenError && (
                  <span className="label-error">
                    Аккаунт с таким email уже существует
                  </span>
                )}
              </label>
              <label className={`${passwordError && "label-error"}`}>
                Пароль
                <input
                  type="password"
                  name="password-reg"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${passwordError && "inp-error"}`}
                  autocomplete="one-time-code"
                />
                <p
                  className={`instruction-password-label ${
                    passwordError && "label-error"
                  }`}
                >
                  Пароль должен содержать не менее 8 символов, латиницу, цифры,
                  один из символов (!$#%)
                </p>
              </label>
              <label className={`${pwdNotMatch && "label-error"}`}>
                Подтверждение пароля
                <input
                  type="password"
                  name="password-reg"
                  required
                  value={passwordSecond}
                  onChange={(e) => setPasswordSecond(e.target.value)}
                  className={`${pwdNotMatch && "inp-error"}`}
                  autocomplete="one-time-code"
                />
                {pwdNotMatch && (
                  <span className="label-error">Пароли не совпадают</span>
                )}
                <div className="checkbox">
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      name="cb_all"
                      value="indigo"
                      data-check
                      id="parent2"
                      className="parent"
                      onClick={onChangeTick}
                    />
                    <span className={`${tickError && "label-error"}`}>
                      Согласен с Privacy policy
                    </span>
                  </label>
                </div>
                {tickError && (
                  <span className="label-error">
                    Подтвердите согласие с Privacy policy
                  </span>
                )}
              </label>
            </div>

            <div className="btn-content-form-login">
              <button type="submit" onClick={(e) => singupFunc(e)}>
                Зарегистрироваться
              </button>

              <a href="#!" onClick={(e) => showSigninModal(e)}>
                Уже есть аккаунт
              </a>
            </div>
          </form>
        </div>
      </div>
      <div
        id="modal__project3"
        className={`modal modal3 ${isModalResetOpen && "modal-active"}`}
        onClick={modalClick}
      >
        <div className="modal-content">
          <span className="close close3" onClick={hideModal}></span>
          <form action="#!" method="post" className="form-login">
            <h2>Восстановление пароля</h2>
            <p className="password-again-text">
              Введите email, который вы использовали при регистрации
            </p>
            <div className="label-content-form">
              <label className={`${emailError && "label-error"}`}>
                Email
                <input
                  type="email"
                  name="email-password"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autocomplete="one-time-code"
                  className={`${emailError && "inp-error"}`}
                />
                {cantFindUser && (
                  <p className="label-error">
                    Аккаунта с данным Email не существует
                  </p>
                )}
              </label>
            </div>
            <div className="btn-content-form-login">
              <button type="submit" onClick={(e) => resetPasswordFunc(e)}>
                Восстановить
              </button>
              <a href="#!" onClick={(e) => showSigninModal(e)}>
                Войти
              </a>
            </div>
          </form>
        </div>
      </div>
      <div
        id="modal__project4"
        className={`modal modal4 ${isModalSentMailOpen && "modal-active"}`}
        onClick={modalClick}
      >
        <div className="modal-content">
          <span className="close close4" onClick={hideModal}></span>
          <form action="#!" method="post" className="form-login">
            <p className="password-again-text">
              Вам отправлено письмо с временным паролем. Используйте его для
              авторизаци
            </p>
            <h2>
              Если вы не получили письмо, пожалуйста, проверьте папку «Спам».
            </h2>
            <div className="btn-content-form-login">
              <button type="submit" onClick={(e) => showSigninModal(e)}>
                Войти
              </button>
            </div>
          </form>
        </div>
      </div>
      <div id="modal__project5" className="modal modal5">
        <div className="modal-content">
          <span className="close close5"></span>
          <ul className="ul-panel-modal-lk">
            <li>
              <img src="img-all/img-icons-lk/user.svg" alt="" />
              <a href="#!">Аккаунт</a>
            </li>
            <li>
              <img src="img-all/img-icons-lk/people.svg" alt="" />
              <a href="#!">Рефералы</a>
            </li>
            <li>
              <img src="img-all/img-icons-lk/hand-coin-line.svg" alt="" />
              <a href="#!">Офферы</a>
            </li>
            <li>
              <img
                src="img-all/img-icons-lk/git-repository-commits-line.svg"
                alt=""
              />
              <a href="#!">Ссылки</a>
            </li>
            <li>
              <img src="img-all/img-icons-lk/coupon-line.svg" alt="" />
              <a href="#!">Лотерея</a>
            </li>
            <li>
              <img src="img-all/img-icons-lk/todo-line.svg" alt="" />
              <a href="#!">Задания</a>
            </li>
            <li>
              <img src="img-all/img-icons-lk/24-hours-line.svg" alt="" />
              <a href="#!">Бонус</a>
            </li>
            <li>
              <img src="img-all/img-icons-lk/gift-line.svg" alt="" />
              <a href="#!">Rocket</a>
            </li>
            <li>
              <img src="img-all/img-icons-lk/percent-line.svg" alt="" />
              <a href="#!">Депозит</a>
            </li>
            <li>
              <img src="img-all/img-icons-lk/card-send.svg" alt="" />
              <a href="#!">Вывод</a>
            </li>
            <li>
              <img src="img-all/img-icons-lk/line-chart-line.svg" alt="" />
              <a href="#!">Лидеры</a>
            </li>
            <li>
              <img src="img-all/img-icons-lk/award-line.svg" alt="" />
              <a href="#!">Челендж</a>
            </li>
            <li>
              <img src="img-all/img-icons-lk/Vector.svg" alt="" />
              <a href="#!">PTC</a>
            </li>
            <li>
              <img src="img-all/img-icons-lk/pie-chart-line.svg" alt="" />
              <a href="#!">Реклама</a>
            </li>
            <li>
              <img src="img-all/img-icons-lk/trophy-line.svg" alt="" />
              <a href="#!">Уровни</a>
            </li>
            <li>
              <img src="img-all/img-icons-lk/card-pos.svg" alt="" />
              <a href="#!">Support</a>
            </li>
            <li>
              <img src="img-all/img-icons-lk/archive-line.svg" alt="" />
              <a href="#!">Файлы</a>
            </li>
            <li>
              <img src="img-all/img-icons-lk/vip-crown-line.svg" alt="" />
              <a href="#!">Награды</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
