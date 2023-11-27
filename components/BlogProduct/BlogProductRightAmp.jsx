import moment from "moment";
import React, { useEffect, useState } from "react";
import useWindowDimensions from './UseWindowDimension';
const midBL = { "padding": "24px 7px 0px 0px", "margin": "0px", "display": "flex", "flexDirection": "row", "justifyContent": "flex-start", "gap": "16px" };
const midBlSpan = { "fontSize": "12px", "cursor": "pointer", "fontStyle": "normal", "fontWeight": "400", "lineHeight": "normal", "textTransform": "capitalize", "color": "#e42987", "fontFamily": "Metropolis, sans-serif" };
const BlogProductRightAmp = ({ blogProductData }) => {
  const [tags, setTags] = useState(null);
  const { height, width } = useWindowDimensions();

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
          <amp-layout layout="container" width={width} height={'250px'}>
            <amp-img
              src={blogProductData._embedded['wp:featuredmedia'][0].source_url}
              width={width}
              height="250"
              layout="responsive"
              sizes={`(min-width: 320px) ${width}px, ${250}px`}
            >
            </amp-img>
          </amp-layout>
          {/* <img
            src={blogProductData?._embedded["wp:featuredmedia"][0]?.source_url}
            alt="Blog Product Image"
          /> */}
          <div
            id="blog-p-shadow-box"
            style={{ padding: '0px 16px' }}
            onClick={() => window.open(blogProductData?._embedded["wp:term"][0][0]?.link.replace("blog-old", "blog"))}
          >
            {blogProductData?._embedded["wp:term"][0][0]?.name}
          </div>
        </div>
        <div style={{ padding: '0px 16px' }}>
          {(blogProductData?._embedded["wp:term"] !== null && blogProductData?._embedded["wp:term"].length == 2) && (
            <div id="mid-bl" style={midBL}>
              {blogProductData?._embedded["wp:term"][1].map((tagTerm, i) => {
                return <a key={i} href={tagTerm?.link.replace("blog-old", "blog")} target="_blank" style={{ textDecoration: 'none' }}>
                  <span style={midBlSpan}>{tagTerm?.name}</span>
                </a>
              })}

            </div>
          )}
          <span id="heading" style={{ "margin": "0px", "padding": "16px 0px 0px 0", "display": "flex", "width": "100%", "color": "#333", "fontFamily": "Metropolis, sans-serif", "fontSize": "22px", "fontStyle": "normal", "fontWeight": "600", "lineHeight": "normal", "lineBreak": "auto" }}
            dangerouslySetInnerHTML={{ __html: blogProductData?.title.rendered }}></span>
          <div id="blog-info" style={{ "fontSize": "16px", "fontWeight": "400", "lineHeight": "26px", "display": "flex", "flexDirection": "row", "justifyContent": "flex-start", "alignItems": "center", "gap": "32px", margin: "14px 0px" }}>
            <div>
              By <span style={{ color: '#e42987' }}>{blogProductData?._embedded.author[0]?.name}</span>
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
            style={{ overflow: 'auto' }}
            dangerouslySetInnerHTML={{ __html: blogProductData?.content.rendered }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default BlogProductRightAmp;
