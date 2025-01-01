import React, { useContext } from "react";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceMainComponent from "../Screen/MainComponent/InvoiceMainComponent";
import NoData from "../Screen/NoData/NoData";
import NavigationBar from "../Screen/NavigationBar/NavigationBar";
import DisplayAllComponent from "../Screen/MainComponent/DisplayAllComponent";

import EstimateMainComponent from "../Screen/MainComponent/EstimateMainComponent";
import CompanyEditeScreen from "../Screen/ViewScreen/CompanyotherDetail/CompanyEditeScreen";
import Login from "../Screen/Login/Login";
import { CompanyDetail } from "../Context/companyDetailContext";
import SignUp from "../Screen/Login/SignUp";
import Developer from "../Screen/ViewScreen/Developer";
import { ToastContainer } from "react-toastify";
import AllEstimateDetails from "../Screen/ViewScreen/EstimateComponent/AllEstimateDetails";
import AllInvoiceDetails from "../Screen/ViewScreen/InvoiceComponent/AllInvoiceDetails";
import AddStocksForm from "../Screen/AddStocks/AddStocksForm/AddStocksForm";
import AddStocks from "../Screen/AddStocks/AddStocks";
import AllStocks from "../Screen/MainComponent/AllStocks/AllStocks";
const ScreenRoute = (props) => {
    const logindet = useContext(CompanyDetail);
    return <>
    <div className="websitecontainer">
        <ToastContainer position="top-center" theme="colored"/>
        <Router>
          
                <div>
                    <NavigationBar />
                    <Routes>
                    {!logindet.loginstatus ? 
                    <>
                    <Route  path='/' Component={Login} /> 
                    <Route path='/login' Component={Login} />
                    <Route  path='/signup' Component={SignUp} /> 
                    </>
                    :
                        <>
                        <Route exact path='/' Component={DisplayAllComponent} />
                        <Route path='/yourdetail' Component={CompanyEditeScreen} />
                        <Route path='/addstock' Component={AddStocks} />
                        <Route path='/stocks' Component={AllStocks} />
                        {/* <Route path='/genestimate' Component={EstimateMainComponent} />
                        <Route path='/allinvoice' Component={AllInvoiceDetails} />
                        <Route path='/allestimates' Component={AllEstimateDetails} />  */}
                        <Route path='/login' Component={Login} />
                        <Route path='/' Component={NoData} />
                        </> }

                        
                    </Routes>
                    {/* <MainComponent/> */}
                   
                </div>
        </Router>
        
        </div>
        {/* <Developer /> */}
    </>
}

export default ScreenRoute;