import * as dbprop from './dbproperties';
import axios from 'axios';
const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        'Content-Type': 'application/json',
    },
};
const imageconfig = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "multipart/form-data",
    },
};
export const loginUser = async (username, userpassword) => {
    //console.log(dbprop.userLoginUrl + ' dbprop.userLoginUrl');
    const data = {
        username: username,
        password: userpassword
    };
    //console.log(data);
    let response;
    try {
        response = await axios.post(dbprop.userLoginUrl, data, config);
        //console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
};



export const siginUser = async (username, userpassword,type,role,oraganisationName,tokenid) => {
    //console.log(username, userpassword);
    // fetch(dbprop.userSigninUrl,
    //     {
    //         // mode: 'no-cors',
    //         method: 'post',
    //         header: {
    //             'Accept': 'application/json',
    //             'Content-Type' : 'application/json',
    //         }, body: JSON.stringify({
    //             username: username,
    //             password: userpassword,
    //             type: 'modify'
    //         })
    //     }
    // ).then(res => res.json()).then(res => {
    //     console.log("res siginUser");
    //     console.log(res);
    // }).catch((error) => {
    //     console.error(error);
    // });

    const data = {
        username: username,
        password: userpassword,
        type:type,
        role:role,
        oraganisationName:oraganisationName,
        tokenid:tokenid
    };
    //console.log(data);
    let response
    try {
        response = await axios.post(dbprop.userSigninUrl, data, config);
        //console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const getCompanyBasicDetails = async (userid) => {
    //console.log(`${dbprop.getCompanyBasicDetailsUrl}/${userid}` + 'dbprop.getCompanyBasicDetails');
    let response;
    try {
        response = await axios.get(`${dbprop.getCompanyBasicDetailsUrl}/${userid}`, config);
        //console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export const saveCompanyBasicDetails = async (basicdetail, userid,estimateidcount) => {
    
    //console.log(`${dbprop.saveCompanyBasicDetailsUrl}/${userid}` + ' dbprop.getCompanyBasicDetails');
    //console.log(basicdetail);
    const data = {
        companyName: basicdetail.companyName,
        companyImage: basicdetail.companyImage,
        uploadimg: basicdetail.uploadimg,
        companyTagLine: basicdetail.companyTagLine,
        companyAddress: basicdetail.companyAddress,
        companyPhno: basicdetail.companyPhno,
        companymailid: basicdetail.companymailid,
        companyGstin: basicdetail.companyGstin,
        companyGstinStatename: basicdetail.companyGstinStatename,
        companyOwner: basicdetail.companyOwner,
        companyDeleration: basicdetail.companyDeleration,
        companythankyou: basicdetail.companythankyou,
        invoiceidcount:basicdetail.invoiceidcount,
        estimateidcount:estimateidcount
    };
    //console.log(data);
    let response;
    try {
        response = await axios.post(`${dbprop.saveCompanyBasicDetailsUrl}/${userid}`, data, config);
        //console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const getCompanyBankDetails = async (userid) =>{
    //console.log(`${dbprop.getCompanyBankDetailsUrl}/${userid}` + 'dbprop.getCompanyBankDetailsUrl');
    let response;
    try {
        response = await axios.get(`${dbprop.getCompanyBankDetailsUrl}/${userid}`, config);
        //console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export const saveCompanyBankDetails = async (bankdetails,userid) => {
    //console.log(`${dbprop.saveCompanyBankDetailsUrl}/${userid}` + ' dbprop.saveCompanyBankDetailsUrl');
   
    //console.log(bankdetails);
    let response;
    try {
        response = await axios.post(`${dbprop.saveCompanyBankDetailsUrl}/${userid}`,bankdetails, config);
        //console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const getCompanyTermsAndConditionDetails = async (userid) =>{
    //console.log(`${dbprop.getCompanyTermsAndConditionDetailsUrl}/${userid}` + 'dbprop.getCompanyTermsAndConditionDetailsUrl');
    let response;
    try {
        response = await axios.get(`${dbprop.getCompanyTermsAndConditionDetailsUrl}/${userid}`, config);
        //console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export const saveCompanyTermsAndConditionDetails = async (termsAndCondition,userid) => {
    //console.log(`${dbprop.saveCompanyTermsAndConditionDetailsUrl}/${userid}` + ' dbprop.saveCompanyTermsAndConditionDetailsUrl');
    //console.log(termsAndCondition);
    let response;
    try {
        response = await axios.post(`${dbprop.saveCompanyTermsAndConditionDetailsUrl}/${userid}`,termsAndCondition, config);
        //console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const uploadCompanyLogo = async (companylogo,userid) => {
    //console.log(`${dbprop.saveCompanyTermsAndConditionDetailsUrl}/${userid}` + ' dbprop.saveCompanyTermsAndConditionDetailsUrl');
    console.log("companylogo");
    console.log(companylogo + `${dbprop.uploadCompanyLogo}`);
    let response;
    try {
        response = await axios.post(`${dbprop.uploadCompanyLogo}`,companylogo, imageconfig);
        // response = await axios.post(`${dbprop.uploadCompanyLogo}`,"", imageconfig);
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
};