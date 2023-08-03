import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import SideBarAdmin from "../../shared/SideBarAdmin";
import {
  useGetTaskApproveByIdQuery,
  useGetTaskFileMutation,
  useEditApproveMutation,
  useDeleteTaskApproveMutation,
} from "../../../store/task/taskApiSlice";
import axios from "axios";
import { useAddUserTokensDifMutation } from "../../../store/user/userApiSlice";

const TaskSingleAdmin = () => {
  const [files, setFiles] = useState([]);
  const [curFilePath, setCurFilePath] = useState("");
  const [isFileActive, setIsFileActive] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [getFile] = useGetTaskFileMutation();
  const [editApprove] = useEditApproveMutation();
  const [addUserTokensDif] = useAddUserTokensDifMutation();
  const [deleteTaskApprove] = useDeleteTaskApproveMutation();
  const reqUrl = process.env.REACT_APP_REQUEST_URL;

  const getData = useCallback(useGetTaskApproveByIdQuery, [
    isFileActive,
    isSuccess,
    curFilePath,
  ]);
  const { data } = getData(Number(window.location.href.split("/")[4]));

  const activateImage = (index) => {
    setCurFilePath(files[index]);
    setIsFileActive(true);
  };
  const modalClick = (e) => {
    const modalClasses = Array.from(e.target.classList);
    if (modalClasses.includes("modal-file-active")) {
      setIsFileActive(false);
    }
  };

  const confirmTask = async (e) => {
    e.preventDefault();

    try {
      const response = await editApprove({
        id: Number(window.location.href.split("/")[4]),
        isApproved: true,
      });
      const userResp = await addUserTokensDif({
        userId: data?.userId,
        tokens: data?.task?.tokensReward,
      });
      if (response.data && userResp.data) {
        setIsSuccess(true);
        setTimeout(() => {
          window.location.href = "https://rocket-coin.online/admin_tasks";
        }, 2000);
      }
      console.log(userResp);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const declineTask = async (e) => {
    e.preventDefault();

    try {
      const response = await deleteTaskApprove(
        Number(window.location.href.split("/")[4])
      );
      if (response.data) {
        setIsSuccess(true);
        setIsSuccess(true);
        setTimeout(() => {
          window.location.href = "https://rocket-coin.online/admin_tasks";
        }, 2000);
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const setFilesArray = async () => {
      for (let i = 0; i < data?.files.length; i++) {
        // const response = await getFile({ path: data?.files[i].fileUrl });
        try {
          const response = await axios(
            `${reqUrl}/task/file/${data?.files[i].fileUrl}`,
            {
              responseType: "blob",
            }
          );
          const respData = response.data;
          if (respData) {
            setFiles((current) => [...current, URL.createObjectURL(respData)]);
            console.log(URL.createObjectURL(respData));
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    setFilesArray();
  }, [data, getFile, reqUrl]);

  return (
    <main>
      <Layout title="Rocketcoin - Админ">
        <section className="content-lk">
          <a href="#!" className="btn-open-modal-panel-lk">
            Меню кабинета
          </a>
          <SideBarAdmin />
          <div className="right-content-lk">
            <h1 className="title-page-lk">Задание -- Aдмин</h1>
            <div className="wrapper-page-lk">
              <div className="content-block-flex-lk-white">
                <div className="task-offers-content">
                  <div className="task-offers task-offers-2">
                    <div className="title-task-and-star">
                      <h3>{data?.task?.title}</h3>
                      <div className="right-btns-content-task">
                        <a href="#!" className="btn-time-task">
                          {data?.task?.timeMinutes} минут
                        </a>
                        <a href="#!" className="btn-green-task">
                          {data?.task?.tokensReward} токенов
                        </a>
                        <a href="#!" className="btn-purple-task">
                          7/{data?.task?.claimsAvailable} views Claim
                        </a>
                      </div>
                    </div>
                    <p className="text-task-block">{data?.task?.description}</p>
                    <div className="title-task-and-star">
                      <h3 className="instr-title">Инструкция</h3>
                    </div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.task?.instruction,
                      }}
                    ></div>
                    <div className="title-task-and-star">
                      <h3 className="instr-title">Доказательста:</h3>
                    </div>
                    {isSuccess ? (
                      <h3 className="dropzone-success-title">Успешно!</h3>
                    ) : (
                      <>
                        <div>
                          {files.map((file, index) => (
                            <img
                              key={index}
                              src={file}
                              alt=""
                              className="tasks-approve-img"
                              onClick={() => activateImage(index)}
                            />
                          ))}
                        </div>

                        <div className="approve-btns-container">
                          <a
                            href="#!"
                            class="btn-task"
                            onClick={(e) => confirmTask(e)}
                          >
                            Подтвердить
                          </a>
                          <a
                            href="#!"
                            class="btn-task"
                            onClick={(e) => declineTask(e)}
                          >
                            Отклонить
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`modal-file ${isFileActive && "modal-file-active"}`}
            onClick={(e) => modalClick(e)}
          >
            <img src={curFilePath} alt="file" />
          </div>
        </section>
      </Layout>
    </main>
  );
};

export default TaskSingleAdmin;
