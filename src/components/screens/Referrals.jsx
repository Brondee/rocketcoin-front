import React, { useState, useCallback, useEffect } from "react";
import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";
import { useGetUserInfoQuery } from "../../store/user/userApiSlice";
import ReferralItem from "../shared/ReferralItem";
import { useSelector } from "react-redux";

const Referrals = () => {
  const [referralCode, setRefferalCode] = useState("");
  const [activeReferrals, setActiveReferrals] = useState([]);
  const [referralCopied, setReferralCopied] = useState(false);

  const getInfo = useCallback(useGetUserInfoQuery, [referralCode]);
  const { data } = getInfo();
  const { curLang } = useSelector((state) => state.general);

  const copyReferralFunc = () => {
    navigator.clipboard.writeText(
      `https://rocket-coin.online/code/${referralCode}`
    );
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
      <Layout
        title={`Rocketcoin - ${curLang === "en" ? "Referrals" : "Рефералы"}`}
      >
        <section className="content-lk">
          <SideBar />
          <div class="right-content-lk">
            <h1 class="title-page-lk">
              {curLang === "en" ? "Referrals" : "Рефералы"}
            </h1>
            <div class="wrapper-page-lk">
              <div class="content-block-flex-lk-white">
                <p class="text-referrals-little">
                  {curLang === "en"
                    ? "Active referrals"
                    : "Активных рефералов:"}
                  <span>{data?.referrals.length}</span>
                </p>
                <div class="ref-link-and-bnt">
                  <p>
                    {curLang === "en"
                      ? "Your referral link:"
                      : "Ваша ререфральная ссылка:"}
                  </p>
                  <div class="content-ref-link-and-bnt">
                    <input
                      type="text"
                      value={`https://rocket-coin.online/code/${referralCode}`}
                      name="link-lk-ref"
                    />
                    <button type="button" onClick={copyReferralFunc}>
                      {referralCopied
                        ? "✓"
                        : curLang === "en"
                        ? "Copy"
                        : "Копировать"}
                    </button>
                  </div>
                </div>
                <p class="text-referrals-little-2">
                  {curLang === "en" ? "List of referrals" : "Список рефералов"}
                </p>
                <div class="table-ref-container">
                  <table class="table-ref">
                    <tr class="title-table-ref">
                      <th>
                        {curLang === "en" ? "User's name" : "Имя пользователя"}
                      </th>
                      <th>{curLang === "en" ? "Earned" : "Заработал"}</th>
                      <th>{curLang === "en" ? "Joined" : "Присоединился"}</th>
                      <th>
                        {curLang === "en"
                          ? "Last activity"
                          : "Последняя активность"}
                      </th>
                    </tr>
                    {activeReferrals?.length === 0 ? (
                      <tr>
                        <td colspan="4" class="none-rows">
                          {curLang === "en"
                            ? "No active referrals"
                            : "Нет активных рефералов"}
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
