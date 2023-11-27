import Head from "next/head";
import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutComponent(props) {
  console.log(props.metData, "props");
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content={props?.metData?.description || "Pravaayu - blog"}
        />
        <title>{props?.metData?.title || "Pravaayu - blog"}</title>
        <link href="/css/blog/listing.css" rel="stylesheet"></link>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
        ></link>
        <link
          href="https://media.bookeventz.com/html/ui_website/Filter.min_.css"
          rel="stylesheet"
        ></link>
        <link
          defer=""
          rel="stylesheet"
          href="/css/general/login.css"
          async=""
        ></link>
      </Head>
      <div className="root">
        <div className="App homeView HomeViewNew mediaC">
          <div id="header">
            <Header
              // props={props}
              // otherProps={this.state}
              // newcitySession={props.sessionData}
              // sessionData={props.sessionData}
              // areaList={props.areaList}
              // pageType={props.pageType}
              // cityList={props.cityList}
              // occasionList={props.occasionList}
            />
          </div>
          {props?.children}
        </div>


         <Footer/>

      </div>
    </>
  );
}