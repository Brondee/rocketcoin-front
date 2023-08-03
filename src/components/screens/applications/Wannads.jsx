import React from "react";
import SideBar from "../../shared/SideBar";
import Layout from "../../layout/Layout";
import { useGetUserInfoQuery } from "../../../store/user/userApiSlice";

const Wannads = () => {
  const { data } = useGetUserInfoQuery();

  return (
    <main>
      <Layout title="Rocketcoin - Wannads">
        <section className="content-lk">
          <a href="#!" className="btn-open-modal-panel-lk">
            Меню кабинета
          </a>
          <SideBar />
          <div className="right-content-lk">
            <h1 className="title-page-lk">Офферы - Wannads</h1>
            <div className="wrapper-page-lk">
              <div className="content-block-flex-lk-white">
                <div className="task-offers-content">
                  <iframe
                    title="Wannads iframe"
                    frameborder="0"
                    src={`https://earn.wannads.com/wall?apiKey=64ba5129dd38c304638190&userId=${data?.id}`}
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

export default Wannads;
