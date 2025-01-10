import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { IconContext } from 'react-icons/lib';
import * as Datas from '../../Context/Datas';
import icon from '../../../Image/favicon.ico';
import { PiInvoiceThin } from "react-icons/pi";
import './NavigationBar.css';
import { CompanyDetail } from "../../Context/companyDetailContext";

const NavigationBar = (props) => {

  const logindet = useContext(CompanyDetail);


  return <>
    <IconContext.Provider value={{ color: '#rrr' }}>

      <nav className='navbar'>
        <div className="navbar-container container ">

          <Link to='/' className='navbar-logo'>
            {/* <PiInvoiceThin className='logo logo-name' size={30} /> */}
            <div
              className='logo-name'>
              <img className='logo' src={icon}
                  alt="EE_Logo"
                />
              <div> AssetSync</div>
              </div>

          </Link>

          <ul className={'nav-menu  nav-active  active'}>
            {logindet.loginstatus ?
              <>
                {Datas.navigationbarcontent.map((item, index) => {
                  let pathnameurl = item.screenname == "Home" ? "/" : `/screen=${item.altname}`;
                  // console.log(pathnameurl + " pathnameurl ");
                  return (
                    <div className='nav-item  nav-active '
                      //  onClick={() => handleheaderClick()} 
                      key={index}>
                      <li className='nav-item  nav-active '>

                        < Link className='nav-links' to={{ pathname: item.altname }}
                          duration={1000} activeClass="nav-active" spy={true} offset={-50}
                          smooth
                        // onClick={closeMobileMenu}
                        >
                          {item.screenname}
                        </Link>
                      </li>
                    </div>
                  )
                })}
                <div className='nav-item  nav-active '
                  //  onClick={() => handleheaderClick()} 
                  key="logout">
                  <li className='nav-item  nav-active '>

                    < Link className='nav-links'

                      duration={1000} activeClass="nav-active" spy={true} offset={-50}
                      smooth
                      onClick={logindet.logoutHandler}
                    >
                      Logout
                    </Link>
                  </li>
                </div>


              </> :
              <>
                {Datas.userLogin.map((item, index) => {

                  return (
                    <div className='nav-item  nav-active'>
                      <li className='nav-item  nav-active'>
                        <Link className='nav-links' to={{ pathname: item.altname }}
                          duration={1000} activeClass="nav-active" spy={true} offset={-50}
                          smooth
                        >
                          {item.screenname}
                        </Link>
                      </li>
                    </div>
                  )
                })}
              </>}


            <div className='nav-item menu-icon2'
            //   onClick={handleClick}
            >

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
}

export default NavigationBar;