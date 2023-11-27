import React, { useEffect, useState } from "react"; {/*useRef*/}
// import ReCAPTCHA from "react-google-recaptcha";
import {
  EmailShareButton,
  FacebookShareButton,
  PinterestShareButton,
  WhatsappShareButton
} from "react-share";
import config from "@/lib/config";
// import BlogIdea from "../BlogSection/BlogIdea";
// import BookeventzServices from "../BlogSection/BookeventzServices";
// import DownloadApp from "../BlogSection/DownloadApp";
// import SimilarBlogs from "../BlogSection/SimilarBlogs";
import BlogProductLeft from "@/components/BlogProduct/BlogProductLeft";
import BlogProductRight from "@/components/BlogProduct/BlogProductRight";
const BlogProduct = ({
  //sessionData,
  //weddingServiceData,
  blogProductData,
  //similarBlogs,
  //loginPopup,
  subscribeCall,
}) => {
  // const [isBtnSubmit, setIsBtnSubmit] = useState("disabled");
  // const captchaRef = useRef(null);
  const [link, setLink] = useState("");
  // const onChangeCaptcha = (value) => {
  //   if (value == null) {
  //     setIsBtnSubmit("disabled");
  //   } else {
  //     setIsBtnSubmit("");
  //   }
  // };
  // const postComment = () => {
  //   if ("userName" in sessionData) {
  //     console.log("Hello");
  //   } else {
  //     loginPopup(true);
  //   }
  // };
  useEffect(() => {
    let linkNew = blogProductData?.link.replace("blog-old", "blog");
    setLink(linkNew);
  }, [blogProductData]);

  return (
    <>

      <div id="blog-ty">
        <div id="blog-product-breadcrumb">
          <a href={config.BASE_URL}>
            <span id="bcu">Home</span>
          </a>
          <span id="bcu-active">{">"}</span>
          <a href={config.BASE_URL + "blog/"}>
            <span id="bcu">Blog</span>
          </a>
          <span id="bcu-active">{">"}</span>
          <a
            href={`${config.BASE_URL}blog/category/${blogProductData?._embedded !== undefined &&
              blogProductData?._embedded["wp:term"][0][0]?.slug
              }`}
          >
            <span id="bcu">
              {" "}
              {blogProductData?._embedded !== undefined &&
                blogProductData?._embedded["wp:term"][0][0]?.name}
            </span>
          </a>
          <span id="bcu-active">{">"}</span>
          <a href={link}>
            {/* {window.innerWidth > 768 ? ( */}
            <span
              id="bcu"
              dangerouslySetInnerHTML={{ __html: blogProductData?.title?.rendered }}
            ></span>
            {/* ) : ( */}
            {/* <span
                id="bcu"
                dangerouslySetInnerHTML={{
                  __html:
                    blogProductData?.title.rendered.length > 15
                      ? blogProductData?.title.rendered.slice(0, 15)
                      : blogProductData?.title.rendered + "...",
                }}
              ></span> */}
            {/* )} */}
          </a>
        </div>
        <div id="blog-product-main">
          <BlogProductRight blogProductData={blogProductData} />
          <BlogProductLeft subscribeCall={subscribeCall} />
        </div>
        <div id="share-blog-section">
          <span id="share-blog-heading">Share Blog</span>
          <div id="share-blog-icons">
            {/* <InstapaperShareButton
              title={blogProductData?.link}
              description={blogProductData?.title.rendered}
            >
              <img
                src="https://media.bookeventz.com/html/ui_website/blog-section/budget_insta.svg"
                alt="Instagram Link"
              />
            </InstapaperShareButton> */}

            <PinterestShareButton
              url={link}
              media={link}
              description={blogProductData?.title?.rendered}
            >
              <img
                src="https://media.bookeventz.com/html/ui_website/blog-section/budget-pint.svg"
                alt="Pinterest Link"
              />
            </PinterestShareButton>

            <FacebookShareButton
              url={blogProductData?.link}
              quote={blogProductData?.title?.rendered}
            >
              <img
                src="https://media.bookeventz.com/html/ui_website/blog-section/budget_faceb.svg"
                alt="Facebook Link"
              />
            </FacebookShareButton>

            <EmailShareButton url={link} subject={blogProductData?.title?.rendered}>
              <img
                src="https://media.bookeventz.com/html/ui_website/blog-section/blog_gmail.svg"
                alt="Gmail Link"
              />
            </EmailShareButton>

            <WhatsappShareButton url={link} title={blogProductData?.title?.rendered}>
              <img
                src="https://media.bookeventz.com/html/ui_website/blog-section/blog_whatsapp.svg"
                alt="Whatsapp Link"
              />
            </WhatsappShareButton>
          </div>
        </div>
        <div id="about-author">
          <span id="author-heading">Author</span>
          {blogProductData?._embedded !== undefined &&
            <div id="author-info">
              <div id="author-image">
                <img
                  src={blogProductData?._embedded.author[0]?.avatar_urls !== undefined ? blogProductData?._embedded.author[0]?.avatar_urls['96'] : 'https://media.bookeventz.com/html/ui_website/blog-section/jay-bhavsar+(1).jpg'}
                  alt="Author Image"
                />
              </div>
              <div id="author-infor">
                <span id="author-name">{blogProductData?._embedded.author[0]?.name}</span>
                <span id="author-prof">
                  {blogProductData?._embedded.author[0]?.description}
                </span>
              </div>
            </div>
          }
        </div>
        {/* <div id="leave-comment">
          <span id="share-blog-heading">Leave a comment</span>
          <input type="text" placeholder="Name" id="name-field" />
          <textarea type="text" id="text-field" draggable={false} />

          <span id="captcha_here">
            <ReCAPTCHA
              sitekey={"6LdJnyYkAAAAAPhRHVnkjC9kuF9bd1QwJeoP9r-d"}
              ref={captchaRef}
              onChange={(e) => onChangeCaptcha(e)}
            />
          </span>
          <button
            className={isBtnSubmit == "disabled" ? "disabled" : ""}
            disabled={isBtnSubmit}
            onClick={() => postComment()}
          >
            Post
          </button>
        </div> */}
        {/* <SimilarBlogs similarBlogs={similarBlogs} config={config} /> */}
        {/* <div id="blog-idea-wrapper">
          <BlogIdea sessionData={sessionData} />
        </div> */}
        {/* <div id="download-wrapper">
          <DownloadApp />
        </div> */}
        {/* <div id="bkz-services-wrapper">
          <BookeventzServices weddingServiceData={weddingServiceData} sessionData={sessionData} />
        </div> */}
      </div>
    </>
  );
};

export default BlogProduct;
