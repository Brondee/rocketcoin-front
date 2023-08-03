import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import SideBarAdmin from "../../shared/SideBarAdmin";
import {
  useDeleteFileApproveMutation,
  useEditFileApproveMutation,
  useGetFileApproveByIdQuery,
  useGetFileImgMutation,
} from "../../../store/file/fileApiSlice";
import {
  useAddUserTokensMutation,
  useLevelUpUserMutation,
} from "../../../store/user/userApiSlice";
import axios from "axios";

const FileSingleAdmin = () => {
  const [files, setFiles] = useState([]);
  const [curFilePath, setCurFilePath] = useState("");
  const [isFileActive, setIsFileActive] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [getFile] = useGetFileImgMutation();
  const [editFileApprove] = useEditFileApproveMutation();
  const [addUserTokens] = useAddUserTokensMutation();
  const [levelUpUser] = useLevelUpUserMutation();
  const [deleteFileApprove] = useDeleteFileApproveMutation();
  const reqUrl = process.env.REACT_APP_REQUEST_URL;

  const getData = useCallback(useGetFileApproveByIdQuery, [
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

  const confirmFile = async (e) => {
    e.preventDefault();

    try {
      const response = await editFileApprove({
        id: Number(window.location.href.split("/")[4]),
        isApproved: true,
      });
      const userResp = await addUserTokens({
        userId: data?.userId,
        tokens: data?.file?.tokensReward,
      });
      const expResp = await levelUpUser({
        userId: data?.userId,
        exp: data?.file?.exp,
      });
      if (response.data && userResp.data && expResp.data) {
        setIsSuccess(true);
        setTimeout(() => {
          window.location.href = "https://rocket-coin.online/admin_files";
        }, 2000);
      }
      console.log({ response, userResp, expResp });
    } catch (err) {
      console.log(err);
    }
  };

  const declineFile = async (e) => {
    e.preventDefault();

    try {
      const response = await deleteFileApprove(
        Number(window.location.href.split("/")[4])
      );
      if (response.data) {
        setIsSuccess(true);
        setIsSuccess(true);
        setTimeout(() => {
          window.location.href = "https://rocket-coin.online/admin_files";
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
        try {
          const response = await axios(
            `${reqUrl}/file/file/${data?.files[i].fileUrl}`,
            {
              responseType: "blob",
            }
          );
          const respData = response.data;
          console.log(respData);
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
            <h1 className="title-page-lk">Файл -- Aдмин</h1>
            <div className="wrapper-page-lk">
              <div className="content-block-flex-lk-white">
                <div className="task-offers-content">
                  <div className="task-offers task-offers-2">
                    <div className="title-task-and-star">
                      <h3>{data?.file?.title}</h3>
                      <div className="right-btns-content-task">
                        <a href="#!" className="btn-time-task">
                          {data?.file?.timeToComplete} минут
                        </a>
                        <a href="#!" className="btn-green-task">
                          {data?.file?.tokensReward} токенов
                        </a>
                        <a href="#!" className="btn-green-task">
                          {data?.file?.expReward} токенов
                        </a>
                      </div>
                    </div>
                    <p className="text-task-block">{data?.file?.description}</p>
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
                            onClick={(e) => confirmFile(e)}
                          >
                            Подтвердить
                          </a>
                          <a
                            href="#!"
                            class="btn-task"
                            onClick={(e) => declineFile(e)}
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

export default FileSingleAdmin;
