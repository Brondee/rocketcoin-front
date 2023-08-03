import React, { useState, useCallback } from "react";
import {
  useAddApproveFileMutation,
  useGetFileByIdQuery,
  useUploadScreenMutation,
} from "../../store/file/fileApiSlice";
import Layout from "../layout/Layout";
import SideBar from "./SideBar";
import Dropzone from "react-dropzone";

import IconUpload from "../../assets/img/icons-upload.svg";

const FileSingle = () => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const getFileData = useCallback(useGetFileByIdQuery, [acceptedFiles]);
  const { data } = getFileData(Number(window.location.href.split("/")[4]));

  const [uploadScreen] = useUploadScreenMutation();
  const [addApproveFile] = useAddApproveFileMutation();

  const sendToReview = async (e) => {
    e.preventDefault();

    if (acceptedFiles.length > 0) {
      try {
        const response = await addApproveFile(data?.id);
        console.log(response.data);
        if (response.data) {
          for (let i = 0; i < acceptedFiles.length; i++) {
            let formData = new FormData();
            formData.append("file", acceptedFiles[i]);
            console.log(formData, acceptedFiles[i]);
            try {
              const responseFile = await uploadScreen({
                fileApproveId: response.data.id,
                formData,
              });
              console.log(responseFile);
              if (responseFile.data) {
                setIsSuccess(true);
                setTimeout(() => {
                  window.location.href = "https://rocket-coin.online/files";
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
      <Layout title="Rocketcoin - Файл">
        <section className="content-lk">
          <a href="#!" className="btn-open-modal-panel-lk">
            Меню кабинета
          </a>
          <SideBar />
          <div className="right-content-lk">
            <h1 className="title-page-lk">Файл</h1>
            <div className="wrapper-page-lk">
              <div className="content-block-flex-lk-white">
                <div className="task-offers-content">
                  <div className="task-offers task-offers-2">
                    <div className="title-task-and-star">
                      <h3>{data?.title}</h3>
                      <div className="right-btns-content-task">
                        <a href="#!" className="btn-time-task">
                          {data?.timeToComplete} минут
                        </a>
                        <a href="#!" className="btn-green-task">
                          {data?.tokensReward} токенов
                        </a>
                        <a href="#!" className="btn-green-task">
                          {data?.expReward} exp
                        </a>
                      </div>
                    </div>
                    <p className="text-task-block">{data?.description}</p>
                    <div className="title-task-and-star">
                      <h3 className="instr-title">Инструкция</h3>
                    </div>
                    <div>
                      <ul>
                        <li>
                          <p className="text-task-block instr-task">
                            Перейдите по ссылке ниже и скачайте архив.
                          </p>
                        </li>
                        <li>
                          <p className="text-task-block instr-task">
                            Скачав архив, откройте или распакуйте его. Сделайте
                            скриншоты всего экрана, на которых виден
                            распакованный или открытый архив.
                          </p>
                        </li>
                        <li>
                          <p className="text-task-block instr-task">
                            Отправьте сделанные скриншоты на проверку с помощью
                            формы снизу. Ваша заявка будет обработана в течение
                            суток.
                          </p>
                        </li>
                      </ul>
                      <a href={data?.link} className="btn-task">
                        Скачать архив
                      </a>
                    </div>
                    <div className="title-task-and-star">
                      <h3 className="instr-title">Доказательста:</h3>
                    </div>
                    {isSuccess ? (
                      <h3 className="dropzone-success-title">
                        Файлы успешно отправлены на проверку
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
                                  Перетащите скриншот в эту область, чтобы
                                  загрузить
                                </p>
                                <p className="dropzone-space">или</p>
                                <p className="dropzone-btn">
                                  Выберите скриншот
                                </p>
                              </div>
                            </section>
                          )}
                        </Dropzone>

                        <div>
                          <h3 className="accepted-files-title">
                            Выбранные скриншоты:
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
                        Отправить на проверку
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

export default FileSingle;
