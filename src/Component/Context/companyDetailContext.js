import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useTimeout,
} from "react";
import { v4 as uuidv4 } from "uuid";
import * as Datas from "../Context/Datas";
import * as localstore from "./localStorageData";
import * as companyDetailsDB from "../DBconnection/companyDetailsDB";
import * as stockDetailBD from "../DBconnection/stockDetailBD";
import { Stocks } from "./StocksContex";
import { isbackendconnect, imageBaseUrl } from "../DBconnection/dbproperties";
export const CompanyDetail = createContext();

const CompanyDetailContext = ({ children }) => {
  const stockDetail = useContext(Stocks);

  // const [companyName, setcompanyName] = useState('JR MODULAR ENTERPRISES');
  // const [companyTagLine, setcompanyTagLine] = useState('‘YOUR HOME OUR INTERIOR’');
  // const [companyAddress, setcompanyAddress] = useState('Address: No.1/4, Mummurti Nagar Main Road, Chromepet, Chennai-600044');
  // const [companyPhno, setcompanyPhno] = useState('Contact: 8428952208');
  // const [companymailid, setcompanymailid] = useState('mailto: jrmodularenterprises@gmail.com');
  // const [companyOwner, setcompanyOwner] = useState('Mr. JAFER HUSSAN');
  // const [companyDeleration, setcompanyDeleration] = useState('We declare that the invoice details are the actual price of the goods');
  // const [companythankyou, setcompanythankyou] = useState('Thanking you and assuring our best services at all times.');

  const [companyName, setcompanyName] = useState("");
  const [uploadimg, setuploadimg] = useState("");
  const [companyImage, setcompanyImage] = useState("");
  const [companyImageUrl, setcompanyImageUrl] = useState("");
  const [companyTagLine, setcompanyTagLine] = useState("");
  const [companyAddress, setcompanyAddress] = useState("");
  const [companyPhno, setcompanyPhno] = useState("Contact:");
  const [companymailid, setcompanymailid] = useState("mailto: ");
  const [companyOwner, setcompanyOwner] = useState("");
  const [companyDeleration, setcompanyDeleration] = useState("");
  const [companythankyou, setcompanythankyou] = useState("");

  const [companyGstin, setcompanyGstin] = useState("");
  const [companyGstinStatename, setcompanyGstinStatename] = useState("");

  const [isloaded, setisloaded] = useState(true);

  const [role, setrole] = useState("");
  const [type, settype] = useState("temp");
  const [oraganisationName, setoraganisationName] = useState("");

  const [companydetails, setcompanydetails] = useState([]);
  const [companydetailtitle, setcompanydetailtitle] = useState("");
  const [companydetaildesc, setcompanydetaildesc] = useState("");
  const [companydetailIsVisible, setcompanydetailIsVisible] = useState(false);
  // const [loginuser, setloginuser] = useState(localStorage.getItem('loginuser').length> 0 ? localStorage.getItem('loginuser'): '');
  const [loginuser, setloginuser] = useState("");
  const [loginuserid, setloginuserid] = useState("");
  const [loginUserPassword, setloginUserPassword] = useState("");
  const [loginUserConfirmPassword, setloginUserConfirmPassword] = useState("");

  const [loginstatus, setloginstatus] = useState(false);

  const [loginId, setloginId] = useState("");
  const [tokenid, settokenid] = useState("");

  //     Invoice id
  // Invoice date
  // Payment mode
  // Payment Date

  const crypt = (salt, text) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code) =>
      textToChars(salt).reduce((a, b) => a ^ b, code);

    return text
      .split("")
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join("");
  };

  const setval = (e, fun) => {
    fun(e.target.value);
  };

  const setboxColors = (item, field) => {
    if (field === "color") {
      return item.length === 0 || item === 0 ? "error" : "success";
    } else {
      return item.length === 0 || item === 0 ? true : false;
    }
  };

  const companytitle = (id, value, type) => {
    const getresul = companydetails.map((items) => {
      //console.log(items.id + ' ids ' + id);
      if (items.id === id) {
        //console.log(items.id + ' inside ids ' + id);
        if (type === "title") {
          items.title = value;
        } else if (type === "desc") {
          items.desc = value;
        } else {
          items.isvisible = !items.isvisible;
        }
      }
      return items;
    });

    //console.log(getresul);
    setcompanydetails(getresul);
  };

  const uploadImage = async (props) => {
    setisloaded(false);
    const formData = new FormData();
    // formData.append('avatar', state.uploadimg);
    // formData.append('avatar', {avatar:state.uploadimg,filename:'22.jpg'});

    console.log(props); //companyImage
    let filename = companyName.trim() + ".jpg"; // img no
    filename = filename.replace(/\s+/g, "");
    console.log(filename + " filename");
    formData.append("filename", filename);
    formData.append("file", uploadimg); //companyImage, uploadimg

    // console.log("insertImg from UploadComponent " +  state.uploadimg + state.newimgurl +props.selectedImage,props.screen);
    console.log("uploadimg");
    console.log(uploadimg);
    console.log("formData");
    console.log(formData);

    let response = await companyDetailsDB.uploadCompanyLogo(
      formData,
      loginuserid
    );
    //   const response = await axios.post(`${uploadCompanyLogo}/${loginuserid}`, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    console.log("response .. ");
    console.log(response);
    if (response.status === 200) {
      // setstate('');
      // toast.success("Image Uploaded!");
      // const reader = new FileReader();
      // reader.addEventListener('load', () => {
      //     localStorage.setItem('recent-image', reader.result);
      //     localstore.addOrGetCompanyImage(companyImage, "save");
      // })
      // reader.readAsDataURL(file);
      localstore.addOrGetCompanyImage(companyImage, "save");
      setcompanyImageUrl(`${imageBaseUrl}/${response.data}`);
      console.log(companyImageUrl);
      //BillEdge/CompanyLogo/ITsolution.jpg
      setcompanyImage(`${imageBaseUrl}/${response.data}`);
      // setuploadimg(event.target.files[0]);
    } else {
      // toastwarning(" Something went wrong" + response.data);
    }
    setisloaded(true);
  };

  const loginHandler = async (logintype) => {
    //console.log('login handler' + loginuser.length +'loginuser.length ' +loginUserPassword.length );

    if (loginuser.length > 0 && loginUserPassword.length > 0) {
      let userExsist = "";
      setisloaded(false);
      if (!isbackendconnect) {
        userExsist = Datas.userLoginname.filter((item) => {
          //console.log(item);
          if (
            item.username === loginuser &&
            item.userPass === loginUserPassword
          ) {
            localstore.addOrGetUserdetail(loginuser, "loginuser", "save");
            localstore.addOrGetUserdetail(loginuser, "userid", "save");
            setloginuserid(loginuser);
            setloginstatus(true);
            return true;
          } else return false;
        });
      }

      const encrypted_pass = crypt("salt", loginUserPassword);
      //console.log('encrypted_pass');
      //console.log(encrypted_pass);
      if (logintype === "login") {
        userExsist = await companyDetailsDB.loginUser(
          loginuser,
          encrypted_pass
        );
        //console.log(userExsist);
        if (userExsist.status === 200) {
          // toast.success(" Welcome " + loginuser + "!");
          // localStorage.setItem('loginuser', loginuser);
          //console.log(userExsist[0].userid + ' userExsist.userid');
          setloginuserid(userExsist.data);
          localstore.addOrGetUserdetail(loginuser, "loginuser", "save");
          localstore.addOrGetUserdetail(userExsist.data, "userid", "save");
          // localstore.addOrGetUserdetail(type, 'type', "save");
          // localstore.addOrGetUserdetail(role, 'role', "save");
          // localstore.addOrGetUserdetail(oraganisationName, 'oraganisationName', "save");
          //console.log(userExsist.data);
          setloginstatus(true);
          // window.location.href = '/';

          return true;
        } else if (userExsist.status === 224) {
          // toastwarning("User Not Found");
        } else if (userExsist.status === 250) {
          // toast.warning(
          //   "Sorry! Your account Expired. Contact your System Admin."
          // );
        } else {
          // toastwarning(userExsist.data);
        }
      } else if (logintype === "sigin") {
        if (loginUserPassword !== loginUserConfirmPassword) {
          // toasterror("Password is not match with Confirm Password");
          return;
        }
        // if (tokenid !== 'Billedge123') {
        //     toast.error("Invalid Token");
        //     return;
        // }
        userExsist = await companyDetailsDB.siginUser(
          loginuser,
          encrypted_pass,
          type,
          role,
          oraganisationName,
          tokenid
        );
        //console.log(userExsist);
        if (userExsist.data === "User already exist") {
          // toasterror(" User already exist");
          // setloginstatus(true);
        } else if (userExsist.status === 201) {
          // toast.success(" User successfully registered");
          //console.log(userExsist.data);
        } else {
          // toastwarning(userExsist.data);
        }
      } else if (logintype === "reset") {
        if (loginUserPassword !== loginUserConfirmPassword) {
          // toasterror("Password is not match with Confirm Password");
          return;
        }
        // if (tokenid !== 'Billedge123') {
        //     toast.error("Invalid Token");
        //     return;
        // }
        userExsist = await companyDetailsDB.passwordReset(
          loginuser,
          encrypted_pass,
          tokenid
        );
        //console.log(userExsist);
        if (userExsist.data === "User does not exist") {
          // toasterror("User does not exist");
          // setloginstatus(true);
        } else if (userExsist.status === 201) {
          // toast.success("Password Changed!");
          //console.log(userExsist.data);
        } else {
          // toastwarning(userExsist.data);
        }
      }
      setisloaded(true);
      // if (loginuser === "JR modular" && loginUserPassword === "jrmodular123") {
      //    // toast.success(" Welcome " + loginuser + "!");
      //     setloginstatus(true);
      // }
    } else {
      // toasterror("Please fill both User Name and Password");
      return;
    }
  };

  const logoutHandler = () => {
    localstore.addOrGetUserdetail("", "loginuser", "remove");
    localstore.addOrGetUserdetail("", "userid", "remove");
    localstore.addOrUpdateCompanyHandler("", "remove");
    localstore.addOrGetstockHistoryData("", "remove");
    localstore.addOrGetSaleStockHistoryData("", "remove");
    localstore.addOrGetAllStockData("", "remove");
    localstore.addOrGetAllHistoryStockData("", "remove");
    localstore.addOrGetAllHistorySalesStockData("", "remove");

    setloginstatus(false);
    setloginuserid(null);
    setloginuser("");
    // toast.success("You have successfully logedout");
    return true;
  };

  const selectCompanyImg = (event) => {
    //console.log('event.target.files[0]');
    //console.log(event.target.files[0]);
    setcompanyImage(URL.createObjectURL(event.target.files[0]));
    setuploadimg(event.target.files[0]);
  };

  const handletimeoutLogin = (delayDuration) => {
    // Use setTimeout to simulate a delayed action
    setTimeout(() => {
      logoutHandler();
    }, delayDuration);
  };

  const getAlldataFromDB = async () => {
    // if (estimateHistoryData !== null) {
    //     setestimateHistoryData(estimateHistoryData);
    // }
    //console.log('loginuserid');
    //console.log(loginuserid);
    let refreshdata = false;
    stockDetail.setisloading(true);
    if (loginuserid !== null && loginuserid !== "") {
      let stockidcounter = localstore.addOrGetStockid("", "get");
      console.log(stockidcounter + " addOrGetStockid");
      let getStockfromDb = await stockDetailBD.getStockidDB(loginuserid);
      console.log("getStockfromDb.data");
      console.log(getStockfromDb);
      if (
        getStockfromDb.status === 200 &&
        stockidcounter < getStockfromDb.data
      ) {
        localstore.addOrGetStockid(getStockfromDb.data, "save");
        stockDetail.setstockidcount(getStockfromDb.data);
        console.log("saving setinvoiceidount " + getStockfromDb.data);
      }

      let results = stockDetail.getAllStockData(loginuserid);
      if (results) {
        refreshdata = true;
      }

      let resultsgetAllSalesCount = stockDetail.getAllSalesCount(loginuserid);
      if (resultsgetAllSalesCount) {
        refreshdata = true;
      }
    }
    setisloaded(true);
  };

  const companyOtherDetailHandeler = (item, type) => {
    //console.log(companydetailtitle + ' ' + companydetaildesc + ' ' + type + ' item' + item);

    if (
      type !== "delete" &&
      companydetailtitle.length === 0 &&
      companydetaildesc.length === 0
    ) {
      // toasterror("Both Details are Empty");
      return;
    }
    //console.log('type ' + type);
    let getresul;
    if (type === "new") {
      getresul = {
        id: uuidv4(),
        title: companydetailtitle,
        isvisible: companydetailIsVisible,
        desc: companydetaildesc,
      };
      //console.log('getresul');
      //console.log(getresul);
      //console.log(companydetails);
      if (companydetails.length > 0) {
        setcompanydetails([...companydetails, getresul]);
      } else {
        setcompanydetails([getresul]);
      }
      // toast.success("Details are Added");
      setcompanydetailtitle("");
      setcompanydetaildesc("");
      setcompanydetailIsVisible(false);
    } else if (type === "delete") {
      getresul = companydetails.filter((items) => {
        //console.log(items.id + ' ids ' + item);
        return items.id !== item;
      });
      //console.log(getresul);
      setcompanydetails(getresul);
      //// toast.success("Details deleted");
    }
  };

  const saveHandler = async (funcs, item, type) => {
    setisloaded(true);

    // toast.success("Details are saved");
  };

  useEffect(() => {
    let useralreadyloggedin = localstore.addOrGetUserdetail(
      "",
      "loginuser",
      "get"
    );
    let loginuserids = localstore.addOrGetUserdetail("", "userid", "get");

    //console.log(loginuserids);
    if (useralreadyloggedin !== null && useralreadyloggedin !== "") {
      setloginstatus(true);
      setloginuserid(loginuserids);
      setloginuser(useralreadyloggedin);
      //// toast.success('Welcome Back ' +useralreadyloggedin);
    }
    //    //console.log(useralreadyloggedin);
    // const [loginstatus, setloginstatus] = useState(localStorage.getItem('loginuser').length> 0 ? true: false);
    setisloaded(false);
  }, []);

  useEffect(() => {
    if (isbackendconnect) {
      getAlldataFromDB();
    }

    // if(loginuserid !== null && loginuserid){

    // }
  }, [loginuserid]);

  const compDet = {
    companyName,
    setcompanyName,
    companyTagLine,
    setcompanyTagLine,
    companyAddress,
    setcompanyAddress,
    companyPhno,
    setcompanyPhno,
    companyGstin,
    setcompanyGstin,
    companyGstinStatename,
    setcompanyGstinStatename,
    uploadImage,
    companyDeleration,
    setcompanyDeleration,
    companymailid,
    setcompanymailid,
    companyOwner,
    setcompanyOwner,
    companydetails,
    setcompanydetails,
    companythankyou,
    setcompanythankyou,
    companytitle,
    companyOtherDetailHandeler,
    companydetailtitle,
    setcompanydetailtitle,
    companydetaildesc,
    setcompanydetaildesc,
    setval,
    setboxColors,
    loginuser,
    setloginuser,
    loginUserPassword,
    setloginUserPassword,
    loginHandler,
    loginstatus,
    setloginstatus,
    loginId,
    setloginId,
    loginUserConfirmPassword,
    setloginUserConfirmPassword,
    tokenid,
    settokenid,
    logoutHandler,
    loginuserid,
    setloginuserid,
    saveHandler,
    getAlldataFromDB,
    isloaded,
    setisloaded,
    companyImage,
    setcompanyImage,
    selectCompanyImg,
    uploadimg,
    setuploadimg,
    role,
    setrole,
    type,
    settype,
    oraganisationName,
    setoraganisationName,
  };

  return (
    <CompanyDetail.Provider value={compDet}>{children}</CompanyDetail.Provider>
  );
};

export default CompanyDetailContext;
