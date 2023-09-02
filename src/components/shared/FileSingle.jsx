import React, { useState, useCallback } from "react";
import {
  useAddApproveFileMutation,
  useGetFileByIdQuery,
  useUploadScreenMutation,
} from "../../store/file/fileApiSlice";
import Layout from "../layout/Layout";
import SideBar from "./SideBar";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";

import IconUpload from "../../assets/img/icons-upload.svg";

const FileSingle = () => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const getFileData = useCallback(useGetFileByIdQuery, [acceptedFiles]);
  const { data } = getFileData(Number(window.location.href.split("/")[4]));
  const { curLang } = useSelector((state) => state.general);

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
      <Layout title={`Rocketcoin - ${curLang === "en" ? "File" : "Файл"}`}>
        <section className="content-lk">
          <SideBar />
          <div className="right-content-lk">
            <h1 className="title-page-lk">
              {curLang === "en" ? "File" : "Файл"}
            </h1>
            <div className="wrapper-page-lk">
              <div className="content-block-flex-lk-white">
                <div className="task-offers-content">
                  <div className="task-offers task-offers-2">
                    <div className="title-task-and-star">
                      <h3>{data?.title}</h3>
                      <div className="right-btns-content-task">
                        <a href="#!" className="btn-time-task">
                          {data?.timeToComplete}{" "}
                          {curLang === "en" ? "minutes" : "минут"}
                        </a>
                        <a href="#!" className="btn-green-task">
                          {data?.tokensReward}{" "}
                          {curLang === "en" ? "tokens" : "токенов"}
                        </a>
                        <a href="#!" className="btn-green-task">
                          {data?.expReward} exp
                        </a>
                      </div>
                    </div>
                    <p className="text-task-block">{data?.description}</p>
                    <div className="title-task-and-star">
                      <h3 className="instr-title">
                        {curLang === "en" ? "Instruction" : "Инструкция"}
                      </h3>
                    </div>
                    <div>
                      <ul>
                        <li>
                          <p className="text-task-block instr-task">
                            {curLang === "en"
                              ? "Follow the link below and download the archive."
                              : "Перейдите по ссылке ниже и скачайте архив."}
                          </p>
                        </li>
                        <li>
                          <p className="text-task-block instr-task">
                            {curLang === "en"
                              ? "After downloading the archive, open or unzip it. Make screenshots of the entire screen on which the unpacked or open archive."
                              : "Скачав архив, откройте или распакуйте его. Сделайте скриншоты всего экрана, на которых виден распакованный или открытый архив."}
                          </p>
                        </li>
                        <li>
                          <p className="text-task-block instr-task">
                            {curLang === "en"
                              ? "Send the screenshots using the form below. Your application will be processed within 24 hours."
                              : "Отправьте сделанные скриншоты на проверку с помощью формы снизу. Ваша заявка будет обработана в течение суток."}
                          </p>
                        </li>
                      </ul>
                      <a href={data?.link} className="btn-task">
                        {curLang === "en"
                          ? "Download archive"
                          : "Скачать архив"}
                      </a>
                    </div>
                    <div className="title-task-and-star">
                      <h3 className="instr-title">
                        {curLang === "en" ? "Proofs:" : "Доказательста:"}
                      </h3>
                    </div>
                    {isSuccess ? (
                      <h3 className="dropzone-success-title">
                        {curLang === "en"
                          ? "Files were submitted for verification"
                          : "Файлы успешно отправлены на проверку"}
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
                                    ? "Drag and drop screenshots to upload"
                                    : "Перетащите скриншот в эту область, чтобы загрузить"}
                                </p>
                                <p className="dropzone-space">
                                  {curLang === "en" ? "or" : "или"}
                                </p>
                                <p className="dropzone-btn">
                                  {curLang === "en"
                                    ? "Choose screenshot"
                                    : "Выберите скриншот"}
                                </p>
                              </div>
                            </section>
                          )}
                        </Dropzone>

                        <div>
                          <h3 className="accepted-files-title">
                            {curLang === "en"
                              ? "Choosen screenshots:"
                              : "Выбранные скриншоты:"}
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

export default FileSingle;
