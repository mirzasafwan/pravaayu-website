import React from "react";

const BlogIdea = ({ sessionData }) => {
  return (
    <>
      <div id="blog-idea">
        <span id="idea-one">Idea Collection</span>
        <span id="fiu">Our Curated List of Ideas for Each category</span>
        <div id="idea-list">
          <a href={`https://www.bookeventz.com/blog/category/wedding-decor`} target="_blank">
            <div id="idea-card">
              <img
                src="https://media.bookeventz.com/html/ui_website/blog-section/blog_wedding.svg"
                alt="Budget idea image"
              />
              <span id="nig">Wedding Ideas</span>

              <div>
                Explore <span>{">"}</span>
              </div>

              <div id="idea-cover"></div>
            </div>
          </a>
          <a href={`https://www.bookeventz.com/blog/category/makeup-ideas`} target="_blank">
            <div id="idea-card">
              <img
                src="https://media.bookeventz.com/html/ui_website/blog-section/blog_makeup.svg"
                alt="Makeup image"
              />
              <span id="nig">Makeup Ideas</span>

              <div>
                Explore <span>{">"}</span>
              </div>

              <div id="idea-cover"></div>
            </div>
          </a>
          <a href={`https://www.bookeventz.com/blog/category/mehendi-ideas`} target="_blank">
            <div id="idea-card">
              <img
                src="https://media.bookeventz.com/html/ui_website/blog-section/blog_mehendi.svg"
                alt="Mehendi idea image"
              />
              <span id="nig">Mehendi Ideas</span>

              <div>
                Explore <span>{">"}</span>
              </div>

              <div id="idea-cover"></div>
            </div>
          </a>
          <a href={`https://www.bookeventz.com/blog/category/birthday-party`} target="_blank">
            <div id="idea-card">
              <img
                src="https://media.bookeventz.com/html/ui_website/blog-section/blog_birthday.svg"
                alt="Birthday image"
              />
              <span id="nig">Birthday Party</span>

              <div>
                Explore <span>{">"}</span>
              </div>

              <div id="idea-cover"></div>
            </div>
          </a>
          <a href={`https://www.bookeventz.com/blog/category/corporate-party`} target="_blank">
            <div id="idea-card">
              <img
                src="https://media.bookeventz.com/html/ui_website/blog-section/blog_corporate.svg"
                alt="Corporate events Image"
              />
              <span id="nig">Corporate Party</span>
              <div>
                Explore <span>{">"}</span>
              </div>
              <div id="idea-cover"></div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default BlogIdea;
