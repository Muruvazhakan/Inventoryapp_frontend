import React from "react";
import NavigationBar from "../Screen/NavigationBar/NavigationBar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  );
};

export default Home;
