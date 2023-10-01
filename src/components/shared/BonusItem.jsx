import React, { useEffect, useState } from "react";
import {
  useUpdateUserInfoMutation,
  useLevelUpUserMutation,
} from "../../store/user/userApiSlice";
import { useSelector } from "react-redux";

const BonusItem = ({
  number,
  tokens,
  exp,
  bonusTaken,
  bonusAvailable,
  ptcDayCount,
  setIsModalActive,
  openCaptcha,
  captchaApproved,
  curBonusId,
  closeCaptcha,
}) => {
  const [isBonusTaken, setIsBonusTaken] = useState(false);
  const [isBonusError, setIsBonusError] = useState(false);

  const [updateUserInfo] = useUpdateUserInfoMutation();
  const [levelUpUser] = useLevelUpUserMutation();
  const { curLang } = useSelector((state) => state.general);

  const bonusTakeFunc = async () => {
    if (ptcDayCount >= 2) {
      openCaptcha(number);
    } else {
      setIsModalActive(true);
    }
  };

  useEffect(() => {
    if (captchaApproved && curBonusId === number) {
      const setReward = async () => {
        const curDateTime = new Date();
        try {
          const response = await updateUserInfo({
            bonusStreak: number,
            bonusLastTaken: curDateTime.toLocaleString("en-US"),
            tokens,
          });
          const levelResponse = await levelUpUser({ exp: Number(exp) });
          if (response?.data && levelResponse?.data) {
            setIsBonusTaken(true);
            setIsBonusError(false);
            closeCaptcha();
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            setIsBonusError(true);
            setTimeout(() => {
              setIsBonusError(false);
            }, 3000);
          }
        } catch (err) {
          setIsBonusError(true);
          setTimeout(() => {
            setIsBonusError(false);
          }, 3000);
          console.log(err);
        }
      };
      setReward();
    }
  }, [
    captchaApproved,
    exp,
    curBonusId,
    number,
    tokens,
    updateUserInfo,
    levelUpUser,
    closeCaptcha,
  ]);

  return (
    <>
      {number === 1 && (
        <div className="banner banner120 banner-bonus">
          <iframe
            title="banner"
            data-aa="2259495"
            src="//ad.a-ads.com/2259495?size=120x60"
          ></iframe>
        </div>
      )}
      {number === 3 && (
        <div className="banner banner120 banner-bonus">
          <iframe
            title="banner"
            data-aa="2259496"
            src="//ad.a-ads.com/2259495?size=120x60"
          ></iframe>
        </div>
      )}
      {number === 5 && (
        <div className="banner banner120 banner-bonus banner-bonus2">
          <iframe
            title="banner"
            data-aa="2259497"
            src="//ad.a-ads.com/2259495?size=120x60"
          ></iframe>
        </div>
      )}
      {number === 7 && (
        <div className="banner banner120 banner-bonus banner-bonus2">
          <iframe
            title="banner"
            data-aa="2259498"
            src="//ad.a-ads.com/2259495?size=120x60"
          ></iframe>
        </div>
      )}
      <tr className="bonus-item-cont">
        <td>{number} </td>

        <td>
          {tokens} {curLang === "en" ? "tokens" : "токенов"}
        </td>
        {number === 1 && (
          <div className="banner banner120 banner-bonus banner-bonus2 banner-bonus-mob">
            <iframe
              title="banner"
              data-aa="2259495"
              src="//ad.a-ads.com/2259495?size=120x60"
            ></iframe>
          </div>
        )}
        {number === 3 && (
          <div className="banner banner120 banner-bonus banner-bonus2 banner-bonus-mob">
            <iframe
              title="banner"
              data-aa="2259496"
              src="//ad.a-ads.com/2259495?size=120x60"
            ></iframe>
          </div>
        )}
        {number === 5 && (
          <div className="banner banner120 banner-bonus banner-bonus2 banner-bonus-mob">
            <iframe
              title="banner"
              data-aa="2259497"
              src="//ad.a-ads.com/2259495?size=120x60"
            ></iframe>
          </div>
        )}
        {number === 7 && (
          <div className="banner banner120 banner-bonus banner-bonus2 banner-bonus-mob">
            <iframe
              title="banner"
              data-aa="2259498"
              src="//ad.a-ads.com/2259495?size=120x60"
            ></iframe>
          </div>
        )}
        {number !== 3 && number !== 5 && number !== 1 && number !== 7 && (
          <div className="banner banner120 banner-bonus banner-bonus2 banner-bonus-mob"></div>
        )}
        <td>{exp} exp</td>
        <td>
          {bonusTaken || isBonusTaken ? (
            <button class="btn-table-bonus just-bonus">
              {curLang === "en" ? "Taken" : "Собран"}
            </button>
          ) : bonusAvailable ? (
            <button
              class={`btn-table-bonus already-bonus ${
                isBonusError && "btn-error"
              }`}
              onClick={bonusTakeFunc}
            >
              {curLang === "en" ? "Take" : "Собрать"}
            </button>
          ) : (
            <button class="btn-table-bonus will-bonus" disabled>
              {curLang === "en" ? "Take" : "Собрать"}
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

export default BonusItem;
