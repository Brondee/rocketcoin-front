import React from "react";
import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";
import { useGetTasksQuery } from "../../store/task/taskApiSlice";
import TaskItem from "../shared/TaskItem";

const Tasks = () => {
  const { data } = useGetTasksQuery();

  return (
    <main>
      <Layout title="Rocketcoin - Задания">
        <section className="content-lk">
          <a href="#!" className="btn-open-modal-panel-lk">
            Меню кабинета
          </a>
          <SideBar />
          <div className="right-content-lk">
            <h1 className="title-page-lk">Задания</h1>
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
                      claimsAvailable,
                      _count,
                    } = item;
                    console.log(item);
                    return (
                      <TaskItem
                        key={id}
                        id={id}
                        title={title}
                        desc={description}
                        time={timeMinutes}
                        reward={tokensReward}
                        views={_count.taskApproves}
                        viewsTotal={claimsAvailable}
                      />
                    );
                  })}
                  {data?.length === 0 && <h3>Заданий пока что нет</h3>}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </main>
  );
};

export default Tasks;
