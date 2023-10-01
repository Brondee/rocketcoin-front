import React from "react";
import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";
import Banner from "../shared/Banner";

import { useGetFilesQuery } from "../../store/file/fileApiSlice";
import { useSelector } from "react-redux";

const Files = () => {
  const { data } = useGetFilesQuery();
  const { curLang } = useSelector((state) => state.general);

  console.log(data);

  return (
    <main>
      <Layout
        title={`Rocketcoin - ${curLang === "en" ? "Support us" : "Поддержать"}`}
      >
        <section className="content-lk">
          <SideBar />
          {/* <div className="right-content-lk">
            <h1 className="title-page-lk">
              {curLang === "en" ? "Files" : "Файлы"}
            </h1>
            <div className="wrapper-page-lk">
              <div className="files-container">
                {data?.map((item) => {
                  const {
                    id,
                    title,
                    description,
                    tokensReward,
                    expReward,
                    timeToComplete,
                    approves,
                  } = item;
                  if (approves.length >= 1) {
                    return <></>;
                  } else {
                    return (
                      <FileItem
                        key={id}
                        id={id}
                        title={title}
                        desc={description}
                        tokens={tokensReward}
                        exp={expReward}
                        timeToComplete={timeToComplete}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div> */}

          <div class="right-content-lk">
            <h1 className="title-page-lk">
              {curLang === "en" ? "Support us" : "Поддержать"}
            </h1>
            <div className="wrapper-page-lk">
              <div className="top-support-banners-cont">
                <div className="banner banner468 banner-support ">
                  <iframe
                    title="promo"
                    data-aa="2261590"
                    src="//ad.a-ads.com/2261590?size=468x60"
                  ></iframe>
                </div>
                <div className="banner banner468 banner-support ">
                  <iframe
                    title="promo"
                    data-aa="2261590"
                    src="//ad.a-ads.com/2261590?size=468x60"
                  ></iframe>
                </div>
              </div>
              <h2 className="contacts-title support-title">
                {curLang === "en"
                  ? "if you have any questions, please contact us rocketcoin.reset@gmail.com"
                  : "По всем вопросам: rocketcoin.reset@gmail.com"}
              </h2>
              <div className="top-support-banners-cont">
                <div className="banner banner300 banner-support ">
                  <Banner width={300} />
                </div>
                <div className="banner banner300 banner-support ">
                  <Banner width={300} />
                </div>
                <div className="banner banner300 banner-support ">
                  <Banner width={300} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </main>
  );
};

export default Files;
