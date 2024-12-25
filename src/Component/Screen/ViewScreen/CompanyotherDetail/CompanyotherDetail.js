import React, { useContext } from "react";

import { CompanyDetail } from "../../../Context/companyDetailContext";
import Card from "../../../Style/Card/Card";
const CompanyotherDetail = () => {

    const companydet = useContext(CompanyDetail);


    return (
        <>
        {companydet.companydetails.length>1 && 
        <Card>
            <div className="header">Terms And Conditions</div>
            {companydet.companydetails.map((item, index) => {
                return (
                    <ul className="details" key={index}>
                        {(item.isvisible === true || item.isvisible === "true") &&
                            < >
                                <li >
                                    <div className="companyname  itemtitle">
                                        {item.title}

                                    </div>
                                </li>
                                <li>
                                    {item.desc}
                                </li>
                            </>
                        }
                    </ul>
                )
            })}



        </Card>}
        </>
    )
}

export default CompanyotherDetail;