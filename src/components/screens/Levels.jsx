import React from "react";
import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";
import LevelItem from "../shared/LevelItem";
import generateLevelsArray from "../../utils/generateLevelsArray";
import { useGetUserInfoQuery } from "../../store/user/userApiSlice";
import { useSelector } from "react-redux";
import AdblockModal from "../shared/AdblockModal";

const Levels = () => {
  const { data } = useGetUserInfoQuery();
  const levelsArray = generateLevelsArray(15, 1200, 0.001);

  const { curLang } = useSelector((state) => state.general);

  return (
    <main>
      <Layout title={`Rocketcoin - ${curLang === "en" ? "Levels" : "Уровни"}`}>
        <section className="content-lk">
          <SideBar />
          <div class="right-content-lk">
            <h1 class="title-page-lk">
              {curLang === "en" ? "Levels" : "Уровни"}
            </h1>
            <div class="wrapper-page-lk">
              <div class="content-block-flex-lk-white">
                <div class="table-ref-container">
                  <table class="table-ref table-ref-2">
                    <tr class="title-table-ref">
                      <th>{curLang === "en" ? "Level" : "Уровень"}</th>
                      <th>
                        {curLang === "en"
                          ? "Reward - tokens"
                          : "Награда - токены"}
                      </th>
                      <th>
                        {curLang === "en"
                          ? "Earning bonus"
                          : "Зарабатывающий бонус"}
                      </th>
                      <th>{curLang === "en" ? "Action" : "Действие"}</th>
                    </tr>
                    {levelsArray?.map((level) => {
                      const { number, levelTokens, earningBonus } = level;
                      return (
                        <LevelItem
                          key={number}
                          levelNum={number}
                          tokens={levelTokens}
                          bonus={earningBonus}
                          levelBonusTaken={data?.levelBonusTaken}
                          userLevel={data?.level}
                        />
                      );
                    })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
        <AdblockModal />
      </Layout>
    </main>
  );
};

export default Levels;
