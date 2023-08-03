import React from "react";
import SideBar from "../../shared/SideBar";
import Layout from "../../layout/Layout";
import { useGetUserInfoQuery } from "../../../store/user/userApiSlice";

const Offeroc = () => {
  const { data } = useGetUserInfoQuery();

  return (
    <main>
      <Layout title="Rocketcoin - Offeroc">
        <section className="content-lk">
          <a href="#!" className="btn-open-modal-panel-lk">
            Меню кабинета
          </a>
          <SideBar />
          <div className="right-content-lk">
            <h1 className="title-page-lk">Офферы - Offeroc</h1>
            <div className="wrapper-page-lk">
              <div className="content-block-flex-lk-white">
                <div className="task-offers-content">
                  <iframe
                    title="Offeroc frame"
                    frameborder="0"
                    src={`https://offeroc.com/offerwall/tjjvipdtentzns8kemw473vid4s6zm/${data?.id}`}
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

export default Offeroc;
