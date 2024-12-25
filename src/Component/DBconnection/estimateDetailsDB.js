import * as dbprop from './dbproperties';
import axios from 'axios';


const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};

export const getEstimateDB = async (userid) => {
    // console.log(`${dbprop.getEstimateUrl}/${userid}` + ' dbprop.userLoginUrl');
    // const data = {
    //     username: username,
    //     password: userpassword
    // };
    // console.log(data);
    let response;
    try {
        response = await axios.get(`${dbprop.getEstimateUrl}/${userid}`, config);
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const getEstimationId = async (userid) => {
    // console.log(`${dbprop.getEstimateUrl}/${userid}` + ' dbprop.userLoginUrl');
    // const data = {
    //     username: username,
    //     password: userpassword
    // };
    // console.log(data);
    let response;
    try {
        response = await axios.get(`${dbprop.getEstimationIdUrl}/${userid}`, config);
        // console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const saveEstimationId = async (estimationcount,userid) => {
    // console.log(`${dbprop.saveEstimationIdUrl}/${userid}` + ' dbprop.userLoginUrl');
    const data = {
        estimationcount
    };
    console.log(data);
    let response;
    try {
        response = await axios.post(`${dbprop.saveEstimationIdUrl}/${userid}`,data, config);
        // console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
};


export const saveEstimateDB = async (estimate,userid) => {
    // console.log(`${dbprop.saveEstimateUrl}/${userid}` + ' dbprop.userLoginUrl');
    const data = {
        estimate
    };
    // console.log(data);
    let response;
    try {
        response = await axios.post(`${dbprop.saveEstimateUrl}/${userid}`,data, config);
        // console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
};
