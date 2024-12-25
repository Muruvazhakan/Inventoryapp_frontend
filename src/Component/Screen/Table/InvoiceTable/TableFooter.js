import React, { useContext } from "react";
import { CompanyDetail } from "../../../Context/companyDetailContext";
const TableFooters = () =>{
    const compayDet = useContext(CompanyDetail);
    return <>
    <div className="words declaration">
         Declaration
    </div >
    <div className="word declarationcon"> {compayDet.companyDeleration}</div>
    <div className="sign-content-temp">
    <div className="sign-content">
        <div className="sign-content-company">For 
            {/* {compayDet.companyName } */}
            {compayDet.companyName ? ` ${compayDet.companyName}` : " ..company name.."}


        </div>
    </div>
    
    
    <div className=" sign-content sign-content-sign"> Authorised Signature</div>
    </div>
    
    </>
}

export default TableFooters;