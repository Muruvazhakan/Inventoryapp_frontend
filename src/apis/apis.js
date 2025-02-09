import axios from "axios";
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Stockapp",
  },
};

const imageconfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Content-Type": "multipart/form-data",
  },
};

const url = process.env.REACT_APP_BACKEND_URL ?? "http://localhost:4000";

export const userLoginUrl = `${url}/user/login`;
export const userSigninUrl = `${url}/user/signin`;
export const passwordResetUrl = `${url}/user/passwordReset`;

export const getCompanyBasicDetailsUrl = `${url}/user/getcompanybasic`;
export const saveCompanyBasicDetailsUrl = `${url}/user/savecompanybasic`;

export const uploadCompanyLogoUrl = `${url}/uploadCompanyLogo`;
// export const uploadCompanyLogo = `${url}/upload`;

export const getAllStockUrl = `${url}/stock/getallstocks`;
export const getAllHistoryStockUrl = `${url}/stock/getallhistorystocks`;
export const getAllClientUrl = `${url}/stock/getallclient`;
export const getStockHistoryUrl = `${url}/stock/getallstocks`;
// export const saveInvoiceUrl = `${url}/invoice/createorupdateinvoice`;

export const getStockidUrl = `${url}/stock/getstockid`;
export const saveStockIdUrl = `${url}/stock/savestockid`;

export const getAllHistorySalesStockUrl = `${url}/stock/getallhistorysalesstocks`;

export const getSalesStockidUrl = `${url}/stock/getsalesstockid`;
export const saveSalesStockIdUrl = `${url}/stock/savesalesstockid`;

export const saveStockUrl = `${url}/stock/savestock`;
export const saveSaleStockUrl = `${url}/stock/savesalesstock`;
export const deleteStockUrl = `${url}/stock/deletestock`;

export const getStockidDB = async (userid) => {
  let response;
  try {
    response = await axios.post(`${getStockidUrl}/${userid}`, config);

    return response;
  } catch (err) {
    return err;
  }
};

export const getAllStocksDB = async (userid) => {
  try {
    const data = await axios.get(`${url}/stock/getallstocks/${userid}`);
    return data;
  } catch (error) {
    return error;
  }
};

// export const getStockDB = async (userid) => {
//    let response;
//    try {
//        response = await axios.get(`${getAllStockUrl}/${userid}`, config);
//        // console.log(response);
//        return response;
//    } catch (err) {
//        console.log(err);
//        return err;
//    }
// };

export const getAllHistoryStockDB = async (userid) => {
  console.log("userid");
  console.log(userid);
  let response;
  try {
    response = await axios.get(`${getAllHistoryStockUrl}/${userid}`, config);
    // console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const saveStockBD = async (stock, userid) => {
  const data = {
    stock,
  };
  //console.log(data);
  let response;
  try {
    response = await axios.post(`${saveStockUrl}/${userid}`, data, config);
    //console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const deleteStockBD = async (stock, userid) => {
  //console.log(`${saveStockUrl}/${userid}` + ' saveStockUrl');
  const data = {
    stock,
  };
  //console.log(data);
  let response;
  try {
    response = await axios.post(`${deleteStockUrl}/${userid}`, data, config);
    //console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getSalesStockidDB = async (userid) => {
  let response;
  try {
    response = await axios.post(`${getSalesStockidUrl}/${userid}`, config);
    // console.log(response);
    return response;
  } catch (err) {
    //console.log(err);
    return err;
  }
};

export const getAllHistorySalesStockDB = async (userid) => {
  let response;
  try {
    response = await axios.get(
      `${getAllHistorySalesStockUrl}/${userid}`,
      config
    );
    // console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const saveSalesStockBD = async (salestock, userid) => {
  //console.log(`${saveStockUrl}/${userid}` + ' saveStockUrl');
  const data = {
    salestock,
  };
  //console.log(data);
  let response;
  try {
    response = await axios.post(`${saveSaleStockUrl}/${userid}`, data, config);
    //console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getClientDB = async (userid) => {
  let response;
  try {
    response = await axios.get(`${getAllClientUrl}/${userid}`, config);
    // console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const loginUser = async (username, userpassword) => {
  //console.log(userLoginUrl + ' userLoginUrl');
  const data = {
    username: username,
    password: userpassword,
  };
  //console.log(data);
  let response;
  try {
    response = await axios.post(userLoginUrl, data, config);
    //console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const siginUser = async (
  username,
  userpassword,
  type,
  role,
  oraganisationName,
  tokenid
) => {
  const data = {
    username: username,
    password: userpassword,
    type: type,
    role: role,
    oraganisationName: oraganisationName,
    tokenid: tokenid,
  };
  //console.log(data);
  let response;
  try {
    response = await axios.post(userSigninUrl, data, config);
    //console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const passwordReset = async (username, userpassword, tokenid) => {
  const data = {
    username: username,
    password: userpassword,
    tokenid: tokenid,
  };
  //console.log(data);
  let response;
  try {
    response = await axios.post(passwordResetUrl, data, config);
    //console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getCompanyBasicDetails = async (userid) => {
  let response;
  try {
    response = await axios.get(
      `${getCompanyBasicDetailsUrl}/${userid}`,
      config
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const saveCompanyBasicDetails = async (userid, companyDetails) => {
  let response;
  try {
    response = await axios.post(
      `${saveCompanyBasicDetailsUrl}/${userid}`,
      companyDetails,
      config
    );
    //console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const uploadCompanyLogo = async (companylogo, userid) => {
  //console.log(`${saveCompanyTermsAndConditionDetailsUrl}/${userid}` + ' saveCompanyTermsAndConditionDetailsUrl');
  console.log("companylogo");
  console.log(companylogo + `${uploadCompanyLogo}`);
  let response;
  try {
    response = await axios.post(
      `${uploadCompanyLogoUrl}`,
      companylogo,
      imageconfig
    );
    // response = await axios.post(`${uploadCompanyLogo}`,"", imageconfig);
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
