"use strict";

import React, {Component} from "react";

import GoogleLogin from "react-google-login"; //React Google  login (https://www.npmjs.com/package/react-google-login)
import axios from "axios"; //React Ajax Call (https://www.npmjs.com/package/axios)
import querystring from "querystring";
import {Modal} from "react-bootstrap";
import {ThreeBounce} from "better-react-spinkit";

import generalUtil from "@/lib/generalUtil";
import localStorageUtil from "@/lib/config";
import cookie from "react-cookies";

const loaderStyle = {
  color: "#4a266e",
};
var environment = "production";
if (environment == "development") {
  var API_BASE = "https://apidemo.bookeventz.com/";
  var WEB_BASE = "https://staging.bookeventz.com/";
} else {
  var API_BASE = "https://api.bookeventz.com/";
  var WEB_BASE = "https://www.bookeventz.com/";
}
/*
 * Google Login Component. On button click data is fetched from goggle and accordingly user session is created
 */
class BzGoogleLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: "",
      userName: "",
      userMobileNo: "",
      registrationType: "2",
      pictureUrl: "",
      show: false,
      userMobileNoError: "",
      mobileNoMandatory: "",
      modalHideCounter: 0,
      fatalError: "",
      showLoader: false,
      successfull: false,
    };
    this.handleClose = this.handleClose.bind(this);
  }

  //callBack function after google login.
  responseSuccess(response) {
    console.log(response, "Sucessful");
    var showLoader5 = document.getElementById("showLoader5");
    if (showLoader5 != undefined) {
      showLoader5.setAttribute("style", "display: block;");
      document.getElementById("showLoader5").style.display = "block";
    }
    if (
      this.props.pageType == "ContractorPackageListing" ||
      this.props.pageType == "ContractorPackagesLanding"
    ) {
      generalUtil.callGa("vendor popup ", "clicked submit", "Google");
    } else if (this.props.extraParam != undefined && this.props.extraParam == true) {
      generalUtil.callGa("vendor page atc/en", "clicked submit", "Google");
    } else {
      generalUtil.callGa(
        generalUtil.safeReturn(this.props, "pageType", "") + " slider",
        "clicked submit",
        "Google"
      );
    }
    console.log(response, "Google responseSuccess");
    if (
      typeof response["profileObj"] != "undefined" &&
      typeof response["profileObj"]["email"] != "undefined"
    ) {
      generalUtil.callGa("Login Menu", "LoggedIn", "Google");
      localStorageUtil.setLocal(
        "isSocialLogin",
        generalUtil.safeReturn(this.props.constants, "ACTIVE", "")
      );
      this.setState(
        {
          userEmail: generalUtil.safeReturn(response["profileObj"], "email", ""),
          userName: generalUtil.safeReturn(response["profileObj"], "name", ""),
          userMobileNo: generalUtil.safeReturn(response["profileObj"], "mobile", ""),
          pictureUrl: generalUtil.safeReturn(response["profileObj"], "imageUrl", ""),
        },
        function () {
          this.checkUser();
        }
      );
    } else {
      this.setState({fatalError: "Error in Google Login"});
    }
  }

  //callBack function after google login.
  responseFailure(response) {
    console.log(response, "Failedddd");
    if (
      this.props.pageType == "ContractorPackageListing" ||
      this.props.pageType == "ContractorPackagesLanding"
    ) {
      generalUtil.callGa("vendor popup ", "clicked submit", "Google");
    } else if (this.props.extraParam != undefined && this.props.extraParam == true) {
      generalUtil.callGa("vendor page atc/en", "clicked submit", "Google");
    } else {
      generalUtil.callGa(
        generalUtil.safeReturn(this.props, "pageType", "") + " slider",
        "clicked submit",
        "Google"
      );
    }

    this.setState({fatalError: response["error"]});
  }

  /*Check user in DB if exists create session or if does not exist check for mobile no in
     state if exists then insert data into DB and then create session or else show modal to get mobile no.*/
  checkUser() {
    var that = this;

    this.setState({showLoader: true});

    var loader = document.getElementById("spinner");
    if (loader != undefined) {
      loader.setAttribute("style", "display: block;");
    }
    var showloader = document.getElementById("showLoader");
    if (showloader != undefined) {
      showloader.setAttribute("style", "display: block;");
    }

    var showloader = document.getElementById("showLoaderen");
    if (showloader != undefined) {
      showloader.setAttribute("style", "display: block;");
    }

    var ppLoader = document.getElementById("showLoaderRL");
    if (ppLoader != undefined) {
      document.getElementById("showLoaderRL").style.display = "block";
    }
    
    axios
      .post(
        WEB_BASE + "login/socialLoginCheck/json",
        querystring.stringify({
          userEmail: this.state.userEmail,
          userName: this.state.userName,
          userMobileNo: this.state.userMobileNo,
          registrationType: this.state.registrationType,
          pictureUrl: this.state.pictureUrl,
          cityId: this.props?.filters?.city,
        })
      )
      .then((xhrResponse) => {
        if (generalUtil.safeReturn(xhrResponse, "data", false) !== false) {
          var openShow = 0;
          let data = xhrResponse.data;
          console.log(data, "Google checkUser",that.state);

          console.log(typeof data.error != undefined && data.error == "7", "error condition");

          localStorageUtil.setLocal("sessionData", data, 186000);
          data.CityName = data?.sessionData?.cityName;
          data.sessionData.eventId = data?.eventId?data?.eventId:null;
          console.log(data,'data session data');
          cookie.save("sessionData", data, {path: "/"});
          console.log("Google Login Issue Started");
          console.log(data, that.props);
          console.log(data, "sessionData step 1.123");
          let userMobileNo = that.state.userMobileNo;
          if (xhrResponse.data.userMobileNo != "") {
            userMobileNo = xhrResponse.data.userMobileNo;
            that.setState({userMobileNo: userMobileNo});
          }
          data.CityName = data.sessionData.cityName;

          if (typeof data.error != undefined && data.error == "7") {
            if (userMobileNo == "") {
              if (
                that.props.pageType == "home" ||
                that.props.pageType == "venueListing" ||
                that.props.pageType == "venueProduct" ||
                that.props.pageType == "vendorProduct"
              ) {
                console.log("i am the two inside the data error");
                that.setState({show: true});
              }
              return false;
            }
          }

          console.log("sessionData step 2");
          if (
            that.props.pageType == "market" ||
            that.props.pageType == "cartPage" ||
            that.props.pageType == "marketReview"
          ) {
            openShow++;
            var sessionData = cookie.load("sessionData", data.sessionData);
            var userData = data.sessionData;
            cookie.save("userData", userData, {path: "/"});
            location.reload();
          }
          console.log("sessionData step 3");

          if (that.props.callType != undefined) {
            if (that.props.callType == "login") {
              console.log('Inside the calltype check', that.props.pageType ,'pageType');
              openShow++;
              // console.log(cookie.load("sessionData"),'cookie.load("sessionData")')
              var sessionData = cookie.load("sessionData", data.sessionData);
              var userData = data.sessionData;
              cookie.save("userData", userData, {path: "/"});
              // console.log(cookie.load("userData"),'cookie.load("userData")')
              if(that.props.pageType == "InvitationModuleView"){
                that.props.handleSubmitClick(data);
              }else{
                location.reload();
              }
              return;
            }
          }
          if(that.props.pageType == "InvitationModuleView"){
            console.log('Inside the calltype check');
            that.props.handleSubmitClick(data);
            return;
          }

          console.log("sessionData step 4");
          console.log(that.props.reviewLogin, "reviewLogin");

          // if(that.props.reviewLogin != undefined) {
          //     console.log("Inside step reviewLogin");
          //     openShow++;
          //     var sessionData = cookie.load('sessionData', data.sessionData);
          //     var userData = data.sessionData;
          //     cookie.save('userData', userData,{path:'/'});
          //     that.setState({'show': false}, () =>
          //     {
          //         //notify parent with final data
          //         console.log('Response to parent');
          //         that.props.response({
          //             userEmail: data.userEmail,
          //             userId: data.userId,
          //             userMobileNo: data.userMobileNo,
          //             userName: data.userName
          //         })
          //     });
          //     console.log('After Response to parent');
          //     // location.reload();
          //     // return;
          // }

          console.log("sessionData step 5");
          data.isEnquiryCreated = true;
          if (typeof data.error == "undefined") {
            cookie.save("sessionData", data, {path: "/"});
            var userData = data;
            console.log(userData, "userData");
            cookie.save("userData", userData, {path: "/"});
          }
          var params = [];
          var pageType = "";

          switch (that.props.pageType) {
            case "home":
              pageType = "1";
              break;
            case "venueListing":
              pageType = "2";
              break;
            case "venueProduct":
              pageType = "3";
              break;
          }

          console.log("sessionData step 6");
          params.pageType = pageType;

          for (let i in this.props.enquiryParams) {
            params[i] = this.props.enquiryParams[i];
          }

          let urlSource = window.location.pathname;

          //This urlSource is stored in googleAnalytics table
          if (urlSource !== "") {
            let lastIndex = urlSource.indexOf("?") > -1 ? urlSource.indexOf("?") : urlSource.length;
            urlSource = urlSource.substring(0, lastIndex);
          }
          params["page_source"] = urlSource !== "" ? urlSource : "/";

          if (params["userName"] == "" || params["userName"] == undefined) {
            params["userName"] = data.userName;
            params["userMobileNo"] = userMobileNo;
            params["userEmail"] = data.userEmail;
          }

          var ajaxData = {
            guestName: data.userName,
            guestEmail: data.userEmail,
            guestMobileNo: userMobileNo,
            cityId: that.props.sessionData.CityId,
            token: that.props.token,
          };

          console.log("sessionData step 7");
          console.log(cookie.load("userData"), "userData cookies in social login");
          if (this.props.vendorDetails != undefined || this.props.pageType == "vendorPage") {
            openShow++;

            console.log("step 2");
            $.ajax({
              type: "POST",
              dataType: "json",
              url: API_BASE + "events/createEventOnly",
              data: ajaxData,
              success: function (response) {
                localStorageUtil.setLocal("eventId", response.eventId);
                cookie.save("eventId", response.eventId);
                var ajaxData2 = {
                  eventId: response.eventId,
                  token: that.props.token,
                };

                if (typeof response.eventId != "undefined") {
                  $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: API_BASE + "functions/createFunctionOnly",
                    data: ajaxData2,
                    success: function (response2) {
                      that.setState({functionId: response2.functionId});
                      localStorageUtil.setLocal("functionId", response2.functionId);
                      cookie.save("functionId", response2.functionId);
                      var enquiryData = localStorageUtil.getLocal("enquiryParams");
                      if (
                        that.props.banquetDetails != undefined &&
                        that.props.banquetDetails != ""
                      ) {
                        var ajaxData3 = {
                          functionId: response2.functionId,
                          token: that.props.token,
                          status: 14,
                          artistType:
                            that.props.banquetDetails.artistType != undefined
                              ? that.props.banquetDetails.artistType.id
                              : that.props.banquetDetails.categories,
                          artistId: that.props.banquetDetails.id,
                          service: enquiryData.service != undefined ? enquiryData.service : "",
                          duration: enquiryData.duration != undefined ? enquiryData.duration : "",
                          community:
                            enquiryData.community != undefined ? enquiryData.community : "",
                          side: enquiryData.side != undefined ? enquiryData.side : "",
                          budget: enquiryData.budget != undefined ? enquiryData.budget : "",
                          eventDate:
                            enquiryData.eventDate != undefined ? enquiryData.eventDate : "",
                          comments: enquiryData.comments != undefined ? enquiryData.comments : "",
                          budgetDiff:
                            enquiryData.budgetDiff != undefined ? enquiryData.budgetDiff : "",
                        };
                        $.ajax({
                          type: "POST",
                          dataType: "json",
                          url: API_BASE + "contractor/createArtistLead",
                          data: ajaxData3,
                          success: function (response3) {
                            localStorageUtil.setLocal("showPopup", true, 186000);
                            // location.reload();
                            if (
                              that.props.banquetDetails != undefined &&
                              that.props.banquetDetails != ""
                            ) {
                              var filters = {};
                              filters.token = that.props.token;
                              filters.leadId = response.eventId;
                              filters.status = "2";
                              filters.artists = that.props.banquetDetails.id;
                              filters.insertedBy = "1";
                              filters.functionId = response2.functionId;
                              axios
                                .post(
                                  API_BASE + "artist/insertArtistMapping",
                                  querystring.stringify(filters)
                                )
                                .then((xhrResponse) => {
                                  if (xhrResponse.data != undefined) {
                                    if (xhrResponse.data.inserted == true) {
                                      var shortlisted = that.state.shortlisted;
                                      var shortlistedList = that.state.shortlistedList;

                                      if (shortlisted != undefined) {
                                        shortlisted.push(that.props.banquetDetails.id);
                                      }

                                      if (shortlistedList != undefined) {
                                        shortlistedList.push(that.props.banquetDetails);
                                      }

                                      that.setState({shortlisted: shortlisted});
                                      localStorageUtil.setLocal("shortlisted", shortlisted, 870000);
                                      localStorageUtil.setLocal(
                                        "shortlistedList",
                                        shortlistedList,
                                        870000
                                      );
                                      console.log("step 2");
                                      window.location.reload();
                                    }
                                  }
                                })
                                .catch((error) => {
                                  ////console.log(error);
                                });
                            } else {
                              that.setState({showPopup: false});
                              that.setState({successfull: true});
                              window.location.reload();
                            }
                          },
                        });
                      } else if (that.props.pageType == "vendorPage") {
                        var ajaxData3 = {
                          functionId: response2.functionId,
                          token: that.props.token,
                          status: 14,
                          artistType: that.props.vendorDetails.vendorType,
                          artistId: that.props.vendorDetails.id,
                        };
                        $.ajax({
                          type: "POST",
                          dataType: "json",
                          url: API_BASE + "contractor/createArtistLead",
                          data: ajaxData3,
                          success: function (response3) {
                            localStorageUtil.setLocal("showPopup", true, 186000);
                            // location.reload();
                            if (
                              that.props.banquetDetails != undefined &&
                              that.props.banquetDetails != ""
                            ) {
                              var filters = {};
                              filters.token = that.props.token;
                              filters.leadId = response.eventId;
                              filters.status = "2";
                              filters.artists = that.props.vendorDetails.id;
                              filters.insertedBy = "1";
                              filters.functionId = response2.functionId;
                              axios
                                .post(
                                  API_BASE + "artist/insertArtistMapping",
                                  querystring.stringify(filters)
                                )
                                .then((xhrResponse) => {
                                  if (xhrResponse.data != undefined) {
                                    if (xhrResponse.data.inserted == true) {
                                      var shortlisted = that.state.shortlisted;
                                      var shortlistedList = that.state.shortlistedList;

                                      if (shortlisted != undefined) {
                                        shortlisted.push(that.props.banquetDetails.id);
                                      }

                                      if (shortlistedList != undefined) {
                                        shortlistedList.push(that.props.banquetDetails);
                                      }

                                      that.setState({shortlisted: shortlisted});
                                      localStorageUtil.setLocal("shortlisted", shortlisted, 870000);
                                      localStorageUtil.setLocal(
                                        "shortlistedList",
                                        shortlistedList,
                                        870000
                                      );

                                      window.location.reload();
                                    }
                                  }
                                })
                                .catch((error) => {
                                  ////console.log(error);
                                });
                            } else {
                              that.setState({showPopup: false});
                              that.setState({successfull: true});
                            }
                          },
                        });
                      }
                    },
                  });
                }
              },
            });
          } else {
            if (userMobileNo == "") {
              console.log(openShow, "openShow", that.props.pageType, "usermobile is not present");
              if (
                (that.props.pageType == "home" ||
                  that.props.pageType == "venueListing" ||
                  that.props.pageType == "venueProduct") &&
                openShow == 0
              ) {
                console.log("i am the One");
                that.setState({show: true});
              }
            } else {
              if (!this.state.show && that.props.reviewLogin == undefined) {
                axios
                  .post(WEB_BASE + "/home/getListingResult", querystring.stringify(params))
                  .then((xhrResponse) => {
                    if (generalUtil.safeReturn(xhrResponse, "data", false) !== false) {
                      let data = xhrResponse.data;

                      if (typeof data.error != "undefined") {
                        errorMsgLog.serverError = data.errorMsg;
                        that.setState({errorMsgLog, showLoader: false});
                      } else {
                        if (generalUtil.myGet("inf") != null) {
                          var params = {
                            refCode: generalUtil.myGet("inf"),
                            authToken: this.props.sessionData.authToken,
                            eventId: data.eventId,
                          };

                          /* axios.post(this.props.constants.API_BASE + 'influencer/checkInfluencer', querystring.stringify(params))
                                                         .then((xhrResponse) => {
                                                             if(generalUtil.safeReturn(xhrResponse, 'data', false) !== false)
                                                             {
                                                                 let data = xhrResponse.data;

                                                                 if(typeof data.error != 'undefined')
                                                                 {

                                                                     errorMsgLog.serverError = data.errorMsg;
                                                                     that.setState({errorMsgLog, showLoader : false});
                                                                 }
                                                                 else
                                                                 {


                                                                 }
                                                             }
                                                         })
                                                         .catch((error) => {
                                                             console.log(error);
                                                         });*/
                        }
                        /* gtag('event', 'conversion', {
                                                     'send_to': 'AW-990480324/YoBbCMDKnbABEMSPptgD',
                                                     'value': value,
                                                     'currency': 'INR',
                                                 });*/
                        generalUtil.callGa(
                          that.props.pageType + " slider",
                          "submit",
                          "enquiry",
                          data.enquiryId,
                          that.props.pageType
                        );
                        setTimeout(
                          function () {
                            if (that.props.pageType == "venueProduct") {
                              var datanew = {};
                              var datanew = {};
                              datanew.venueLeadId = data.venueLeadId;
                              datanew.eventId = data.eventId;
                              datanew.enquiryId = data.enquiryId;
                              datanew.eventIdMd5 = data.eventIdMd5;
                              localStorageUtil.setLocal("sliderPopupIsActive", "1", 86400000);
                              that.props.productData(datanew);
                              var userData = data;
                              cookie.save("userData", userData, {path: "/"});
                            } else {
                              var sessionData = cookie.load("sessionData", data);
                              var userData = data;
                              cookie.save("userData", userData, {path: "/"});
                              localStorageUtil.setLocal("sliderPopupIsActive", "1", 86400000);
                              // window.location.href = data.pageUrl + '&pageType=' + that.props.pageType;
                              if (that.props.enquiryParams.product != undefined) {
                                console.log("1.7 CHECKKKKK");
                                var datanew = {};
                                datanew.venueLeadId = data.venueLeadId;
                                datanew.eventId = data.eventId;
                                datanew.enquiryId = data.enquiryId;
                                datanew.eventIdMd5 = data.eventIdMd5;
                                that.props.productData(datanew);
                              } else {
                                console.log("1.8 CHECKKKKK", process.env.NODE_ENV);
                                window.location.href =
                                  data.pageUrl + "&pageType=" + that.props.pageType;
                                // if(process.env.NODE_ENV!='production'){
                                //     window.location.href = data.pageUrl+'&pageType=' + that.props.pageType;
                                // }else{
                                //     let pageURL = data.pageUrl.replace('https://www','https://grunt')
                                //     window.location.href = pageURL+'&pageType=' + that.props.pageType;
                                // }
                              }
                            }
                          }.bind(this),
                          5000
                        );
                      }
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            }
          }

          that.setState({showLoader: false});
          console.log(
            typeof data.error,
            typeof data.error !== "undefined",
            "data.error",
            data,
            that.state.show,
            "show"
          );
          if (typeof data.error !== "undefined") {
            console.log("Inside data.error");
            //On error if mobile number empty then show modal to get mobile no
            if (that.state.userMobileNo == "") {
              if (
                (that.props.pageType == "home" ||
                  that.props.pageType == "venueListing" ||
                  that.props.pageType == "venueProduct") &&
                openShow == 0
              ) {
                console.log("i am the two");
                that.setState({show: true});
              } else {
                that.setState({show: false});
              }
            } else {
              that.setState({fatalError: "Error in Google Login"}, () => {
                //notify parent with final data
                /**
                 * Date - 22/10/2021
                 * Only when not comes from reviewlogin request
                 */
                if (that.props.reviewLogin == undefined) {
                  that.props.response({
                    error: "1",
                    errorMsg: that.state.fatalError,
                  });
                }
              });
            }
          } else {
            console.log("Inside else data.error condition line 741");
            // that.props.updateSessionData(that.props, data.sessionData);
            that.setState({show: false}, () => {
              //notify parent with final data
              // that.props.response();
              /*that.props.response({
                                 userEmail: data.userEmail,
                                 userId: data.userId,
                                 userMobileNo: data.userMobileNo,
                                 userName: data.userName
                             })*/
            });

            //to check mobile number later
            if (typeof data.isNewUser != "undefined") {
              localStorageUtil.setLocal("isMobileNoReconfirm", "1", "60000");
            }

            //sWin.updateSubscription(); //external function call
          }

          //Here For review
          console.log(
            !this.state.show && that.props.reviewLogin != undefined,
            "Review is happning condition"
          );
          if (!this.state.show && that.props.reviewLogin != undefined) {
            console.log("Inside step reviewLogin");
            openShow++;
            var sessionData = cookie.load("sessionData", data.sessionData);
            var userData = data.sessionData;
            cookie.save("userData", userData, {path: "/"});
            that.setState({show: false}, () => {
              //notify parent with final data
              console.log("Response to parent");
              that.props.response({
                userEmail: data.userEmail,
                userId: data.userId,
                userMobileNo: data.userMobileNo,
                userName: data.userName,
              });
            });
            console.log("After Response to parent");
            location.reload();
            return;
          }
        }
      })
      .catch((error) => {
        this.setState({fatalError: "Error in Google Login", showLoader: false});
      });
  }

  //Mobile No modal submit function
  checkUserModal() {
    if (this.state.userMobileNo.length == 10) {
      this.setState({show: false});
      this.checkUser();
    } else {
      this.setState({userMobileNoError: "Wrong Mobile no."});
    }
  }

  //mobile number validation function
  handleUserMobileNo(event) {
    let userMobileNo = event.target.value.trim();
    let userMobileNoError = this.state.userMobileNoError;

    if (event.type == "blur") {
      if (userMobileNo.length != 10) {
        userMobileNo = "";
        userMobileNoError = "Wrong Mobile No.";
      } else {
        userMobileNoError = "";
      }
    }

    this.setState({userMobileNo, userMobileNoError});
  }

  hideModal() {
    //first time notify user that mobile no is manditory to make enquiry.
    switch (this.state.modalHideCounter) {
      case 0:
        this.setState({
          mobileNoMandatory: "Mobile No Is mandatory to continue",
          modalHideCounter: 1,
        });
        break;

      case 1:
        this.setState({show: false});
        break;
    }
  }
  handleClose() {
    this.setState({successfull: false});
    location.reload();
  }
  render() {
    return (
      <div className="bzGoogleLogin myRelative">
        <GoogleLogin
          clientId="278249212676-oi3eqa80e7ejb5ilp9vh68ls3ri6jimg.apps.googleusercontent.com"
          onSuccess={this.responseSuccess.bind(this)}
          onFailure={this.responseFailure.bind(this)}
          className={generalUtil.safeReturn(this.props, "className", "")}
        >
          {this.props.children}
        </GoogleLogin>

        {this.state.showLoader == true ? (
          <div className="loader-overlay">
            <ThreeBounce {...loaderStyle} />
          </div>
        ) : (
          ""
        )}

        <Modal
          show={this.state.show}
          onHide={this.hideModal.bind(this)}
          bsClass="modal"
          dialogClassName="google-mobile-form"
        >
          <Modal.Header closeButton>
            <div className="header-section mobile-modal-header">
              <img alt={"media.bookeventz.com"} src={this.state.pictureUrl} />
              <p className={'mobile-modal-email'}>{this.state.userEmail}</p>
            </div>
          </Modal.Header>

          <Modal.Body>
            <div className="row">
              <div className="col-sm-12 ">
                <div className="form-group mobile-form">
                  <p className={'mobile-modal-label'}>Enter your Mobile Number</p>
                  <input
                    type="number"
                    className="form-control mobile-modal-input"
                    onBlur={this.handleUserMobileNo.bind(this)}
                    onChange={this.handleUserMobileNo.bind(this)}
                    placeholder="Mobile Number"
                  />
                </div>

                <div className="color-error">
                  <p>{this.state.userMobileNoError}</p>
                </div>

                <button
                  className="btn btn-primary center-block mobile-modal-confirm"
                  onClick={this.checkUserModal.bind(this)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </Modal.Body>
          {/*<Modal show={this.state.successfull} onHide={this.handleClose.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Thank you for making an Enquiry</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose.bind(this)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>*/}
        </Modal>
      </div>
    );
  }
}

export default BzGoogleLogin;
