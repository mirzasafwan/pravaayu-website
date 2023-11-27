import React from "react";

import Image from 'next/image';
import logo from "../../public/assets/logo.svg";
import search from "../../public/assets/fi-rr-search.svg";
export const HeaderBottom = () => {
  return (
    <div>
      <div className="header-se">
        <div className="logo">
<Image src={logo} alt=""/>
        </div>
        <div className="navigation">
          <ul className="tab-list">
            <div className="tab-item active">Home <span class="span-active"></span></div>
            <div className="tab-item " >About us <span class=""></span></div>
            <div className="tab-item " >Blog <span class=""></span></div>
            <div className="tab-item ">Services <span class=""></span></div>
           <div className="tab-item ">Join us <span class=""></span></div>
           <div className="tab-item ">Offerings <span class=""></span></div>
          </ul>
        </div>
        <div className="search">

<Image src={search} alt=""/>

        </div>
      </div>
    </div>
  );
};
