import React from "react";
import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";
import LinkItem from "../shared/LinkItem";
import { useGetLinksInfoQuery } from "../../store/links/linksApiSlice";
import generateLinksArray from "../../utils/generateLinksArray";
import { useSelector } from "react-redux";
import AdblockModal from "../shared/AdblockModal";
import { useGetUserInfoQuery } from "../../store/user/userApiSlice";
import RotationBanner from "../shared/RotationBanner";
import FixedBanner from "../shared/FixedBanner";

const Links = () => {
  const userData = useGetUserInfoQuery();

  const { data } = useGetLinksInfoQuery(userData?.data?.registrationIp);
  const { curLang } = useSelector((state) => state.general);

  const { firstArray, secondArray, thirdArray } = generateLinksArray(data);

  return (
    <main>
      <Layout
        title={`Rocketcoin - ${curLang === "en" ? "Shortlinks" : "Ссылки"}`}
      >
        <section className="content-lk">
          <SideBar />
          <div className="right-content-lk">
            <div className="page-title-ban-cont">
              <h1 className="title-page-lk">
                {curLang === "en" ? "Shortlinks" : "Ссылки"}
              </h1>
              <div className="banner banner468 banner-profile">
                <RotationBanner
                  width={468}
                  datasid="382186"
                  datakey="679f64fa36a4eb3544f2a556b9240afe"
                  dataframe="2259311"
                />
              </div>
              <div className="banner banner468 banner-profile">
                <RotationBanner
                  width={468}
                  datasid="382187"
                  datakey="679f64fa36a4eb3544f2a556b9240afe"
                  dataframe="2259312"
                />
              </div>
            </div>
            <div className="wrapper-page-lk">
              <div className="content-block-flex-lk-white">
                <div className="task-offers-content">
                  {firstArray?.map((item, index) => {
                    const {
                      disabled,
                      link,
                      reward,
                      claimed,
                      claimOut,
                      linkName,
                    } = item;
                    return (
                      <LinkItem
                        key={index}
                        disabled={disabled}
                        link={link}
                        reward={reward}
                        claimed={claimed}
                        claimOut={claimOut}
                        linkName={linkName}
                      />
                    );
                  })}
                  <div className="promotion-blocks">
                    <div className="promotion-block block300">
                      <RotationBanner
                        width={300}
                        datasid="382188"
                        datakey="74f5fd8cb2210ae903b1c609be6726ea"
                        dataframe="2259313"
                      />
                    </div>
                    <div className="promotion-block block300">
                      <RotationBanner
                        width={300}
                        datasid="382189"
                        datakey="74f5fd8cb2210ae903b1c609be6726ea"
                        dataframe="2259314"
                      />
                    </div>
                    <div className="promotion-block block300">
                      <RotationBanner
                        width={300}
                        datasid="382190"
                        datakey="74f5fd8cb2210ae903b1c609be6726ea"
                        dataframe="2259316"
                      />
                    </div>
                  </div>
                  {secondArray?.map((item, index) => {
                    const {
                      disabled,
                      link,
                      reward,
                      claimed,
                      claimOut,
                      linkName,
                    } = item;
                    return (
                      <LinkItem
                        key={index}
                        disabled={disabled}
                        link={link}
                        reward={reward}
                        claimed={claimed}
                        claimOut={claimOut}
                        linkName={linkName}
                      />
                    );
                  })}
                  <div className="promotion-blocks">
                    <div className="promotion-block block300">
                      <RotationBanner
                        width={300}
                        datasid="382191"
                        datakey="74f5fd8cb2210ae903b1c609be6726ea"
                        dataframe="2259319"
                      />
                    </div>
                    <div className="promotion-block block300">
                      <RotationBanner
                        width={300}
                        datasid="382192"
                        datakey="74f5fd8cb2210ae903b1c609be6726ea"
                        dataframe="2259320"
                      />
                    </div>
                    <div className="promotion-block block300">
                      <RotationBanner
                        width={300}
                        datasid="382193"
                        datakey="74f5fd8cb2210ae903b1c609be6726ea"
                        dataframe="2260450"
                      />
                    </div>
                  </div>
                  {thirdArray?.map((item, index) => {
                    const {
                      disabled,
                      link,
                      reward,
                      claimed,
                      claimOut,
                      linkName,
                    } = item;
                    return (
                      <LinkItem
                        key={index}
                        disabled={disabled}
                        link={link}
                        reward={reward}
                        claimed={claimed}
                        claimOut={claimOut}
                        linkName={linkName}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
        <FixedBanner page="links" />
        <AdblockModal />
      </Layout>
    </main>
  );
};

export default Links;
