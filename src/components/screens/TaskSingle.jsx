import React, { useState, useCallback } from "react";
import Layout from "../layout/Layout";
import SideBar from "../shared/SideBar";
import Dropzone from "react-dropzone";
import {
  useGetTaskByIdQuery,
  useUploadFileMutation,
  useAddApproveTaskMutation,
} from "../../store/task/taskApiSlice";

import IconUpload from "../../assets/img/icons-upload.svg";
import { useSelector } from "react-redux";

const TaskSingle = () => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dopInfo, setDopInfo] = useState("");

  const getTaskData = useCallback(useGetTaskByIdQuery, [acceptedFiles]);
  const { data } = getTaskData(Number(window.location.href.split("/")[4]));
  const { curLang } = useSelector((state) => state.general);

  const [uploadFile] = useUploadFileMutation();
  const [addApproveTask] = useAddApproveTaskMutation();

  const sendToReview = async (e) => {
    e.preventDefault();

    if (acceptedFiles.length > 0) {
      try {
        const response = await addApproveTask({ taskId: data?.id, dopInfo });
        console.log(response);
        if (response.data) {
          for (let i = 0; i < acceptedFiles.length; i++) {
            let formData = new FormData();
            formData.append("file", acceptedFiles[i]);
            console.log(formData, acceptedFiles[i]);
            try {
              const responseFile = await uploadFile({
                taskApproveId: response.data.id,
                formData,
              });
              console.log(responseFile);
              if (responseFile.data) {
                setIsSuccess(true);
                setTimeout(() => {
                  window.location.href = "https://rocket-coin.online/tasks";
                }, 2000);
              }
            } catch (err) {
              console.log(err);
            }
          }
        } else {
          setIsError(true);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setIsError(true);
    }
  };

  return (
    <main>
      <Layout title={`Rocketcoin - ${curLang === "en" ? "Task" : "Задание"}`}>
        <section className="content-lk">
          <SideBar />
          <div className="right-content-lk">
            <h1 className="title-page-lk">
              {curLang === "en" ? "Task" : "Задание"}
            </h1>
            <div className="wrapper-page-lk">
              <div className="content-block-flex-lk-white">
                <div className="task-offers-content">
                  <div className="task-offers task-offers-2">
                    <div className="title-task-and-star">
                      <h3>{data?.title}</h3>
                      <div className="right-btns-content-task">
                        <a href="#!" className="btn-time-task">
                          {data?.timeMinutes}{" "}
                          {curLang === "en" ? "minutes" : "минут"}
                        </a>
                        <a href="#!" className="btn-green-task">
                          {data?.tokensReward}{" "}
                          {curLang === "en" ? "tokens" : "токенов"}
                        </a>
                      </div>
                    </div>
                    <p className="text-task-block">{data?.description}</p>
                    <div className="title-task-and-star">
                      <h3 className="instr-title">
                        {curLang === "en" ? "Instruction" : "Инструкция"}
                      </h3>
                    </div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.instruction,
                      }}
                    ></div>

                    <div className="title-task-and-star">
                      <h3 className="instr-title">
                        {curLang === "en" ? "Proofs:" : "Доказательста:"}
                      </h3>
                    </div>
                    <textarea
                      cols="30"
                      rows="3"
                      placeholder={
                        curLang === "en"
                          ? "Additional Information"
                          : "Дополнительная информация"
                      }
                      className="proof-textarea"
                      value={dopInfo}
                      onChange={(e) => setDopInfo(e.target.value)}
                    ></textarea>
                    {isSuccess ? (
                      <h3 className="dropzone-success-title">
                        {curLang === "en"
                          ? "Task was submitted for verification"
                          : "Задание успешно отправлено на проверку"}
                      </h3>
                    ) : (
                      <>
                        <Dropzone
                          onDrop={(acceptedFiles) =>
                            setAcceptedFiles(acceptedFiles)
                          }
                        >
                          {({ getRootProps, getInputProps }) => (
                            <section>
                              <div
                                {...getRootProps({
                                  className: `dropzone ${
                                    isError && "dropzone-error"
                                  }`,
                                })}
                              >
                                <input {...getInputProps()} />
                                <img src={IconUpload} alt="icon upload" />
                                <p className="dropzone-text">
                                  {curLang === "en"
                                    ? "Drag and drop files to upload"
                                    : "Перетащите файл в эту область, чтобы загрузить"}
                                </p>
                                <p className="dropzone-space">
                                  {curLang === "en" ? "or" : "или"}
                                </p>
                                <p className="dropzone-btn">
                                  {curLang === "en"
                                    ? "Choose file"
                                    : "Выберите файл"}
                                </p>
                              </div>
                            </section>
                          )}
                        </Dropzone>

                        <div>
                          <h3 className="accepted-files-title">
                            {curLang === "en"
                              ? "Choosen files:"
                              : "Выбранные файлы:"}
                          </h3>
                          {acceptedFiles.map((item) => {
                            console.log(item);
                            return (
                              <p className="accepted-files-text">{item.name}</p>
                            );
                          })}
                        </div>
                      </>
                    )}
                    <div className="btns-container">
                      <a
                        href="#!"
                        class="btn-task"
                        onClick={(e) => sendToReview(e)}
                      >
                        {curLang === "en"
                          ? "Submit for verification"
                          : "Отправить на проверку"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </main>
  );
};

export default TaskSingle;
