
import React, { useContext } from "react";
import { CircularProgress, Stack } from "@mui/material";
import * as Datas from '../../Context/Datas';
import Card from "../../Style/Card/Card";
import {
    Link
} from "react-router-dom";

import './DisplayAllComponent.css';
import { CompanyDetail } from "../../Context/companyDetailContext";

const DisplayAllComponent = (props) => {

    const logindet = useContext(CompanyDetail);
    

    return <>
        <div className=" displayelements" >
            {!logindet.isloaded &&
                <Stack sx={{ color: 'grey.500' }} spacing={2} alignItems={"center"} className="spinnerstyle">
                    <CircularProgress color="success" size={30} />
                </Stack>
            }
            {Datas.navigationbarcontent.map((items, index) => {
                if (items.screenname !== "Home") {
                    return (

                        <Card className='displayscreenname' key={index} >
                            <Link className="displayelements linkdecor" to={{ pathname: items.altname }} key={index}>
                                <img src={items.image} height={350} width={350} alt={items.altname} />
                                {/* <div className="cardline">
                            {items.screenname}
                            </div> */}

                            </Link>

                        </Card>

                    )
                } else return null;

            })}

        </div>
    </>
}

export default DisplayAllComponent;