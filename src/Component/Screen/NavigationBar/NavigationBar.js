import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { IconContext } from 'react-icons/lib';
import * as Datas from '../../Context/Datas';
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
            <PiInvoiceThin className='logo logo-name' size={30} />
            <div

              className='logo-name'>
              {/* <img className='logo' src={Datas.EELogo}
                  alt="EE_Logo"
                /> */}

              Inventory</div>

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


// @media screen and (max-width: 1000px) {
//   .NavbarItems {
//     position: relative;
//   }

//   .logo-name {
//     padding-top: 1%;
//     font-size: large;
//   }

//   .contact-nav-links {
//     color: #fff;
//     display: flex;
//     align-items: center;
//     text-decoration: none;
//     padding: 0.5rem 1rem;
//     height: 3%;
//     font-weight: 600;
//     text-decoration: none;
//     cursor: pointer;
//   }

//   .nav-menu {
//     display: flex;
//     flex-direction: column;
//     width: 100%;
//     /* height: 90vh; */
//     position: absolute;
//     top: 50px;
//     left: -100%;
//     opacity: 1;
//     transition: all 0.5s ease;
//     padding-bottom: 20px;
//     font-size: 30px;
//     height: 90vh;

//     align-items: stretch;
//     justify-content: space-evenly;
//   }

//   .Jr-logo {
//     max-height: initial;
//     width: 40px;
//   }

//   .nav-menu.active {
//     background: #1c2237;
//     color: rgb(224, 146, 0);
//     left: 0;
//     opacity: 1;
//     transition: all 0.6s ease;
//     z-index: 1;
//   }

//   .nav-links {
//     text-align: center;
//     padding: 2rem;
//     width: 100%;
//     display: table;
//   }

//   .nav-links:hover {
//     color: #f00946;
//     transform: scale(1.2);
//     transition: all 0.3s ease;
//     color: #fff;
//     ;
//     text-decoration: none;
//   }

//   .nav-item:hover {
//     border: none;
//     color: #fff;
//     ;
//     text-decoration: none;
//   }

//   a:hover {
//     text-decoration: none;
//     text-decoration: none !important
//   }


//   a:active {
//     text-decoration: none;
//     text-decoration: none !important
//   }

//   Link:hover {
//     text-decoration: none;
//     text-decoration: none !important
//   }


//   Link:active {
//     text-decoration: none;
//     text-decoration: none !important;
//   }

//   .nav-item {
//     width: 100%;
//   }

//   .navbar-logo {
//     /* position: absolute; */
//     top: 0;
//     left: 0;
//     /* transform: translate(25%, 50%); */
//   }

//   .menu-icon {
//     display: block;
//     position: absolute;
//     /* top: 0; */
//     right: 20px;
//     transform: translate(-100%, 60%);
//     font-size: 1.2rem;
//     cursor: pointer;
//   }

//   .menu-icon2 {
//     display: block;
//   }

//   .fa-times {
//     color: #fff;
//     font-size: 2rem;
//   }

//   .navbar {
//     height: 60px;
//   }

//   .nav-btn {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 100%;
//     height: 120px;
//   }
// }
