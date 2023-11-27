import React, { useEffect } from "react";

const BlogInfo = ({ blogList, pageType, description }) => {
  useEffect(() => { }, [blogList]);

  return (
    <>
      {pageType !== "homeBlogListing" && (
        <div id="blog-info-main">
          {/* {pageType == "categoryBlogListing" && (
            <>
              <div id="blog-09-info" dangerouslySetInnerHTML={{ __html: description }}></div>
            </>
          )} */}
        </div>
      )}
    </>
  );
};

export default BlogInfo;
