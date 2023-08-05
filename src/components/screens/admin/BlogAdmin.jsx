import React, { useState } from "react";
import Layout from "../../layout/Layout";
import SideBarAdmin from "../../shared/SideBarAdmin";
import {
  useAddArticleMutation,
  useUploadImgMutation,
} from "../../../store/article/articleApiSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";

import IconUpload from "../../../assets/img/icons-upload.svg";

const BlogAdmin = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [text, setText] = useState("");
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const [addArticle] = useAddArticleMutation();
  const [uploadImg] = useUploadImgMutation();

  const addArticleFunc = async (e) => {
    e.preventDefault();

    if (title.length > 0 && desc.length > 0 && text.length > 0) {
      try {
        const addData = {
          title: title,
          description: desc,
          text,
        };
        const response = await addArticle(addData);
        console.log(response);
        if (response.data) {
          for (let i = 0; i < acceptedFiles.length; i++) {
            let formData = new FormData();
            formData.append("file", acceptedFiles[i]);
            console.log(formData, acceptedFiles[i]);
            try {
              const responseFile = await uploadImg({
                articleId: response.data.id,
                formData,
              });
              console.log(responseFile);
              if (responseFile.data) {
                setIsSuccess(true);
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              }
            } catch (err) {
              console.log(err);
            }
          }
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
      <Layout title="Rocketcoin - Админ">
        <section className="content-lk">
          <a href="#!" className="btn-open-modal-panel-lk">
            Меню кабинета -- Админ
          </a>
          <SideBarAdmin />
          <div className="right-content-lk">
            <div className="title-btn-cont">
              <h1 className="title-page-lk">Добавить статью</h1>
            </div>
            <div className="wrapper-page-lk">
              <form
                action="#!"
                method="post"
                className="form-login form-article"
              >
                <div className="label-content-form">
                  <label>
                    Название
                    <input
                      type="text"
                      name="title"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      autocomplete="one-time-code"
                    />
                  </label>
                  <label>
                    Краткое описание
                    <input
                      type="text"
                      name="desc"
                      required
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      autocomplete="one-time-code"
                    />
                  </label>
                </div>
                <label>Текст</label>
                <ReactQuill
                  theme="snow"
                  value={text}
                  onChange={setText}
                  style={{ width: "100%" }}
                />
                <label>Изображение</label>
                <Dropzone
                  onDrop={(acceptedFiles) => setAcceptedFiles(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section className="full-width">
                      <div
                        {...getRootProps({
                          className: `dropzone ${isError && "dropzone-error"}`,
                        })}
                      >
                        <input {...getInputProps()} />
                        <img src={IconUpload} alt="icon upload" />
                        <p className="dropzone-text">
                          Перетащите файл в эту область, чтобы загрузить
                        </p>
                        <p className="dropzone-space">или</p>
                        <p className="dropzone-btn">Выберите файл</p>
                      </div>
                    </section>
                  )}
                </Dropzone>

                <div>
                  <h3 className="accepted-files-title">Выбранные файлы:</h3>
                  {acceptedFiles.map((item) => {
                    console.log(item);
                    return <p className="accepted-files-text">{item.name}</p>;
                  })}
                </div>
                {isError && <p className="label-error">Заполните все поля!</p>}

                <div className="btn-content-form-login">
                  <button type="submit" onClick={(e) => addArticleFunc(e)}>
                    {isSuccess ? "Успешно добавлено" : "Добавить"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    </main>
  );
};

export default BlogAdmin;
