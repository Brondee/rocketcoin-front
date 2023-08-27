import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import { useDispatch, useSelector } from "react-redux";

import transferIcon from "../../assets/transfer.svg";
import { setModalOpen, setPtcRewards } from "../../store/generalSlice";

const PtcItem = ({
  id,
  title,
  link,
  tokens,
  exp,
  ptcType,
  secondsWait,
  ptcClaims,
  interval,
}) => {
  const [winInfo, setWinInfo] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const dispatch = useDispatch();
  const { curLang } = useSelector((state) => state.general);

  const linkClick = () => {
    if (!isDisabled) {
      const win = window.open(link);
      setWinInfo(win);
      setIsActive(true);
    }
  };

  const countDownFunc = ({ seconds, completed }) => {
    if (winInfo?.closed) {
      setIsActive(false);
      console.log("closed");
    }
    if (completed) {
      setIsActive(false);
      dispatch(setModalOpen({ type: "ptc", status: true }));
      dispatch(setPtcRewards({ tokens, exp, ptcId: id }));
      console.log("completed");
    } else {
      return <span className="count-down">{seconds}</span>;
    }
  };

  useEffect(() => {
    if (ptcClaims?.length > 0) {
      if (
        new Date().getTime() <=
        new Date(ptcClaims[0].lastTaken).getTime() +
          1 * interval * 60 * 60 * 1000
      ) {
        setIsDisabled(true);
      }
    }
  }, [ptcClaims, interval]);

  return (
    <div className="challenge-lk-content-block">
      <div className="challenge-lk-content-block-top">
        <p>{title}</p>
        <div className="challenge-lk-content-block-top-right">
          <img src={transferIcon} alt="" />
          <span>
            {interval} {curLang === "en" ? "h" : "ч"}
          </span>
        </div>
      </div>
      <div className="challenge-lk-content-block-buttons">
        {ptcType === "iframe" ? (
          <Link
            to={`/ptciframe/${id}/${secondsWait}`}
            className={`btn-gray-tokens__challenge ${
              !isDisabled && "btn-challenge-active"
            } ${isDisabled && "btn-disabled"}`}
          >
            {curLang === "en" ? "Visit" : "Перейти"}
          </Link>
        ) : (
          <>
            <button
              onClick={linkClick}
              className={`btn-gray-tokens__challenge ${
                !isDisabled && "btn-challenge-active"
              } ${isDisabled && "btn-disabled"}`}
            >
              {isActive ? (
                <Countdown
                  date={new Date().getTime() + 1000 * secondsWait}
                  renderer={countDownFunc}
                />
              ) : curLang === "en" ? (
                "Visit"
              ) : (
                "Перейти"
              )}
            </button>
          </>
        )}
        <div className="challenge-lk-content-block-buttons-right">
          <button className="btn-green-tokens__challenge">
            {tokens} {curLang === "en" ? "tokens" : "токенов"}
          </button>
          <button className="btn-purple-tokens__challenge">{exp} exp</button>
        </div>
      </div>
    </div>
  );
};

export default PtcItem;
