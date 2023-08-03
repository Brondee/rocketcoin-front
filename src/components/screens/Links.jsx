import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";
import LinkItem from "../shared/LinkItem";
import { useGetLinksInfoQuery } from "../../store/links/linksApiSlice";
import generateLinksArray from "../../utils/generateLinksArray";

const Links = () => {
  const [ip, setIp] = useState("");

  const { data } = useGetLinksInfoQuery(ip);

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
      <Layout title="Rocketcoin - Ссылки">
        <section className="content-lk">
          <a href="#!" className="btn-open-modal-panel-lk">
            Меню кабинета
          </a>
          <SideBar />
          <div className="right-content-lk">
            <h1 className="title-page-lk">Ссылки</h1>
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
                  <div className="advertising-blocks">
                    <div className="advertising-block">Реклама</div>
                    <div className="advertising-block">Реклама</div>
                    <div className="advertising-block">Реклама</div>
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
                  <div className="advertising-blocks">
                    <div className="advertising-block">Реклама</div>
                    <div className="advertising-block">Реклама</div>
                    <div className="advertising-block">Реклама</div>
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
      </Layout>
    </main>
  );
};

export default Links;
