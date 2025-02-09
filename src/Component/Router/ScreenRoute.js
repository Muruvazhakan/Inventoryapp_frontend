import React, { useContext } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import DisplayAllComponent from "../Screen/MainComponent/DisplayAllComponent";

import CompanyEditeScreen from "../Screen/ViewScreen/CompanyotherDetail/CompanyEditeScreen";
import Login from "../Screen/Login/Login";
import { CompanyDetail } from "../Context/companyDetailContext";
import SignUp from "../Screen/Login/SignUp";
import AddStocks from "../Screen/AddStocks/AddStocks";
import AllStocks from "../Screen/MainComponent/AllStocks/AllStocks";

import SalesStocks from "../Screen/SalesStocks/SalesStocks";
import AllSaleStocks from "../Screen/MainComponent/AllSaleStocks/AllSaleStocks";
import Sales from "../Screen/MainComponent/AllSaleStocks/Sales";
import ListOfAddedSaleStocks from "../Screen/SalesStocks/ListOfAddedSaleStocks/ListOfAddedSaleStocks";
import ListOfAddedStocks from "../Screen/AddStocks/ListOfAddedStocks/ListOfAddedStocks";
import AllProfit from "../Screen/MainComponent/AllProfit/AllProfit";
import ResetPassword from "../Screen/Login/ResetPassword";
import Stocks from "../Screen/MainComponent/AllStocks/Stocks";
import Home from "./Home";
import NoData from "../Screen/NoData/NoData";
import { useSelector } from "react-redux";

const ScreenRoute = () => {
  return (
    <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
      <Router>
        <Routes>
          <Route path="/" Component={Home}>
            <Route path="signup" Component={SignUp} />
            <Route path="login" Component={Login} />
            <Route path="passwordreset" Component={ResetPassword} />

            <Route Component={ProtectedRoute}>
              <Route index Component={DisplayAllComponent} />
              <Route path="yourdetail" Component={CompanyEditeScreen} />
              <Route path="stocks" Component={Stocks}>
                <Route index Component={AllStocks} />
                <Route path="addstock" Component={AddStocks} />
                <Route path="listofaddedstocks" Component={ListOfAddedStocks} />
              </Route>
              <Route path="sales" Component={Sales}>
                <Route index Component={AllSaleStocks} />
                <Route path="salestock" Component={SalesStocks} />
                <Route
                  path="listofaddedsalestocks"
                  Component={ListOfAddedSaleStocks}
                />
              </Route>
              <Route path="profits" Component={AllProfit} />
            </Route>
          </Route>

          <Route
            path="*"
            element={
              <h1>
                <Home />
                <NoData details="Page Found" />
              </h1>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

const ProtectedRoute = () => {
  const userState = useSelector((state) => state.user.user);

  if (!userState.userid) {
    return <Navigate to={"login"} />;
  }

  return <Outlet />;
};

export default ScreenRoute;
