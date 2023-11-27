'use client'
import React from 'react'
import Image from 'next/image';
import mail from "../../public/assets/fi-rr-envelope.svg";
import phone from "../../public/assets/fi-rr-phone-call.svg";
import time from "../../public/assets/fi-rr-clock.svg";

export const HeaderTop = () => {
  return (
    <div>  <div className="header-fi">
    <div className="header-fi-f">
      <span className="icon">
        <Image
          priority
          src={mail}
          alt="Mail"
        />
             <span className="c">abc@pravaayu.com</span>
      </span>
 
    </div>

    <div className="header-fi-s">
      <span className="icon">
      <Image
          priority
          src={time}
          alt="Timmings"
        />
          <span className="c">Mon-Sun: 8 AM - 10 PM</span>
      </span>
    

      <span className="icon">
      <Image
          priority
          src={phone}
          alt="Phone Number"
        />
           <span className="c">9967581110</span>
      </span>
   
    </div>
  </div>
  </div>
  )
}
