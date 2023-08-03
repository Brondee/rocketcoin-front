import React from "react";
import Layout from "../../layout/Layout";
import SideBar from "../../shared/SideBar";
import { useGetUserInfoQuery } from "../../../store/user/userApiSlice";

const Offerscrypto = () => {
  const { data } = useGetUserInfoQuery();

  return (
    <main>
      <Layout title="Rocketcoin - Offers4Crypto">
        <section className="content-lk">
          <a href="#!" className="btn-open-modal-panel-lk">
            Меню кабинета
          </a>
          <SideBar />
          <div className="right-content-lk">
            <h1 className="title-page-lk">Офферы - Offers4Crypto</h1>
            <div className="wrapper-page-lk">
              <div className="content-block-flex-lk-white">
                <div className="task-offers-content">
                  <iframe
                    title="offers4crypto frame"
                    frameborder="0"
                    src={`https://offers4crypto.xyz/offerwall/t2mj0a6z68ncjpd1miuhnvmcnfkb47/${data?.id}`}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </main>
  );
};

export default Offerscrypto;
