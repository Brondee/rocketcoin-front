import React, { useCallback, useEffect, useState } from "react";
import SideBar from "../shared/SideBar";
import Layout from "../layout/Layout";
import { useGetUserInfoQuery } from "../../store/user/userApiSlice";
import generateBonusArray from "../../utils/generateBonusArray";
import BonusItem from "../shared/BonusItem";

const Bonus = () => {
  const [bonusStreak, setBonusStreak] = useState(0);
  const [isNextBonusAv, setNextBonusAv] = useState(false);
  const [bonusArrayState, setBonusArrayState] = useState([]);

  // console.log(
  //   new Date().getTime() >=
  //     new Date("2023-07-15 13:19").getTime() + 1 * 24 * 60 * 60 * 1000
  // );

  const getInfo = useCallback(useGetUserInfoQuery, [bonusStreak]);
  const { data } = getInfo();

  useEffect(() => {
    setBonusArrayState(generateBonusArray(50, 200, 12, 0.1));
    setBonusStreak(data?.bonusStreak);
    if (data?.bonusStreak === 0) {
      setNextBonusAv(true);
    } else {
      if (
        new Date().getDate() > new Date(data?.bonusLastTaken).getDate() ||
        new Date().getMonth() > new Date(data?.bonusLastTaken).getMonth() ||
        new Date().getFullYear() > new Date(data?.bonusLastTaken).getFullYear()
      ) {
        setNextBonusAv(true);
      } else {
        setNextBonusAv(false);
      }
    }
  }, [data?.bonusLastTaken, data?.bonusStreak]);

  return (
    <main>
      <Layout title="Rocketcoin - Бонус">
        <section className="content-lk">
          <a href="#!" className="btn-open-modal-panel-lk">
            Меню кабинета
          </a>
          <SideBar />
          <div class="right-content-lk">
            <h1 class="title-page-lk">Бонус</h1>
            <div class="wrapper-page-lk">
              <div class="content-block-flex-lk-white">
                <div class="table-ref-container">
                  <table class="table-ref table-ref-2">
                    <tr class="title-table-ref">
                      <th>Номер</th>
                      <th>Награда - токены</th>
                      <th>Награда - опыт</th>
                      <th>Действие</th>
                    </tr>
                    {bonusArrayState.map((bonusSingle, index) => {
                      const { id, tokens, exp } = bonusSingle;
                      let isAvailable = false;
                      let bonusTaken = false;
                      if (index === bonusStreak && isNextBonusAv) {
                        isAvailable = true;
                      }
                      if (index < bonusStreak) {
                        bonusTaken = true;
                      }
                      return (
                        <BonusItem
                          key={id}
                          number={id}
                          tokens={tokens}
                          exp={exp}
                          bonusAvailable={isAvailable}
                          bonusTaken={bonusTaken}
                        />
                      );
                    })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </main>
  );
};

export default Bonus;
