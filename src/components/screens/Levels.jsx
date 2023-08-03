import React from "react";
import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";
import LevelItem from "../shared/LevelItem";
import generateLevelsArray from "../../utils/generateLevelsArray";

const Levels = () => {
  const levelsArray = generateLevelsArray(15, 1200, 0.001);

  return (
    <main>
      <Layout title="Rocketcoin - Уровни">
        <section className="content-lk">
          <a href="#!" className="btn-open-modal-panel-lk">
            Меню кабинета
          </a>
          <SideBar />
          <div class="right-content-lk">
            <h1 class="title-page-lk">Уровни</h1>
            <div class="wrapper-page-lk">
              <div class="level-container-parent">
                <div class="level-container">
                  <div class="level-container-top">
                    <p>Уровень</p>
                    <p>Награда - токены</p>
                    <p class="level-container-top-bonus">
                      Зарабатывающий <br /> бонус (Faucet)
                    </p>
                  </div>
                  <div class="level-container-content">
                    {levelsArray?.map((level) => {
                      const { number, levelTokens, earningBonus } = level;
                      return (
                        <LevelItem
                          key={number}
                          levelNum={number}
                          tokens={levelTokens}
                          bonus={earningBonus}
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

export default Levels;
