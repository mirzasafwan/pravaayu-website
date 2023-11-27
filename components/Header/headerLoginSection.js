import ReactDOM from "react-dom";
var React = require('react');
// import SignupModal  from './signupModal';
// import LoginModal from './loginModal';
// import axios from 'axios';
// import querystring from 'querystring';
// import cookie from 'react-cookies';

var generalUtil = require("@/lib/generalUtil");
global.myReactDOM12 = ReactDOM;
global.myReact12 = React;
class HeaderLoginSection extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isShowLoginModal:this.props.isShowLoginModal != undefined ? this.props.isShowLoginModal : false,
            isShowSignUpModal: this.props.isShowSignUpModal != undefined?this.props.isShowSignUpModal:false,
            signupEvent:'signup',
        }
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }
    signUpClick(event)
    {
        this.setState({'isShowSignUpModal': true, 'isShowLoginModal': false,'signupEvent':event});
    }
    loginClick(event)
    {
        this.setState({'isShowSignUpModal': false, 'isShowLoginModal': true,'signupEvent':event});
    }
    toggleLoginModal(value)
    {
        this.setState({'isShowLoginModal': value});
    }
    hideSignUpModal(value)
    {
        this.setState({'isShowSignUpModal': value});
    }
    componentWillReceiveProps(nextProps)
    {
        this.setState({isShowLoginModal:nextProps.isShowLoginModal});
    }
    handleSubmitClick(data){
        console.log('Inside handleSubmitClick');
        let that = this;
        // if(this.props.invitesData){
        //     let invitesData = this.props.invitesData;
        //     let params = {
        //         template_id:invitesData.templateId,
        //         user_profile_id:data.user_profile_id,
        //         content:invitesData.inviteContent,
        //         imageContent:invitesData.imageContent  
        //     };
        //     // https://api.bookeventz.com
        //     axios.post('https://api.bookeventz.com/EventInvitation/saveDraftPreviewTemplates',querystring.stringify(params))
        //     .then((inviteData)=>{
        //         if(inviteData.data.success){
        //           let urlParams = 'invitation_id='+inviteData.data.id;
        //           let mainUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + urlParams;
        //           window.location.href = mainUrl;
        //         }
        //     });
        // }
        
        // Only for the login when InvitationModuleView called
        if(this.props.pageType=='InvitationModuleView'){
          console.log('-----Login when InvitationModuleView called-----');
          that.props.inviteHandleSubmit(data);
          this.toggleLoginModal(false);
        }
    }
  

  render() {
    // console.log(this.props.reviewLogin,'reviewLogin');
    return (
      <div>
        {generalUtil.safeReturn(this.props.sessionData, "user_type", false, ["", null]) ===
        false ? (
          <div>
            {/*<SocialConformationModal {...this.props}
                             hideSocialConformationModal={this.hideSocialConformationModal.bind(this)}
                             show={this.state.isShowSocialConformationModal}
                             onTriggeredSocialConformationModal={this.onTriggeredSocialConformationModal.bind(this)}  />*/}

            {/* <LoginModal
              {...this.props}
              hideLoginModal={this.toggleLoginModal.bind(this)}
              show={this.state.isShowLoginModal}
              onClickSignup={this.signUpClick.bind(this)}
              sendQA={this.props.sendQA}
              reviewLogin={this.props.reviewLogin}
              pageType={this.props.pageType}
              handleSubmit={this.props.handleSubmit}
              handleSubmitClick={this.handleSubmitClick}
            />

            <SignupModal
              {...this.props}
              hideSignupModal={this.hideSignUpModal.bind(this)}
              loginClick={this.loginClick.bind(this)}
              show={this.state.isShowSignUpModal}
              signupEvent={this.state.signupEvent}
              toggleLoginModal={this.toggleLoginModal}
            /> */}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

// module.exports = HeaderLoginSection;
export default HeaderLoginSection;
