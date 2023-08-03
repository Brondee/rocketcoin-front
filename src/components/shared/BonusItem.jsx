import React, { useState } from "react";
import {
  useUpdateUserInfoMutation,
  useLevelUpUserMutation,
} from "../../store/user/userApiSlice";

const BonusItem = ({ number, tokens, exp, bonusTaken, bonusAvailable }) => {
  const [isBonusTaken, setIsBonusTaken] = useState(false);
  const [isBonusError, setIsBonusError] = useState(false);

  const [updateUserInfo] = useUpdateUserInfoMutation();
  const [levelUpUser] = useLevelUpUserMutation();

  const bonusTakeFunc = async () => {
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

  return (
    <tr>
      <td>{number} </td>
      <td>{tokens} токенов</td>
      <td>{exp} exp</td>
      <td>
        {bonusTaken || isBonusTaken ? (
          <button class="btn-table-bonus just-bonus">Собран</button>
        ) : bonusAvailable ? (
          <button
            class={`btn-table-bonus already-bonus ${
              isBonusError && "btn-error"
            }`}
            onClick={bonusTakeFunc}
          >
            Собрать
          </button>
        ) : (
          <button class="btn-table-bonus will-bonus" disabled>
            Собрать
          </button>
        )}
      </td>
    </tr>
  );
};

export default BonusItem;
