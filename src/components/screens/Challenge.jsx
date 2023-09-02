import React from "react";
import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";
import generateChallengeArray from "../../utils/generateChallengeArray";
import { useGetUserInfoQuery } from "../../store/user/userApiSlice";
import ChallengeItem from "../shared/ChallengeItem";
import { useSelector } from "react-redux";

const Challenge = () => {
  const { data } = useGetUserInfoQuery();
  const { curLang } = useSelector((state) => state.general);

  const challengeArray = generateChallengeArray(data, curLang);

  return (
    <main>
      <Layout
        title={`Rocketcoin - ${curLang === "en" ? "Challenge" : "Челлендж"}`}
      >
        <section className="content-lk">
          <SideBar />
          <div class="right-content-lk">
            <h1 class="title-page-lk">
              {curLang === "en" ? "Challenge" : "Челлендж"}
            </h1>
            <div class="wrapper-page-lk">
              <div class="challenge-lk-content leaderboard-container">
                {challengeArray.map((item) => {
                  const {
                    id,
                    title,
                    completed,
                    toComplete,
                    tokens,
                    exp,
                    isDisabled,
                  } = item;
                  return (
                    <ChallengeItem
                      key={id}
                      id={id}
                      title={title}
                      completed={completed}
                      toComplete={toComplete}
                      tokens={tokens}
                      exp={exp}
                      isDisabled={isDisabled}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </main>
  );
};

export default Challenge;
