export const isbackendconnect = true;

export const imageBaseUrl = "https://storage.googleapis.com/helpone-9bf33.appspot.com";
export const backendUrl = "http://localhost:4000";
// export const backendUrl = "https://billedgebackend.onrender.com";
export const userLoginUrl = `${backendUrl}/user/login`;
export const userSigninUrl = `${backendUrl}/user/signin`;

export const getCompanyBasicDetailsUrl = `${backendUrl}/user/getcompanybasic`;
export const saveCompanyBasicDetailsUrl = `${backendUrl}/user/savecompanybasic`;

export const getCompanyBankDetailsUrl = `${backendUrl}/user/getcompanybank`;
export const saveCompanyBankDetailsUrl = `${backendUrl}/user/savecompanybank`;

export const getCompanyTermsAndConditionDetailsUrl = `${backendUrl}/user/gettermsandconditioncompany`;
export const saveCompanyTermsAndConditionDetailsUrl = `${backendUrl}/user/savetermsandconditioncompany`;
export const uploadCompanyLogo = `${backendUrl}/uploadCompanyLogo`;
// export const uploadCompanyLogo = `${backendUrl}/upload`;
export const getEstimateUrl = `${backendUrl}/estimate`;
export const saveEstimateUrl = `${backendUrl}/estimate/createorupateestimate`;

export const getEstimationIdUrl = `${backendUrl}/estimate/getestimationid`;
export const saveEstimationIdUrl = `${backendUrl}/estimate/saveestimationid`;

export const getAllStockUrl = `${backendUrl}/stock/getallstocks`;
export const getStockHistoryUrl = `${backendUrl}/stock/getallstocks`;
// export const saveInvoiceUrl = `${backendUrl}/invoice/createorupdateinvoice`;

export const getStockidUrl = `${backendUrl}/stock/getstockid`;
export const saveStockIdUrl = `${backendUrl}/stock/savestockid`;

export const saveStockUrl = `${backendUrl}/stock/savestock`;


// router.post('/:userid',invoicecont.getallinvoice);
// router.post('/createorupdateinvoice/:userid',invoicecont.createorupdateinvoice);
// router.post('/getStockid/:userid',invoicecont.getStockid);
// router.post('/saveinvoiceid/:userid',invoicecont.incremeantinvoiceid);

// app.use('/user/',userRoure);

// app.use('/invoice/',invoicegenRoute);
// app.use('/estimate/',estimategenRoute);

// router.get('/:userid',estimateCont.getallestimate);
// router.post('/createorupateestimate/:userid',estimateCont.createorupdateestimate);

// router.post('/login',userRoute.loginUser);
// router.post('/signin',userRoute.signIn);
// router.get('/getcompanybasic/:userid',userRoute.getCompanyBasicDetails);
// router.get('/gettermsandconditioncompany/:userid',userRoute.getCompanyTermsAndConditionDetail);
// router.get('/getcompanybank/:userid',userRoute.getCompanyBankDetails);

// router.post('/savecompanybasic/:userid',userRoute.addOrModifyCompanyBasicDetails);
// router.post('/savetermsandconditioncompany/:userid',userRoute.addOrModifyCompanyTermsAndConditionDetail);
// router.post('/savecompanybank/:userid',userRoute.addOrModifyCompanyBankDetails);