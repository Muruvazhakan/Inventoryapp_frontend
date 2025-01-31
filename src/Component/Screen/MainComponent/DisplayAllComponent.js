import React, { useContext, useEffect } from "react";
import { CircularProgress, Stack } from "@mui/material";
import * as Datas from "../../Context/Datas";
import Card from "../../Style/Card/Card";
import { Link } from "react-router-dom";

import "./DisplayAllComponent.css";
import { CompanyDetail } from "../../Context/companyDetailContext";
import YourProfits from "./YourProfits/YourProfits";

const DisplayAllComponent = () => {
  const logindet = useContext(CompanyDetail);

  return (
    <div style={{ width: "calc(100vw - 20px)" }}>
      {!logindet.isloaded && (
        <Stack
          sx={{ color: "grey.500" }}
          spacing={2}
          alignItems={"center"}
          className="spinnerstyle"
        >
          <CircularProgress color="success" size={30} />
        </Stack>
      )}
      <Link className="linkdecor" to={{ pathname: "/profits" }}>
        <YourProfits />
      </Link>

      <div
        className=" displayelements"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "0px 20px",
        }}
      >
        {Datas.navigationbarcontent.map((items, index) => {
          if (items.screenname !== "Home") {
            return (
              <div>
                <Card className="displayscreenname" key={index}>
                  <Link
                    className="displayelements linkdecor"
                    to={{ pathname: items.altname }}
                    key={index}
                  >
                    <img
                      src={items.image}
                      style={{
                        maxHeight: "400px",
                        maxWidth: "400px",
                      }}
                      alt={items.altname}
                    />
                  </Link>
                </Card>
              </div>
            );
          } else return null;
        })}
      </div>
    </div>
  );
};

export default DisplayAllComponent;
