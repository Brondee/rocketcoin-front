import React from "react";

import { ReactComponent as Social1 } from "../../assets/img/social1.svg";
import { ReactComponent as Social1Active } from "../../assets/img/social-active1.svg";
import { ReactComponent as Social2 } from "../../assets/img/social2.svg";
import { ReactComponent as Social2Active } from "../../assets/img/social-active2.svg";
import { ReactComponent as Social3 } from "../../assets/img/social3.svg";
import { ReactComponent as Social3Active } from "../../assets/img/social-active3.svg";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="footer-container">
            <div className="footer-container-left">© RocketCoin 2023</div>
            <div className="footer-container-middle">
              <a href="#!">Terms of Use</a>
              <a href="#!">Privacy policy</a>
            </div>
            <div className="footer-container-right">
              <h4>Наши социальные сети</h4>
              <div className="social-media-main">
                <a href="#!" className="social-media-main-ellipse">
                  <Social1 className="social-usually" />
                  <Social1Active className="social-hover" />
                </a>
                <a href="#!" className="social-media-main-ellipse">
                  <Social2 className="social-usually" />
                  <Social2Active className="social-hover" />
                </a>
                <a href="#!" className="social-media-main-ellipse">
                  <Social3 className="social-usually" />
                  <Social3Active className="social-hover" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <script src="../../assets/scripts/script.js"></script>
      </footer>
    </>
  );
};

export default Footer;
