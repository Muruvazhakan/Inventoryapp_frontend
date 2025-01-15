import React from "react";

import Card from "../../Style/Card/Card";
import './Header.css';
const StyleHeader = (props) => {

    const print = () => {
        window.print();
    }
    return <div className={`profitstyle card1 ${props.className}`}>
        <Card className="profitstylecardheard" >
            {props.children}
        </Card>
    </div>
}

export default StyleHeader;