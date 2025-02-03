import React, { useState } from "react";

import "./NoData.css";
import Card from "../../Style/Card/Card";

const NoData = (props) => {
  const [state, setState] = useState(false);
  return (
    <>
      <div className="  nodata-stytle">
        <Card className=" nodata-stytle why_pvc_div-style ">
          No {props.details} {props.errorcode}
        </Card>
      </div>
    </>
  );
};
export default NoData;
