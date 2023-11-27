import React from "react";

const DownloadMobileApp = () => {
  return (
    <>
      <div id="bk-app-mobile">
        <img
          src="https://media.bookeventz.com/html/ui_website/blog-section/blog_app_mobile.svg"
          alt="Bookeventz app mobile image"
        />
        <div id="dapp-wrapper" className="mobile-op">
          <input type="email" placeholder="Enter your email" />
          <button>Get Link</button>
        </div>
        <div id="app-d-options" className="mobile-ops">
          <a
            href="https://play.google.com/store/apps/details?id=com.bookeventz.venue"
            target="_blank"
          >
            <img
              src="https://media.bookeventz.com/html/ui_website/blog-section/budget_g.svg"
              alt="PlayStore Icon"
            />
          </a>
          <a href="https://apps.apple.com/us/app/bookeventz-venue/id1576848684" target="_blank">
            <img
              src="https://media.bookeventz.com/html/ui_website/blog-section/budget_apps.svg"
              alt="AppStore Icon"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default DownloadMobileApp;
