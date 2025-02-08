export const isbackendconnect = true;

export const imageBaseUrl =
  "https://storage.googleapis.com/helpone-9bf33.appspot.com";
// export const backendUrl = "http://localhost:4000";
export const backendUrl = "https://assetsync-backend.onrender.com";
export const userLoginUrl = `${backendUrl}/user/login`;
export const userSigninUrl = `${backendUrl}/user/signin`;
export const passwordResetUrl = `${backendUrl}/user/passwordReset`;

export const getCompanyBasicDetailsUrl = `${backendUrl}/user/getcompanybasic`;
export const saveCompanyBasicDetailsUrl = `${backendUrl}/user/savecompanybasic`;

export const uploadCompanyLogo = `${backendUrl}/uploadCompanyLogo`;
// export const uploadCompanyLogo = `${backendUrl}/upload`;

export const getAllStockUrl = `${backendUrl}/stock/getallstocks`;
export const getAllHistoryStockUrl = `${backendUrl}/stock/getallhistorystocks`;
export const getAllClientUrl = `${backendUrl}/stock/getallclient`;
export const getStockHistoryUrl = `${backendUrl}/stock/getallstocks`;
// export const saveInvoiceUrl = `${backendUrl}/invoice/createorupdateinvoice`;

export const getStockidUrl = `${backendUrl}/stock/getstockid`;
export const saveStockIdUrl = `${backendUrl}/stock/savestockid`;

export const getAllHistorySalesStockUrl = `${backendUrl}/stock/getallhistorysalesstocks`;

export const getSalesStockidUrl = `${backendUrl}/stock/getsalesstockid`;
export const saveSalesStockIdUrl = `${backendUrl}/stock/savesalesstockid`;

export const saveStockUrl = `${backendUrl}/stock/savestock`;
export const saveSaleStockUrl = `${backendUrl}/stock/savesalesstock`;
export const deleteStockUrl = `${backendUrl}/stock/deletestock`;
