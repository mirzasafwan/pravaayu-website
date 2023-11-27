"use client";
import React from "react";
import Image from "next/image";
import logo from "../../public/assets/logo.svg";
import fb from "../../public/assets/facebook.svg";
import yt from "../../public/assets/youtube.svg";
import call from "../../public/assets/call.svg";
import mail from "../../public/assets/mail.svg";
import loc from "../../public/assets/location.svg";

import inst from "../../public/assets/instagram.svg";

export const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="footer-upper">
          <div className="footer-right">
            <div className="footer-logo">
              <Image src={logo} alt="" />
            </div>
            <div className="social">
              <div className="fs">
                <span className="ico">
                  <Image src={fb} alt="" />
                </span>
              </div>

              <div className="fs">
                <span className="ico">
                  <Image src={inst} alt="" />
                </span>
              </div>

              <div className="fs">
                <span className="ico">
                  <Image src={yt} alt="" />
                </span>
              </div>
            </div>
          </div>
          <div className="footer-left">
            <div className="cont">
              <div className="col-4">
                <div className="links q">
                  <div className="dis">
                    <h3 className="m-0">Quick Links</h3>
                    <span className="stroke"></span>
                  </div>
                  <div className="dd">
                    <ul className="foo">
                    <li className="si">About us</li>
                      <li className="si">Contact us</li>
                      <li className="si">Blog</li>
                      <li className="si">Join us</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="links s">
                  <div className="dis">
                    <h3 className="m-0">Services</h3>
                    <span className="stroke"></span>
                  </div>
                  <div className="dd">
                    <ul className="foo">
                      <li className="si">Knee Pain</li>
                      <li className="si">Back Pain</li>
                      <li className="si">Neck Pain</li>
                      <li className="si">Shoulder Pain</li>
                      <li className="si">Heel Pain</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="links r">
                  <div className="dis">
                    <h3 className="m-0">Reach us</h3>
                    <span className="stroke"></span>
                  </div>
                  <div className="dd">
                    <ul className="foo">
                        <div className="det">
                        <span className="reach">
                        <Image src={loc} />
                        </span>
                        <li className="si"> Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor </li>
                        </div>
             
                        <div className="det">
                        <span className="reach">
                        <Image src={call} />
                        </span>
                        <li className="si">+91 25689 25389</li>
                        </div>
             
                        <div className="det">
                        <span className="reach">
                        <Image src={mail} />
                        </span>
                        <li className="si"> XYZ@GMAIL.COM</li>
                        </div>
             
                    </ul>
                  </div>
                </div>
              </div>
            
            </div>
          </div>
        </div>
        <div className="footer-lower">
        <div className="footer-bottom">
          <div className="t&c">
            Terms & conditions | Policies
          </div>
          <span className="copy">Copyright&copy; 2023.</span>
        </div>
      </div>
      </div>
      
    </div>
  );
};
