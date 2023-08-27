import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import { ReactComponent as Flag1 } from "../../assets/img/flag1.svg";
import { ReactComponent as Flag2 } from "../../assets/img/flag2.svg";
import { ReactComponent as ArrowLang } from "../../assets/img/arrow-language.svg";
import "../../assets/styles/style.css";
import "../../assets/styles/style-lk.css";
import "../../assets/styles/adaptive.css";
import { setCurLang, setModalOpen } from "../../store/generalSlice";

const Header = () => {
  const [isLangShown, setIsLangShown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { curLang } = useSelector((state) => state.general);
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    setIsLoggedIn(false);
    if (
      token !== null ||
      (sessionStorage.getItem("accessToken") !== null &&
        sessionStorage.getItem("accessToken") !== "null")
    ) {
      setIsLoggedIn(true);
    } else {
      navigate("/");
    }
  }, [token, navigate]);

  const showLangModal = () => {
    setIsLangShown(!isLangShown);
  };

  const showSingInModal = () => {
    if (!isLoggedIn) {
      dispatch(setModalOpen({ type: "signin", status: true }));
    } else {
      navigate("/profile");
    }
  };

  const changeLang = (lang) => {
    dispatch(setCurLang(lang));
  };

  return (
    <header>
      <div className="container">
        <div className="header-container">
          <div className="header-container-left">
            <Link to="/" className="header-container-left-logo">
              <Logo />
            </Link>
            <ul>
              <li className="link-header-li">
                <Link to="/about" className="link-header-a">
                  {curLang === "en" ? "About" : "О нас"}
                </Link>
              </li>
              <li className="link-header-li">
                <Link to="/how_works" className="link-header-a">
                  {curLang === "en" ? "How it works" : "Как это работает"}
                </Link>
              </li>
              <li className="link-header-li">
                <Link to="/where_works" className="link-header-a">
                  {curLang === "en" ? "Where we work" : "Где работаем"}
                </Link>
              </li>
              <li className="link-header-li">
                <Link to="/faq" className="link-header-a">
                  FAQ
                </Link>
              </li>
              <li className="link-header-li">
                <Link to="/blog" className="link-header-a">
                  {curLang === "en" ? "Blog" : "Блог"}
                </Link>
              </li>
              <li className="link-header-li">
                <Link to="/contacts" className="link-header-a">
                  {curLang === "en" ? "Contacts" : "Контакты"}
                </Link>
              </li>
            </ul>
          </div>
          <div className="header-container-right">
            <div className="dropdown dropdown2">
              <button onClick={showLangModal} className="dropbtn">
                <div
                  className="dropdown-content-language"
                  style={{ pointerEvents: "none" }}
                >
                  {curLang === "en" ? (
                    <>
                      <Flag2 />
                      <p className="dropdown-content-language-p">English</p>
                    </>
                  ) : (
                    <>
                      <Flag1 />
                      <p className="dropdown-content-language-p">Русский</p>
                    </>
                  )}
                </div>
                <div className="arrow-lang-handler">
                  <ArrowLang className="arrow-language dropdown-content-language-img" />
                </div>
              </button>
              <div
                id="myDropdown"
                className={`dropdown-content ${isLangShown ? "show" : ""}`}
              >
                <div
                  className={`dropdown-content-language ${
                    curLang === "ru" && "dropdown-content-language-active"
                  }`}
                  onClick={() => changeLang("ru")}
                >
                  <Flag1 />
                  <p>Русский</p>
                </div>
                <div
                  className={`dropdown-content-language ${
                    curLang === "en" && "dropdown-content-language-active"
                  }`}
                  onClick={() => changeLang("en")}
                >
                  <Flag2 />
                  <p>English</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-sign-in"
              onClick={showSingInModal}
            >
              {curLang === "en"
                ? !isLoggedIn
                  ? "Log in"
                  : "Account"
                : !isLoggedIn
                ? "Войти"
                : "Профиль"}
            </button>

            <div className="hamburger-menu">
              <input id="menu__toggle" type="checkbox" />
              <label className="menu__btn" for="menu__toggle">
                <span className="span-burger"></span>
              </label>
              <ul className="menu__box">
                <li className="link-header-li">
                  <Link to="/about" className="link-header-a">
                    {curLang === "en" ? "About" : "О нас"}
                  </Link>
                </li>
                <li className="link-header-li">
                  <Link to="/how_works" className="link-header-a">
                    {curLang === "en" ? "How it works" : "Как это работает"}
                  </Link>
                </li>
                <li className="link-header-li">
                  <Link to="/where_works" className="link-header-a">
                    {curLang === "en" ? "Where we work" : "Где работаем"}
                  </Link>
                </li>
                <li className="link-header-li">
                  <Link to="/faq" className="link-header-a">
                    FAQ
                  </Link>
                </li>
                <li className="link-header-li">
                  <Link to="/blog" className="link-header-a">
                    {curLang === "en" ? "Blog" : "Блог"}
                  </Link>
                </li>
                <li className="link-header-li">
                  <Link to="/contacts" className="link-header-a">
                    {curLang === "en" ? "Contacts" : "Контакты"}
                  </Link>
                </li>
                <div className="dropdown">
                  <button onClick={showLangModal} className="dropbtn">
                    <div
                      className="dropdown-content-language"
                      style={{ pointerEvents: "none" }}
                    >
                      {curLang === "en" ? (
                        <>
                          <Flag2 />
                          <p className="dropdown-content-language-p dropdown-content-language-p-2">
                            English
                          </p>
                        </>
                      ) : (
                        <>
                          <Flag1 />
                          <p className="dropdown-content-language-p dropdown-content-language-p-2">
                            Русский
                          </p>
                        </>
                      )}
                    </div>
                    <ArrowLang className="arrow-language dropdown-content-language-img" />
                  </button>
                  <div
                    id="myDropdown2"
                    className={`dropdown-content ${isLangShown ? "show" : ""}`}
                  >
                    <div
                      className={`dropdown-content-language ${
                        curLang === "ru" && "dropdown-content-language-active"
                      }`}
                      onClick={() => changeLang("ru")}
                    >
                      <Flag1 />
                      <p>Русский</p>
                    </div>
                    <div
                      className={`dropdown-content-language ${
                        curLang === "en" && "dropdown-content-language-active"
                      }`}
                      onClick={() => changeLang("en")}
                    >
                      <Flag2 />
                      <p>English</p>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
