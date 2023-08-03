import React, { useState, useCallback, useEffect } from "react";
import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";
import { useGetUserInfoQuery } from "../../store/user/userApiSlice";
import ReferralItem from "../shared/ReferralItem";

const Referrals = () => {
  const [referralCode, setRefferalCode] = useState("");
  const [activeReferrals, setActiveReferrals] = useState([]);
  const [referralCopied, setReferralCopied] = useState(false);

  const getInfo = useCallback(useGetUserInfoQuery, [referralCode]);
  const { data } = getInfo();

  const copyReferralFunc = () => {
    navigator.clipboard.writeText(referralCode);
    setReferralCopied(true);
    setTimeout(() => {
      setReferralCopied(false);
    }, 3000);
  };

  useEffect(() => {
    setRefferalCode(data?.referralCode);
    setActiveReferrals(data?.referrals);
    console.log(data);
  }, [data]);

  return (
    <main>
      <Layout title="Rocketcoin - Рефералы">
        <section className="content-lk">
          <a href="#!" className="btn-open-modal-panel-lk">
            Меню кабинета
          </a>
          <SideBar />
          <div class="right-content-lk">
            <h1 class="title-page-lk">Рефералы</h1>
            <div class="wrapper-page-lk">
              <div class="content-block-flex-lk-white">
                <p class="text-referrals-little">
                  Активных рефералов: <span>{data?.referrals.length}</span>
                </p>
                <div class="ref-link-and-bnt">
                  <p>Ваш ререфральный код</p>
                  <div class="content-ref-link-and-bnt">
                    <input
                      type="text"
                      value={referralCode}
                      name="link-lk-ref"
                    />
                    <button type="button" onClick={copyReferralFunc}>
                      {referralCopied ? "✓" : "Копировать"}
                    </button>
                  </div>
                </div>
                <p class="text-referrals-little-2">Список рефералов</p>
                <div class="table-ref-container">
                  <table class="table-ref">
                    <tr class="title-table-ref">
                      <th>Имя пользователя</th>
                      <th>Заработал</th>
                      <th>Присоединился</th>
                      <th>Последняя активность</th>
                    </tr>
                    {activeReferrals?.length === 0 ? (
                      <tr>
                        <td colspan="4" class="none-rows">
                          Нет активных рефералов
                        </td>
                      </tr>
                    ) : (
                      activeReferrals?.map((referral, index) => {
                        const {
                          referralUserName,
                          earnedCoins,
                          createdAt,
                          updatedAt,
                        } = referral;
                        return (
                          <ReferralItem
                            key={index}
                            name={referralUserName}
                            earnedCoins={earnedCoins}
                            createdAt={createdAt}
                            updatedAt={updatedAt}
                          />
                        );
                      })
                    )}
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

export default Referrals;
