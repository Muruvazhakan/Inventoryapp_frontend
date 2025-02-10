import {
  Box,
  Button,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import "./Login.css";
import { GoSignIn } from "react-icons/go";

import Card from "../../Style/Card/Card";
import { siginUser } from "../../../apis/apis";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const [user, setUser] = useState({
    loginuser: "",
    loginUserPassword: "",
    loginUserConfirmPassword: "",
    tokenid: "",
    role: "",
    oraganisationName: "",
    type: "temp",
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
      if (logintype === "sigin") {
        if (user.loginUserPassword !== user.loginUserConfirmPassword) {
          // toasterror("Password is not match with Confirm Password");
          return;
        }
        const encrypted_pass = crypt("salt", user.loginUserPassword);

        try {
          setUser({ ...user, load: true });
          await siginUser(
            user.loginuser,
            encrypted_pass,
            user.type,
            user.role,
            user.oraganisationName,
            user.tokenid
          )
            .then((res) => {
              console.log(res, "res");
              if (res.data === "User already exist") {
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
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      // toasterror("Please fill both User Name and Password");
      return;
    }
  };

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
            <h2 className="logintext">Sign Up</h2>
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
            <div>
              <TextField
                required
                id="outlined-required"
                label="Role"
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                color={user.role !== "" && "success"}
                error={user.role === ""}
              />
            </div>
            {/* <TextField required id="outlined-required" label="Role" value={user.type}
                    onChange={(e) => user.setval(e, user.setrole)}
                    color={user.setboxColors(user.role, 'color')}
                    error={user.setboxColors(user.role, 'error')}
                /> */}

            <div>
              <TextField
                required
                id="outlined-required"
                label="Oraganisation Name"
                value={user.oraganisationName}
                onChange={(e) =>
                  setUser({ ...user, oraganisationName: e.target.value })
                }
                color={user.oraganisationName !== "" && "success"}
                error={user.oraganisationName === ""}
              />
            </div>
            <div>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="Type"
                id="Type"
                value={user.type}
                label="Type"
                onChange={(e) => setUser({ ...user, type: e.target.value })}
              >
                <MenuItem value={"temp"}>Temperary</MenuItem>
                <MenuItem value={"perm"}>Permanent</MenuItem>
              </Select>
            </div>
            <div className="loginbutton">
              <Button
                variant="contained"
                color="success"
                endIcon={<GoSignIn />}
                onClick={(e) => loginHandler("sigin")}
              >
                SignUp
              </Button>
            </div>
          </Box>
        </Card>
      </div>
    </>
  );
};

export default SignUp;
