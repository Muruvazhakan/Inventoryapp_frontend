import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import "./Login.css";
import { MdLockReset } from "react-icons/md";

import Card from "../../Style/Card/Card";
import { passwordReset } from "../../../apis/apis";
import { useNavigate } from "react-router-dom";

const ResetPassword = (props) => {
  const [user, setUser] = useState({
    loginuser: "",
    loginUserPassword: "",
    loginUserConfirmPassword: "",
    tokenid: "",
    load: false,
  });
  const navigate = useNavigate();
  const crypt = (salt, text) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code) =>
      textToChars(salt).reduce((a, b) => a ^ b, code);

    return text
      .split("")
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join("");
  };

  const loginHandler = async (logintype) => {
    //console.log('login handler' + loginuser.length +'loginuser.length ' +loginUserPassword.length );

    if (user.loginuser.length > 0 && user.loginUserPassword.length > 0) {
      const encrypted_pass = crypt("salt", user.loginUserPassword);
      //console.log('encrypted_pass');
      //console.log(encrypted_pass);
      if (logintype === "reset") {
        if (user.loginUserPassword !== user.loginUserConfirmPassword) {
          // toasterror("Password is not match with Confirm Password");
          return;
        }
        // if (tokenid !== 'Billedge123') {
        try {
          setUser({ ...user, load: true });
          await passwordReset(user.loginuser, encrypted_pass, user.tokenid)
            .then((res) => {
              console.log(res, "res");
              if (res.data === "User does not exist") {
                // toasterror(" User already exist");
                // setloginstatus(true);
              } else if (res.status === 201) {
                // toast.success(" User successfully registered");
                //console.log(userExsist.data);
                navigate("/");
              }
            })
            .finally(() => {
              setUser({ ...user, load: false });
            });
        } catch (error) {}
      }
    } else {
      // toasterror("Please fill both User Name and Password");
      return;
    }
  };

  // if (user.load) {
  //   return (
  //     <Stack
  //       sx={{ color: "grey.500" }}
  //       spacing={2}
  //       alignItems={"center"}
  //       className="spinnerstyle"
  //     >
  //       <CircularProgress color="success" size={30} />
  //     </Stack>
  //   );
  // }
  return (
    <>
      {user.load && (
        <Stack
          sx={{ color: "grey.500" }}
          spacing={2}
          alignItems={"center"}
          className="spinnerstyle"
        >
          <CircularProgress color="success" size={30} />
        </Stack>
      )}

      <div className="displaycontent">
        <Card className="logincard displaycontent">
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1.5, width: "35ch" } }}
          >
            <h2 className="resetlogintext">Reset Password</h2>
            <div>
              <TextField
                required
                id="outlined-required"
                label="User Name"
                value={user.loginuser}
                onChange={(e) =>
                  setUser({ ...user, loginuser: e.target.value })
                }
                color={user.loginuser !== "" && "success"}
                error={user.loginuser === ""}
              />
            </div>
            <TextField
              required
              id="outlined-required"
              label="Password"
              value={user.loginUserPassword}
              type="password"
              onChange={(e) =>
                setUser({ ...user, loginUserPassword: e.target.value })
              }
              color={user.loginUserPassword !== "" && "success"}
              error={user.loginUserPassword === ""}
            />
            <div>
              <TextField
                required
                id="outlined-required"
                label="Confirm Password"
                value={user.loginUserConfirmPassword}
                type="password"
                onChange={(e) =>
                  setUser({ ...user, loginUserConfirmPassword: e.target.value })
                }
                color={user.loginUserConfirmPassword !== "" && "success"}
                error={user.loginUserConfirmPassword === ""}
              />
            </div>
            <TextField
              required
              id="outlined-required"
              label="Token id"
              value={user.tokenid}
              onChange={(e) => setUser({ ...user, tokenid: e.target.value })}
              color={user.tokenid !== "" && "success"}
              error={user.tokenid === ""}
            />

            <div className="loginbutton">
              <Button
                variant="contained"
                color="success"
                endIcon={<MdLockReset />}
                onClick={(e) => loginHandler("reset")}
              >
                Reset Password
              </Button>
            </div>
          </Box>
        </Card>
      </div>
    </>
  );
};

export default ResetPassword;
