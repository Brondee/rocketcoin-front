import React from "react";
import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";

import { useGetFilesQuery } from "../../store/file/fileApiSlice";
// import FileItem from "../shared/FileItem";
import { useSelector } from "react-redux";

const Files = () => {
  const { data } = useGetFilesQuery();
  const { curLang } = useSelector((state) => state.general);

  console.log(data);

  return (
    <main>
      <Layout title={`Rocketcoin - ${curLang === "en" ? "Files" : "Файлы"}`}>
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
        </section>
      </Layout>
    </main>
  );
};

export default Files;
