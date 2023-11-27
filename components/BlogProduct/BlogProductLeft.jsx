import React, {useState, useEffect} from "react";
import axios from "axios";
const BlogProductLeft = ({subscribeCall}) => {
  const [email, setEmail] = useState("");
  return (
    <>
      <div id="blog-p-left">
        <div id="blog-left">
          <div id="bll-top">
            <span>Subscribe to Our Event Idea Blogs</span>
            <input
              type="text"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={() => subscribeCall(email)}>Subscribe</button>
          </div>
          <div id="bll-top-two">
            <span>Follow us For more Idea </span>
            <div id="social-icon">
              <a href="https://www.instagram.com/bookeventz/?hl=en" target="_blank">
                <img
                  src="https://media.bookeventz.com/html/ui_website/blog-section/budget_insta.svg"
                  alt="Instagram Link"
                />
              </a>
              <a href="https://www.pinterest.com/bookeventz/" target="_blank">
                <img
                  src="https://media.bookeventz.com/html/ui_website/blog-section/budget-pint.svg"
                  alt="Pinterest Link"
                />
              </a>
              <a href="https://www.facebook.com/BookEventz/" target="_blank">
                <img
                  src="https://media.bookeventz.com/html/ui_website/blog-section/budget_faceb.svg"
                  alt="Facebook Link"
                />
              </a>
            </div>
          </div>
          <a href="https://www.instagram.com/bookeventz/?hl=en" target="_blank">
            <div id="insta-blog">
              <img
                src="https://media.bookeventz.com/html/ui_website/blog-section/blog_instagram.svg"
                alt="Instgram Blog link"
              />
            </div>
          </a>
          <div id="insta-blogg">
            <img
              src="https://media.bookeventz.com/html/ui_website/blog-section/blog_invite.svg"
              alt="Invites page link"
            />
            <a href="https://www.bookeventz.com/invites/wedding" target="_blank">
              <button>Invite Now</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogProductLeft;
