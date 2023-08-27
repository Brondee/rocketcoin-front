import React, { useEffect, useState, useCallback } from "react";

import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";
import SideBarAdmin from "../shared/SideBarAdmin";
import {
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
} from "../../store/user/userApiSlice";

import handCoinLine from "../../assets/img-all-lk/hand-coin-line.svg";
import fundsLine from "../../assets/img-all-lk/funds-line.svg";
import wallet3Line from "../../assets/img-all-lk/wallet-3-line.svg";
import triphyLine from "../../assets/img-all-lk/trophy-line.svg";
import peopleIcon from "../../assets/img-all-lk/people.svg";
import safe2Line from "../../assets/img-all-lk/safe-2-line.svg";
import calendar2Line from "../../assets/img-all-lk/calendar-2-line.svg";
import tickIcon from "../../assets/img-all-lk/tick.svg";
import { useSelector } from "react-redux";

const Profile = () => {
  const [updateUserInfo] = useUpdateUserInfoMutation();

  const [email, setEmail] = useState("");
  const [emailTakenError, setEmailTakenError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSecondTabActive, setIsSecondTabActive] = useState(true);
  const [isThirdTabActive, setIsThirdTabActive] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordSecond, setPasswordSecond] = useState("");
  const [pwdNotMatch, setPwdNotMatch] = useState(false);
  const [pwdChanged, setPwdChanged] = useState(false);

  const getInfo = useCallback(useGetUserInfoQuery, [email]);
  const { data } = getInfo();
  const { curLang } = useSelector((state) => state.general);

  const changePasswordFunc = async (e) => {
    setPasswordError(false);
    setPwdNotMatch(false);
    setPwdChanged(false);

    if (email.length === 0) {
      setEmailError(true);
    }

    if (email.length > 0 && password.length === 0) {
      const response = await updateUserInfo({
        email,
      });
      if (response.error || !response.data) {
        const errMessage = response.error.data.message;
        if (errMessage === "Credentials taken in email") {
          setEmailError(true);
          setEmailTakenError(true);
        }
        console.log(response.error);
      } else {
        window.location.reload();
        console.log(response);
      }
    } else {
      if (password.length < 10 || /^[A-Z]/.test(password)) {
        setPasswordError(true);
        console.log("password error");
      } else if (password !== passwordSecond) {
        setPwdNotMatch(true);
        console.log("pwd match error");
        console.log(password, passwordSecond);
      } else {
        const response = await updateUserInfo({
          password,
        });
        if (response.error || !response.data) {
          console.log(response.error);
        } else {
          setPassword("");
          setPasswordSecond("");
          setPwdChanged(true);
          window.location.reload();
        }
      }
    }
  };

  const setTabActive = (num) => {
    if (num === 2) {
      setIsThirdTabActive(false);
      setIsSecondTabActive(true);
    } else {
      setIsThirdTabActive(true);
      setIsSecondTabActive(false);
    }
  };

  useEffect(() => {
    setEmail(data?.email);
    if (data?.login === "rocketcoin_admin") {
      setIsAdmin(true);
    }
    console.log(data);
  }, [data]);

  return (
    <main>
      <Layout title="Rocketcoin - Аккаунт">
        <section className="content-lk">
          {isAdmin ? <SideBarAdmin /> : <SideBar />}
          <div className="right-content-lk">
            <h1 className="title-page-lk">
              {curLang === "en" ? "Account" : "Аккаунт"}
            </h1>
            <div className="wrapper-page-lk">
              <ul className="tab-header">
                <li
                  className={`tab-header__item tab-header__item1 js-tab-trigger ${
                    isSecondTabActive && "active-tab"
                  }`}
                  data-tab="2"
                  onClick={() => setTabActive(2)}
                >
                  {curLang === "en"
                    ? "Account information"
                    : "Информация аккаунта"}
                </li>
                <li
                  className={`tab-header__item tab-header__item3 js-tab-trigger ${
                    isThirdTabActive && "active-tab"
                  }`}
                  data-tab="3"
                  onClick={() => setTabActive(3)}
                >
                  {curLang === "en" ? "Security" : "Безопасность"}
                </li>
              </ul>
              <ul className="tab-content">
                <li
                  className={`tab-content__item js-tab-content ${
                    isSecondTabActive && "active-tab"
                  }`}
                  data-tab="2"
                >
                  <div className="content-second-tab-account">
                    <h2 className="title-second-tab-account">
                      {curLang === "en"
                        ? "General information"
                        : "Общая информация"}
                    </h2>
                    <div className="flex-content-second-tab-account">
                      <div className="block-content-second-tab-account">
                        <img src={wallet3Line} alt="" />
                        <div className="text-block-content-second-tab-account">
                          <h4>
                            {curLang === "en"
                              ? "On your account:"
                              : "На вашем аккаунте:"}
                          </h4>
                          <p>
                            {data?.curTokens}{" "}
                            {curLang === "en" ? "tokens" : "токенов"}
                          </p>
                        </div>
                      </div>
                      <div className="block-content-second-tab-account">
                        <img src={triphyLine} alt="" />
                        <div className="text-block-content-second-tab-account">
                          <h4>
                            {curLang === "en" ? "Level" : "Уровень аккаунта"}
                          </h4>
                          <p>{data?.level} LVL</p>
                        </div>
                      </div>
                      <div className="block-content-second-tab-account">
                        <img src={handCoinLine} alt="" />
                        <div className="text-block-content-second-tab-account">
                          <h4>
                            {curLang === "en"
                              ? "Invested funds:"
                              : "Вложенно средств:"}
                          </h4>
                          <p>120 {curLang === "en" ? "tokens" : "токенов"}</p>
                        </div>
                      </div>
                      <div className="block-content-second-tab-account">
                        <img src={fundsLine} alt="" />
                        <div className="text-block-content-second-tab-account">
                          <h4>
                            {curLang === "en"
                              ? "Earning bonus:"
                              : "Бонус заработка:"}
                          </h4>
                          <p>{data?.earningBonus}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-second-tab-account">
                    <h2 className="title-second-tab-account">
                      {curLang === "en" ? "Account" : "Профиль"}
                    </h2>
                    <div className="flex-content-second-tab-account">
                      <div className="block-content-second-tab-account">
                        <img src={peopleIcon} alt="" />
                        <div className="text-block-content-second-tab-account">
                          <h4>
                            {curLang === "en" ? "Referrals:" : "Рефералов:"}
                          </h4>
                          <p>{data?.referrals?.length}</p>
                        </div>
                      </div>
                      <div className="block-content-second-tab-account">
                        <img src={safe2Line} alt="" />
                        <div className="text-block-content-second-tab-account">
                          <h4>
                            {curLang === "en"
                              ? "Total earnings:"
                              : "Всего заработанно:"}
                          </h4>
                          <p>
                            {data?.tokensAll}{" "}
                            {curLang === "en" ? "tokens" : "токенов"}
                          </p>
                        </div>
                      </div>
                      <div className="block-content-second-tab-account">
                        <img src={calendar2Line} alt="" />
                        <div className="text-block-content-second-tab-account">
                          <h4>
                            {curLang === "en"
                              ? "Registration date"
                              : "Дата регистрации"}
                          </h4>
                          <p>
                            {new Date(data?.createdAt).toLocaleDateString(
                              "ru-Ru"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li
                  className={`tab-content__item js-tab-content ${
                    isThirdTabActive && "active-tab"
                  }`}
                  data-tab="3"
                >
                  <div className="flex-info-lk-private">
                    <label className={`${emailError && "label-error"}`}>
                      Email
                      <input
                        value={email}
                        type="email"
                        name="email-lk"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className={`${emailError && "inp-error"}`}
                        autocomplete="one-time-code"
                      />
                      {emailTakenError && (
                        <span className="label-error">
                          {curLang === "en"
                            ? "An account with this email already exists"
                            : "Аккаунт с таким email уже существует"}
                        </span>
                      )}
                    </label>
                  </div>
                  <div className="info-about-password-account">
                    <h2>
                      {curLang === "en" ? "Change password" : "Измените пароль"}
                    </h2>
                    <p>
                      {curLang === "en"
                        ? "Come up with a new password with the following requirements"
                        : "Придумайте новый пароль с такими требованиями"}
                    </p>
                    <ul>
                      <li>
                        <img src={tickIcon} alt="" />
                        <p>
                          {curLang === "en"
                            ? "At least 10 symbols"
                            : "длина — не менее 10 символов"}
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className="inputs-password-account">
                    <label className={`${passwordError && "label-error"}`}>
                      {curLang === "en" ? "New password" : "Новый пароль"}
                      <input
                        type="password"
                        name="email-lk"
                        required
                        autocomplete="one-time-code"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`${passwordError && "inp-error"}`}
                      />
                      {passwordError && (
                        <span className="label-error">
                          {curLang === "en"
                            ? "Password doesnt match requirements"
                            : "Пароль не соответствует требованиям"}
                        </span>
                      )}
                    </label>
                    <label className={`${pwdNotMatch && "label-error"}`}>
                      {curLang === "en"
                        ? "Repeat password"
                        : "Повторите пароль"}
                      <input
                        type="password"
                        name="email-lk"
                        required
                        autocomplete="one-time-code"
                        value={passwordSecond}
                        onChange={(e) => setPasswordSecond(e.target.value)}
                        className={`${pwdNotMatch && "inp-error"}`}
                      />
                      {pwdNotMatch && (
                        <span className="label-error">
                          {curLang === "en"
                            ? "Passwords dont match"
                            : "Пароли не совпадают"}
                        </span>
                      )}
                    </label>
                  </div>
                  <button
                    className="btn-lk-account"
                    onClick={(e) => changePasswordFunc(e)}
                  >
                    {curLang === "en" ? "Save" : "Сохранить"}
                  </button>
                  {pwdChanged && (
                    <span className="text-success">
                      {curLang === "en"
                        ? "Password changed successfully"
                        : "Пароль успешно изменён"}
                    </span>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </section>
      </Layout>
    </main>
  );
};

export default Profile;
