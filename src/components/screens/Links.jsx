import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";
import LinkItem from "../shared/LinkItem";
import { useGetLinksInfoQuery } from "../../store/links/linksApiSlice";
import generateLinksArray from "../../utils/generateLinksArray";
import { useSelector } from "react-redux";
import AdblockModal from "../shared/AdblockModal";

const Links = () => {
  const [ip, setIp] = useState("");

  const { data } = useGetLinksInfoQuery(ip);
  const { curLang } = useSelector((state) => state.general);

  const getData = async () => {
    const res = await fetch("https://geolocation-db.com/json/");
    const data = await res.json();
    setIp(data.IPv4);
    console.log(data.IPv4);
  };

  useEffect(() => {
    getData();
  }, []);

  const { firstArray, secondArray, thirdArray } = generateLinksArray(data);

  return (
    <main>
      <Layout
        title={`Rocketcoin - ${curLang === "en" ? "Shortlinks" : "Ссылки"}`}
      >
        <section className="content-lk">
          <SideBar />
          <div className="right-content-lk">
            <h1 className="title-page-lk">
              {curLang === "en" ? "Shortlinks" : "Ссылки"}
            </h1>
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
                    <div className="promotion-block">Реклама</div>
                    <div className="promotion-block">Реклама</div>
                    <div className="promotion-block">Реклама</div>
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
                    <div className="promotion-block">Реклама</div>
                    <div className="promotion-block">Реклама</div>
                    <div className="promotion-block">Реклама</div>
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
        <AdblockModal />
      </Layout>
    </main>
  );
};

export default Links;
