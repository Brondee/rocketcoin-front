import React from "react";
import SideBar from "../../shared/SideBar";
import Layout from "../../layout/Layout";
import { useGetUserInfoQuery } from "../../../store/user/userApiSlice";

const OffersAll = () => {
  const { data } = useGetUserInfoQuery();

  return (
    <main>
      <Layout title="Rocketcoin - Offers4All">
        <section className="content-lk">
          <a href="#!" className="btn-open-modal-panel-lk">
            Меню кабинета
          </a>
          <SideBar />
          <div className="right-content-lk">
            <h1 className="title-page-lk">Офферы - Offers4All</h1>
            <div className="wrapper-page-lk">
              <div className="content-block-flex-lk-white">
                <div className="task-offers-content">
                  <iframe
                    title="Offers4All iframe"
                    frameborder="0"
                    src={`//www.offers4all.net/index.php?view=ads&api_key=1f8c63ec9a472341d6ec758a17fb4b99&user_id=${data?.id}`}
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

export default OffersAll;
