import React from "react";
import SideBar from "../../shared/SideBar";
import Layout from "../../layout/Layout";
import { useGetUserInfoQuery } from "../../../store/user/userApiSlice";

const Adgem = () => {
  const { data } = useGetUserInfoQuery();

  return (
    <main>
      <Layout title="Rocketcoin - Adgem">
        <section className="content-lk">
          <a href="#!" className="btn-open-modal-panel-lk">
            Меню кабинета
          </a>
          <SideBar />
          <div className="right-content-lk">
            <h1 className="title-page-lk">Офферы - AdGem</h1>
            <div className="wrapper-page-lk">
              <div className="content-block-flex-lk-white">
                <div className="task-offers-content">
                  <iframe
                    title="adgemOffers"
                    src={`https://api.adgem.com/v1/wall?appid=27413&playerid=${data?.id}`}
                    frameborder="0"
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

export default Adgem;
