import React from "react";
import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";
import { useGetTasksQuery } from "../../store/task/taskApiSlice";
import TaskItem from "../shared/TaskItem";
import { useSelector } from "react-redux";
import AdblockModal from "../shared/AdblockModal";

const Tasks = () => {
  const { data } = useGetTasksQuery();

  const { curLang } = useSelector((state) => state.general);

  return (
    <main>
      <Layout title={`Rocketcoin - ${curLang === "en" ? "Tasks" : "Задания"}`}>
        <section className="content-lk">
          <SideBar />
          <div className="right-content-lk">
            <h1 className="title-page-lk">
              {curLang === "en" ? "Tasks" : "Задания"}
            </h1>
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
      </Layout>
    </main>
  );
};

export default Tasks;
