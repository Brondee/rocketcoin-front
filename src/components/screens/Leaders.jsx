import React from "react";
import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";
import { useGetLeadersInfoQuery } from "../../store/leaders/leadersApiSlice";
import LeaderItem from "../shared/LeaderItem";
import { useSelector } from "react-redux";

const Leaders = () => {
  const { data } = useGetLeadersInfoQuery();

  const { curLang } = useSelector((state) => state.general);

  return (
    <main>
      <Layout title={`Rocketcoin - ${curLang === "en" ? "Leaders" : "Лидеры"}`}>
        <section className="content-lk">
          <SideBar />
          <div class="right-content-lk">
            <h1 class="title-page-lk">
              {curLang === "en" ? "Leaderboard" : "Лидеры"}
            </h1>
            <div class="wrapper-page-lk wrapper-page-lk-leaderboard">
              <div class="leaderboard-container">
                <div class="leaderboard-container-block">
                  <h2>PTC</h2>
                  <div class="leaderboard-container-block-table">
                    <div class="leaderboard-container-block-table-top">
                      <p>{curLang === "en" ? "Login" : "Логин"} </p>
                      <p>{curLang === "en" ? "Earned" : "Собрано"}</p>
                      <p>{curLang === "en" ? "Reward" : "Награда"}</p>
                    </div>
                    {data?.ptcLeaders?.map((leader, index) => {
                      const { id, name, ptcMonthCount } = leader;
                      return (
                        <LeaderItem
                          key={id}
                          name={name}
                          amount={ptcMonthCount}
                          currency={"ptc"}
                          place={index}
                          rewards={[3000, 2000, 1000]}
                        />
                      );
                    })}
                  </div>
                </div>
                <div class="leaderboard-container-block">
                  <h2>Shortlinsks</h2>
                  <div class="leaderboard-container-block-table">
                    <div class="leaderboard-container-block-table-top">
                      <p>{curLang === "en" ? "Login" : "Логин"}</p>
                      <p>{curLang === "en" ? "Earned" : "Собрано"}</p>
                      <p>{curLang === "en" ? "Reward" : "Награда"}</p>
                    </div>
                    {data?.linksLeaders?.map((leader, index) => {
                      const { id, name, linksMonthCount } = leader;
                      return (
                        <LeaderItem
                          key={id}
                          name={name}
                          amount={linksMonthCount}
                          currency={""}
                          place={index}
                          rewards={[4000, 3000, 2100]}
                        />
                      );
                    })}
                  </div>
                </div>
                <div class="leaderboard-container-block">
                  <h2>Faucet claims</h2>
                  <div class="leaderboard-container-block-table">
                    <div class="leaderboard-container-block-table-top">
                      <p>{curLang === "en" ? "Login" : "Логин"}</p>
                      <p>{curLang === "en" ? "Earned" : "Собрано"}</p>
                      <p>{curLang === "en" ? "Reward" : "Награда"}</p>
                    </div>
                    {data?.faucetLeaders?.map((leader, index) => {
                      const { id, name, faucetMonthCount } = leader;
                      return (
                        <LeaderItem
                          key={id}
                          name={name}
                          amount={faucetMonthCount}
                          currency={""}
                          place={index}
                          rewards={[1500, 1000, 500]}
                        />
                      );
                    })}
                  </div>
                </div>
                <div class="leaderboard-container-block">
                  <h2>Offerwall</h2>
                  <div class="leaderboard-container-block-table">
                    <div class="leaderboard-container-block-table-top">
                      <p>{curLang === "en" ? "Login" : "Логин"}</p>
                      <p>{curLang === "en" ? "Earned" : "Собрано"}</p>
                      <p>{curLang === "en" ? "Reward" : "Награда"}</p>
                    </div>
                    {data?.offerwallLeaders?.map((leader, index) => {
                      const { id, name, offerwallMonthCount } = leader;
                      return (
                        <LeaderItem
                          key={id}
                          name={name}
                          amount={offerwallMonthCount}
                          currency={curLang === "en" ? "tokens" : "токенов"}
                          place={index}
                          rewards={[4500, 3300, 1500]}
                        />
                      );
                    })}
                  </div>
                </div>
                <div class="leaderboard-container-block">
                  <h2>{curLang === "en" ? "Exp" : "Exp(опыт)"}</h2>
                  <div class="leaderboard-container-block-table">
                    <div class="leaderboard-container-block-table-top">
                      <p>{curLang === "en" ? "Login" : "Логин"}</p>
                      <p>{curLang === "en" ? "Earned" : "Собрано"}</p>
                      <p>{curLang === "en" ? "Reward" : "Награда"}</p>
                    </div>
                    {data?.expLeaders?.map((leader, index) => {
                      const { id, name, expMonthCount } = leader;
                      return (
                        <LeaderItem
                          key={id}
                          name={name}
                          amount={expMonthCount}
                          currency={"exp"}
                          place={index}
                          rewards={[2500, 1700, 1200]}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </main>
  );
};

export default Leaders;
