import * as dbprop from './dbproperties';
import axios from 'axios';

const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Stockapp'
    },
};


export const getStockidDB = async (userid) => {
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

 export const getStockDB = async (userid) => {
    //console.log(`${dbprop.getStockUrl}/${userid}` + ' dbprop.getStockIdUrl');
    console.log("userid");
    console.log(userid);
     // const data = {
     //     username: username,
     //     password: userpassword
     // };
     // console.log(data);
     let response;
     try {
         response = await axios.get(`${dbprop.getAllStockUrl}/${userid}`, config);
         // console.log(response);
         return response;
     } catch (err) {
         console.log(err);
         return err;
     }
 };

 export const getClientDB = async (userid) => {
    //console.log(`${dbprop.getStockUrl}/${userid}` + ' dbprop.getStockIdUrl');
     // const data = {
     //     username: username,
     //     password: userpassword
     // };
     // console.log(data);
     let response;
     try {
         response = await axios.get(`${dbprop.getAllClientUrl}/${userid}`, config);
         // console.log(response);
         return response;
     } catch (err) {
         console.log(err);
         return err;
     }
 };
 
export const saveStockBD = async (stock,userid) => {
    //console.log(`${dbprop.saveStockUrl}/${userid}` + ' dbprop.saveStockUrl');
     const data = {
        stock
     };
    //console.log(data);
     let response;
     try {
         response = await axios.post(`${dbprop.saveStockUrl}/${userid}`,data, config);
        //console.log(response);
         return response;
     } catch (err) {
         console.log(err);
         return err;
     }
 };