import React from "react";
import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";
import generateChallengeArray from "../../utils/generateChallengeArray";
import { useGetUserInfoQuery } from "../../store/user/userApiSlice";
import ChallengeItem from "../shared/ChallengeItem";

const Challenge = () => {
  const { data } = useGetUserInfoQuery();

  const challengeArray = generateChallengeArray(data);

  return (
    <main>
      <Layout title="Rocketcoin - Челленджи">
        <section className="content-lk">
          <a href="#!" className="btn-open-modal-panel-lk">
            Меню кабинета
          </a>
          <SideBar />
          <div class="right-content-lk">
            <h1 class="title-page-lk">Челендж</h1>
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
