import companyperson from "../../Image/mycompanyf.png";
import salestockimage from "../../Image/salestockimage.png";
import mystock from "../../Image/mystocks.png";
import profit from "../../Image/profit.png";
import mysalesf from "../../Image/mysalesf.png";
export const navigationbarcontent = [
  {
    screenname: "Home",
    links: "/",
    altname: "/",
    displays: true,
  },
  {
    screenname: "Company Detail",
    links: "/yourdetail",
    altname: "yourdetail",
    displays: true,
    image: companyperson,
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
];

export const userLogin = [
  {
    screenname: "Login",
    links: "login",
    altname: "login",
    displays: true,
  },
  {
    screenname: "Siginup",
    links: "/siginup",
    altname: "signup",
    displays: true,
  },
  {
    screenname: "Reset Password",
    links: "/passwordreset",
    altname: "passwordreset",
    displays: true,
  },
];

export const userLoginname = [
  {
    userid: "12",
    username: "JR modular",
    userPass: "jrmodular123",
  },
  {
    userid: "13",
    username: "Other1",
    userPass: "jrmodular123",
  },
];
