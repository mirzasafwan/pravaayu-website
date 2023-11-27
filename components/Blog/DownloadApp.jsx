import React, {useState} from "react";
import querystring from 'querystring';
import axios from 'axios';

const DownloadApp = () => {
  const [emailValue, setEmailValue] = useState(null);
  const [inputError, setInputError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = () => {
    console.log(emailValue,'emailValue')
    var valid = validateEmail(emailValue);
    console.log(valid,'valid valid')
    if(!valid){
      setInputError(true);
      return;
    }

    if(valid){
      let url = "https://api.bookeventz.com/blog/storeSubscribeToBlog";
      let data = {
        email : emailValue,
        type : 2
      };
      try {
        axios.post(url,querystring.stringify(data)).then((res) => {
          let result = res.data;
          if(result.success){
            setSuccessMessage(result.message);
          }
        });
      } catch (error) {
        console.log(error, "error message");
        setSuccessMessage('Something went wrong');
      }
    }
  }
  return (
    <>
      <div id="download-app">
        <img
          src="https://media.bookeventz.com/html/ui_website/blog-section/bugdet_new.svg"
          alt="Budget bottom banner"
          id="vudget"
        />
        <div id="dapp-wrapper">
          <input type="email" placeholder="Enter your email" value={emailValue} onChange={(e)=>{console.log(e.target.value,'eee'); setEmailValue(e.target.value);}}/>
          <button onClick={()=>{handleSubmit()}}>Get Link</button>
        </div>
        <div id="app-d-options" style={{bottom:100}}> 
          {inputError && <span style={{color:'red',fontSize:'14px'}}>Email is not valid</span>}
          {successMessage && <span style={{color:'#e42987',fontSize:'14px'}}>{successMessage}</span>}
        </div>
        
        <div id="app-d-options">
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

export default DownloadApp;
