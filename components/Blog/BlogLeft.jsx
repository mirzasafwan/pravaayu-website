import React, {useState} from "react";
import querystring from 'querystring';
import axios from 'axios';

const BlogLeft = () => {
  const [emailValue, setEmailValue] = useState(null);
  const [inputError, setInputError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = () => {
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
        type:1
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
      <div id="blog-left">
        <div id="bll-top">
          <span>Subscribe to Our Event Idea Blogs</span>
          <input type="text" placeholder="Enter your emaill" value={emailValue} onChange={(e)=>{console.log(e.target.value,'eee'); setEmailValue(e.target.value);}} />
          {inputError && <span style={{color:'red',fontSize:'14px'}}>Email is not valid</span>}
          {successMessage && <span style={{color:'#e42987',fontSize:'14px'}}>{successMessage}</span>}
          <button onClick={()=>{handleSubmit()}}>Subscribe</button>
        </div>
        <div id="bll-top-two">
          <span>Follow us For more Idea </span>
          <div id="social-icon">
            <a href="https://www.instagram.com/bookeventz/?hl=en" target="_blank">
              <img
                src="https://media.bookeventz.com/html/ui_website/blog-section/budget_insta.svg"
                alt="Instagram Link"
              />
            </a>
            <a href="https://www.pinterest.com/bookeventz/" target="_blank">
              <img
                src="https://media.bookeventz.com/html/ui_website/blog-section/budget-pint.svg"
                alt="Pinterest Link"
              />
            </a>
            <a href="https://www.facebook.com/BookEventz/" target="_blank">
              <img
                src="https://media.bookeventz.com/html/ui_website/blog-section/budget_faceb.svg"
                alt="Facebook Link"
              />
            </a>
          </div>
        </div>
        <a href="https://www.instagram.com/bookeventz/?hl=en" target="_blank">
          <div id="insta-blog">
            <img
              src="https://media.bookeventz.com/html/ui_website/blog-section/blog_instagram.svg"
              alt="Instagram Blog link"
            />
          </div>
        </a>
        <div id="insta-blogg">
          <img
            src="https://media.bookeventz.com/html/ui_website/blog-section/blog_invite.svg"
            alt="Invites page link"
          />
          <a href="https://www.bookeventz.com/invites/wedding" target="_blank">
            <button>Invite Now</button>
          </a>
        </div>
      </div>
    </>
  );
};

export default BlogLeft;
