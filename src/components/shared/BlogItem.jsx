import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import imgBlog from "../../assets/img-blog.svg";
import eye from "../../assets/eye.svg";

const BlogItem = ({
  id,
  title,
  description,
  views,
  createdAt,
  imgLink,
  isMain,
}) => {
  const [img, setImg] = useState("");

  const reqUrl = process.env.REACT_APP_REQUEST_URL;

  useEffect(() => {
    const setFilesArray = async () => {
      if (imgLink) {
        try {
          const response = await axios(`${reqUrl}/article/img/${imgLink}`, {
            responseType: "blob",
          });
          const respData = response.data;
          if (respData) {
            setImg(URL.createObjectURL(respData));
            console.log(URL.createObjectURL(respData));
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    setFilesArray();
  }, [reqUrl, imgLink]);

  return (
    <div class={`${isMain ? "blog-main-block" : "blog-container-block"}`}>
      <div
        class={`${isMain ? "blog-main-block-img" : "blog-container-block-img"}`}
      >
        <img src={img ? img : imgBlog} alt="" />
      </div>
      <div
        class={`${
          isMain ? "blog-main-block-content" : "blog-container-block-content"
        }`}
      >
        <div
          class={`${
            isMain ? "blog-main-block-content-top" : "blog-container-block-top"
          }`}
        >
          <div class="date-blog">
            {new Date(createdAt).toLocaleString("ru-RU", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </div>
          <span>
            <img src={eye} alt="" class="eye" />
            {views?.length}
          </span>
        </div>
        {isMain ? <h3>{title}</h3> : <p>{title}</p>}
        {isMain && <p>{description}</p>}
        <Link to={`/blog-page/${id}`}>Читать целиком</Link>
      </div>
    </div>
  );
};

export default BlogItem;
