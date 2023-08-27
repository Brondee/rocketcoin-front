import React, { useState } from "react";
import {
  useUpdateUserInfoMutation,
  useAddUserTokensMutation,
} from "../../store/user/userApiSlice";
import { useSelector } from "react-redux";

const LevelItem = ({ levelNum, tokens, bonus, levelBonusTaken, userLevel }) => {
  const [isLevelBonusTaken, setIsLevelBonusTaken] = useState(false);
  const [isLevelBonusError, setIsLevelBonusError] = useState(false);

  const [updateUserInfo] = useUpdateUserInfoMutation();
  const [addUserTokens] = useAddUserTokensMutation();
  const { curLang } = useSelector((state) => state.general);

  const levelBonusTakeFunc = async () => {
    try {
      const secResp = await addUserTokens({ tokens, type: "level" });
      const updateData = {
        earningBonus: bonus,
        levelBonusTaken: levelNum,
      };
      const response = await updateUserInfo(updateData);
      if (response.data && secResp.data) {
        setIsLevelBonusTaken(true);
      } else {
        setIsLevelBonusError(true);
      }
      console.log(response, secResp);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    // <div class="level-container-list">
    //   <p>{levelNum} уровень</p>
    //   <p class="level-container-list-middle">{tokens} токенов</p>
    //   <p>+{bonus}%</p>
    //   <button class="btn-table-bonus will-bonus">Собрать</button>
    // </div>
    <tr>
      <td>{levelNum} </td>
      <td>
        {tokens} {curLang === "en" ? "tokens" : "токены"}
      </td>
      <td>{bonus} %</td>
      <td>
        {levelBonusTaken >= levelNum || isLevelBonusTaken ? (
          <button class="btn-table-bonus just-bonus">
            {curLang === "en" ? "Claimed" : "Собран"}
          </button>
        ) : userLevel >= levelNum ? (
          <button
            class={`btn-table-bonus already-bonus ${
              isLevelBonusError && "btn-error"
            }`}
            onClick={levelBonusTakeFunc}
          >
            {curLang === "en" ? "Claim" : "Собрать"}
          </button>
        ) : (
          <button class="btn-table-bonus will-bonus" disabled>
            {curLang === "en" ? "Claim" : "Собрать"}
          </button>
        )}
      </td>
    </tr>
  );
};

export default LevelItem;
