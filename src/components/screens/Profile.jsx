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

const Profile = () => {
  const [updateUserInfo] = useUpdateUserInfoMutation();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [emailTakenError, setEmailTakenError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [promocode, setPromocode] = useState("");
  const [isPromoInputDisabled, setIsPromoInputDisabled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFirstTabActive, setIsFirstTabActive] = useState(true);
  const [isSecondTabActive, setIsSecondTabActive] = useState(false);
  const [isThirdTabActive, setIsThirdTabActive] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordSecond, setPasswordSecond] = useState("");
  const [pwdNotMatch, setPwdNotMatch] = useState(false);
  const [pwdChanged, setPwdChanged] = useState(false);

  const getInfo = useCallback(useGetUserInfoQuery, [
    name,
    surname,
    email,
    promocode,
  ]);
  const { data } = getInfo();

  const changePasswordFunc = async (e) => {
    setPasswordError(false);
    setPwdNotMatch(false);
    setPwdChanged(false);

    if (
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
      }
    }
  };

  const updateUserInfoFunc = async () => {
    if (name.length === 0) {
      setNameError(true);
    } else if (email.length === 0) {
      setEmailError(true);
    } else {
      console.log(name);
      const response = await updateUserInfo({
        name,
        email,
        surname,
        promocode,
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
      }
      console.log(response);
    }
  };

  const setTabActive = (num) => {
    if (num === 1) {
      setIsThirdTabActive(false);
      setIsSecondTabActive(false);
      setIsFirstTabActive(true);
    } else if (num === 2) {
      setIsThirdTabActive(false);
      setIsSecondTabActive(true);
      setIsFirstTabActive(false);
    } else {
      setIsThirdTabActive(true);
      setIsSecondTabActive(false);
      setIsFirstTabActive(false);
    }
  };

  useEffect(() => {
    setName(data?.name);
    setSurname(data?.surname);
    setEmail(data?.email);
    setPromocode(data?.promocode);
    if (data?.promocode) {
      setIsPromoInputDisabled(true);
    }
    if (data?.login === "rocketcoin_admin") {
      setIsAdmin(true);
    }
    console.log(data);
  }, [data]);

  return (
    <main>
      <Layout title="Rocketcoin - Аккаунт">
        <section className="content-lk">
          <a href="#!" className="btn-open-modal-panel-lk">
            Меню кабинета
          </a>
          {isAdmin ? <SideBarAdmin /> : <SideBar />}
          <div className="right-content-lk">
            <h1 className="title-page-lk">Аккаунт</h1>
            <div className="wrapper-page-lk">
              <ul className="tab-header">
                <li
                  className={`tab-header__item tab-header__item1 js-tab-trigger ${
                    isFirstTabActive && "active-tab"
                  }`}
                  data-tab="1"
                  onClick={() => setTabActive(1)}
                >
                  Общие настройки
                </li>
                <li
                  className={`tab-header__item tab-header__item2 js-tab-trigger ${
                    isSecondTabActive && "active-tab"
                  }`}
                  data-tab="2"
                  onClick={() => setTabActive(2)}
                >
                  Информация аккаунта
                </li>
                <li
                  className={`tab-header__item tab-header__item3 js-tab-trigger ${
                    isThirdTabActive && "active-tab"
                  }`}
                  data-tab="3"
                  onClick={() => setTabActive(3)}
                >
                  Безопасность
                </li>
              </ul>
              <ul className="tab-content">
                <li
                  className={`tab-content__item js-tab-content ${
                    isFirstTabActive && "active-tab"
                  }`}
                  data-tab="1"
                >
                  <div className="flex-info-lk-private">
                    <label>
                      Имя
                      <input
                        value={name}
                        type="text"
                        name="email-lk"
                        required
                        className={`${nameError && "inp-error"}`}
                        onChange={(e) => setName(e.target.value)}
                        autocomplete="one-time-code"
                      />
                    </label>
                    <label>
                      Фамилия
                      <input
                        value={surname}
                        type="text"
                        name="email-lk"
                        required
                        onChange={(e) => setSurname(e.target.value)}
                        autocomplete="one-time-code"
                      />
                    </label>
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
                          Аккаунт с таким email уже существует
                        </span>
                      )}
                    </label>
                  </div>
                  <label
                    className={`promo-input ${
                      isPromoInputDisabled && "inp-disabled"
                    }`}
                  >
                    {isPromoInputDisabled ? "Промокод применен" : "Промокод"}
                    <input
                      value={promocode}
                      type="text"
                      name="prono-lk"
                      required
                      onChange={(e) => setPromocode(e.target.value)}
                      autocomplete="one-time-code"
                    />
                  </label>
                  <button
                    className="btn-lk-account"
                    onClick={updateUserInfoFunc}
                  >
                    Сохранить
                  </button>
                </li>
                <li
                  className={`tab-content__item js-tab-content ${
                    isSecondTabActive && "active-tab"
                  }`}
                  data-tab="2"
                >
                  <div className="content-second-tab-account">
                    <h2 className="title-second-tab-account">
                      Общая информация
                    </h2>
                    <div className="flex-content-second-tab-account">
                      <div className="block-content-second-tab-account">
                        <img src={wallet3Line} alt="" />
                        <div className="text-block-content-second-tab-account">
                          <h4>На вашем аккаунте:</h4>
                          <p>{data?.curTokens} токенов</p>
                        </div>
                      </div>
                      <div className="block-content-second-tab-account">
                        <img src={triphyLine} alt="" />
                        <div className="text-block-content-second-tab-account">
                          <h4>Уровень аккаунта</h4>
                          <p>{data?.level} LVL</p>
                        </div>
                      </div>
                      <div className="block-content-second-tab-account">
                        <img src={handCoinLine} alt="" />
                        <div className="text-block-content-second-tab-account">
                          <h4>Вложенно средств:</h4>
                          <p>120 токенов</p>
                        </div>
                      </div>
                      <div className="block-content-second-tab-account">
                        <img src={fundsLine} alt="" />
                        <div className="text-block-content-second-tab-account">
                          <h4>Бонус заработка:</h4>
                          <p>{data?.earningBonus}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-second-tab-account">
                    <h2 className="title-second-tab-account">Профиль</h2>
                    <div className="flex-content-second-tab-account">
                      <div className="block-content-second-tab-account">
                        <img src={peopleIcon} alt="" />
                        <div className="text-block-content-second-tab-account">
                          <h4>Рефералов:</h4>
                          <p>{data?.referrals?.length}</p>
                        </div>
                      </div>
                      <div className="block-content-second-tab-account">
                        <img src={safe2Line} alt="" />
                        <div className="text-block-content-second-tab-account">
                          <h4>Всего заработанно:</h4>
                          <p>{data?.tokensAll} токенов</p>
                        </div>
                      </div>
                      <div className="block-content-second-tab-account">
                        <img src={calendar2Line} alt="" />
                        <div className="text-block-content-second-tab-account">
                          <h4>Дата регистрации</h4>
                          <p>
                            {new Date(data?.createdAt).toLocaleDateString(
                              "ru-Ru"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="btn-lk-account">Сохранить</button>
                </li>
                <li
                  className={`tab-content__item js-tab-content ${
                    isThirdTabActive && "active-tab"
                  }`}
                  data-tab="3"
                >
                  <div className="info-about-password-account">
                    <h2>Измените пароль</h2>
                    <p>Придумайте новый пароль с такими требованиями</p>
                    <ul>
                      <li>
                        <img src={tickIcon} alt="" />
                        <p>длина — не менее 8 символов;</p>
                      </li>
                      <li>
                        <img src={tickIcon} alt="" />
                        <p>заглавные буквы;</p>
                      </li>
                      <li>
                        <img src={tickIcon} alt="" />
                        <p>строчные буквы;</p>
                      </li>
                      <li>
                        <img src={tickIcon} alt="" />
                        <p>цифры или специальные символы: %, #, $ и другие.</p>
                      </li>
                    </ul>
                  </div>
                  <div className="inputs-password-account">
                    <label className={`${passwordError && "label-error"}`}>
                      Новый пароль
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
                          Пароль не соответствует требованиям
                        </span>
                      )}
                    </label>
                    <label className={`${pwdNotMatch && "label-error"}`}>
                      Повторите пароль
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
                        <span className="label-error">Пароли не совпадают</span>
                      )}
                    </label>
                  </div>
                  <button
                    className="btn-lk-account"
                    onClick={(e) => changePasswordFunc(e)}
                  >
                    Сохранить
                  </button>
                  {pwdChanged && (
                    <span className="text-success">Пароль успешно изменён</span>
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
