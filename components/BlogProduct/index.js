var React = require("react");
var axios = require("axios");
import querystring from "querystring";
import constants from "@/lib/constants";
import BlogProduct from "@/components/BlogProduct/BlogProduct";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
import LayoutComponent from "../Layout";


// if (typeof window === "undefined") {
//   global.window = {};
// }
class BlogProductComponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otherProps: {
        cityList: [],
        areaList: [],
        occasionList: [],
      },
      newcitySession: this.props.sessionData,
      sessionData: this.props.sessionData,
      cityList: this.props.cityList,
      areaList: this.props.areaList,
      occasionList: this.props.occasionList,
      weddingServiceData: [],
      similarBlogs: [],
    };
    console.log(this.props,'props in the client')
    // this.getAnalytics();
  }

  getAnalytics() {
    // if (typeof window !== "undefined" && window.localStorage) {
    //   var pageType = "buildEventWebsite";
    //   localStorage.setItem("pageType", pageType);

    //   (function (i, s, o, g, r, a, m) {
    //     i["GoogleAnalyticsObject"] = r;
    //     (i[r] =
    //       i[r] ||
    //       function () {
    //         (i[r].q = i[r].q || []).push(arguments);
    //       }),
    //       (i[r].l = 1 * new Date());
    //     (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    //     a.async = 1;
    //     a.src = g;
    //     m.parentNode.insertBefore(a, m);
    //   })(
    //     window,
    //     document,
    //     "script",
    //     "//www.google-analytics.com/analytics.js",
    //     "ga"
    //   );

    //   ga("create", "UA-39073605-1", {
    //     siteSpeedSampleRate: 30,
    //   });
    //   ga("send", "pageview");
    // }
  }

  componentDidMount() {
    setTimeout(() => {
      // this.getWeddingDealsData();
      this.getSimilarBlogs();
    }, 5000);
  }

  handleScrollTop = () => {
    let element = $("#header");
    let offsetAboutTop = element.offset();
    let aboutScreen = offsetAboutTop.top - 0;
    window.scrollTo({
      top: aboutScreen,
      behavior: "auto",
    });
  };
  getWeddingDealsData = () => {
    let url = "https://apitest.bookeventz.com/BlogSection/bookWeddingService";
    try {
      axios.get(url).then((res) => {
        this.setState({ weddingServiceData: res.data.data });
      });
    } catch (error) {
      console.log(error, "error message");
    }
  };
  getSimilarBlogs = () => {
    if(this.props?.blogProductData){
      let category = this.props?.blogProductData[0].categories[0];
      let url = `${constants.BLOG_BASE_URL}posts?_embed&per_page=10&page=1&categories=${category}`;
      console.log(url, "urllll");
      try {
        axios.get(url).then((res) => {
          this.setState({ similarBlogs: res.data });
        });
      } catch (error) {
        console.log(error, "error message");
      }
    }
  };
  loginPopup = (isShowLoginModal) => {
    var url = window.location.href;
    var that = this;
    let pathname = new URL(url).pathname;
    let pathArray = pathname.split("/");
    var city = pathArray[2];
    var props = {
      config: this.props.config,
      constants: this.props.constants,
      sessionData: this.props.sessionData,
      occasionList: this.props.occasionList,
      areaList: this.props.areaList,
      citySelected: { city },
      cityList: this.props.cityList,
      pageType: "realEventProduct",
      filters: this.props.filters,
      data: isShowLoginModal,
      isShowLoginModal:
        isShowLoginModal.isShowLoginModal != undefined
          ? isShowLoginModal.isShowLoginModal
          : isShowLoginModal,
      callType: "login",
      reviewLogin: isShowLoginModal.reviewLogin,
    };
    // ReactDOM.unmountComponentAtNode(document.getElementById("login"));
    ReactDOM.render(
      React.createElement(HeaderLoginSection, props),
      document.getElementById("login")
    );
  };
  subscribeCall = (email) => {
    let url = `${constants.BLOG_BASE_URL}posts?_embed&per_page=10&page=1&categories`;
    let data = {
      email: email,
    };
    try {
      axios.post(url, querystring.stringify(data)).then((res) => {
        console.log(res.data, "reponse");
      });
    } catch (error) {
      console.log(error, " error message");
    }
  };
  render() {
    let that = this;
    var { weddingServiceData, similarBlogs } = this.state;
    const { blogProductData } = this.props;
    return (
      <LayoutComponent title={'Blog Listing'} {...this.props}>
      <div>
        {/* <div id="header">
          <Header
            props={this.props}
            otherProps={this.state}
            newcitySession={this.props.sessionData}
            sessionData={this.props.sessionData}
            areaList={this.props.areaList}
            pageType={this.props.pageType}
            cityList={this.state.cityList}
          />
        </div> */}
        {blogProductData !== null && (
          <BlogProduct
            sessionData={this.props.sessionData}
            weddingServiceData={weddingServiceData}
            blogProductData={blogProductData!=null && blogProductData[0]}
            similarBlogs={similarBlogs}
            loginPopup={this.loginPopup}
            subscribeCall={this.subscribeCall}
          />
        )}
        {/* <Footer
          props={this.props}
          otherProps={this.state}
          newcitySession={this.props.sessionData}
          userData={this.state.userData}
          sessionData={this.props.sessionData}
          cityList={this.state.cityList}
          areaList={this.props.areaList}
          pageType={this.props.pageType}
        /> */}
      </div>
      </LayoutComponent>
    );
  }
}
export default BlogProductComponents;
