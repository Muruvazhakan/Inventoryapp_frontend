export const addOrGetUserdetail = (value,name,type) =>{
    // console.log(value + name+type + 'addOrGetUserdetail');
    // console.log(name +" name"+value + ' value ');
    if(type ==="save"){
        localStorage.setItem(name, value);
    }
    else if(type ==="get") {
        // return JSON.parse(localStorage.getItem(name));
        return localStorage.getItem(name);
    }
    else {
        localStorage.removeItem(name);
    }
}

export const addOrUpdateCompanyHandler = (props,type,estimateidcount) => {
    // console.log(props);
    if(type ==="save"){
        let companydetail = {
            companyAddress: props.companyAddress, companyDeleration: props.companyDeleration,
            companyGstin: props.companyGstin, companyGstinStatename: props.companyGstinStatename, companyName: props.companyName, companyOwner: props.companyOwner,
            companyPhno: props.companyPhno, companyTagLine: props.companyTagLine,
            companydetaildesc: props.companydetaildesc, companymailid: props.companymailid, companythankyou: props.companythankyou,estimateidcount:estimateidcount,
            invoiceidcount:props.invoiceidcount,companyImage: props.companyImage, uploadimg: props.uploadimg,
    
        }
        // console.log(props);
        localStorage.setItem('companydetail', JSON.stringify(companydetail));
        // console.log('saved data');
        // let sto =JSON.parse(localStorage.getItem('companydetail'));
        // console.log(sto);
    
    }
    else {
        localStorage.removeItem('companydetail');
    }
}

export const getCompanyHandler = () => {
    // console.log('get CompanyTermsAndCondition ');
    return JSON.parse(localStorage.getItem('companydetail'));
}

export const addOrGetstockHistoryData = (props, type) => {
    // console.log(props);

    if (type === 'save') {
        localStorage.setItem('companystockhistory', JSON.stringify(props));
        //  console.log('companyinvoicehistory details');
        // let sto = JSON.parse(localStorage.getItem('companyinvoicehistory'));
        // console.log(sto);
    }
    else if (type === 'get') {
        return JSON.parse(localStorage.getItem('companystockhistory'));
    }
    else {
        localStorage.removeItem('companystockhistory');
    }
}

export const addOrGetSaleStockHistoryData = (props, type) => {
    // console.log(props);

    if (type === 'save') {
        localStorage.setItem('companysalestockhistory', JSON.stringify(props));
        //  console.log('companyinvoicehistory details');
        // let sto = JSON.parse(localStorage.getItem('companyinvoicehistory'));
        // console.log(sto);
    }
    else if (type === 'get') {
        return JSON.parse(localStorage.getItem('companysalestockhistory'));
    }
    else {
        localStorage.removeItem('companysalestockhistory');
    }
}

export const addOrGetStockid = (props, type) => {
    //console.log(props);
    if (type === 'save') {
        localStorage.setItem('stocksid', JSON.stringify(props));
    }
    else if (type === 'get') {
        return JSON.parse(localStorage.getItem('stocksid'));
    }
}

export const addOrGetSaleStockid = (props, type) => {
    //console.log(props);
    if (type === 'save') {
        localStorage.setItem('salestocksid', JSON.stringify(props));
    }
    else if (type === 'get') {
        return JSON.parse(localStorage.getItem('salestocksid'));
    }
}

export const addOrGetCompanyImage = (props, type) => {
    //console.log(props);
    if (type === 'save') {
        localStorage.setItem('stocksid', JSON.stringify(props));
    }
    else if (type === 'get') {
        return JSON.parse(localStorage.getItem('stocksid'));
    }
}

export const addOrGetAllStockData = (props, type) => {
    // console.log(props);

    if (type === 'save') {
        localStorage.setItem('allStockData', JSON.stringify(props));
        //  console.log('companyinvoicehistory details');
        // let sto = JSON.parse(localStorage.getItem('companyinvoicehistory'));
        // console.log(sto);
    }
    else if (type === 'get') {
        return JSON.parse(localStorage.getItem('allStockData'));
    }
    else {
        localStorage.removeItem('allStockData');
    }
}

export const addOrGetAllHistoryStockData = (props, type) => {
    // console.log(props);

    if (type === 'save') {
        localStorage.setItem('allHistoryStockData', JSON.stringify(props));
        //  console.log('companyinvoicehistory details');
        // let sto = JSON.parse(localStorage.getItem('companyinvoicehistory'));
        // console.log(sto);
    }
    else if (type === 'get') {
        return JSON.parse(localStorage.getItem('allHistoryStockData'));
    }
    else {
        localStorage.removeItem('allHistoryStockData');
    }
}


export const addOrGetAllHistorySalesStockData = (props, type) => {
    // console.log(props);

    if (type === 'save') {
        localStorage.setItem('allHistorySalesStockData', JSON.stringify(props));
        //  console.log('companyinvoicehistory details');
        // let sto = JSON.parse(localStorage.getItem('companyinvoicehistory'));
        // console.log(sto);
    }
    else if (type === 'get') {
        return JSON.parse(localStorage.getItem('allHistorySalesStockData'));
    }
    else {
        localStorage.removeItem('allHistorySalesStockData');
    }
}

export const addOrGetAllClientData = (props, type) => {
    // console.log(props);

    if (type === 'save') {
        localStorage.setItem('allClientData', JSON.stringify(props));
        //  console.log('companyinvoicehistory details');
        // let sto = JSON.parse(localStorage.getItem('companyinvoicehistory'));
        // console.log(sto);
    }
    else if (type === 'get') {
        return JSON.parse(localStorage.getItem('allClientData'));
    }
    else {
        localStorage.removeItem('allClientData');
    }
}