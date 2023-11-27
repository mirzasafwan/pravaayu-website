import React, {useRef, useState, useEffect} from "react";
// import BlogIdea from "../BlogSection/BlogIdea";
import BlogProductLeft from "./BlogProductLeft";
import BlogProductRightAmp from "./BlogProductRightAmp";
import SimilarBlogs from "../BlogSection/SimilarBlogs";
// import DownloadApp from "../BlogSection/DownloadApp";
// import BookeventzServices from "../BlogSection/BookeventzServices";
import config from "../../config/config";
import {
  EmailShareButton,
  FacebookShareButton,
  PinterestShareButton,
  InstapaperShareButton,
  WhatsappShareButton,
} from "react-share";
// import ReCAPTCHA from "react-google-recaptcha";

const breadCrumbSpan = {"color":"#333","fontFamily":"Metropolis, sans-serif","fontSize":"14px","fontStyle":"normal","fontWeight":"500","lineHeight":"normal","cursor":"pointer"};
const breadCrumbA = {"textDecoration":"none"};

const BlogProductAmp = ({
  sessionData,
  weddingServiceData,
  blogProductData,
  similarBlogs,
  loginPopup,
  subscribeCall,
}) => {
  const [isBtnSubmit, setIsBtnSubmit] = useState("disabled");
  const captchaRef = useRef(null);
  const [link, setLink] = useState("");
  const onChangeCaptcha = (value) => {
    if (value == null) {
      setIsBtnSubmit("disabled");
    } else {
      setIsBtnSubmit("");
    }
  };
  const postComment = () => {
    if ("userName" in sessionData) {
      console.log("Hello");
    } else {
      loginPopup(true);
    }
  };
  useEffect(() => {
    let linkNew = blogProductData?.link.replace("blog-old", "blog");
    setLink(linkNew);
  }, [blogProductData]);

  return (
    <>
      <div id="blog-ty">
        <div id="blog-product-breadcrumb" style={{"display":"flex","flexDirection":"row","justifyContent":"space-between","padding":"10px 16px","gap":"0px","alignItems":"baseline","flexWrap":"wrap"}}>
          <a style={breadCrumbA} href={config.BASE_URL}>
            <span style={breadCrumbSpan} id="bcu">Home</span>
          </a>
          <span id="bcu-active">{">"}</span>
          <a style={breadCrumbA} href={config.BASE_URL + "blog/"}>
            <span style={breadCrumbSpan} id="bcu">Blog</span>
          </a>
          <span id="bcu-active">{">"}</span>
          <a
            style={breadCrumbA} 
            href={`${config.BASE_URL}blog/category/${
              blogProductData?._embedded !== undefined &&
              blogProductData?._embedded["wp:term"][0][0]?.slug
            }`}
          >
            <span style={breadCrumbSpan}  id="bcu">
              {" "}
              {blogProductData?._embedded !== undefined &&
                blogProductData?._embedded["wp:term"][0][0]?.name}
            </span>
          </a>
          <span id="bcu-active">{">"}</span>
          <a style={breadCrumbA}  href={link}>
            <span
              style={breadCrumbSpan}
              id="bcu"
              dangerouslySetInnerHTML={{__html: blogProductData?.title?.rendered}}
            ></span>
           
          </a>
        </div>
        <div id="blog-product-main">
          <BlogProductRightAmp blogProductData={blogProductData} />
          {/* <BlogProductLeft subscribeCall={subscribeCall} /> */}
        </div>
        <div id="share-blog-section" style={{"borderTop":"2px solid #ebebeb","padding":"34px 24px","display":"flex","flexDirection":"column","gap":"34px","marginTop":"34px"}}>
          <span id="share-blog-heading" style={{"color":"#333","fontFamily":"Metropolis, sans-serif","fontSize":"20px","fontStyle":"normal","fontWeight":"500","lineHeight":"normal"}}>Share Blog</span>
          <div id="share-blog-icons" style={{"display":"flex","justifyContent":"space-between"}}>
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
        <div id="about-author" style={{"padding":"10px 16px","gap":"15px","flexDirection":"column","display":"flex"}}>
          <span id="author-heading" style={{"color":"#333","fontFamily":"Metropolis, sans-serif","fontSize":"26px","fontStyle":"normal","fontWeight":"500","lineHeight":"normal"}}>Author</span>
          <div id="author-info" style={{"display":"flex","flexDirection":"row","justifyContent":"flex-start","alignItems":"flex-start","gap":"10px"}}>
            <div id="author-image" style={{"width":"70px","height":"70px","display":"contents"}}>
              <img
                src="https://media.bookeventz.com/html/ui_website/blog-section/jay-bhavsar+(1).jpg"
                alt="Author Image"
                style={{"flex":"0 0 20%","height":"70px","borderRadius":"5px","width":"100%","objectFit":"cover"}}
              />
            </div>
            <div id="author-infor" style={{"marginLeft":"0px","display":"flex","flexDirection":"column","gap":"10px"}}>
              <span id="author-name" style={{"color":"#333","fontFamily":"Metropolis, sans-serif","fontSize":"16px","fontStyle":"normal","fontWeight":"500","lineHeight":"normal"}}>Jay Bhavsar</span>
              <span id="author-prof" style={{"width":"100%","display":"flex","fontSize":"13px","lineHeight":"18px","fontStyle":"normal","fontWeight":"400","color":"#333","fontFamily":"Metropolis, sans-serif"}}>
                My name is Jay. I am a content writer at Bookeventz. Love writing and reading poetry
                and a big Cricket buff. Favourite movie and book of all time - The Lord Of The
                Rings.
              </span>
            </div>
          </div>
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
        <SimilarBlogs similarBlogs={similarBlogs} config={config} />
        {/* <div id="blog-idea-wrapper">
          <BlogIdea sessionData={sessionData} />
        </div>
        <div id="download-wrapper">
          <DownloadApp />
        </div>
        <div id="bkz-services-wrapper">
          <BookeventzServices weddingServiceData={weddingServiceData} sessionData={sessionData} />
        </div> */}
      </div>
    </>
  );
};

export default BlogProductAmp;
