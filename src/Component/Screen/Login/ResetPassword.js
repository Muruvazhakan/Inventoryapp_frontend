import { Box, Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import './Login.css';
import { GoSignIn } from "react-icons/go";

import Card from "../../Style/Card/Card";
import { CompanyDetail } from "../../Context/companyDetailContext";
import { ToastContainer } from "react-toastify";

const ResetPassword = (props) => {

    const logindet = useContext(CompanyDetail);
    return (<div className="displaycontent">
        <ToastContainer position="top-center" theme="colored" containerId="Signin" autoClose={1000} />
        <Card className="logincard displaycontent">
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1.5, width: '35ch' } }}>
                <h2 className="logintext">Sign Up</h2>
                <div>
                    <TextField required id="outlined-required" label="User Name" value={logindet.loginuser}
                        onChange={(e) => logindet.setval(e, logindet.setloginuser)}
                        color={logindet.setboxColors(logindet.loginuser, 'color')}
                        error={logindet.setboxColors(logindet.loginuser, 'error')}
                    /></div>
                <TextField required id="outlined-required" label="Password" value={logindet.loginUserPassword} type="password"
                    onChange={(e) => logindet.setval(e, logindet.setloginUserPassword)}
                    color={logindet.setboxColors(logindet.loginUserPassword, 'color')}
                    error={logindet.setboxColors(logindet.loginUserPassword, 'error')}
                />
                <div>
                    <TextField required id="outlined-required" label="Confirm Password" value={logindet.loginUserConfirmPassword} type="password"
                        onChange={(e) => logindet.setval(e, logindet.setloginUserConfirmPassword)}
                        color={logindet.setboxColors(logindet.loginUserConfirmPassword, 'color')}
                        error={logindet.setboxColors(logindet.loginUserConfirmPassword, 'error')}
                    /></div>
                <TextField required id="outlined-required" label="Token id" value={logindet.tokenid}
                    onChange={(e) => logindet.setval(e, logindet.settokenid)}
                    color={logindet.setboxColors(logindet.tokenid, 'color')}
                    error={logindet.setboxColors(logindet.tokenid, 'error')}
                />

                {/* <TextField required id="outlined-required" label="Role" value={logindet.type}
                    onChange={(e) => logindet.setval(e, logindet.setrole)}
                    color={logindet.setboxColors(logindet.role, 'color')}
                    error={logindet.setboxColors(logindet.role, 'error')}
                /> */}

                <div className="loginbutton">
                    <Button variant="contained" color="success" endIcon={< GoSignIn />}
                        onClick={(e) => logindet.loginHandler('reset')}
                    >Reset Password</Button>
                </div>
            </Box>
        </Card>

    </div>)
}

export default ResetPassword;