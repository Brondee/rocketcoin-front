import React from "react";
import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";
import generateChallengeArray from "../../utils/generateChallengeArray";
import { useGetUserInfoQuery } from "../../store/user/userApiSlice";
import ChallengeItem from "../shared/ChallengeItem";
import { useSelector } from "react-redux";
import RotationBanner from "../shared/RotationBanner";
import FixedBanner from "../shared/FixedBanner";
import Popunder from "../shared/Popunder";

const Challenge = () => {
  const { data } = useGetUserInfoQuery();
  const { curLang } = useSelector((state) => state.general);

  const { firstArray, secondArray, thirdArray } = generateChallengeArray(
    data,
    curLang
  );

  return (
    <main>
      <Layout
        title={`Rocketcoin - ${curLang === "en" ? "Challenge" : "Челлендж"}`}
      >
        <section className="content-lk">
          <SideBar />
          <div class="right-content-lk">
            <div className="page-title-ban-cont">
              <h1 class="title-page-lk">
                {curLang === "en" ? "Challenge" : "Челлендж"}
              </h1>
              <div className="banner banner468 banner-profile">
                <RotationBanner
                  width={468}
                  dataframe="2259519"
                  datasid="382396"
                  datakey="679f64fa36a4eb3544f2a556b9240afe"
                />
              </div>
              <div className="banner banner468 banner-profile">
                <RotationBanner
                  width={468}
                  dataframe="2259520"
                  datasid="382397"
                  datakey="679f64fa36a4eb3544f2a556b9240afe"
                />
              </div>
            </div>
            <div class="wrapper-page-lk">
              <div class="challenge-lk-content leaderboard-container">
                {firstArray.map((item) => {
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
                <div className="challange-banners-cont">
                  <div className="banner banner468 banner-profile">
                    <RotationBanner
                      width={468}
                      dataframe="2259499"
                      datasid="382267"
                      datakey="679f64fa36a4eb3544f2a556b9240afe"
                    />
                  </div>
                  <div className="banner banner468 banner-profile">
                    <RotationBanner
                      width={468}
                      dataframe="2259500"
                      datasid="382268"
                      datakey="679f64fa36a4eb3544f2a556b9240afe"
                    />
                  </div>
                </div>
                {secondArray.map((item) => {
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
                <div className="challange-banners-cont">
                  <div className="banner banner468 banner-profile">
                    <RotationBanner
                      width={468}
                      datasid="382271"
                      datakey="679f64fa36a4eb3544f2a556b9240afe"
                      dataframe="2259503"
                    />
                  </div>
                  <div className="banner banner468 banner-profile">
                    <RotationBanner
                      width={468}
                      datasid="382272"
                      datakey="679f64fa36a4eb3544f2a556b9240afe"
                      dataframe="2259504"
                    />
                  </div>
                </div>
                {thirdArray.map((item) => {
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
        <FixedBanner page="challenge" />
        <Popunder />
      </Layout>
    </main>
  );
};

export default Challenge;
