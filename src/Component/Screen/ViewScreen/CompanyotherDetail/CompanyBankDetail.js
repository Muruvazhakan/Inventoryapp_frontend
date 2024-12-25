import React, { useContext } from "react";


import { CompanyDetail } from "../../../Context/companyDetailContext";
import './CompanyDetails.css';
import Card from "../../../Style/Card/Card";
const CompanyBankDetail = () => {

    const companydet = useContext(CompanyDetail);
    return (

        <Card className="  ">
            <div className="header">Bank Details</div>
            {companydet.companyBankdetails.map((item, index) => {
                return (
                    <>
                        {item.value.length >1 ?
                            <div key={index} className="items">
                                {(item.isvisible === true || item.isvisible === "true") &&
                                    <>
                                        {item.title} :  {item.value}
                                    </>
                                }
                            </div>
                            :
                            null
                        }
                    </>
                )
            })}
           
        </Card>

    )
}

export default CompanyBankDetail;