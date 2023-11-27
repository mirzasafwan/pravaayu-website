"use strict";
import React from "react";
import {Modal} from "react-bootstrap";
import generalUtil from "@/lib/generalUtil";
// import BzCountryCodeDropDown from "./bzCountryCodeDropDown";
import axios from "axios";
import querystring from "querystring";
import OtpInput from "react-otp-input";
import BzGoogleLogin from "./bzGoogleLogin";
// import BzFacebookLogin from "../general/bzFacebookLogin";
// import DayPicker from "react-day-picker";
// import {Provider} from "react-redux";
import moment from "moment";

class SignupModal extends React.Component {
  constructor(props) {
    super(props);

    this.yearsArr = [];

    let currYear = new Date().getFullYear();
    for (let i = Number(currYear) - 100; i <= currYear; i++) {
      if (i != "2021") {
        this.yearsArr.push(i);
      }
    }

    this.state = {
      greetedCount: 0,
      show: typeof this.props.show != "undefined" ? this.props.show : false,
      gReadyToBind: false,
      isShowGoogleLogin: true,
      signupEvent: this.props.signupEvent,
      sentOtp: false,
      otpCount: false,
      params: {
        countryCode: "91",
      },
      errorMsgLog: {},
      dob: "",
      showCurrentPass: false,
      ConfPwd: "",
      curr_pass: "",
      userOtpError: false,
      otp: "",
      datePicker: false,
      revealPass: false,
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.backToPrev = this.backToPrev.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show != this.state.show) {
      this.setState({show: nextProps.show});
    }
    if (nextProps.signupEvent != this.state.signupEvent) {
      this.setState({signupEvent: nextProps.signupEvent});
    }
  }

  hideModal() {
    this.setState({show: false}, function () {
      this.props.hideSignupModal(false);
    });
  }

  handleNameChange(e) {
    var letters = /^[A-Za-z]+$/;
    var params = this.state.params;
    var errorMsgLog = this.state.errorMsgLog;
    params["userName"] = e.target.value.trim();
    // if(e.target.value.match(letters))
    // {
    this.setState({errorForText: "", params: params});
    return true;
    // }
    // else
    // {
    //     this.setState({'errorForText':'Please use alphabets only'});
    //     return false;
    // }
    if (e.target.value < 3) {
      this.setState({errorForText: "Minimum 3 letters required"});
      return false;
    } else {
      this.setState({errorForText: "", params: params});
    }

    if (typeof e.type != "undefined") {
      if (e.type == "blur") {
        params["userName"] = e.target.value.trim();
      } else {
        params["userName"] = e.target.value.trim();
      }

      if (typeof errorMsgLog["userName"] != "undefined") {
        delete errorMsgLog["userName"];
      }
    }
    this.setState({params, errorMsgLog});
  }

  handleEmail(e) {
    var params = this.state.params;
    var errorMsgLog = this.state.errorMsgLog;

    params["userEmail"] = e.target.value.trim();

    if (e.type == "blur") {
      var re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!re.test(params["userEmail"])) {
        errorMsgLog["userEmail"] = "Wrong Email id";
        this.setState({errorMsgLog});
      } else {
        delete errorMsgLog["userEmail"];
      }
    }
    this.setState({params, errorMsgLog});
  }

  handlePwd(e) {
    var params = this.state.params;
    var errorMsgLog = this.state.errorMsgLog;
    params["cus_pass"] = e.target.value.trim();
    if (typeof errorMsgLog["cus_pass"] != "undefined" && params["cus_pass"] != "undefined") {
      delete errorMsgLog["cus_pass"];
    }
    if (typeof errorMsgLog["cus_pass"] == "undefined") {
      errorMsgLog["cus_pass"] = "Enter password";
    }
    this.setState({params, errorMsgLog, curr_pass: e.target.value.trim()});
  }

  handleConfPwd(e) {
    var errorMsgLog = this.state.errorMsgLog;
    if (typeof errorMsgLog["cus_pass"] != "undefined") {
      delete errorMsgLog["cus_pass"];
    }

    this.setState({ConfPwd: e.target.value.trim(), errorMsgLog});
  }

  handleDOB(e) {
    this.setState({dob: moment(e).format("YYYY-MM-DD")});
  }

  countryCodeChange(key, data) {
    var params = this.state.params;
    params["countryCode"] = data.dial_code;
    this.setState({params}, function () {
      this.afterCodeChange();
    });
  }

  handleUserMobileNo(e) {
    var params = this.state.params;
    var errorMsgLog = this.state.errorMsgLog;

    params["userMobileNo"] = e.target.value.trim();

    var userMobileNoError = true;
    if (params["userMobileNo"].length == 10) {
      userMobileNoError = false;
    }

    if (userMobileNoError == true) {
      errorMsgLog["userMobileNo"] = "Wrong Mobile Number";
    } else {
      delete errorMsgLog["userMobileNo"];
    }

    this.setState({params, errorMsgLog});
  }

  afterCodeChange() {
    var params = this.state.params;
    var errorMsgLog = this.state.errorMsgLog;

    if (generalUtil.safeReturn(params, "userMobileNo", false) !== false) {
      var userMobileNoError = true;
      /*if(params.countryCode == this.props.constants.defaultCountryDialCode)
            {
                if(params['userMobileNo'].length == 10)
                {
                    userMobileNoError = false;
                }
            }*/
      /*   else
            {
                userMobileNoError = false;
            }*/

      if (userMobileNoError == true) {
        errorMsgLog["userMobileNo"] = "Wrong Mobile Number";
      } else {
        delete errorMsgLog["userMobileNo"];
      }

      this.setState({params, errorMsgLog});
    }
  }
  createEventId() {
    this.props.createEventId();
  }
  loginSubmit() {
    var that = this;
    var errorMsgLog = this.state.errorMsgLog;
    var params = this.state.params;

    var reqFields = ["userName", "userEmail", "userMobileNo", "cus_pass"];
    reqFields.forEach(function (row, i) {
      if (typeof params[row] == "undefined" || params[row] == "") {
        if (typeof errorMsgLog[row] == "undefined" || errorMsgLog[row] == "") {
          errorMsgLog[row] = "This field is required";
        }
      }
    });

    if (typeof errorMsgLog["cus_pass"] == "undefined") {
      if (
        typeof params.cus_pass != "undefined" &&
        params.cus_pass != "" &&
        ((typeof this.state.ConfPwd != "undefined" && params.cus_pass != params.cus_pass) ||
          typeof this.state.ConfPwd == "undefined")
      ) {
        errorMsgLog["cus_pass"] = "Password dont match";
      }
    }

    var isValidationSuccess = true;
    for (var i in errorMsgLog) {
      if (errorMsgLog[i] != "" && i != "serverError") {
        isValidationSuccess = false;
      }
    }

    if (isValidationSuccess == false) {
      this.setState({errorMsgLog});
    } else {
      // $('body').waitMe({effect : 'bounce'});

      var dob = this.state.dob;
      // if (
      //   typeof dob["year"] != "undefined" &&
      //   typeof dob["month"] != "undefined" &&
      //   typeof dob["day"] != "undefined"
      // ) {
      //   params["birthDate"] = dob["year"] + "-" + dob["month"] + "-" + dob["day"];

      //   /*console.log(params['birthDate']);
      //           var date = new Date(params['birthDate']);
      //           console.log(date instanceof Date && !isNaN(date.valueOf()));*/
      // }
      // // this.props.base_url
      axios
        .post("https://www.bookeventz.com/" + "login/signUp", querystring.stringify(params))
        .then((xhrResponse) => {
          if (generalUtil.safeReturn(xhrResponse, "data", false) !== false) {
            let data = xhrResponse.data;

            if (typeof data.error != "undefined") {
              errorMsgLog.serverError = data.errorMsg;
              that.setState({errorMsgLog});
              that.props.onClickLogin(errorMsgLog);
            } else {
              // location.reload();
              that.props.toggleLoginModal(true);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  checkupdatePassword() {
    if (this.state.curr_pass != this.state.ConfPwd) {
      this.setState({confirmPassError: "Your Password does not match"});
    } else {
      this.updatePassword();
    }
  }

  fbResponse() {
    location.reload();
  }

  googleResponse() {
    location.reload();
  }
  otpCheck(e) {
    var otpNumber = e.target.value.trim();
    if (otpNumber.toString().length == 10) {
      this.setState({otpNumber: otpNumber, otpCheck: true});
    } else {
      this.setState({otpNumber: otpNumber, otpCheck: false});
    }
  }
  optCreate(resend = false) {
    this.setState({userOtpVerified: true});
    this.setState({otpStatus: ""});
    axios
      .post(
        "https://www.bookeventz.com/login/generateOtp",
        querystring.stringify({
          userMobileNo: this.state.otpNumber,
          resend: resend,
        })
      )
      .then((xhrResponse) => {
        if (xhrResponse.data.status == true) {
          this.setState({
            userOtpVerified: true,
            sentOtp: true,
            userEmail: xhrResponse.data.userEmail,
            userMobile: xhrResponse.data.userMobileNo,
            userName: xhrResponse.data.userName,
            userId: xhrResponse.data.UserId,
          });
          this.setState({sentOtp: true});
        } else {
          this.setState({userOtpVerified: false, userOtpError: true});
        }
      })
      .catch((error) => {
        console.log("error");
      });
  }
  loginwithOtp() {
    axios
      .post(
        "https://www.bookeventz.com/login/userGuest",
        querystring.stringify({
          userEmail: this.state.userEmail,
          userName: this.state.userName,
          userMobileNo: this.state.userMobile,
        })
      )
      .then((xhrResponse) => {
        if (generalUtil.safeReturn(xhrResponse, "data", false) !== false) {
          let data = xhrResponse.data;

          if (typeof data.error == "undefined") {
            if (typeof window !== "undefined") {
              window.location.reload();
            }
            /*that.props.updateSessionData(that.props, data.sessionData);*/
            // that.props.updateSessionData(this.props, data.sessionData,that.setState({'isSubmitTrigger': true}));
            /*that.setState({'isSubmitTrigger': true});*/
          }
        }
      })
      .catch((error) => {
        console.log("error");
      });

    //Temp Update store -> sessionData with basic info of user
    this.props.updateSessionData(
      this.props,
      {
        userEmail: this.state.userEmail,
        userMobileNo: this.state.userMobileNo,
        userName: this.state.userName,
      },
      this.setState({isSubmitTrigger: true})
    );
  }
  optVerify() {
    axios
      .post(
        "https://www.bookeventz.com/login/verifyOtp",
        querystring.stringify({
          otp: this.state.otp,
        })
      )
      .then((xhrResponse) => {
        if (generalUtil.safeReturn(xhrResponse, "data", false) !== false) {
          let data = xhrResponse.data;
          this.setState({otpStatus: data});
          if (data == "Otp verified successfully") {
            if (this.state.signupEvent != "forgot") {
              this.loginwithOtp();
            } else {
              this.setState({showCurrentPass: true});
            }
          }

          if (typeof data.error == "undefined") {
            /*that.props.updateSessionData(that.props, data.sessionData);*/
            // that.props.updateSessionData(this.props, data.sessionData,that.setState({'isSubmitTrigger': true}));
            /*that.setState({'isSubmitTrigger': true});*/
          }
        }
      })
      .catch((error) => {
        console.log("error");
      });
  }
  getOtp(getOtp) {
    this.setState({otp: getOtp, otpCount: true});
  }
  updatePassword() {
    var that = this;
    var params = {
      pass: this.state.curr_pass,
      userId: this.state.userId,
    };

    axios
      .post("https://www.bookeventz.com/login/updatePassword", querystring.stringify(params))
      .then((xhrResponse) => {
        if (generalUtil.safeReturn(xhrResponse, "data", false) !== false) {
          let data = xhrResponse.data;

          if (typeof data.error != "undefined") {
          } else {
            location.reload();
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  backToPrev(prevState) {
    this.setState({userOtpVerified: false, userOtpError: false});
  }
  loginClick() {
    this.props.loginClick();
  }
  forgetpass() {
    this.setState({showCurrentPass: false});
  }
  render() {
    console.log(this.state.dob, "this.state.dob");
    var err = [];
    var signUpContent = "";

    for (var i in this.state.errorMsgLog) {
      var row = this.state.errorMsgLog[i];
      err.push(row);
    }

    var mainText = "Join Us";
    var subText = "to discover the membership benefits";
    if (this.state.signupEvent == "forgot") {
      mainText = "Join Us";
      subText = "and discover the benefit of being a customer with us";
    } else if (this.state.signupEvent == "otp") {
      mainText = "Login Via OTP";
      subText = "to discover the membership benifits";
    }
    var number = "9999999999";
    if (this.state.userMobile != undefined) {
      var replacetex = this.state.userMobile;
    } else {
      var replacetex = number;
    }

    return (
      <Modal
        show={this.state.show}
        onHide={this.hideModal.bind(this)}
        bsSize="md"
        bsClass="signupModal-wrap modal"
        dialogClassName="signupModal"
      >
        {/* SignupModal New section */}
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
        </div>
        <div className="row" id="lg-9-main">
          {this.state.signupEvent == "otp" ? (
            <div>
              <div className="social-login-wrap">
                <div className="facebook-wrap">
                  <BzFacebookLogin
                    {...this.props}
                    className="fb-button"
                    response={this.fbResponse.bind(this)}
                  >
                    <span className="fb-icon" />
                    <span className="fb-text" />
                  </BzFacebookLogin>
                </div>

                <div className="google-wrap">
                  <BzGoogleLogin
                    {...this.props}
                    className="g-button"
                    response={this.googleResponse.bind(this)}
                  >
                    <span className="g-icon" />
                    <span className="g-text" />
                  </BzGoogleLogin>
                </div>
              </div>

              <div className="or-divider">
                <span>OR</span>
              </div>
              {this.state.userOtpVerified != true ? (
                <div>
                  <div className="input-column">
                    <input
                      className="form-control otpNumber"
                      type="number"
                      name="phone"
                      placeholder="Enter your mobile number"
                      onBlur={(e) => this.otpCheck(e)}
                      maxLength={10}
                      onChange={(e) => this.otpCheck(e)}
                      autocomplete="off"
                    />

                    <p className="text-pink">
                      {generalUtil.safeReturn(this.state.errorMsgLog, "userMobileNo", "")}
                    </p>
                  </div>
                  <div className="otpNumberText">You will receive the OTP on this number</div>
                  <div>
                    <button
                      className={
                        this.state.otpCheck == true
                          ? "btn btn-primary btn-otp"
                          : "btn btn-primary btn-otp btn-disabled"
                      }
                      onClick={this.optCreate.bind(this)}
                    >
                      Submit
                    </button>
                  </div>
                  <p className="text-pink">
                    {this.state.userOtpError == true
                      ? "Sorry, the entered number is not associated with any login"
                      : ""}
                  </p>
                  <div className="col-sm-12 text-center center-block">
                    <div id="j-10">
                      Already a member? <span onClick={this.loginClick.bind(this)}>Login</span>
                    </div>
                    {/* <span className="secondScreen" onClick={this.loginClick.bind(this)}>
                      <span className="back-popup"></span>Back
                    </span> */}
                  </div>
                </div>
              ) : (
                <div className="otpWrap">
                  <div className="optEnter">Enter OTP</div>
                  <div className="otpText">
                    {this.state.userOtpVerified == true
                      ? "Use OTP sent to " + replacetex + " to login"
                      : ""}
                  </div>
                  <OtpInput
                    onChange={(e) => this.getOtp(e)}
                    numInputs={6}
                    isInputNum={false}
                    separator={<span>-</span>}
                    value={this.state.otp}
                  />

                  <p className="text-pink">
                    {this.state.otpStatus == "Otp verified successfully"
                      ? ""
                      : this.state.otpStatus}
                  </p>
                  {this.state.otpCount == true ? (
                    <button className="btn btn-primary btn-otp" onClick={this.optVerify.bind(this)}>
                      Submit
                    </button>
                  ) : (
                    <button className="btn btn-primary btn-otp btn-disabled">Submit</button>
                  )}

                  <div className="row resendWrap">
                    <div className="col-xs-6 ">
                      <span
                        className="secondScreen"
                        onClick={this.backToPrev.bind(this, "signupEvent")}
                      >
                        {" "}
                        <span className="back-popup"></span>Back
                      </span>
                    </div>
                    <div className="col-xs-6" onClick={this.optCreate.bind(this)}>
                      <span className="secondScreen">Resend</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            ""
          )}

          {this.state.signupEvent == "forgot" ? (
            <div>
              <div className="social-login-wrap">
                <div className="facebook-wrap">
                  <BzFacebookLogin
                    {...this.props}
                    className="fb-button"
                    response={this.fbResponse.bind(this)}
                  >
                    <span className="fb-icon" />
                    <span className="fb-text" />
                  </BzFacebookLogin>
                </div>

                <div className="google-wrap">
                  <BzGoogleLogin
                    {...this.props}
                    className="g-button"
                    response={this.googleResponse.bind(this)}
                  >
                    <span className="g-icon" />
                    <span className="g-text" />
                  </BzGoogleLogin>
                </div>
              </div>

              <div className="or-divider">
                <span>OR</span>
              </div>
              {this.state.userOtpVerified != true ? (
                <div>
                  <div className="input-column">
                    <input
                      className="form-control otpNumber"
                      type="number"
                      placeholder="Enter your mobile number"
                      name="phone"
                      maxLength={10}
                      onBlur={(e) => this.otpCheck(e)}
                      onChange={(e) => this.otpCheck(e)}
                      autocomplete="off"
                    />

                    <p className="text-pink">
                      {generalUtil.safeReturn(this.state.errorMsgLog, "userMobileNo", "")}
                    </p>
                  </div>
                  <div className="otpNumberText">You will receive the OTP to reset password</div>
                  <div>
                    {this.state.otpCheck == true ? (
                      <button
                        className={"btn btn-primary btn-otp"}
                        onClick={this.optCreate.bind(this, true)}
                      >
                        Submit
                      </button>
                    ) : (
                      <button className="btn btn-primary btn-otp btn-disabled">Submit</button>
                    )}
                  </div>
                  <p className="text-pink">
                    {this.state.userOtpError == true
                      ? "Sorry, the entered number is not associated with any login"
                      : ""}
                  </p>
                  <div className="col-sm-12 text-center center-block">
                    <div id="j-10">
                      Already a member? <span onClick={this.loginClick.bind(this)}>Login</span>
                    </div>
                  </div>
                </div>
              ) : this.state.showCurrentPass == false ? (
                <div className="otpWrap">
                  <div className="optEnter">Enter OTP</div>
                  <div className="otpText">
                    {this.state.userOtpVerified == true
                      ? "We have sent OTP to " + replacetex + " to reset password"
                      : ""}
                  </div>
                  <OtpInput
                    onChange={(e) => this.getOtp(e)}
                    numInputs={6}
                    value={this.state.otp}
                    separator={<span>-</span>}
                  />
                  <button
                    className={
                      this.state.otpCount == true
                        ? "btn btn-primary btn-otp"
                        : "btn btn-primary btn-otp btn-disabled"
                    }
                    onClick={this.optVerify.bind(this, "true")}
                  >
                    Submit
                  </button>
                  <div className="row resendWrap">
                    <div className="col-xs-6 ">
                      <span
                        className="secondScreen"
                        onClick={this.backToPrev.bind(this, "otpPassword")}
                      >
                        {" "}
                        <span className="back-popup"></span>Back
                      </span>
                    </div>
                    <div className="col-xs-6">
                      <span className="secondScreen" onClick={this.optCreate.bind(this)}>
                        Resend
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="forgotpass">
                  <div className="form-group has-feedback">
                    <div className="input-column">
                      <input
                        className="form-control"
                        type={this.state.revealPass == true ? "text" : "password"}
                        onBlur={(e) => this.handlePwd(e)}
                        onChange={(e) => this.handlePwd(e)}
                        placeholder="Enter a Password"
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
                  </div>

                  <div className="form-group has-feedback">
                    <div className="input-column">
                      <input
                        className="form-control"
                        type="password"
                        onBlur={(e) => this.handleConfPwd(e)}
                        onChange={(e) => this.handleConfPwd(e)}
                        placeholder="Re-enter the Password"
                        autocomplete="off"
                      />

                      <p className="text-pink">
                        {this.state.confirmPassError == "Your Password does not match"
                          ? "Entered passwords does not match"
                          : ""}
                      </p>
                    </div>
                  </div>
                  <div className="form-group ">
                    {this.state.curr_pass == "" && this.state.ConfPwd == "" ? (
                      <div className="input-column">
                        <button
                          className="btn btn-disabled forgotbtn"
                          type="submit"
                          onClick={this.checkupdatePassword.bind(this)}
                        >
                          Submit
                        </button>
                        <p className="text-pink"></p>
                      </div>
                    ) : (
                      <div className="input-column">
                        <button
                          className="btn btn-primary forgotbtn"
                          type="submit"
                          onClick={this.checkupdatePassword.bind(this)}
                        >
                          Submit
                        </button>
                        <p className="text-pink"></p>
                      </div>
                    )}
                    <div></div>
                  </div>
                  <div className="col-sm-12 text-center center-block secondScreen-wrap">
                    <div id="j-10">
                      Already a member? <span onClick={this.loginClick.bind(this)}>Login</span>
                    </div>
                    {/* <span className="secondScreen" onClick={this.loginClick.bind(this)}>
                      {" "}
                      <span className="back-popup"></span>Back
                    </span> */}
                  </div>
                </div>
              )}
            </div>
          ) : (
            ""
          )}

          {this.state.signupEvent == "signup" ? (
            <>
              <div className="form-group has-feedback">
                <div className="input-column">
                  <input
                    className={
                      generalUtil.safeReturn(this.state.errorMsgLog, "userName")
                        ? "errorBorder form-control"
                        : "form-control"
                    }
                    type="text"
                    placeholder="Name"
                    name="name"
                    pattern="[A-Za-z]"
                    title="Only Alphabets"
                    minlength="3"
                    onChange={(e) => this.handleNameChange(e)}
                    onBlur={(e) => this.handleNameChange(e)}
                    pattern="[a-z]"
                    autocomplete="off"
                  />
                  <p className="text-pink">{this.state.errorForText}</p>
                  <p className="text-pink">
                    {generalUtil.safeReturn(this.state.errorMsgLog, "userName", "")}
                  </p>
                </div>
              </div>

              <div className="form-group has-feedback">
                <div className="input-column">
                  <input
                    className={
                      generalUtil.safeReturn(this.state.errorMsgLog, "userEmail")
                        ? "errorBorder form-control"
                        : "form-control"
                    }
                    type="email"
                    onBlur={(e) => this.handleEmail(e)}
                    name="email"
                    onChange={(e) => this.handleEmail(e)}
                    placeholder="Email"
                    autocomplete="off"
                  />

                  <p className="text-pink">
                    {generalUtil.safeReturn(this.state.errorMsgLog, "userEmail", "")}
                  </p>
                </div>
              </div>

              <div className="">
                <div className="form-group has-feedback my-display-inline mobileNoInput-wrap">
                  {/* <Provider store={store}>
                      <BzCountryCodeDropDown />
                    </Provider> */}
                  <div className="input-column">
                    <input
                      className={
                        generalUtil.safeReturn(this.state.errorMsgLog, "userMobileNo")
                          ? "errorBorder form-control"
                          : "form-control"
                      }
                      type="number"
                      placeholder="Mobile Number"
                      onBlur={(e) => this.handleUserMobileNo(e)}
                      name="number"
                      onChange={(e) => this.handleUserMobileNo(e)}
                      autocomplete="off"
                    />

                    <p className="text-pink">
                      {generalUtil.safeReturn(this.state.errorMsgLog, "userMobileNo", "")}
                    </p>
                  </div>
                </div>{" "}
              </div>

              <div className="form-group has-feedback birth-day-wrap">
                <input
                  id="dob6"
                  data-date=""
                  data-date-format="DD/MM/YYYY"
                  defaultValue="2002/08/09"
                  placeholder="Date of Birth"
                ></input>
                {/* <span id="dob6">{this.state.dob !== "" ? this.state.dob : "Date of Birth"}</span> */}
                <img
                  src="https://media.bookeventz.com/html/ui_website/images/cal.svg"
                  alt="calender-logo"
                  onClick={() => this.setState({datePicker: !this.state.datePicker})}
                />
              </div>
              <div className="form-group has-feedback">
                <div className="input-column">
                  <input
                    className={
                      generalUtil.safeReturn(this.state.errorMsgLog, "cus_pass")
                        ? "form-control errorBorder"
                        : "form-control"
                    }
                    type={this.state.revealPass == true ? "text" : "password"}
                    onBlur={(e) => this.handlePwd(e)}
                    onChange={(e) => this.handlePwd(e)}
                    placeholder="Enter a Password"
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
                </div>{" "}
              </div>
              <div className="form-group has-feedback">
                <div className="input-column">
                  <input
                    className="form-control"
                    type="password"
                    onBlur={(e) => this.handleConfPwd(e)}
                    onChange={(e) => this.handleConfPwd(e)}
                    placeholder="Re-enter the Password"
                    autocomplete="off"
                  />

                  <p className="text-pink">
                    {generalUtil.safeReturn(this.state.errorMsgLog, "cus_pass", "")}
                  </p>
                </div>
              </div>

              <div className="form-group ">
                <div className="input-column">
                  {this.state.curr_pass == "" || this.state.ConfPwd == "" ? (
                    <button
                      className={"btn btn-disabled"}
                      type="submit"
                      onClick={this.loginSubmit.bind(this)}
                    >
                      {" "}
                      Submit
                    </button>
                  ) : (
                    <button
                      className={"btn btn-primary"}
                      type="submit"
                      onClick={this.loginSubmit.bind(this)}
                    >
                      Submit
                    </button>
                  )}
                  <p className="text-pink">
                    {generalUtil.safeReturn(this.state.errorMsgLog, "serverError", "")}
                  </p>
                </div>
              </div>
              <div className="col-sm-12 text-center center-block secondScreen-wrap">
                <div id="j-10">
                  Already a member? <span onClick={this.loginClick.bind(this)}>Login</span>
                </div>
                {/* <span className="secondScreen" onClick={this.loginClick.bind(this)}>
                  {" "}
                  <span className="back-popup"></span>Back
                </span> */}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        {/* {this.state.datePicker && (
          <div id="mn-9-dp">
            <DayPicker
              numberOfMonths={1}
              disabledDays={new Date()}
              onDayClick={(e) => {
                this.handleDOB(e), this.setState({datePicker: !this.state.datePicker});
              }}
            />
          </div>
        )} */}
      </Modal>
    );
  }
}

export default SignupModal;
