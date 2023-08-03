import React from "react";
import {
  useLevelUpUserMutation,
  useUpdateUserInfoMutation,
} from "../../store/user/userApiSlice";

const ChallengeItem = ({
  id,
  title,
  completed,
  toComplete,
  tokens,
  exp,
  isDisabled,
}) => {
  const [updateUserInfo] = useUpdateUserInfoMutation();
  const [levelUpUser] = useLevelUpUserMutation();

  const getChallengeReward = async () => {
    if (completed >= toComplete && !isDisabled) {
      try {
        let data = {};
        if (id <= 3) {
          if (toComplete === 5) {
            data = {
              tokens,
              linksChallengesClaimed: 1,
            };
          } else if (toComplete === 10) {
            data = {
              tokens,
              linksChallengesClaimed: 2,
            };
          } else if (toComplete === 20) {
            data = {
              tokens,
              linksChallengesClaimed: 3,
            };
          } else if (toComplete === 30) {
            data = {
              tokens,
              linksChallengesClaimed: 4,
            };
          }
        } else if (id > 3 && id < 8) {
          if (toComplete === 10) {
            data = {
              tokens,
              faucetChallengesClaimed: 1,
            };
          } else if (toComplete === 30) {
            data = {
              tokens,
              faucetChallengesClaimed: 2,
            };
          } else if (toComplete === 50) {
            data = {
              tokens,
              faucetChallengesClaimed: 3,
            };
          } else {
            data = {
              tokens,
              faucetChallengesClaimed: 4,
            };
          }
        } else if (id > 8 && id < 11) {
          if (toComplete === 10) {
            data = {
              tokens,
              ptcChallengesClaimed: 1,
            };
          } else if (toComplete === 25) {
            data = {
              tokens,
              ptcChallengesClaimed: 2,
            };
          } else {
            data = {
              tokens,
              ptcChallengesClaimed: 3,
            };
          }
        } else {
          if (toComplete === 500) {
            data = {
              tokens,
              offerwallChallengesClaimed: 1,
            };
          } else if (toComplete === 2000) {
            data = {
              tokens,
              offerwallChallengesClaimed: 2,
            };
          } else if (toComplete === 3000) {
            data = {
              tokens,
              offerwallChallengesClaimed: 3,
            };
          }
        }
        console.log(data);
        const response = await updateUserInfo(data);
        const levelResponse = await levelUpUser({ exp: Number(exp) });
        console.log({ response, levelResponse });
        if (response?.data && levelResponse?.data) {
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
      console.log("clicked");
    }
  };

  return (
    <div class="challenge-lk-content-block">
      <p>{title}</p>
      <div class="challenge-lk-content-block-buttons">
        <button
          class={`btn-gray-tokens__challenge ${
            completed >= toComplete && !isDisabled && "btn-challenge-active"
          }`}
          onClick={getChallengeReward}
        >
          {isDisabled ? "Собрано" : "Собрать"}
        </button>
        <div class="challenge-lk-content-block-buttons-right">
          <button class="btn-purple-tokens__challenge">
            {completed} / {toComplete}
          </button>
          <button class="btn-green-tokens__challenge">{tokens} токенов</button>
          <button class="btn-purple-tokens__challenge">{exp} exp</button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeItem;
