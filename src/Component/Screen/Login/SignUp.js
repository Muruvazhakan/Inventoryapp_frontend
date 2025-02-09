import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import "./Login.css";
import { GoSignIn } from "react-icons/go";

import Card from "../../Style/Card/Card";

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
  return (
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
              onChange={(e) => setUser({ ...user, loginuser: e.target.value })}
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
              onClick={(e) => user.loginHandler("sigin")}
            >
              SignUp
            </Button>
          </div>
        </Box>
      </Card>
    </div>
  );
};

export default SignUp;
