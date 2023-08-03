import React from "react";
import SideBar from "../../shared/SideBar";
import Layout from "../../layout/Layout";
import { useGetUserInfoQuery } from "../../../store/user/userApiSlice";

const Cpx = () => {
  const { data } = useGetUserInfoQuery();

  return (
    <main>
      <Layout title="Rocketcoin - Cpx">
        <section className="content-lk">
          <a href="#!" className="btn-open-modal-panel-lk">
            Меню кабинета
          </a>
          <SideBar />
          <div className="right-content-lk">
            <h1 className="title-page-lk">Офферы - Cpx Research</h1>
            <div className="wrapper-page-lk">
              <div className="content-block-flex-lk-white">
                <div className="task-offers-content">
                  <iframe
                    title="Cpx frame"
                    frameborder="0"
                    src={`https://offers.cpx-research.com/index.php?app_id=19349&ext_user_id=${data?.id}&secure_hash=${process.env.REACT_APP_CPX_SECRET}`}
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

export default Cpx;
