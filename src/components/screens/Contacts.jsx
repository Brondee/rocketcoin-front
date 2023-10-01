import React from "react";
import Layout from "../layout/Layout";
import { useSelector } from "react-redux";

const Contacts = () => {
  const { curLang } = useSelector((state) => state.general);

  return (
    <main>
      <Layout
        title={`Rocketcoin - ${curLang === "en" ? "Conctacts" : "Контакты"}`}
      >
        <section className="content-lk contacts-content">
          <div className="right-content-lk">
            <h1 className="title-page-lk">
              {curLang === "en" ? "Conctacts" : "Контакты"}
            </h1>
            <div className="wrapper-page-lk">
              <div className="content-block-flex-lk-white">
                <h2 className="contacts-title">
                  {curLang === "en"
                    ? "if you have any questions, please contact us rocketcoin.reset@gmail.com"
                    : "По всем вопросам: rocketcoin.reset@gmail.com"}
                </h2>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </main>
  );
};

export default Contacts;
