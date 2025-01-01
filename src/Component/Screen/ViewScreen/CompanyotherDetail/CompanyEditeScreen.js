import React from "react";
import YourDetails from "../../EditScreen/Invoice/YourDetails/YourDetails";
import CompanyOtherDetailEdit from "../../EditScreen/Company/CompanyOtherDetailEdit";
import CompanyBankDetailEdit from "../../EditScreen/Company/CompanyBankDetailEdit";
import { ToastContainer } from "react-toastify";

const CompanyEditeScreen = () => {


    return (

        <>
        <ToastContainer position="top-center" theme="colored" containerId="CompanyEditScreen" />
        <YourDetails/>
        {/* <CompanyBankDetailEdit />
        <CompanyOtherDetailEdit/> */}
        </>)
}

export default CompanyEditeScreen;