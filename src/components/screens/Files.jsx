import React from "react";
import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";

import { useGetFilesQuery } from "../../store/file/fileApiSlice";
import FileItem from "../shared/FileItem";

const Files = () => {
  const { data } = useGetFilesQuery();
  console.log(data);

  return (
    <main>
      <Layout title="Rocketcoin - Файлы">
        <section className="content-lk">
          <a href="#!" className="btn-open-modal-panel-lk">
            Меню кабинета
          </a>
          <SideBar />
          <div className="right-content-lk">
            <h1 className="title-page-lk">Файлы</h1>
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
                    interval,
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
                        interval={interval}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </main>
  );
};

export default Files;
