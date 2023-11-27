// import { DropdownButton, MenuItem } from "react-bootstrap";

var React = require("react");
// var ReactBootstrap = require("react-bootstrap");
var axios = require("axios");
var generalUtil = require("@/lib/generalUtil");
var cookie = require("react-cookies");
// import $ from "jquery";

var SSR_WEB_BASE = "";
switch (process.env.NODE_ENV) {
  case "production":
    SSR_WEB_BASE = "https://www.bookeventz.com";
    break;
  case "development":
    SSR_WEB_BASE = "https://grunt.bookeventz.com";
    break;
  case "local":
    SSR_WEB_BASE = "http://localhost:5000";
    break;
  default:
    SSR_WEB_BASE = "";
}
SSR_WEB_BASE = "https://www.bookeventz.com";

class CityList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getCountry(data, countryCodeList) {
    if (generalUtil.inArray(data.CountryName, countryCodeList)) {
      var indexOfCountryCode = countryCodeList.indexOf(data.CountryName);
      countryCodeList.splice(indexOfCountryCode, 1);

      if (this.props.pageType == "vendorListing") {
        //Remove condition Date - 26/10/2021
        //To see country name outside India
        // if(data.CountryName == "India"){
        return (
          <div className="flagOfCIty">
            <div className={"countrySprite " + data.CountryName}></div>
            <p className="countryName">{data.CountryName}</p>
          </div>
        );
        // }
      } else {
        return (
          <div className="flagOfCIty">
            <div className={"countrySprite " + data.CountryName}></div>
            <p className="countryName">{data.CountryName}</p>
          </div>
        );
      }
    }
  }
  renderList(cityId) {
    var sequenced = [];
    var normalarray = [];
    var that = this;
    var countryCodeList = [];
    var countryList = [];
    this.props.cityList.sort(function (a, b) {
      var x = a.CountryName.toLowerCase();
      var y = b.CountryName.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });

    this.props.cityList.map((row, i) => {
      if (countryCodeList.length < 1) {
        countryCodeList.push(row.CountryName);
      }

      if (generalUtil.inArray(row.CountryName, countryCodeList) == false) {
        countryCodeList.push(row.CountryName);
      }

      if (row.sequence != 0) {
        sequenced.push(row);
      } else {
        normalarray.push(row);
      }
    });

    sequenced.sort(function (a, b) {
      return a.sequence - b.sequence;
    });
    normalarray.sort(function (a, b) {
      var x = a.CityName.toLowerCase();
      var y = b.CityName.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    var finalArray = [];
    sequenced.map((row) => {
      finalArray.push(row);
    });
    normalarray.map((row) => {
      finalArray.push(row);
    });
    var priority = [];
    var priority1 = [];
    finalArray.map(function (row) {
      if (that.props.newcitySession != undefined) {
        if (row.CountryId == that.props.newcitySession.CountryId) {
          priority.push(row);
        } else {
          priority1.push(row);
        }
      }
    });
    priority1.sort(function (a, b) {
      var x = a.CountryName.toLowerCase();
      var y = b.CountryName.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    finalArray = priority.concat(priority1);

    var groupBy = function (xs, key) {
      return finalArray.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };

    var newFilterArray = groupBy(countryCodeList, "CountryName");

    var arrayCOnt = [];
    if (window.innerWidth > 768) {
      for (var x in newFilterArray) {
        arrayCOnt.push(newFilterArray[x]);
        for (var y in newFilterArray[x]) {
          arrayCOnt.push(newFilterArray[x][y]);
        }
      }

      return arrayCOnt.map((row, i) => {
        if (row.CityName == undefined) {
          return <div className="countryUlHead">{this.getCountry(row[0], countryCodeList)}</div>;
        } else {
          return (
            <div className="countryUl">
              <li
                key={i}
                onClick={this.onCityChange.bind(this, row.CityUniqueLink)}
                className={row.CityId == cityId ? "selected" : ""}
              >
                {row.CityName}
              </li>
            </div>
          );
        }

        // if(row.CityName == undefined)
        // {
        //
        //     if(this.props.pageType == "vendorListing"){
        //
        //
        //         return (
        //
        //             <div className="countryUlHead">
        //                 {
        //                     this.getCountry(row[0],countryCodeList)
        //
        //                 }
        //             </div>
        //         )
        //     }
        //
        //
        // }
        // else
        // {
        //     if(row.CityId != "14")
        //     {
        //
        //         if(this.props.pageType == "vendorListing")
        //         {
        //             if(row.CityId == "1" || row.CityId == "4" || row.CityId == "5" || row.CityId == "7" ||
        //                 row.CityId == "6" || row.CityId == "2" || row.CityId == "3" || row.CityId == "12"
        //                 || row.CityId == "15" || row.CityId == "16" || row.CityId == "13" || row.CityId == "53" || row.CityId == "256" )
        //             {
        //                 return (
        //                     <div className="countryUl">
        //
        //                         <li key={i} onClick={this.onCityChange.bind(this, row.CityUniqueLink)}
        //                             className={row.CityId == cityId ? "selected" : ''}>{row.CityName}</li>
        //                     </div>
        //                 );
        //             }
        //
        //         }
        //         else
        //         {
        //             return (
        //                 <div className="countryUl">
        //
        //                     <li key={i} onClick={this.onCityChange.bind(this, row.CityUniqueLink)}
        //                         className={row.CityId == cityId ? "selected" : ''}>{row.CityName}</li>
        //                 </div>
        //             );
        //         }
        //
        //     }
        // }
      });
    } else {
      for (var x in newFilterArray) {
        arrayCOnt.push(newFilterArray[x]);
        for (var y in newFilterArray[x]) {
          arrayCOnt.push(newFilterArray[x][y]);
        }
      }

      return arrayCOnt.map((row, i) => {
        if (row.CityName == undefined) {
          return <div className="countryUlHead">{this.getCountry(row[0], countryCodeList)}</div>;
        } else {
          return (
            <div className="countryUl">
              <li
                key={i}
                onClick={this.onCityChange.bind(this, row.CityUniqueLink)}
                className={row.CityId == cityId ? "selected" : ""}
              >
                {row.CityName}
              </li>
            </div>
          );
        }
      });
    }
  }

  handleClick() {
    axios
      .post("https://api.bookeventz.com/location/getCityList")
      .then((xhrResponse) => {
        if (generalUtil.safeReturn(xhrResponse, "data", false) !== false) {
          let data = xhrResponse.data;
          this.setState({ cityList: data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onCityChange(CityUniqueLink) {
    var that = this;
    var sessionData = this.props.sessionData && this.props.sessionData;
    this.props.cityList &&
      this.props.cityList.map(function (value, index) {
        if (value.cityUniqueLink == CityUniqueLink) {
          sessionData.cityUniqueLink = CityUniqueLink;
          sessionData.cityId = value.cityId;
          sessionData.cityName = value.cityName;
        }
      });
    cookie.save("sessionData", sessionData, { path: "/" });
    if (CityUniqueLink == "destination-wedding") {
      CityUniqueLink = "destination-wedding-home";
    }
    if (typeof window !== "undefined") {
    switch (this.props.pageType) {
      case "venueListing":
        window.location = SSR_WEB_BASE + "/banquets/" + CityUniqueLink;
        break;
      case "homePage":
        window.location = SSR_WEB_BASE + "/" + CityUniqueLink;
        break;
      case "vendorListing":
        var pagetype = this.props.pageType;
        var index = window.location.href.indexOf("photographers");
        if (window.location.href.indexOf("photographers") > 0) {
          window.location = SSR_WEB_BASE + "/photographers/" + CityUniqueLink;
        } else if (window.location.href.indexOf("mehendi-artists") > 0) {
          window.location = SSR_WEB_BASE + "/mehendi-artists/" + CityUniqueLink;
        } else if (window.location.href.indexOf("bridal-makeups") > 0) {
          window.location = SSR_WEB_BASE + "/bridal-makeups/" + CityUniqueLink;
        }

        break;
      case "anchors-in-indiaListing":
        var pagetype = this.props.pageType;
        var index = pagetype.indexOf("Listing");
        var artistlink = pagetype.substring(0, index);
        // window.location = this.props.props.WEBSITE_BASE+artistlink;
        window.location = SR_WEB_BASE + artistlink;
        break;
      case "comedians-in-indiaListing":
        var pagetype = this.props.pageType;
        var index = pagetype.indexOf("Listing");
        var artistlink = pagetype.substring(0, index);
        // window.location = this.props.props.WEBSITE_BASE+artistlink;
        window.location = SSR_WEB_BASE + artistlink;
        break;
      case "catererListing":
        alert("Sorry for the inconvinience but Caterer service is only available in Mumbai");
        // window.location = this.props.props.WEBSITE_BASE+"caterers-in-mumbai";
        window.location = SSR_WEB_BASE + "/caterers-in-mumbai";
        break;
      default:
        window.location = SSR_WEB_BASE + "/" + CityUniqueLink;
        break;
    }
  }
    //window.location = this.props.base_url + CityUniqueLink;
  }
  handleClickMobile() {
    var value = document.getElementById("citylist").value;

    if (value == "destination-wedding") {
      value = "destination-wedding-home";
    }
    if (typeof window !== "undefined") {
      window.location = this.props.base_url + value;
    }
  }
  render() {
    var that = this;
    if (typeof window !== "undefined" && window.innerWidth > 768) {
      if (this.props.sessionData != undefined) {
        return (
          <div className="cityPopup">
            <div
              type="button"
              className="btn citybutton"
              data-toggle="modal"
              data-target="#myModal"
            >
              {this.props.sessionData.CityName != undefined
                ? this.props.sessionData.CityName
                : this.props.sessionData.sessionData != undefined &&
                  this.props.sessionData.sessionData.cityName != undefined
                ? this.props.sessionData.sessionData.cityName
                : ""}{" "}
              <span className="glyphicon glyphicon-chevron-down"></span>
            </div>
            <div className="modal fade" id="myModal" role="" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="text-center cityHeader">Select City</div>

                    <div
                      onClick={this.onCityChange.bind(this, "destination-wedding")}
                      className="countryUl"
                    >
                      <li className="">Destination Wedding</li>
                    </div>
                    {this.props.cityList != undefined && this.props.cityList.length != 0
                      ? this.renderList(this.props.sessionData.CityId)
                      : ""}
                    <div className="countryUlHead"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return <div></div>;
      }
    } else {
      return (
        <div className="container">
          <button
            type="button"
            className="btn btn-info btn-lg"
            data-toggle="modal"
            data-target="#myModal"
          >
            Open Modal
          </button>

          <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <p>Some text in the modal.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default CityList;
