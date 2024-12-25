import React from "react";
import Header from "../Header/Header";
import GeneralDetails from "../GeneralDetails/GeneralDetails";
import Tables from "../Table/InvoiceTable/Table";
import TableFooters from "../Table/InvoiceTable/TableFooter";

const InvoiceDetails = (props) =>{

    return(<>
        <Header name="Invoice App"/>
      <GeneralDetails />
      <Tables screen="new" />
    
      <TableFooters/>
      </>
    )
}

export default InvoiceDetails;