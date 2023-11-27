var React = require("react");
var axios = require("axios");
import config from "@/lib/config";
import constants from "@/lib/constants";
import BlogBreadCrumb from "@/components/Blog/BlogBreadCrumb";
import BlogCategories from "@/components/Blog/BlogCategories";
import BlogIdea from "@/components/Blog/BlogIdea";
import BlogLeft from "@/components/Blog/BlogLeft";
import BlogMain from "@/components/Blog/BlogMain";
import BlogSearch from "@/components/Blog/BlogSearch";
import BlogWebStory from "@/components/Blog/BlogWebStory";
import BookeventzServices from "@/components/Blog/BookeventzServices";
import DownloadApp from "@/components/Blog/DownloadApp";
import DownloadMobileApp from "@/components/Blog/DownloadMobileApp";
import LayoutComponent from "../Layout";
import Header from '@/components/Header';

// if (typeof window === "undefined") {
//     global.window = {};
// }
class BlogListingComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props,'this.props function');
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
            section: false,
            blogList: this.props.blogList,
            categoryList: [],
            pageCount: this.props.pageCount,
            weddingServiceData: [],
            categoryId: null,
            typingTimeout: 0,
            typing: false,
            isSearch: false,
        };
        // this.getAnalytics();
    }

    getAnalytics() {
        // if (typeof window !== "undefined" && window.localStorage) {
        //     var pageType = "buildEventWebsite";
        //     localStorage.setItem("pageType", pageType);

        //     (function (i, s, o, g, r, a, m) {
        //         i["GoogleAnalyticsObject"] = r;
        //         (i[r] =
        //             i[r] ||
        //             function () {
        //                 (i[r].q = i[r].q || []).push(arguments);
        //             }),
        //             (i[r].l = 1 * new Date());
        //         (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
        //         a.async = 1;
        //         a.src = g;
        //         m.parentNode.insertBefore(a, m);
        //     })(
        //         window,
        //         document,
        //         "script",
        //         "//www.google-analytics.com/analytics.js",
        //         "ga"
        //     );

        //     ga("create", "UA-39073605-1", {
        //         siteSpeedSampleRate: 30,
        //     });
        //     ga("send", "pageview");
        // }
    }

    componentDidMount() {
        this.getBlogCategory();
        this.getWeddingDealsData();
    }
    getWeddingDealsData = () => {
        // let url = "https://apitest.bookeventz.com/BlogSection/bookWeddingService";
        // try {
        //     axios.get(url).then((res) => {
        //         this.setState({ weddingServiceData: res.data.data });
        //     });
        // } catch (error) {
        //     console.log(error, "error message");
        // }
    };
    handleScrollTop = () => {
        let element = $("#header");
        let offsetAboutTop = 400;
        let aboutScreen = offsetAboutTop;

        // window.scrollTo({
        //     top: aboutScreen,
        //     behavior: "auto",
        // });
    };
    getBlogListing = (number) => {
        let url = `${constants.BLOG_BASE_URL}posts?_embed&per_page=10&page=${number !== undefined ? number : 1
            }`;
        try {
            axios.get(url).then((res) => {
                this.setState({ pageCount: res.headers["x-wp-totalpages"] });
                this.setState({ blogList: res.data });
                this.handleScrollTop();
            });
        } catch (error) {
            console.log(error, "error message");
        }
    };
    getBlogBySearch = (input) => {
        let url = `https://www.bookeventz.com/blog-old/wp-json/custom-search/v1/posts/${input}?_embed`;
        const self = this;
        if (self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout);
        }

        self.setState({
            typing: false,
            isSearch: true,
            typingTimeout: setTimeout(function () {
                console.log(input, "input");
                try {
                    axios.get(url).then((res) => {
                        self.setState({ pagesCount: res.headers["x-wp-totalpages"] });
                        self.setState({ blogList: res.data });
                        self.handleScrollTop();
                    });
                } catch (error) {
                    console.log(error, "error message");
                    self.setState({ pagesCount: 0 });
                    self.setState({ blogList: [] });
                    self.handleScrollTop();
                }
            }, 1000),
        });
    };
    getBlogCategory = () => {
        let url = `${constants.BLOG_BASE_URL}categories?_embed&per_page=25`;
        try {
            axios.get(url).then((res) => {
                this.setState({ categoryList: res.data });
            });
        } catch (error) {
            console.log(error, "error message");
        }
    };
    getDataCategory = (id) => {
        let url = `${constants.BLOG_BASE_URL}posts?_embed&per_page=10&page=1&categories=${id}`;
        try {
            axios.get(url).then((res) => {
                this.setState({ pagesCount: res.headers["x-wp-totalpages"] });
                this.setState({ blogList: res.data });
            });
        } catch (error) {
            console.log(error, "error message");
        }
    };
    getCategoryId = (id, name) => {
        history.pushState({}, "", "/blog-new/category/" + name);
        if (id !== undefined) {
            this.getDataCategory(id);
        }
    };

    render() {
        let that = this;
        var { blogList, categoryList } = this.state;
        console.log(this.props.blogList,'blogList')
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
                        occasionList={this.state.occasionList}
                    />
                </div> */}
                {/* <div id="blog-list-main-wrapper">
                    <div id="blog-top-09">
                        <img
                            src="https://media.bookeventz.com/html/ui_website/blog-section/blogTop.svg"
                            alt="Blog Top Main Image"
                        />
                        <h1>A Complete Event Blog</h1>
                        <p>Wedding . Corporate Event . Birthday Party</p>
                    </div>
                    {this.props.pageType == "homeBlogListing" && (
                        <div id="blog-breadcrumb">
                            <a href="https://www.bookeventz.com">
                                <span>Home</span>
                            </a>
                            <span id="opis">{">"}</span>
                            <a href={`${config.BASE_URL}blog/`}>
                                <span>Blog</span>
                            </a>
                        </div>
                    )}
                    {this.props.pageType == "categoryBlogListing" && (
                        <div id="blog-breadcrumb">
                            <a href={config.BASE_URL}>
                                <span>Home</span>
                            </a>
                            <span id="opis">{">"}</span>
                            <a href={`${config.BASE_URL}blog/`}>
                                <span>Blog</span>
                            </a>
                            <span id="opis">{">"}</span>
                            <a
                                href={`${config.BASE_URL}blog/category/${this.props.categoryName}`}
                            >
                                <span>{this.props.newName}</span>
                            </a>
                        </div>
                    )}
                    {this.props.pageType == "tagBlogListing" && (
                        <div id="blog-breadcrumb">
                            <a href={config.BASE_URL}>
                                <span>Home</span>
                            </a>
                            <span id="opis">{">"}</span>
                            <a href={`${config.BASE_URL}blog/`}>
                                <span>Blog</span>
                            </a>
                            <span id="opis">{">"}</span>
                            <a href={`${config.BASE_URL}blog/tag/${this.props.tagName}`}>
                                <span>{this.props.newName}</span>
                            </a>
                        </div>
                    )}

                    <BlogCategories
                        categoryList={this.state.categoryList}
                        getDataCategory={this.getDataCategory}
                        getCategoryId={this.getCategoryId}
                    />

                    <BlogSearch
                        getBlogBySearch={this.getBlogBySearch}
                        tagName={this.props.tagName}
                        categoryName={this.props.categoryName}
                        newName={this.props.newName}
                        isSearch={this.state.isSearch}
                    />
                    <div id="blog-main">
                        <BlogMain
                            blogList={blogList}
                            pageType={this.props.pageType}
                            description={this.props.description}
                            categoryName={this.props.categoryName}
                            isSearch={this.state.isSearch}
                            config={config}
                        />
                        <BlogLeft />
                    </div>
                    <BlogBreadCrumb
                        getBlogListing={this.getBlogListing}
                        pageCount={this.state.pageCount}
                    />
                    <BlogIdea sessionData={this.props.sessionData} />
                    <BlogWebStory />

                    <DownloadApp />
                    <BookeventzServices
                        weddingServiceData={this.state.weddingServiceData}
                        sessionData={this.props.sessionData}
                    />
                    <DownloadMobileApp />
                </div> */}

                {/* <Footer
                    props={this.props}
                    otherProps={this.state}
                    newcitySession={this.props.sessionData}
                    userData={this.state.userData}
                    sessionData={this.props.sessionData}
                    cityList={this.state.cityList}
                    areaList={this.props.areaList}
                    pageType={this.props.pageType}
                    occasionList={this.state.occasionList}
                /> */}
            </div>
            </LayoutComponent>
        );
    }
}
export default BlogListingComponent;
