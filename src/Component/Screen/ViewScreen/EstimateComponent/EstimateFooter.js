import React, { useContext } from "react";

import { CompanyDetail } from "../../../Context/companyDetailContext";

import '../../GeneralDetails/GeneralDetails.css';
import { estimateState } from "../../../Context/EstimatestateContext";
const EstimateFooter = () => {

    const estimatedet = useContext(estimateState);
    const companydet = useContext(CompanyDetail);
    return (

        <>
            <div className="generaldetails estimateheadercenter ">
                <ul className="details ">
                    <li >
                        <div className="companyname big ">
                            {companydet.companythankyou}

                        </div>
                    </li>
                    <li>
                        <div className="companyname tagline estimateheadercenter">
                            {companydet.companyTagLine}

                        </div>

                    </li>

                </ul>
           

            </div>
            <div className="generaldetails">

                <ul className="details">
                    {/* <div className="companyname gap">To:
                        <li>
                            {estimatedet.clientName}
                        </li>
                        <li>
                            {estimatedet.clientPhno}
                        </li>
                        <li>
                            {estimatedet.clientAdd}
                        </li>
                    </div> */}
                </ul>



                <ul className="details invoicedetails">
                    <li>
                        <div className="companyname  estimateheader">
                            PROPRIETOR
                        </div>
                    </li>
                    <li>
                        <div className="companyname  estimateheader">
                            {companydet.companyOwner}
                        </div>
                    </li>
                </ul>
            </div>
        </>)
}

export default EstimateFooter;