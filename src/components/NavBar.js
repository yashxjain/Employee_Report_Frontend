import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav>
      <div className={`navbar-container ${menuOpen ? "open" : ""}`}>
        <div className="navbar-home">
          <Link to="/">
            <img src="" alt="logo" />
          </Link>
        </div>

        <ul className={`navbar-list ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="https://rannlab.com/privacy-policy-2/" className="nav-link-privacy">
              Privacy Policy
            </Link>
          </li>

          <li>
            <Link to="https://rannlab.com/terms-and-condition-2/" className="nav-link-terms">
              Terms & Conditions
            </Link>
          </li>

          <li>
            {" "}
            <Link to="/generatereport-step-one">
              <button className="report-fraud-button">Generate Report</button>
            </Link>
          </li>
        </ul>

        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
