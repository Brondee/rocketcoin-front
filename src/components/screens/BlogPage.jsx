import React, { useEffect } from "react";
import Layout from "../layout/Layout";
import {
  useGetArticleByIdQuery,
  useGetThreeArticlesQuery,
  useIncrementViewsMutation,
} from "../../store/article/articleApiSlice";
import BlogItem from "../shared/BlogItem";

const BlogPage = () => {
  const { data } = useGetArticleByIdQuery(
    Number(window.location.href.split("/")[4])
  );
  const articlesResp = useGetThreeArticlesQuery();

  const [incrementViews] = useIncrementViewsMutation();

  useEffect(() => {
    const incrFunc = async () => {
      const resp = await incrementViews({
        articleId: Number(window.location.href.split("/")[4]),
      });
      console.log(resp);
    };
    incrFunc();
  }, [incrementViews]);

  return (
    <main>
      <Layout title="Rocketcoin - Блог загрузка">
        <section class="blog-section">
          <div class="container">
            <div class="blog-page-section">
              <span>21 DEC 2021</span>
              <h1>{data?.title}</h1>
              <p class="blog-page-section-p-first">{data?.description}</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.text,
                }}
              ></div>
            </div>
            <div
              className="blog-container"
              onClick={() => window.location.reload()}
            >
              {articlesResp?.data?.map((item) => {
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
                    isMain={false}
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

export default BlogPage;
