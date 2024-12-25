import React, { useContext } from "react";


import './GeneralDetails.css';
import { AllState } from "../../Context/allStateContext";
import { CompanyDetail } from "../../Context/companyDetailContext";
const GeneralDetails = () => {

    const invoicedet = useContext(AllState);
    const companydet = useContext(CompanyDetail);
    return <>

        <div className="generaldetails ">
            <ul className="details ">
                <li >
                    <div className="companyname big estimateheader">
                        {companydet.companyName}

                    </div>
                </li>
                <li>
                    <div className="companyname tagline estimateheader">
                        {companydet.companyTagLine}

                    </div>

                </li>
                <li>
                    <div className="estimateheader">
                        {companydet.companyAddress}
                    </div>
                </li>

                <li>
                    <div className="estimateheader">
                        {companydet.companyPhno}
                    </div>
                </li>
                <li>
                    <div className="estimateheader">
                        {companydet.companymailid}
                    </div>
                </li>
            </ul>
            {companydet.companyImage &&
                <ul>
                    <img src={companydet.companyImage} width="200" height="180" />
                </ul>}

            {/* <li>
             {companydet.companyGstin ? 'Gstin: '+companydet.companyGstin:null }
            </li>
            <li>
             {companydet.companyGstinStatename ? 'StateName: '+companydet.companyGstinStatename:null }
            </li> */}

        </div>
        
        <div className="generaldetails">
            <ul className="details">
                <div className="companyname">Buyer:
                    <li>
                        {invoicedet.clientName}
                    </li>
                    <li>
                        {invoicedet.clientPhno}
                    </li>
                    <li>
                        {invoicedet.clientAdd}
                    </li>
                </div>
            </ul>

            <ul className="details">
                <li className="companyname">
                    {invoicedet.companyName}
                </li>
                <li>
                    {invoicedet.companyTagLine}
                </li>
                <li>
                    {invoicedet.companyAddress}
                </li>
                <li>
                    {invoicedet.companyName}
                </li>
                <li>
                    {invoicedet.companyPhno}
                </li>
                <li>
                    {invoicedet.companyGstin ? 'Gstin: ' + invoicedet.companyGstin : null}
                </li>
                <li>
                    {invoicedet.companyGstinStatename ? 'StateName: ' + invoicedet.companyGstinStatename : null}
                </li>

            </ul>

            <ul className="details invoicedetails">

                <li>
                    Invoice ID: {invoicedet.invoiceid}
                </li>
                <li>
                    Invoice date: {invoicedet.invoicedate}
                </li>
                <li>
                    Payment mode: {invoicedet.paymentmode}
                </li>
                <li>
                    Payment Date: {invoicedet.paymentdate}
                </li>
            </ul>
        </div>
    </>
}

export default GeneralDetails;