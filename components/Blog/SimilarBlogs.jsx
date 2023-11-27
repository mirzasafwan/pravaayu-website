import React, {useState, useEffect} from "react";
import moment from "moment";
const SimilarBlogs = ({similarBlogs,config}) => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    let blogList = similarBlogs;
    let newBlogList = blogList?.length > 5 ? blogList.splice(0, 5) : blogList;
    setBlogs(newBlogList);
  }, [similarBlogs]);
  return (
    <>
      <div id="similar-blogs-wrapper">
        <span id="similar-blog-heading">Similar Blogs</span>
        <div id="similar-blogs-list">
          {blogs !== null &&
            blogs !== undefined &&
            blogs.length > 0 &&
            blogs.map((blog, index) => {
              let imageSource = blog?._embedded["wp:featuredmedia"][0]?.source_url;
              let title = blog?._embedded["wp:featuredmedia"][0]?.title.rendered;
              let categoryTerms = blog?._embedded["wp:term"];
              return (
                <div id="blog-card">
                  <div id="bl-top">
                    <img src={imageSource} alt={title} />
                    {categoryTerms[0].length > 0 &&
                      categoryTerms[0].splice(0, 0) &&
                      categoryTerms[0].map((cat, index) => {
                        return <span>{cat.name}</span>;
                      })}
                  </div>
                  <div id="mid-bl">
                    {categoryTerms[1].length > 0 &&
                      categoryTerms[1].length == 2 &&
                      categoryTerms[1].map((category, index) => {
                        return (
                          <a href={category.link.replace("blog-old", "blog")} target="_blank">
                            <span>{category.name}</span>
                          </a>
                        );
                      })}
                  </div>
                  <a href={'https://www.bookeventz.com/blog/'+blog.slug+'/'} target="_blank">
                    {/* <span id="heading">{blog.title.rendered !== null && blog.title.rendered}</span> */}
                    {/* {blog.title.rendered !== null && 
                        <span id="heading" dangerouslySetInnerHTML={{__html: blog?.title?.rendered}}></span>
                      } */}
                  </a>
                  <div id="blog-info">
                    <div>
                      By <span>{blog._embedded.author[0]?.name}</span>
                    </div>
                    <div>
                      <img
                        src="https://media.bookeventz.com/html/ui_website/blog-section/ph_clock.svg"
                        alt="Blog time"
                      />
                      {moment(blog.date).format("ll")}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SimilarBlogs;
