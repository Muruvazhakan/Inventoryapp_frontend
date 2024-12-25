import React, { useContext } from "react";

import { CompanyDetail } from "../../../Context/companyDetailContext";

import '../../GeneralDetails/GeneralDetails.css';
import { estimateState } from "../../../Context/EstimatestateContext";
// import img  from '.'
import logo from '../../../../Image/JRLogo.png';
const EstimateHeader = () => {

    const estimatedet = useContext(estimateState);
    const companydet = useContext(CompanyDetail);
    return (

        <>
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
                    <img src={companydet.companyImage} width="200" height="180"/>
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
                    <div className="companyname gap">To:
                        <li>
                            {estimatedet.clientName}
                        </li>
                        <li>
                            {estimatedet.clientPhno}
                        </li>
                        <li>
                            {estimatedet.clientAdd}
                        </li>
                    </div>
                </ul>



                <ul className="details invoicedetails">
                    <li>
                        Estimate ID: {estimatedet.estimateid}
                    </li>
                    <li>
                        Estimate date: {estimatedet.estimatedate}
                    </li>
                </ul>
            </div>
        </>)
}

export default EstimateHeader;