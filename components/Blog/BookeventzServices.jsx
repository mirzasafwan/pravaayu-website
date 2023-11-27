import React, {useState, useEffect} from "react";

const BookeventzServices = ({weddingServiceData, sessionData}) => {
  useEffect(() => {}, [weddingServiceData]);
  return (
    <>
      <div id="bkz-service">
        <span id="bkz-one">Our Super Vendor Manager</span>
        <span id="bkz-two">Explore through top Vendors in Each Category</span>
        <div id="s-list">
          {weddingServiceData !== null &&
            weddingServiceData != undefined &&
            weddingServiceData.length > 0 &&
            weddingServiceData.map((vendor, index) => {
              let idd = parseInt(vendor.id);
              let link = "";
              if (idd == 7) {
                link = vendor.url;
              } else if (idd == 6) {
                link = vendor.url;
              } else {
                link = `${vendor.url}${sessionData.CityUniqueLink}`;
              }
              return (
                <a href={link} target="_blank">
                  <div id="s-card">
                    <div id="s">
                      <img src={vendor.imageUrl} alt="Service name Icon" />
                    </div>
                    <span>{vendor.name}</span>
                  </div>
                </a>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default BookeventzServices;
