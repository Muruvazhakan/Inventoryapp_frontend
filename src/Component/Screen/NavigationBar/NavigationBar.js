import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { IconContext } from "react-icons/lib";
import * as Datas from "../../Context/Datas";
import icon from "../../../Image/favicon.ico";
import { FaBars, FaTimes } from "react-icons/fa";
import { PiInvoiceThin } from "react-icons/pi";
import "./NavigationBar.css";
import { CompanyDetail } from "../../Context/companyDetailContext";

const NavigationBar = (props) => {
  const navigate = useNavigate();

  const [button, setButton] = useState(true);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  const closeMobileMenu = () => setClick(false);
  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
    return window.removeEventListener("resize", showButton);
  }, []);
  const logindet = useContext(CompanyDetail);
  // const [state, setState] = useState(initialState);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <>
      <IconContext.Provider value={{ color: "#rrr" }}>
        <nav className="navbar">
          <div className="navbar-container container ">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              {/* <PiInvoiceThin className='logo logo-name' size={30} /> */}
              <div className="logo-name">
                <img className="logo" src={icon} alt="EE_Logo" />
                <div className="logoname"> AssetSync</div>
              </div>
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul
              className={click ? "nav-menu  nav-active  active" : "nav-menu "}
            >
              {logindet.loginstatus ? (
                <>
                  {Datas.navigationbarcontent.map((item, index) => {
                    let pathnameurl =
                      item.screenname == "Home"
                        ? "/"
                        : `/screen=${item.altname}`;
                    // console.log(pathnameurl + " pathnameurl ");
                    return (
                      <div
                        className="nav-item  nav-active "
                        //  onClick={() => handleheaderClick()}
                        key={index}
                      >
                        <li className="nav-item  nav-active ">
                          <Link
                            className="nav-links"
                            to={{ pathname: item.altname }}
                            duration={1000}
                            activeClass="nav-active"
                            spy={true}
                            offset={-50}
                            smooth
                            onClick={closeMobileMenu}
                          >
                            {item.screenname}
                          </Link>
                        </li>
                      </div>
                    );
                  })}

                  <div
                    className="nav-item  nav-active "
                    //  onClick={() => handleheaderClick()}
                    key="logout"
                  >
                    <li className="nav-item  nav-active ">
                      <div
                        className="nav-links"
                        duration={1000}
                        activeClass="nav-active"
                        spy={true}
                        offset={-50}
                        smooth
                        onClick={() => {
                          const isLougedout = logindet.logoutHandler();
                          if (isLougedout) {
                            navigate("login", { replace: true });
                          }
                        }}
                      >
                        Logout
                      </div>
                    </li>
                  </div>
                </>
              ) : (
                <>
                  {Datas.userLogin.map((item, index) => {
                    return (
                      <div className="nav-item  nav-active">
                        <li className="nav-item  nav-active">
                          <Link
                            className="nav-links"
                            to={{ pathname: item.altname }}
                            duration={1000}
                            activeClass="nav-active"
                            spy={true}
                            offset={-50}
                            smooth
                          >
                            {item.screenname}
                          </Link>
                        </li>
                      </div>
                    );
                  })}
                </>
              )}

              <div
                className="nav-item menu-icon2"
                //   onClick={handleClick}
              ></div>

              <div className="nav-item menu-icon2" onClick={handleClick}>
                {click ? <FaTimes size="40px" /> : <FaBars />}
              </div>
              {/* {state.useredits === '66656d6364' ?
                  <div className='nav-item nav-links'
                //    onClick={handleLogout}
                  >Logout </div> : null
                } */}
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default NavigationBar;
