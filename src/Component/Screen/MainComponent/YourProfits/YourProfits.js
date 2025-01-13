import React, { useContext } from "react";
import { Stocks } from "../../../Context/StocksContex";
import Card from "../../../Style/Card/Card";

import './YourProfits.css';
const YourProfits = () => {
    const tabledet = useContext(Stocks);
    return <>
        {tabledet.totalprofiramt > 0 &&

            <div className="profitstyle card1">
                <Card className="profitstylecard" >
                    Your Profits: ₹ {tabledet.totalprofiramt} 
                </Card>
            </div>

        }
    </>
};

export default YourProfits;