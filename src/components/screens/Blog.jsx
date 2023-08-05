import React from "react";
import Layout from "../layout/Layout";
import { useGetArticlesQuery } from "../../store/article/articleApiSlice";

import arrNews from "../../assets/arr-news.svg";
import BlogItem from "../shared/BlogItem";

const Blog = () => {
  const { data } = useGetArticlesQuery();
  console.log(data);

  return (
    <main>
      <Layout title="Rocketcoin - Блог">
        <section class="blog-section">
          <div class="container">
            <div class="blog-title">
              <h1>Полезные статьи</h1>
              <a href="#!">
                Все новости
                <img src={arrNews} alt="" />
              </a>
            </div>
            <div class="blog-container">
              {data?.map((item, index) => {
                const { id, title, description, views, createdAt, imgs } = item;

                return (
                  <BlogItem
                    key={id}
                    id={id}
                    title={title}
                    description={description}
                    views={views}
                    createdAt={createdAt}
                    imgLink={imgs[0]?.fileUrl}
                    isMain={index === 0}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </Layout>
    </main>
  );
};

export default Blog;
