import React, {useEffect} from "react";
const {Nav, NavDropdown, NavItem} = require("react-bootstrap");
import generalUtil from "@/lib/generalUtil";

const newTopHeader = ({
  handleToggle,
  venuesTabOpen,
  newcitySession,
  SSR_WEB_BASE,
  constants,
  areaList,
  blogTabOpen,
  invitesTabOpen,
  sessionData,
  ideasTabOpen,
  corporateOpen,
  bazaarOpen,
  vendorsTabOpen,
}) => {
  return (
    <>
      <div className="row hidden-xs header-bottom yes-row">
        <div className="col-xs-12 ye-new-header">
          <Nav bsStyle="tabs" activeKey="1" className="left-nav">
            <NavDropdown
              eventKey="1"
              title={
                <div>
                  <span>Venues </span>
                  <span className="glyphicon glyphicon-chevron-down chevron-arrow-down"></span>
                </div>
              }
              id="basic-nav-dropdown"
              onMouseEnter={() => handleToggle("venuesTabOpen", true)}
              onMouseLeave={() => handleToggle("venuesTabOpen", false)}
              open={venuesTabOpen}
            >
              <div className="row test">
                <div className="col-sm-5 left-bar spacing">
                  {newcitySession != undefined ? (
                    <ul className="list-inline">
                      {newcitySession.CityName == "Mumbai" ? (
                        <li>
                          <a
                            title={"BookEventz Venues    "}
                            href={
                              SSR_WEB_BASE + "/bookeventz-venues/" + newcitySession.CityUniqueLink
                            }
                          >
                            BookEventz Venues
                          </a>
                        </li>
                      ) : (
                        ""
                      )}
                      <li>
                        <a
                          title={"Banquet halls in " + newcitySession.CityName}
                          href={
                            newcitySession.CityId == "14"
                              ? SSR_WEB_BASE + "/banquets/" + newcitySession.CityUniqueLink
                              : SSR_WEB_BASE + "/banquets/" + newcitySession.CityUniqueLink
                          }
                        >
                          {"Banquet halls in " + newcitySession.CityName}
                        </a>
                      </li>
                      <li>
                        <a
                          title={"Wedding venues in " + newcitySession.CityName}
                          href={
                            newcitySession.CityId == "14"
                              ? SSR_WEB_BASE +
                                "/banquets/" +
                                newcitySession.CityUniqueLink +
                                "/wedding"
                              : SSR_WEB_BASE +
                                "/banquets/" +
                                newcitySession.CityUniqueLink +
                                "/wedding"
                          }
                        >
                          {"Wedding venues in " + newcitySession.CityName}
                        </a>
                      </li>
                      <li>
                        <a
                          title={"Party halls in " + newcitySession.CityName}
                          href={
                            newcitySession.CityId == "14"
                              ? SSR_WEB_BASE +
                                "/banquets/" +
                                newcitySession.CityUniqueLink +
                                "/birthday-party"
                              : SSR_WEB_BASE +
                                "/banquets/" +
                                newcitySession.CityUniqueLink +
                                "/birthday-party"
                          }
                        >
                          {"Party halls in " + newcitySession.CityName}
                        </a>
                      </li>
                      <li>
                        <a
                          title={"5 Star Banquet halls in " + newcitySession.CityName}
                          href={
                            newcitySession.CityId == "14"
                              ? SSR_WEB_BASE +
                                "/banquets/" +
                                newcitySession.CityUniqueLink +
                                "/5-star-hotels"
                              : SSR_WEB_BASE +
                                "/banquets/" +
                                newcitySession.CityUniqueLink +
                                "/5-star-hotels"
                          }
                        >
                          {"5 Star Banquet halls in " + newcitySession.CityName}
                        </a>
                      </li>
                      {newcitySession != undefined &&
                      (newcitySession.CityId == "1" ||
                        newcitySession.CityId == "2" ||
                        newcitySession.CityId == "3" ||
                        newcitySession.CityId == "4" ||
                        newcitySession.CityId == "5" ||
                        newcitySession.CityId == "6" ||
                        newcitySession.CityId == "7" ||
                        newcitySession.CityId == "12" ||
                        newcitySession.CityId == "13" ||
                        newcitySession.CityId == "14" ||
                        newcitySession.CityId == "53" ||
                        newcitySession.CityId == "15") ? (
                        <li>
                          <a
                            title=" Banquet halls near me"
                            href={
                              SSR_WEB_BASE +
                              "/" +
                              newcitySession.CityUniqueLink +
                              "/banquet-halls-near-me"
                            }
                          >
                            Banquet halls near me
                          </a>
                        </li>
                      ) : (
                        ""
                      )}

                      {newcitySession.CityName == "Mumbai" ||
                      newcitySession.CityName == "Bangalore" ? (
                        <li className="user-reviews-head">
                          <a
                            className="innerATag"
                            title="McDonalds Party Section"
                            href={SSR_WEB_BASE + "/mumbai/mcdonalds-birthday-party"}
                          >
                            McDonalds Party Section
                          </a>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-sm-7 right-bar spacing">
                  <ul className="list-inline">
                    {constants !== undefined && areaList !== undefined
                      ? areaList.map((row, i) => {
                          if (row.isPopular == 1) {
                            if (row.AreaUniquelink != undefined) {
                              return (
                                <li key={i}>
                                  <a
                                    title={row.AreaName}
                                    href={
                                      newcitySession && newcitySession.CityId == "14"
                                        ? SSR_WEB_BASE +
                                          "/" +
                                          newcitySession.CityUniqueLink +
                                          "/" +
                                          row.AreaUniquelink
                                        : SSR_WEB_BASE +
                                          "/banquets/" +
                                          generalUtil.safeReturn(
                                            newcitySession,
                                            "CityUniqueLink",
                                            ""
                                          ) +
                                          "/" +
                                          row.AreaUniquelink
                                    }
                                  >
                                    {row.AreaName}
                                  </a>
                                </li>
                              );
                            } else {
                              return (
                                <li key={i}>
                                  <a
                                    title={row.AreaName}
                                    href={
                                      newcitySession && newcitySession.CityId == "14"
                                        ? SSR_WEB_BASE +
                                          "/" +
                                          newcitySession.CityUniqueLink +
                                          "/" +
                                          row.AreaUniqueLink
                                        : SSR_WEB_BASE +
                                          "/banquets/" +
                                          generalUtil.safeReturn(
                                            newcitySession,
                                            "CityUniqueLink",
                                            ""
                                          ) +
                                          "/" +
                                          row.AreaUniqueLink
                                    }
                                  >
                                    {row.AreaName}
                                  </a>
                                </li>
                              );
                            }
                          }
                        })
                      : ""}
                    {typeof parentArea !== "undefined" &&
                    parentArea.length != 0 &&
                    (sessionData.CityUniqueLink == "mumbai" ||
                      sessionData.CityUniqueLink == "destination-wedding")
                      ? parentArea.map((row, i) => {
                          return (
                            <li key={i}>
                              <a
                                title={"Banquet halls in " + row.ParentAreaName}
                                href={
                                  newcitySession.CityId == "14"
                                    ? SSR_WEB_BASE +
                                      "/" +
                                      newcitySession.CityUniqueLink +
                                      "/" +
                                      row.ParentAreaUniqueLink
                                    : SSR_WEB_BASE +
                                      "banquets/" +
                                      generalUtil.safeReturn(newcitySession, "CityUniqueLink", "") +
                                      "/" +
                                      row.ParentAreaUniqueLink
                                }
                              >
                                {row.ParentAreaName}
                              </a>
                            </li>
                          );
                        })
                      : ""}
                  </ul>
                </div>
                {/*  <div className="col-sm-4 right-bar hidden-xs">
                                            <img className="lazyload img-responsive venueImg" data-src={constants.IMG_BASE +"asset/images/homepage-venue2new1.jpg"} />
                                        </div>*/}
              </div>
            </NavDropdown>
            {/* {
                            newcitySession != undefined && constants.VENDOR_COUNTRY_IDS.includes(newcitySession.CountryId) &&
                            newcitySession?.CityId !== "14" &&  */}
            <NavDropdown
              eventKey="2"
              title={
                <div>
                  <span>Vendors </span>
                  <span className="glyphicon glyphicon-chevron-down chevron-arrow-down"></span>
                </div>
              }
              id="basic-nav-dropdown2"
              onMouseEnter={() => handleToggle("vendorsTabOpen", true)}
              onMouseLeave={() => handleToggle("vendorsTabOpen", false)}
              open={vendorsTabOpen}
            >
              {newcitySession != undefined ? (
                <div>
                  <div className="row">
                    <div className="col-sm-12 spacing">
                      <ul className="list-inline">
                        <li className="user-leads-head">
                          <a
                            className="innerATag"
                            title={"Photographers in " + newcitySession.CityName}
                            href={SSR_WEB_BASE + "/photographers/" + newcitySession.CityUniqueLink}
                            target="_blank"
                          >
                            Photographers
                          </a>
                        </li>
                        <li className="user-reviews-head">
                          <a
                            className="innerATag"
                            title={"Bridal MakeUp Artists in " + newcitySession.CityName}
                            href={SSR_WEB_BASE + "/bridal-makeups/" + newcitySession.CityUniqueLink}
                            target="_blank"
                          >
                            Makeup Artists
                          </a>
                        </li>
                        <li className="user-profile-head">
                          <a
                            className="innerATag"
                            title={"Bridal Mehendi Artists in " + newcitySession.CityName}
                            href={
                              SSR_WEB_BASE + "/mehendi-artists/" + newcitySession.CityUniqueLink
                            }
                            target="_blank"
                          >
                            Mehendi Artists
                          </a>
                        </li>
                        <li className="user-profile-head">
                          <a
                            className="innerATag"
                            title={"Caterers in " + newcitySession.CityName}
                            href={SSR_WEB_BASE + "/caterer/" + newcitySession.CityUniqueLink}
                            target="_blank"
                          >
                            Caterers
                          </a>
                        </li>
                        <li className="user-profile-head">
                          <a
                            className="innerATag"
                            title={"Decorators in " + newcitySession.CityName}
                            href={SSR_WEB_BASE + "/decorators/" + newcitySession.CityUniqueLink}
                            target="_blank"
                          >
                            Decorators
                          </a>
                        </li>
                        <li className="user-profile-head">
                          <a
                            className="innerATag"
                            title={
                              "Anchors in " + generalUtil.safeReturn(newcitySession, "CityName", "")
                            }
                            href={SSR_WEB_BASE + "/artists/anchors-in-india"}
                            target="_blank"
                          >
                            Anchors
                          </a>
                        </li>
                        <li className="user-profile-head">
                          <a
                            title={
                              "Comedians in " +
                              generalUtil.safeReturn(newcitySession, "CityName", "")
                            }
                            href={SSR_WEB_BASE + "/artists/comedian-in-india"}
                            className="innerATag"
                            target="_blank"
                          >
                            Comedians
                          </a>
                        </li>
                        <li className="user-profile-head">
                          <a
                            className="innerATag"
                            title={"Choreographers in " + newcitySession.CityName}
                            href={SSR_WEB_BASE + "/choreographer/" + newcitySession.CityUniqueLink}
                            target="_blank"
                          >
                            Choreographers
                          </a>
                        </li>
                        <li className="user-profile-head">
                          <a
                            className="innerATag"
                            title={"Event Planners in " + newcitySession.CityName}
                            href={SSR_WEB_BASE + "/event-planner/" + newcitySession.CityUniqueLink}
                            target="_blank"
                          >
                            Event Planners
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </NavDropdown>

            <NavDropdown
              eventKey="3"
              title={
                <div>
                  <span>Blog </span>
                  <span className="glyphicon glyphicon-chevron-down chevron-arrow-down"></span>
                </div>
              }
              id="basic-nav-dropdown3"
              onMouseEnter={() => handleToggle("blogTabOpen", true)}
              onMouseLeave={() => handleToggle("blogTabOpen", false)}
              open={blogTabOpen}
              href={"https://www.bookeventz.com/blog/"}
            >
              <div className="row">
                <div className="col-sm-12 spacing">
                  <ul className="list-inline">
                    <li className="user-leads-head-wedding-blog">
                      <a
                        title="Wedding Blogs"
                        className="innerATag"
                        href={"https://www.bookeventz.com/blog/category/wedding-ideas/"}
                        target="_blank"
                      >
                        Wedding
                      </a>
                    </li>
                    <li className="user-reviews-head-birthday-blog">
                      <a
                        title="Birthday Party Blogs"
                        className="innerATag"
                        href={"https://www.bookeventz.com/blog/category/birthday-party/"}
                        target="_blank"
                      >
                        Birthday Party
                      </a>
                    </li>
                    <li className="user-profile-head-cocktail-blog">
                      <a
                        title="Cocktail Party Blogs"
                        className="innerATag"
                        href={"https://www.bookeventz.com/blog/category/cocktail-party/"}
                        target="_blank"
                      >
                        Cocktail Party
                      </a>
                    </li>
                    <li className="user-profile-head">
                      <a
                        title="Corporate Party Blogs"
                        className="innerATag"
                        href={"https://www.bookeventz.com/blog/category/corporate-party/"}
                        target="_blank"
                      >
                        Corporate Party
                      </a>
                    </li>
                    <li className="user-profile-head">
                      <a
                        title="Top Vendors Blogs"
                        className="innerATag"
                        href={"https://www.bookeventz.com/blog/category/top-venues/"}
                        target="_blank"
                      >
                        Top Vendors
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="col-sm-1"></div>
                <div className="col-sm-1"></div>
              </div>
            </NavDropdown>
            <NavDropdown
              id="basic-nav-dropdown4"
              eventKey="4"
              title={
                <div>
                  <span>Invites</span>
                  <span className="glyphicon glyphicon-chevron-down chevron-arrow-down"></span>
                </div>
              }
              onMouseEnter={() => handleToggle("invitesTabOpen", true)}
              onMouseLeave={() => handleToggle("invitesTabOpen", false)}
              open={invitesTabOpen}
            >
              <div className="row">
                <div className="col-sm-12  spacing">
                  <ul className="list-inline">
                    <li className="user-leads-head">
                      {sessionData != undefined && sessionData.eventId != undefined ? (
                        <a
                          className="innerATag"
                          href={SSR_WEB_BASE + sessionData.eventId + "/invites/wedding"}
                          target="_blank"
                        >
                          Wedding
                        </a>
                      ) : (
                        <a
                          className="innerATag"
                          href={SSR_WEB_BASE + "/invites/wedding"}
                          target="_blank"
                        >
                          Wedding
                        </a>
                      )}
                    </li>
                    <li className="user-reviews-head">
                      {sessionData != undefined && sessionData.eventId != undefined ? (
                        <a
                          className="innerATag"
                          href={SSR_WEB_BASE + sessionData.eventId + "/invites/birthday-party"}
                          target="_blank"
                        >
                          Birthday Party
                        </a>
                      ) : (
                        <a
                          className="innerATag"
                          href={SSR_WEB_BASE + "/invites/birthday-party"}
                          target="_blank"
                        >
                          Birthday Party
                        </a>
                      )}
                    </li>
                    <li className="user-reviews-head">
                      {sessionData != undefined && sessionData.eventId != undefined ? (
                        <a
                          className="innerATag"
                          href={SSR_WEB_BASE + sessionData.eventId + "/invites/corporate-event"}
                          target="_blank"
                        >
                          Corporate
                        </a>
                      ) : (
                        <a
                          className="innerATag"
                          href={SSR_WEB_BASE + "/invites/corporate-event"}
                          target="_blank"
                        >
                          Corporate
                        </a>
                      )}
                    </li>
                  </ul>
                </div>
                <div className="col-sm-10 right-bar">
                  <div className="col-sm-4">
                    {/* <a className="innerATag" href={SSR_WEB_BASE+'/'+'invites/birthday-party'}
                                           target="_blank">
                                            <img  alt={'media.bookeventz.com'}  className="blogImg img-responsive lazyload" data-src={"https://media.bookeventz.com/html/bookeventz.com/asset/images/birthdayinvitesheader.jpg"} />
                                        </a> */}
                  </div>

                  <div className="col-sm-4">
                    {/* <a className="innerATag" href={SSR_WEB_BASE+'/'+'invites/wedding'}
                                           target="_blank">
                                            <img alt={'media.bookeventz.com'}  className="blogImg img-responsive lazyload" data-src={"https://media.bookeventz.com/html/bookeventz.com/asset/images/weddinginvitesheader.jpg"} />
                                        </a> */}
                  </div>

                  <div className="col-sm-4">
                    {/* <a className="innerATag" href={SSR_WEB_BASE+'/'+'invites/corporate-event'}
                                           target="_blank">
                                            <img alt={'media.bookeventz.com'}  className="blogImg img-responsive lazyload" data-src={"https://media.bookeventz.com/html/bookeventz.com/asset/images/corporateinvitesheader.jpg"} />
                                        </a> */}
                  </div>
                </div>
                <div className="col-sm-1"></div>
              </div>
            </NavDropdown>
            <NavDropdown
              eventKey="5"
              title={
                <div>
                  <span>Ideas </span>
                  <span className="glyphicon glyphicon-chevron-down chevron-arrow-down"></span>
                </div>
              }
              id="basic-nav-dropdown5"
              onMouseEnter={() => handleToggle("ideasTabOpen", true)}
              onMouseLeave={() => handleToggle("ideasTabOpen", false)}
              open={ideasTabOpen}
            >
              <div className="row">
                <div className="col-sm-12 spacing">
                  <ul className="list-inline">
                    <li className="user-leads-head">
                      <a
                        rel="noreferrer"
                        title="Wedding Ideas"
                        className="innerATag"
                        href="https://weddingideas.bookeventz.com/"
                        target="_blank"
                      >
                        Wedding
                      </a>
                    </li>
                    <li className="user-reviews-head">
                      <a
                        rel="noreferrer"
                        title="Birthday Party Ideas"
                        className="innerATag"
                        href="https://birthdayideas.bookeventz.com/"
                        target="_blank"
                      >
                        Birthday Party
                      </a>
                    </li>
                    <li className="user-profile-head">
                      <a
                        rel="noreferrer"
                        title="Corporate Party Ideas"
                        className="innerATag"
                        href="https://corporateeventideas.bookeventz.com/"
                        target="_blank"
                      >
                        Corporate Party
                      </a>
                    </li>
                    <li className="user-profile-head">
                      <a
                        className="innerATag"
                        target="_blank"
                        rel="noreferrer"
                        href="https://birthdayideas.bookeventz.com/"
                      ></a>
                    </li>
                  </ul>
                </div>
              </div>
            </NavDropdown>
            <NavDropdown
              eventKey="6"
              title={
                <div>
                  <span>Corporate </span>
                  <span className="glyphicon glyphicon-chevron-down chevron-arrow-down"></span>
                </div>
              }
              id="basic-nav-dropdown7"
              onMouseEnter={() => handleToggle("corporateOpen", true)}
              onMouseLeave={() => handleToggle("corporateOpen", false)}
              open={corporateOpen}
            >
              <div className="row">
                <div className="col-sm-12 spacing">
                  <ul className="list-inline">
                    <li className="user-leads-head">
                      <a
                        title="Build Event MicroWebsite"
                        className="innerATag"
                        href={SSR_WEB_BASE + "/build-your-event-website"}
                        target="_blank"
                      >
                        Build Event MicroWebsite
                      </a>
                    </li>
                    <li className="user-reviews-head">
                      <a
                        title="Corporate Event Services"
                        className="innerATag"
                        href={SSR_WEB_BASE + "/corporate-event-planning-portal"}
                        target="_blank"
                      >
                        Corporate Event Services
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </NavDropdown>
            <NavDropdown
              eventKey="7"
              id="basic-nav-dropdown9"
              title={
                <div>
                  <div>
                    <span>Bzaar</span>
                  </div>
                </div>
              }
              // onMouseEnter = {handleToggle( 'bazaarOpen', true)}
              // onMouseLeave = {handleToggle( 'bazaarOpen', false)}
              open={bazaarOpen}
              href={"https://www.toysbzaar.com/"}
            ></NavDropdown>
          </Nav>

          <Nav bsStyle="tabs" className="right-nav">
            {/* <NavItem href={SSR_WEB_BASE+'/' + 'bookeventz-deals/mumbai'} target="_blank">Deals</NavItem> */}
            {/* <NavItem href={SSR_WEB_BASE+'/' + 'offers'} target="_blank">Offers</NavItem> */}
            <NavItem href={SSR_WEB_BASE + "/why-list-with-us"} target="_blank">
              List With Us
            </NavItem>
          </Nav>
        </div>
      </div>
    </>
  );
};

export default newTopHeader;
