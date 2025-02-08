import companyperson from "../../Image/mycompanyf.png";
import mystock from "../../Image/mystocks.png";
import profit from "../../Image/profit.png";
import mysalesf from "../../Image/mysalesf.png";
import { MdLogin, MdLockReset } from "react-icons/md";
import { RiUserAddLine } from "react-icons/ri";
export const navigationbarcontent = [
  {
    screenname: "Home",
    links: "/",
    altname: "/",
    displays: true,
  },

  {
    screenname: "Stocks",
    links: "/stocks",
    altname: "stocks",
    displays: true,
    image: mystock,
  },
  {
    screenname: "Sales",
    links: "/sales",
    altname: "sales",
    displays: true,
    image: mysalesf,
  },
  {
    screenname: "Profits",
    links: "/profits",
    altname: "profits",
    displays: true,
    image: profit,
  },
  {
    screenname: "Company Detail",
    links: "/yourdetail",
    altname: "yourdetail",
    displays: true,
    image: companyperson,
  },
];

export const userLogin = [
  {
    screenname: "Login",
    links: "login",
    altname: "login",
    displays: true,
    iconname: MdLogin,
  },
  {
    screenname: "Siginup",
    links: "/siginup",
    altname: "signup",
    displays: true,
    iconname: RiUserAddLine,
  },
  {
    screenname: "Reset Password",
    links: "/passwordreset",
    altname: "passwordreset",
    displays: true,
    iconname: MdLockReset,
  },
];

export const userLoginname = [
  {
    userid: "11",
    username: "Other1",
    userPass: "11",
  },
];
