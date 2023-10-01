import React from "react";
import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";
import { useGetTasksQuery } from "../../store/task/taskApiSlice";
import TaskItem from "../shared/TaskItem";
import { useSelector } from "react-redux";
import AdblockModal from "../shared/AdblockModal";
import RotationBanner from "../shared/RotationBanner";
import FixedBanner from "../shared/FixedBanner";

const Tasks = () => {
  const { data } = useGetTasksQuery();

  const { curLang } = useSelector((state) => state.general);

  return (
    <main>
      <Layout title={`Rocketcoin - ${curLang === "en" ? "Tasks" : "Задания"}`}>
        <section className="content-lk">
          <SideBar />
          <div className="right-content-lk">
            <div className="page-title-ban-cont">
              <h1 className="title-page-lk">
                {curLang === "en" ? "Tasks" : "Задания"}
              </h1>
              <div className="banner banner468 banner-profile">
                <RotationBanner
                  width={468}
                  dataframe="2260453"
                  datasid="382194"
                  datakey="679f64fa36a4eb3544f2a556b9240afe"
                />
              </div>
              <div className="banner banner468 banner-profile">
                <RotationBanner
                  width={468}
                  dataframe="2260454"
                  datasid="382195"
                  datakey="679f64fa36a4eb3544f2a556b9240afe"
                />
              </div>
            </div>
            <div className="wrapper-page-lk">
              <div className="content-block-flex-lk-white">
                <div className="task-offers-content">
                  {data?.map((item) => {
                    const {
                      id,
                      title,
                      tokensReward,
                      timeMinutes,
                      description,
                      taskApproves,
                      interval,
                    } = item;
                    return (
                      <TaskItem
                        key={id}
                        id={id}
                        title={title}
                        desc={description}
                        time={timeMinutes}
                        reward={tokensReward}
                        approves={taskApproves}
                        interval={interval}
                      />
                    );
                  })}
                  {data?.length === 0 && <h3>Заданий пока что нет</h3>}
                </div>
              </div>
            </div>
          </div>
        </section>
        <AdblockModal />
        <FixedBanner page="tasks" />
      </Layout>
    </main>
  );
};

export default Tasks;
