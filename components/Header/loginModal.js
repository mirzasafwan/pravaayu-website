// 'use strict';

var React = require("react");
import {Modal} from "react-bootstrap";
var querystring = require("querystring");
var cookie = require("react-cookies");
import BzGoogleLogin from "./bzGoogleLogin";
// import BzFacebookLogin from "./bzFacebookLogin";
import generalUtil from "@/lib/generalUtil";
import axios from "axios";

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: typeof this.props.show != "undefined" ? this.props.show : false,
      gReadyToBind: false,
      isShowGoogleLogin: true,
      params: {},
      QA: typeof this.props.QA != "undefined" ? this.props.QA : false,
      errorMsgLog: {},
      revealPass: false,
    };
    this.hideModal = this.hideModal.bind(this);
    this.handlePwd = this.handlePwd.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.googleResponse = this.googleResponse.bind(this);
    this.fbResponse = this.fbResponse.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.show != this.state.show) {
      this.setState({show: nextProps.show, QA: nextProps.QA});
    }
  }
  hideModal() {
    this.setState({show: false, QA: false}, function () {
      this.props.hideLoginModal(false);
    });
    // this.props.sendQA(false);
  }
  handleEmail(e) {
    var params = this.state.params;
    var errorMsgLog = this.state.errorMsgLog;

    params["email"] = e.target.value.trim();

    if (e.type == "blur") {
      var re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!re.test(params["email"])) {
        errorMsgLog["email"] = "Wrong Email id";
        this.setState({errorMsgLog});
      } else {
        delete errorMsgLog["email"];
      }
    }

    this.setState({params, errorMsgLog});
  }
  handlePwd(e) {
    var params = this.state.params;
    var errorMsgLog = this.state.errorMsgLog;

    params["pass"] = e.target.value.trim();

    this.setState({params, errorMsgLog});
  }
  loginSubmit() {
    console.log("Hello");
    var that = this;
    var errorMsgLog = this.state.errorMsgLog;
    var params = this.state.params;
    if (this.props.data != undefined) {
      if (this.props.data.isReview != undefined) {
        params.isReview = true;
        params.reviewId = "review-form";
      }

      if (this.props.data.isqna != undefined) {
        params.isqna = true;
        params.c = "qna-section";
      }
    }
    var reqFields = ["email", "pass"];
    reqFields.forEach(function (row, i) {
      if (typeof params[row] == "undefined" || params[row] == "") {
        if (typeof errorMsgLog[row] == "undefined" || errorMsgLog[row] == "") {
          errorMsgLog[row] = "This field is required";
        }
      }
    });

    var isValidationSuccess = true;
    for (var i in errorMsgLog) {
      if (errorMsgLog[i] != "" && i != "serverError") {
        isValidationSuccess = false;
      }
    }

    if (isValidationSuccess == false) {
      this.setState({errorMsgLog});
    } else {
      axios
        .post("https://www.bookeventz.com/login/user/json", querystring.stringify(params))
        .then((xhrResponse) => {
          if (generalUtil.safeReturn(xhrResponse, "data", false) !== false) {
            let data = xhrResponse.data;
            var ajaxData = {
              guestName: data.userName,
              guestEmail: data.userEmail,
              guestMobileNo: data.userMobileNo,
              cityId: this.props.sessionData.CityId,
              // bypass:404
            };
            if (this.props.vendorDetails != undefined) {
              $.ajax({
                type: "POST",
                dataType: "json",
                url: "https://api.bookeventz.com/events/createEventOnly",
                data: ajaxData,
                success: function (response) {
                  var ajaxData2 = {
                    eventId: response.eventId,
                  };

                  if (typeof response.eventId != "undefined") {
                    $.ajax({
                      type: "POST",
                      dataType: "json",
                      url: "https://api.bookeventz.com/functions/createFunctionOnly",
                      data: ajaxData2,
                      success: function (response2) {
                        var ajaxData3 = {
                          functionId: response2.functionId,
                          status: 14,
                          artistType: that.props.vendorDetails.vendorType,
                          artistId: that.props.vendorDetails.id,
                        };
                        $.ajax({
                          type: "POST",
                          dataType: "json",
                          url: "https://api.bookeventz.com/contractor/createPackageLead",
                          data: ajaxData3,
                          success: function (response2) {
                            console.log("packageLead");
                          },
                        });
                      },
                    });
                  }
                },
              });
            }

            if (typeof data.error != "undefined") {
              errorMsgLog.serverError = data.errorMsg;
              that.setState({errorMsgLog});
            } else {
              console.log(data, "data", that.props.sessionData);
              let loginSessionData = data;
              let sessionData = that.props.sessionData;
              let newSessionData = {...sessionData, ...loginSessionData};
              let userSessionData = {};
              userSessionData.userEmail = data.userEmail;
              userSessionData.userId = data.userId;
              userSessionData.isUserSession = data.isUserSession;
              userSessionData.userMobileNo = data.userMobileNo;
              userSessionData.pageUrl = data.pageUrl;
              userSessionData.userName = data.userName;
              userSessionData.user_profile_id = data.user_profile_id;
              userSessionData.user_type = 1;
              let cookieUserSession = {...that.props.sessionData, ...userSessionData};
              console.log(cookieUserSession,'cookieUserSession')
              newSessionData["sessionData"] = cookieUserSession;
              cookie.save("sessionData", newSessionData, {path: "/"});
              if (this.props.pageType == "InvitationModuleView") {
                this.props.handleSubmitClick(data);
              } else {
                location.reload();
              }
              return;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  clickSignup(event) {
    this.props.onClickSignup(event);
  }
  fbResponse(response = {}) {
    let that = this;
    console.log(that.props.pageType, that.props.reviewLogin, "fbResponse");
    if (that.props.pageType == "InvitationModuleView") {
      that.props.handleSubmitClick(response);
    } else if (
      (that.props.pageType == "venueProduct" || that.props.pageType == "vendorPage") &&
      that.props.reviewLogin
    ) {
      that.props.handleSubmit();
    } else {
      location.reload();
    }
  }
  googleResponse(response = {}) {
    let that = this;
    console.log(that.props ,'that.props.pageType googleResponse')
    if (that.props.pageType == "InvitationModuleView") {
      that.props.handleSubmitClick(response);
    } else if (
      (that.props.pageType == "venueProduct" || that.props.pageType == "vendorPage") &&
      that.props.reviewLogin
    ) {
      that.props.handleSubmit();
    } else if (that.props.pageType == "realEventProduct") {
      that.props.handleSubmit();
    } else {
      console.log('Google Submit response reload started')
      location.reload();
    }
  }
  render() {
    var err = [];
    for (var i in this.state.errorMsgLog) {
      var row = this.state.errorMsgLog[i];
      err.push(row);
    }
    return (
      <Modal
        show={this.state.show}
        onHide={this.hideModal}
        bsSize="md"
        bsClass="loginModal-wrap modal"
        dialogClassName="loginModal"
      >
        <div id="lg-9-main">
          <div id="main-top-lg">
            <img
              src="https://media.bookeventz.com/html/ui_website/images/bzLogo.svg"
              alt="bz-top-logo"
              id="can-4"
            />
            <img
              src="https://media.bookeventz.com/html/ui_website/images/clo.svg"
              alt="bz-top-logo"
              id="can-3"
              onClick={() => this.setState({show: !this.state.show})}
            />
          </div>
          <span id="log-text-0">india's largest event booking platform</span>
          <BzGoogleLogin {...this.props} className="ng-button" response={this.googleResponse}>
            <span className="g-icon" />
            <span className="g-text">Continue with Google</span>
          </BzGoogleLogin>
          <span id="div-1">or</span>
          <input
            type="text"
            placeholder="Email / Mobile Number"
            id="in-12"
            onBlur={this.handleEmail}
            onChange={this.handleEmail}
            autocomplete="off"
          />
          <div id="password-field">
            <input
              type={this.state.revealPass == true ? "text" : "password"}
              placeholder="Enter Your Password"
              id="in54"
              onBlur={this.handlePwd}
              onChange={this.handlePwd}
              autocomplete="off"
            />
            <img
              src={
                this.state.revealPass == true
                  ? "https://media.bookeventz.com/html/ui_website/images/ope.svg"
                  : "https://media.bookeventz.com/html/ui_website/images/cle.svg"
              }
              alt="hide-pass-logo"
              onClick={() => this.setState({revealPass: !this.state.revealPass})}
            />
          </div>
          <div id="-o98">
            <span id="r4">
              <input type="checkbox" />
              Remember me
            </span>
            <span id="r5" onClick={this.clickSignup.bind(this, "forgot")}>
              Forgot password?
            </span>
          </div>
          <div id="log-bt" style={{marginTop: "16px"}}>
            <button onClick={this.loginSubmit}>Login</button>
          </div>
          <div id="j-9" onClick={this.clickSignup.bind(this, "signup")}>
            New to BookEventz ? <span onClick={this.clickSignup.bind(this, "signup")}>Sign</span>
            <span onClick={this.clickSignup.bind(this, "signup")} id="j-909">
              Up
            </span>
          </div>
        </div>
      </Modal>
    );
  }
}
export default LoginModal;
{
  /* <Modal.Body>
<div className="row text-center">
  {this.props.serverError != undefined ? this.props.serverError.serverError : ""}
</div> */
}
{
  /* <div className="row journey-signup-wrapper">
  <div className="col-xs-12 col-sm-12 col-md-12">
    <div className="social-login-wrap">
      <div className="google-wrap">
        <BzGoogleLogin
          {...this.props}
          className="g-button"
          response={this.googleResponse}
        >
          <span className="g-icon" />
          <span className="g-text" />
        </BzGoogleLogin>
      </div> */
}

{
  /* Commented to check for enquiry drop */
}
{
  /* <div className="facebook-wrap">
                          <BzFacebookLogin {...this.props} className="fb-button" response={this.fbResponse}>
                              <span className="fb-icon" />
                              <span className="fb-text" />
                          </BzFacebookLogin>
                      </div> */
}
{
  /* </div> */
}

{
  /* {this.state.QA != true ? (
      <div>
        <div className="or-divider">
          <span>OR</span>
        </div>

        <div className="guest-login-wrap">
          <div className="form-group has-feedback">
            <div className="input-column">
              <input
                className={
                  generalUtil.safeReturn(this.state.errorMsgLog, "email")
                    ? "form-control errorBorder"
                    : "form-control"
                }
                type="email"
                onBlur={this.handleEmail}
                onChange={this.handleEmail}
                placeholder="Enter Email"
              />
            </div>
          </div>
          <div className="form-group has-feedback">
            <div className="input-column">
              <input
                className={
                  generalUtil.safeReturn(this.state.errorMsgLog, "pass")
                    ? "form-control errorBorder"
                    : "form-control"
                }
                type="password"
                onBlur={this.handlePwd}
                onChange={this.handlePwd}
                placeholder="Enter Password"
              />
            </div>
          </div> */
}

{
  /* <div className="form-group ">
            <div className="input-column" id="login-form">
              <div className="row">
                <div className="col-xs-6">
                  <a
                    className="signUpText"
                    onClick={this.clickSignup.bind(this, "forgot")}
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="col-xs-6 text-right">
                  {/* <a className="signUpText"  onClick={this.clickSignup.bind(this,'otp')}>Login Via OTP</a>*/
}
{
  /* </div> */
}
{
  /* </div> */
}
{
  /* {this.state.params.email != "" &&
              this.state.params.pass != "" &&
              this.state.params.email != undefined &&
              this.state.params.pass != undefined ? (
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={this.loginSubmit}
                >
                  Login
                </button>
              ) : (
                <button className="btn btn-primary btn-disabled" type="submit">
                  Login
                </button>
              )} */
}

{
  /* {(this.props.reviewLogin == false ||
                this.props.reviewLogin == undefined) && (
                <div className="text-center " style={{marginTop: "8px"}}>
                  New to BookEventz?{" "}
                  <a
                    style={{cursor: "pointer"}}
                    className="signUpText"
                    onClick={this.clickSignup.bind(this, "signup")}
                  >
                    Sign Up
                  </a>
                </div>
              )}
            </div>
          </div>
          <p className="text-pink">
            {generalUtil.safeReturn(this.state.errorMsgLog, "serverError", "")}
          </p>
        </div>
      </div>
    ) : (
      ""
    )}
  </div>
</div>
</Modal.Body> */
}
