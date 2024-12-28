import * as dbprop from './dbproperties';
import axios from 'axios';

const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Invoiceapp'
    },
};

// export const getInvoiceDB = async (userid) => {
//    //console.log(`${dbprop.getInvoiceUrl}/${userid}` + ' dbprop.getInvoiceIdUrl');
//     // const data = {
//     //     username: username,
//     //     password: userpassword
//     // };
//     // console.log(data);
//     let response;
//     try {
//         response = await axios.post(`${dbprop.getInvoiceUrl}/${userid}`, config);
//         // console.log(response);
//         return response;
//     } catch (err) {
//         console.log(err);
//         return err;
//     }
// };

export const getStockid = async (userid) => {
   //console.log(`${dbprop.getStockidUrl}/${userid}` + ' dbprop.getStockid');
    // const data = {
    //     username: username,
    //     password: userpassword
    // };
    // console.log(data);
    let response;
    try {
        response = await axios.post(`${dbprop.getStockidUrl}/${userid}`, config);
        // console.log(response);
        return response;
    } catch (err) {
       //console.log(err);
        return err;
    }
};


// export const saveInvoiceId = async (invoicecount,userid) => {
//    //console.log(`${dbprop.saveInvoiceIdUrl}/${userid}` + ' dbprop.saveInvoiceIdUrl');
//     const data = {
//         invoicecount
//     };
//    //console.log(data);
//     let response;
//     try {
//         response = await axios.post(`${dbprop.saveInvoiceIdUrl}/${userid}`,data, config);
//         // console.log(response);
//         return response;
//     } catch (err) {
//         console.log(err);
//         return err;
//     }
// };


// export const saveInvoiceBD = async (invoice,userid) => {
//    //console.log(`${dbprop.saveInvoiceUrl}/${userid}` + ' dbprop.saveInvoiceUrl');
//     const data = {
//         invoice
//     };
//    //console.log(data);
//     let response;
//     try {
//         response = await axios.post(`${dbprop.saveInvoiceUrl}/${userid}`,data, config);
//        //console.log(response);
//         return response;
//     } catch (err) {
//         console.log(err);
//         return err;
//     }
// };