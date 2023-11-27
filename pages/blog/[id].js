import BlogProductComponents from "@/components/BlogProduct";
const API_BASE = 'https://api.bookeventz.com/';
const BLOG_BASE_URL = `https://www.bookeventz.com/blog-old/wp-json/wp/v2/`;
import axios from 'axios';
import generalUtil from "@/lib/generalUtil";
export default function SSR(propsData) {
    // console.log(propsData,'props data ssr func')
    return <BlogProductComponents 
        areaList={propsData.areaList}
        occasionList={propsData.occasionList}
        cityList={propsData.cityList}
        sessionData={propsData.newSessionData}
        pageType={propsData.pageType}
        categoryName = {propsData.category_name}
        newSlugName= {propsData.newSlugName}
        blogProductData= {propsData.blogProductData}
       
    />;
}

// The date returned here will be different for every request that hits the page,
// that is because the page becomes a serverless function instead of being statically
// exported when you use `getServerSideProps` or `getInitialProps`
export async function getServerSideProps(context) {

  let token = context.req.token;
  var category_name = context?.req?.params?.category_name;
  var pageType = "homeBlogListing";
  if (category_name != undefined) {
    pageType = "categoryBlogListing";
  }

  var blogProductData = null;
  let slug_name = context.req?.url.split("/");
  var newSlugName = slug_name[2];
  let url = `${BLOG_BASE_URL}posts?_embed&slug=${newSlugName}`;
  let xhrResponse =  await axios.get(API_BASE + "location/getCityList" + "?token=" + token + "&IfActive=1");
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

        let basicResponseData = await axios.get(API_BASE + 'Basic/getBasicListData?selectedCity=mumbai&city=1&area=1&occasion=1&token=&IfActive=1&reset_cache=1')

        if(basicResponseData){
          if (generalUtil.safeReturn(basicResponseData, "data", false) !== false) {
            let basicData = basicResponseData.data;
            let areaList = basicData.areaList;
            let occasionList = basicData.occasionList;

            let cookieSessionData = null;
            let isUserSessionPresent = false;
            if (context.req.cookies && context.req.cookies.sessionData != undefined) {
              cookieSessionData = JSON.parse(context.req.cookies.sessionData);
              if (cookieSessionData && cookieSessionData.userMobileNo != "") {
                isUserSessionPresent = true;
              }
            }
            let newSessionData = sessionData;
            if (isUserSessionPresent) {
              newSessionData = {...sessionData, ...cookieSessionData};
              newSessionData.CityUniqueLink = sessionData?.CityUniqueLink;
            }

            var ajaxData = {
              ifActive: 1,
              start: 0,
              limit: 32,
              isReview: true,
              isCount: true,
              isSequence: 1,
            };

            let productData = await axios.get(url);
            if(productData){
              blogProductData = productData.data;
              return { props: {
                areaList: areaList || [],
                occasionList: occasionList || [],
                cityList: cityList || [],
                sessionData: newSessionData || null,
                pageType: pageType || '',
                categoryName: category_name || '',
                newSlugName: newSlugName || '',
                blogProductData: blogProductData || []
              }};
            }
        }
      }
    }
  }
}
}