import BlogListingComponent from "@/components/Blog";
const API_BASE = 'https://api.bookeventz.com/';
const BLOG_BASE_URL = `https://www.bookeventz.com/blog-old/wp-json/wp/v2/`;
import axios from 'axios';
import generalUtil from "@/lib/generalUtil";
export default function SSR(propsData) {
    // console.log(data,'props data ssr func')
    return <BlogListingComponent 
        areaList={propsData.areaList}
        occasionList={propsData.occasionList}
        cityList={propsData.cityList}
        sessionData={propsData.newSessionData}
        pageType={propsData.pageType}
        categoryName = {propsData.category_name}
        tagName={propsData.tag_name}
        blogList={propsData.blogList}
        pageCount={propsData.pageCount}
        metData={propsData.metData}
        metaUrl={propsData.metaUrl}
        description={propsData.description}
        newName={propsData.newName}
        amp={propsData.amp}
        newcitySession={propsData}
    />;
}

// The date returned here will be different for every request that hits the page,
// that is because the page becomes a serverless function instead of being statically
// exported when you use `getServerSideProps` or `getInitialProps`
export async function getServerSideProps(context) {

    var category_name = context.req?.params?.category_name;
    var tag_name = context.req?.params?.tag_name; var pageType = "homeBlogListing";
    if (category_name !== undefined) {
        pageType = "categoryBlogListing";
    } else if (tag_name !== undefined) {
        pageType = "tagBlogListing";
    }
    let name = "";
    if (category_name !== undefined) {
        name = category_name;
    } else if (tag_name !== undefined) {
        name = tag_name;
    }
    let type = "";
    let metaUrl = "https://www.bookeventz.com/blog/";
    if (pageType == "homeBlogListing") {
        metaUrl = "https://www.bookeventz.com/blog/";
        type = "home";
    } else if (pageType == "categoryBlogListing") {
        metaUrl = "https://www.bookeventz.com/blog/category/" + category_name;
        type = "category";
    } else if (pageType == "tagBlogListing") {
        metaUrl = "https://www.bookeventz.com/blog/tag/" + tag_name;
        type = "tag";
    }

    let metData;
    let propsData = null;
    var blogList = [];
    let pageCount;
    let description;
    let newName;
    if (category_name !== undefined) {
        let url = `${BLOG_BASE_URL}categories?_embed&slug=${category_name}`;
        try {
            let resTag = axios.get(url);
            if(resTag){
                newName = resTag.data[0].name;
                description = resTag.data[0].description;
                if (resTag.data[0].id !== "") {
                    let id = resTag.data[0].id;
                    let url = `${BLOG_BASE_URL}posts?_embed&categories=${id}`;
                    let resTotalTag = axios.get(url);
                    if(resTotalTag){
                        pageCount = resTotalTag.headers["x-wp-totalpages"];
                        blogList = resTotalTag.data;
                        let parmas = {
                            token: '',
                            pageType: pageType,
                            blogList: blogList,
                            pageCount: pageCount,
                            category_name: category_name,
                            tag_name: tag_name,
                            metData: metData,
                            metaUrl: metaUrl,
                            description: description,
                            newName: newName,
                            type: type,
                            name: name,
                        };
                        propsData = await getBlogListData(parmas, context.res, context.req);
                    }
                }
            }
        } catch (error) {
            console.log(error, "error message");
        }
    } else if (tag_name !== undefined) {
        let url = `${BLOG_BASE_URL}tags?_embed&slug=${tag_name}`;
        try {
            let resTag = await axios.get(url);
            if(resTag){
                newName = resTag.data[0].name;
                if (resTag.data[0].id !== "") {
                    let id = resTag.data[0].id;
                    let url = `${BLOG_BASE_URL}posts?_embed&tags=${id}`;
                    let resTotalTag = axios.get(url);
                    if(resTotalTag){
                        pageCount = resTotalTag.headers["x-wp-totalpages"];
                        blogList = resTotalTag.data;
                        let parmas = {
                            token: '',
                            pageType: pageType,
                            blogList: blogList,
                            pageCount: pageCount,
                            res: res,
                            category_name: category_name,
                            tag_name: tag_name,
                            metData: metData,
                            metaUrl: metaUrl,
                            newName: newName,
                            type: type,
                            name: name,
                        };
                        propsData = await getBlogListData(parmas, context.res, context.req);
                    }
                }
            }

        } catch (error) {
            console.log(error, "error message");
        }
    } else {
        let url = `${BLOG_BASE_URL}posts?_embed&per_page=10&page=1`;
        try {
            let res1 = await axios.get(url);
            if(res1){
                pageCount = res1.headers["x-wp-totalpages"];
                blogList = res1.data;
                let parmas = {
                    token: '',
                    pageType: pageType,
                    blogList: blogList,
                    pageCount: pageCount,
                    category_name: category_name,
                    tag_name: tag_name,
                    metData: metData,
                    metaUrl: metaUrl,
                    type: type,
                    name: name,
                };
                propsData = await getBlogListData(parmas, context.res, context.req);
            }
        } catch (error) {
            console.log(error, "error message");
        }
    }
 
    return { props: {
        areaList: propsData.areaList || [],
        occasionList: propsData.occasionList || [],
        cityList: propsData.cityList || [],
        sessionData: propsData.sessionData || null,
        pageType: propsData.pageType || '',
        categoryName: propsData.category_name || '',
        tagName: propsData.tag_name || '',
        blogList: propsData.blogList || [],
        pageCount: propsData.pageCount || 0,
        metData: propsData.metData || null,
        metaUrl: propsData.metaUrl || null,
        description: propsData.description || '',
        newName: propsData.newName || '',
        amp: propsData.amp || ''
    } };
}

async function getBlogListData(parmas, res, req, amp = null) {
    let xhrResponse = await axios.get(API_BASE + "location/getCityList" + "?token=&IfActive=1");
    if(xhrResponse){
        if (generalUtil.safeReturn(xhrResponse, "data", false) !== false) {
            let data = xhrResponse.data;
            var cityList = data;
            var citySelected = "mumbai";
            let sessionData;
            let cityFilterSelected = cityList.filter(city=> city.CityUniqueLink==citySelected);
            if(cityFilterSelected){
                sessionData = cityFilterSelected;
                sessionData.countryCode = "+91";
                sessionData.gclidNumber = "+91 9967581110";
                sessionData.isEnquiryCreated = false;
                sessionData.eventId = "";
                let basicResponse = await axios.get(API_BASE + 'Basic/getBasicListData?selectedCity=mumbai&city=1&area=1&occasion=1&token=&IfActive=1&reset_cache=1');
                if(basicResponse){
                    let data = basicResponse.data;
                    let areaList = data.areaList;
                    if (generalUtil.safeReturn(basicResponse, "data", false) !== false) {
                        let cookieSessionData = null;
                        let isUserSessionPresent = false;
                        if (req.cookies && req.cookies.sessionData != undefined) {
                            cookieSessionData = JSON.parse(req.cookies.sessionData);
                            if (cookieSessionData && cookieSessionData.userMobileNo != "") {
                                isUserSessionPresent = true;
                            }
                        }
                        let newSessionData = sessionData;
                        if (isUserSessionPresent) {
                            newSessionData = {...sessionData, ...cookieSessionData};
                            newSessionData.CityUniqueLink = sessionData?.CityUniqueLink;
                        }
                        let occasionList = data.occasionList;
                        let newUrl = API_BASE+`Blog/getMetaForBlog?type=${parmas.type}&slug=${parmas.name}`;
                        let resMeta = await axios.get(newUrl);
                        if(resMeta){
                            let metData = resMeta.data;
                            return { areaList: areaList,
                                occasionList: occasionList,
                                cityList: cityList,
                                sessionData: newSessionData,
                                pageType: parmas.pageType,
                                categoryName: parmas.category_name,
                                tagName: parmas.tag_name,
                                blogList: parmas.blogList,
                                pageCount: parmas.pageCount,
                                metData: metData,
                                metaUrl: parmas.metaUrl,
                                description: parmas.description,
                                newName: parmas.newName,
                                amp: amp
                            };
                        }
                    }
                }
            }
        }
    }
}