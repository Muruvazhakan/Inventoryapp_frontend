import React, { createContext, useContext, useEffect, useState, useTimeout } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import * as Datas from '../Context/Datas';
import * as localstore from './localStorageData';
import * as companyDetailsDB from '../DBconnection/companyDetailsDB';
import * as stockDetailBD from '../DBconnection/stockDetailBD';
import { Stocks } from "./StocksContex";
import { isbackendconnect, imageBaseUrl } from "../DBconnection/dbproperties";
import axios from "axios";
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

    const [companyName, setcompanyName] = useState('');
    const [uploadimg, setuploadimg] = useState('');
    const [companyImage, setcompanyImage] = useState('');
    const [companyImageUrl, setcompanyImageUrl] = useState('');
    const [companyTagLine, setcompanyTagLine] = useState('');
    const [companyAddress, setcompanyAddress] = useState('');
    const [companyPhno, setcompanyPhno] = useState('Contact:');
    const [companymailid, setcompanymailid] = useState('mailto: ');
    const [companyOwner, setcompanyOwner] = useState('');
    const [companyDeleration, setcompanyDeleration] = useState('');
    const [companythankyou, setcompanythankyou] = useState('');

    const [companyGstin, setcompanyGstin] = useState('');
    const [companyGstinStatename, setcompanyGstinStatename] = useState('');

    const [isloaded, setisloaded] = useState(true);

    const [role, setrole] = useState('');
    const [type, settype] = useState('temp');
    const [oraganisationName, setoraganisationName] = useState('');

    // let companydet = [
    //     { id: 1, title: 'Prices', isvisible: true, desc: 'Prices quoted are strictly as per the size, quantity and design SPECIFIED only, Any change in either one will result in change in quoted price, If any change in Government taxes & regulations it will be implicated in pricing as per actual.' },
    //     { id: 2, title: 'Billing format', isvisible: true, desc: 'Billing will be done for individual items & rates specified for individual items only tolerance of (+/-) 25mm will not affect the rate per Sqft quoted.' },
    //     { id: 3, title: 'Payment & Supply of Materials', isvisible: true, desc: '50% Advance' },
    //     { id: 4, title: '', isvisible: true, desc: '30% after start work' },
    //     { id: 5, title: '', isvisible: true, desc: '20% after completion' },
    //     { id: 6, title: '', isvisible: true, desc: 'Supply of materials will be done within 15 days from the date of receipt order and advance payments along with confirmed sizes & Design.' },
    //     { id: 7, title: '', isvisible: true, desc: 'The materials will be taken for production once the Order and advance payments are received. Work order & Payments to be made. We can also work in line with your schedule of works.' },
    //     { id: 8, title: 'Installation', isvisible: true, desc: 'We carry out the work once the materials reach the site. The Sequence of work will however have to be mutually agreed upon.' },
    //     { id: 9, title: 'Warranty', isvisible: true, desc: 'All the Extrusions used will carry a warranty of 15 years. All the accessories used will have a warranty of one year under any manufacturing defects. The above warranty does not include mishandling of products & natural calamities like fire, earth quake etc.,' },
    // ];


    const [companydetails, setcompanydetails] = useState([]);
    const [companydetailtitle, setcompanydetailtitle] = useState('');
    const [companydetaildesc, setcompanydetaildesc] = useState('');
    const [companydetailIsVisible, setcompanydetailIsVisible] = useState(false);

    const [companyBankdetailtitle, setcompanyBankdetailtitle] = useState('');
    const [companyBankdetailvalue, setcompanyBankdetailvalue] = useState('');
    const [companyBankdetailIsVisible, setcompanyBankdetailIsVisible] = useState(false);
    // const [loginuser, setloginuser] = useState(localStorage.getItem('loginuser').length> 0 ? localStorage.getItem('loginuser'): '');
    const [loginuser, setloginuser] = useState('');
    const [loginuserid, setloginuserid] = useState('');
    const [loginUserPassword, setloginUserPassword] = useState('');
    const [loginUserConfirmPassword, setloginUserConfirmPassword] = useState('');

    // const [loginstatus, setloginstatus] = useState(localStorage.getItem('loginuser').length> 0 ? true: false);
    const [loginstatus, setloginstatus] = useState(false);

    const [loginId, setloginId] = useState('');
    const [tokenid, settokenid] = useState('');

    // const bankdet = [
    //     { id: 1, title: 'Bank Name', isvisible: true, value: 'AXIS BANK' },
    //     { id: 2, title: 'Branch', isvisible: true, value: 'Chromepet' },
    //     { id: 3, title: 'IFS Ccode', isvisible: true, value: 'UTIB0003905' },
    //     { id: 4, title: 'Account Number', isvisible: true, value: '923020005067138' },
    //     { id: 5, title: 'Account Holder Name', isvisible: true, value: 'JR MODULAR ENTERPRISES' },
    // ];
    const bankdet = [
        { id: 1, title: 'Bank Name', isvisible: true, value: '' },
        { id: 2, title: 'Branch', isvisible: true, value: '' },
        { id: 3, title: 'IFS Ccode', isvisible: true, value: '' },
        { id: 4, title: 'Account Number', isvisible: true, value: '' },
        { id: 5, title: 'Account Holder Name', isvisible: true, value: '' },
    ];
    const [companyBankdetails, setcompanyBankdetails] = useState(bankdet);

    //     Invoice id
    // Invoice date
    // Payment mode
    // Payment Date

    const crypt = (salt, text) => {
        const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
        const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
        const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);

        return text
            .split("")
            .map(textToChars)
            .map(applySaltToChar)
            .map(byteHex)
            .join("");
    };

    const setval = (e, fun) => {
        fun(e.target.value);
    }

    const setboxColors = (item, field) => {
        if (field === 'color') {
            return item.length === 0 || item === 0 ? 'error' : 'success';
        }

        else {
            return item.length === 0 || item === 0 ? true : false;
        }

    }

    const companytitle = (id, value, type) => {

        const getresul = companydetails.map((items) => {
            //console.log(items.id + ' ids ' + id);
            if (items.id === id) {
                //console.log(items.id + ' inside ids ' + id);
                if (type === "title") {
                    items.title = value;
                }
                else if (type === "desc") {
                    items.desc = value;
                }
                else {
                    items.isvisible = !items.isvisible;
                }
            }
            return items;
        });

        //console.log(getresul);
        setcompanydetails(getresul);

    }

    const updateBankDetailHandler = (id, value, type) => {
        //console.log(value + ' ids ' + id);
        //console.log(value );

        const getresul = companyBankdetails.map((items) => {
            //console.log(items.id + ' ids ' + id);
            if (items.id === id) {
                //console.log(items.id + ' inside ids ' + id);
                if (type === "title") {
                    items.title = value;
                }
                else if (type === "value") {
                    items.value = value;
                }
                else {
                    items.isvisible = !items.isvisible;
                }
            }
            return items;
        })

        //console.log(getresul);
        setcompanyBankdetails(getresul);
    }

    const uploadImage = async (props) => {
        setisloaded(false);
        const formData = new FormData();
        // formData.append('avatar', state.uploadimg);
        // formData.append('avatar', {avatar:state.uploadimg,filename:'22.jpg'});

        console.log(props); //companyImage
        let filename = companyName.trim() + '.jpg'; // img no
        filename = filename.replace(/\s+/g, '');
        console.log(filename + " filename");
        formData.append('filename', filename);
        formData.append('file', uploadimg)//companyImage, uploadimg

        // console.log("insertImg from UploadComponent " +  state.uploadimg + state.newimgurl +props.selectedImage,props.screen);
        console.log("uploadimg");
        console.log(uploadimg);
        console.log("formData");
        console.log(formData);

        let response = await companyDetailsDB.uploadCompanyLogo(formData, loginuserid);
        //   const response = await axios.post(`${uploadCompanyLogo}/${loginuserid}`, formData, {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //     },
        //   });
        console.log('response .. ');
        console.log(response);
        if (response.status === 200) {
            // setstate('');
            toast.success("Image Uploaded!");
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
        }
        else {
            toast.warning(" Something went wrong" + response.data);
        }
        setisloaded(true);
    }

    const loginHandler = async (logintype) => {
        //console.log('login handler' + loginuser.length +'loginuser.length ' +loginUserPassword.length );

        if (loginuser.length > 0 && loginUserPassword.length > 0) {
            let userExsist = '';
            setisloaded(false);
            if (!isbackendconnect) {
                userExsist = Datas.userLoginname.filter((item) => {
                    //console.log(item);
                    if (item.username === loginuser && item.userPass === loginUserPassword) {
                        localstore.addOrGetUserdetail(loginuser, 'loginuser', "save");
                        localstore.addOrGetUserdetail(loginuser, 'userid', "save");
                        setloginuserid(loginuser);
                        setloginstatus(true);
                        return true;
                    }
                    else return false;
                });
            }

            const encrypted_pass = crypt("salt", loginUserPassword);
            //console.log('encrypted_pass');
            //console.log(encrypted_pass);
            if (logintype === 'login') {

                userExsist = await companyDetailsDB.loginUser(loginuser, encrypted_pass);
                //console.log(userExsist);
                if (userExsist.status === 200) {
                    toast.success(" Welcome " + loginuser + "!");
                    // localStorage.setItem('loginuser', loginuser);
                    //console.log(userExsist[0].userid + ' userExsist.userid');
                    setloginuserid(userExsist.data);
                    localstore.addOrGetUserdetail(loginuser, 'loginuser', "save");
                    localstore.addOrGetUserdetail(userExsist.data, 'userid', "save");
                    // localstore.addOrGetUserdetail(type, 'type', "save");
                    // localstore.addOrGetUserdetail(role, 'role', "save");
                    // localstore.addOrGetUserdetail(oraganisationName, 'oraganisationName', "save");
                    //console.log(userExsist.data);
                    setloginstatus(true);
                    // window.location.href = '/';
                    getAlldataOnLogin();

                } else if (userExsist.status === 224) {
                    toast.warning("User Not Found");
                } else if (userExsist.status === 250) {
                    toast.warning("Sorry! Your account Expired. Contact your System Admin.");
                }
                else {
                    toast.warning(userExsist.data);
                }
            }
            else if (logintype === 'sigin') {
                if (loginUserPassword !== loginUserConfirmPassword) {
                    toast.error("Password is not match with Confirm Password");
                    return;
                }
                // if (tokenid !== 'Billedge123') {
                //     toast.error("Invalid Token");
                //     return;
                // }
                userExsist = await companyDetailsDB.siginUser(loginuser, encrypted_pass, type, role, oraganisationName, tokenid);
                //console.log(userExsist);
                if (userExsist.data === "User already exist") {
                    toast.error(" User already exist");
                    // setloginstatus(true);
                } else if (userExsist.status === 201) {

                    toast.success(" User successfully registered");
                    //console.log(userExsist.data);
                } else {
                    toast.warning(userExsist.data);
                }
            } else if (logintype === 'reset') {
                if (loginUserPassword !== loginUserConfirmPassword) {
                    toast.error("Password is not match with Confirm Password");
                    return;
                }
                // if (tokenid !== 'Billedge123') {
                //     toast.error("Invalid Token");
                //     return;
                // }
                userExsist = await companyDetailsDB.passwordReset(loginuser, encrypted_pass, tokenid);
                //console.log(userExsist);
                if (userExsist.data === "User does not exist") {
                    toast.error("User does not exist");
                    // setloginstatus(true);
                } else if (userExsist.status === 201) {

                    toast.success("Password Changed!");
                    //console.log(userExsist.data);
                } else {
                    toast.warning(userExsist.data);
                }
            }
            setisloaded(true);
            // if (loginuser === "JR modular" && loginUserPassword === "jrmodular123") {
            //     toast.success(" Welcome " + loginuser + "!");
            //     setloginstatus(true);
            // }
        }
        else {

            toast.error("Please fill both User Name and Password");
            return;
        }


    }

    const logoutHandler = () => {

        localstore.addOrGetUserdetail('', 'loginuser', 'remove');
        localstore.addOrGetUserdetail('', 'userid', 'remove');
        localstore.addOrUpdateCompanyHandler('', 'remove');
        localstore.addOrGetstockHistoryData('', 'remove');
        localstore.addOrGetSaleStockHistoryData('', 'remove');
        localstore.addOrGetAllStockData('', 'remove');
        localstore.addOrGetAllHistoryStockData('', 'remove');
        localstore.addOrGetAllHistorySalesStockData('', 'remove');

        setloginstatus(false);
        setloginuserid(null);
        setloginuser('');
        window.location.href = '/';
        toast.success("You have successfully logedout");

    }

    const selectCompanyImg = (event) => {
        //console.log('event.target.files[0]');
        //console.log(event.target.files[0]);
        setcompanyImage(URL.createObjectURL(event.target.files[0]));
        setuploadimg(event.target.files[0]);

    }

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
        if (loginuserid !== null && loginuserid !== '') {

            let companyBasicDetailslocal = localstore.getCompanyHandler();
            let companyBasicDetailsfromdb = await companyDetailsDB.getCompanyBasicDetails(loginuserid);
            console.log('companyBasicDetailsfromdb ');
            console.log(companyBasicDetailsfromdb);

            if (companyBasicDetailsfromdb.status === 200) {
                if (!companyBasicDetailslocal || (companyBasicDetailsfromdb && companyBasicDetailsfromdb.data[0].companyAddress !== companyBasicDetailslocal.companyAddress)) {
                    localstore.addOrUpdateCompanyHandler(companyBasicDetailsfromdb.data[0], "save", companyBasicDetailsfromdb.data[0].estimateidcount);
                    console.log("company basic details updated");
                    console.log(companyBasicDetailsfromdb);
                    refreshdata = true;
                }
                // let getCompanyImage = await localstore.addOrGetCompanyImage('', "get");
                // console.log('getCompanyImage');
                // console.log(getCompanyImage);
                // if(getCompanyImage){
                //     setcompanyImage(getCompanyImage);
                // }
            } else if (companyBasicDetailsfromdb.status === 250) {
                toast.warning("Sorry! Your account Expired, You will be logout in 5 sec");
                // useTimeout(()=>{
                //     logoutHandler();
                // }, 5000)
                handletimeoutLogin(5000);
                return false;
            }
            else {
                toast.warning(companyBasicDetailsfromdb.data);
            }

            let stockidcounter = localstore.addOrGetStockid('', "get");
            console.log(stockidcounter + ' addOrGetStockid');
            let getStockfromDb = await stockDetailBD.getStockidDB(loginuserid);
            console.log('getStockfromDb.data');
            console.log(getStockfromDb);
            if (getStockfromDb.status === 200 && stockidcounter < getStockfromDb.data) {
                localstore.addOrGetStockid(getStockfromDb.data, "save");
                stockDetail.setstockidcount(getStockfromDb.data);
                console.log('saving setinvoiceidount ' + getStockfromDb.data);

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

        if (refreshdata === true) {
            getAlldataOnLogin();
        }

        setisloaded(true);
    };


    const getAlldataOnLogin = () => {

        let companydetail = localstore.getCompanyHandler();
        console.log('companydetail getAlldataOnLogin');
        console.log(companydetail);
        // console.log('companydetail local2 ' + companydetail.companyImage);
        // console.log('companydetail uploadimg ' + companydetail.uploadimg);
        if (companydetail !== null) {

            setcompanyName(companydetail.companyName);
            setcompanyImage(companydetail.companyImage);
            setuploadimg(companydetail.uploadimg);
            setcompanyAddress(companydetail.companyAddress);

            setcompanyDeleration(companydetail.companyDeleration);
            setcompanyGstin(companydetail.companyGstin);
            setcompanyGstinStatename(companydetail.companyGstinStatename);
            setcompanyOwner(companydetail.companyOwner);
            setcompanyPhno(companydetail.companyPhno);
            setcompanyTagLine(companydetail.companyTagLine);
            setcompanydetaildesc(companydetail.companydetaildesc);
            setcompanymailid(companydetail.companymailid);
            setcompanythankyou(companydetail.companythankyou);

            //console.log('companydetail.estimateidcount');
            //console.log(companydetail.estimateidcount);
            // if (companydetail.estimateidcount !== undefined && companydetail.estimateidcount > estdetail.estimateidcount) {
            //     //console.log('companydetail.estimateidcount');
            //     //console.log(companydetail.estimateidcount);
            //     // estdetail.setestimateidcount(companydetail.estimateidcount);
            // }

        }
        setisloaded(false);

    }

    const companyOtherDetailHandeler = (item, type) => {
        //console.log(companydetailtitle + ' ' + companydetaildesc + ' ' + type + ' item' + item);

        if (type !== "delete" && companydetailtitle.length === 0 && companydetaildesc.length === 0) {
            toast.error("Both Details are Empty");
            return;
        }
        //console.log('type ' + type);
        let getresul;
        if (type === "new") {
            getresul = { id: uuidv4(), title: companydetailtitle, isvisible: companydetailIsVisible, desc: companydetaildesc };
            //console.log('getresul');
            //console.log(getresul);
            //console.log(companydetails);
            if (companydetails.length > 0) {

                setcompanydetails([
                    ...companydetails, getresul
                ]);

            } else {

                setcompanydetails([
                    getresul
                ]);
            };
            toast.success("Details are Added");
            setcompanydetailtitle('');
            setcompanydetaildesc('');
            setcompanydetailIsVisible(false);
        }
        else if (type === "delete") {
            getresul = companydetails.filter((items) => {
                //console.log(items.id + ' ids ' + item);
                return items.id !== item;
            });
            //console.log(getresul);
            setcompanydetails(getresul);
            toast.success("Details deleted");
        }
    }

    const saveHandler = async (funcs, item, type) => {

        setisloaded(true);

        toast.success("Details are saved");
    }


    useEffect(() => {

        let useralreadyloggedin = localstore.addOrGetUserdetail('', 'loginuser', "get");
        let loginuserids = localstore.addOrGetUserdetail('', 'userid', "get");

        //console.log(loginuserids);
        if (useralreadyloggedin !== null && useralreadyloggedin !== '') {
            setloginstatus(true);
            setloginuserid(loginuserids);
            setloginuser(useralreadyloggedin);
            // toast.success('Welcome Back ' +useralreadyloggedin);
        }
        //    //console.log(useralreadyloggedin);
        // const [loginstatus, setloginstatus] = useState(localStorage.getItem('loginuser').length> 0 ? true: false);
        setisloaded(false);
    }, []);


    useEffect(() => {
        getAlldataOnLogin();
        if (isbackendconnect) {
            getAlldataFromDB();
        }

        // if(loginuserid !== null && loginuserid){

        // }
    }, [loginuserid])

    const compDet = {
        companyName, setcompanyName,
        companyTagLine, setcompanyTagLine, companyAddress, setcompanyAddress, companyPhno, setcompanyPhno, companyGstin, setcompanyGstin, companyGstinStatename, setcompanyGstinStatename,
        updateBankDetailHandler, uploadImage,
        companyDeleration, setcompanyDeleration, companymailid, setcompanymailid, companyOwner, setcompanyOwner, companydetails, setcompanydetails, companyBankdetails, setcompanyBankdetails,
        companythankyou, setcompanythankyou, companytitle, companyOtherDetailHandeler, companydetailtitle, setcompanydetailtitle, companydetaildesc, setcompanydetaildesc, setval, setboxColors,
        loginuser, setloginuser, loginUserPassword, setloginUserPassword, loginHandler, loginstatus, setloginstatus, loginId, setloginId, loginUserConfirmPassword, setloginUserConfirmPassword, tokenid, settokenid, logoutHandler,
        companyBankdetailtitle, setcompanyBankdetailtitle, companyBankdetailvalue, setcompanyBankdetailvalue, companyBankdetailIsVisible, setcompanyBankdetailIsVisible, companydetailIsVisible, setcompanydetailIsVisible,
        loginuserid, setloginuserid, saveHandler, getAlldataFromDB, getAlldataOnLogin, isloaded, setisloaded, companyImage, setcompanyImage, selectCompanyImg, uploadimg, setuploadimg,
        role, setrole, type, settype, oraganisationName, setoraganisationName
    };

    return <CompanyDetail.Provider value={compDet} >{children}</CompanyDetail.Provider>;

}

export default CompanyDetailContext;