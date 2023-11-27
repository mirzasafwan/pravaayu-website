import moment from "moment";
import React, { useEffect, useState } from "react";
const BlogProductRight = ({ blogProductData }) => {
  const [tags, setTags] = useState(null);
  useEffect(() => {
    if (blogProductData?._embedded["wp:term"].length == 2) {
      setTags(blogProductData?._embedded["wp:term"]);
    } else if (blogProductData?._embedded["wp:term"].length > 2) {
      let newData = blogProductData?._embedded["wp:term"].splice(0, 2);
      setTags(newData);
    } else {
      setTags(null);
    }
  }, [blogProductData]);
  return (
    <>
      <div id="blog-p-right">
        <div id="blog-p-top">
          <img
            src={blogProductData?._embedded["wp:featuredmedia"][0]?.source_url}
            alt="Blog Product Image"
          />
          <div
            id="blog-p-shadow-box"
            onClick={() => window.open(blogProductData?._embedded["wp:term"][0][0]?.link.replace("blog-old", "blog"))}
          >
            {blogProductData?._embedded["wp:term"][0][0]?.name}
          </div>
        </div>
        {tags !== null && (
          <div id="mid-bl">
            <a href={tags[0][0]?.link.replace("blog-old", "blog")} target="_blank">
              <span>{tags[0][0]?.name}</span>
            </a>
            <a href={tags[1][0]?.link.replace("blog-old", "blog")} target="_blank">
              <span>{tags[1][0]?.name}</span>
            </a>
            <a href={tags[1][1]?.link.replace("blog-old", "blog")} target="_blank">
              <span>{tags[1][1]?.name}</span>
            </a>
          </div>
        )}
        <h1 id="heading" dangerouslySetInnerHTML={{ __html: blogProductData?.title.rendered }}></h1>
        <div id="blog-info">
          <div>
            By <span>{blogProductData?._embedded.author[0]?.name}</span>
          </div>
          <div>
            <img
              src="https://media.bookeventz.com/html/ui_website/blog-section/ph_clock.svg"
              alt="Blog time"
            />
            {moment(blogProductData?.date).format("ll")}
          </div>
        </div>
        <div
          id="blog-whole-info"
          dangerouslySetInnerHTML={{ __html: blogProductData?.content.rendered }}
        ></div>
      </div>
    </>
  );
};

export default BlogProductRight;
