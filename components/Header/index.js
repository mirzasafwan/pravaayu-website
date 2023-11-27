"use client";

import { HeaderBottom } from "./HeaderBottom";
import { HeaderTop } from "./HeaderTop";

var React = require("react");

class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="header-f">
          <HeaderTop />
          <nav>
          <HeaderBottom />
          </nav>

        </div>
      </React.Fragment>
    );
  }
}

// module.exports = Header;
export default Header;
