import moment from "moment";
import React, { useEffect } from "react";
import BlogInfo from "./BlogInfo";
const BlogMain = ({ blogList, pageType, description, categoryName, isSearch, config }) => {
  useEffect(() => { }, [blogList]);
  return (
    <>
      <div id="blog-list">
        {!isSearch &&
          <BlogInfo categoryName={categoryName} pageType={pageType} description={description} />
        }
        <div id="blog-lists">
          {blogList !== undefined &&
            blogList !== null &&
            blogList.length > 0 &&
            blogList.map((blog, index) => {
              let imageSource =
                blog?._embedded["wp:featuredmedia"] !== undefined &&
                  blog?._embedded["wp:featuredmedia"]
                  ? blog?._embedded["wp:featuredmedia"][0]?.source_url
                  : "";
              let categoryTerms =
                blog?._embedded["wp:term"] !== undefined && blog?._embedded["wp:term"];
              let newCategoryData = [];
              if (categoryTerms[0].length > 1) {
                let nData = categoryTerms[0].splice(0, 1);
                newCategoryData = nData;
              } else {
                newCategoryData = categoryTerms[0];
              }
              const removedText = blog.excerpt.rendered.replace("Views", "");
              const replacedText = removedText.replace(/(\d+.*?\d+)/, (match) => {
                const numbers = match.match(/\d+/g);
                if (numbers && numbers.length >= 2) {
                  return match.replace(numbers[1], "");
                }
                return match;
              });
              return (
                <>
                  <div id="blog-card">
                    <a href={config.BASE_URL + "blog/" + blog.slug + "/"} target="_blank">
                      <div id="bl-top">
                        <img src={imageSource} alt="Blog image" />
                        {categoryTerms[0].length > 0 &&
                          categoryTerms[0].splice(0, 0) &&
                          categoryTerms[0].map((cat, index) => {
                            return <span onClick={() => window.open(cat.link.replace("blog-old", "blog"))}>{cat.name}</span>;
                          })}
                      </div>
                    </a>
                    <div id="mid-bl">
                      {categoryTerms[1].length > 0 &&
                        categoryTerms[1].slice(0, 3).map((category, index) => {
                          return (
                            <a href={category.link.replace("blog-old", "blog")} target="_blank">
                              <span>{category.name}</span>
                            </a>
                          );
                        })}
                    </div>
                    <a href={config.BASE_URL + "blog/" + blog.slug + "/"} target="_blank">
                      {/* {blog.title.rendered !== null &&  */}
                      <span id="heading" dangerouslySetInnerHTML={{ __html: blog?.title?.rendered }}></span>
                      {/* } */}
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
                    {/* <div
                      id="blog-info"
                      className="blog-info"
                      dangerouslySetInnerHTML={{ __html: replacedText }}
                    ></div> */}
                  </div>
                  {index == 6 && (
                    <div id="mobile-subscribe">
                      <span id="opus">Subscribe to the Ultimate</span>
                      <span id="yiss">Idea Blogs For Your Event</span>
                      <input type="text" placeholder="@gmail.com" />
                      <button>Submit</button>
                    </div>
                  )}
                  {index == 8 && (
                    <a
                      href="https://www.instagram.com/bookeventz/?hl=en"
                      target="_blank"
                      id="linko"
                    >
                      <div id="insta-image-href">
                        <img
                          src="https://media.bookeventz.com/html/ui_website/blog-section/mobile_insta.svg"
                          alt="Instagram follow icon"
                        />
                      </div>
                    </a>
                  )}
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default BlogMain;
