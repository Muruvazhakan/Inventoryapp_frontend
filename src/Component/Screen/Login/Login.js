import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import "./Login.css";
import { MdLogin } from "react-icons/md";

import Card from "../../Style/Card/Card";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../apis/apis";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/userSlice";

const Login = () => {
  const [user, setUser] = useState({
    userName: "",
    password: "",
    load: false,
  });
  const userDispatch = useDispatch();
  const navigate = useNavigate();

  //need to change
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

  const handleLogin = async () => {
    try {
      setUser({ ...user, load: true });
      const encrypted_pass = crypt("salt", user.password);
      await loginUser(user.userName, encrypted_pass)
        .then((res) => {
          localStorage.setItem("invUser", res);
          userDispatch(updateUser({ userid: res }));
          navigate("/");
        })
        .finally(() => {
          setUser({ ...user, load: false });
        });
    } catch (error) {}
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
            <h2 className="logintext">Login</h2>
            <div>
              <TextField
                required
                id="outlined-required"
                label="User Name"
                value={user.userName}
                onChange={(e) => setUser({ ...user, userName: e.target.value })}
                color={user.userName !== "" && "success"}
                error={user.userName === ""}
              />
            </div>
            <TextField
              required
              id="outlined-required"
              label="Password"
              value={user.password}
              type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              color={user.password !== "" && "success"}
              error={user.password === ""}
            />
            <div className="loginbutton">
              <Button
                variant="contained"
                color="success"
                endIcon={<MdLogin />}
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </Box>
        </Card>
        {user.load && (
          <CircularProgress
            color="success"
            size={30}
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              zIndex: 999,
              color: "grey.500",
            }}
          />
        )}
      </div>
    </>
  );
};

export default Login;
