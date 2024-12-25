import React from "react";
import YourDetails from "../EditScreen/Invoice/YourDetails/YourDetails";
import TableForm from "../EditScreen/Invoice/TableForm/TableForm";
import InvoiceGenDetails from "../EditScreen/Invoice/InvoiceDetails/InvoiceGenDetails";

const InvoiceDeatilsEdit = (props) => {
  return (<>
    <TableForm />
    {/* <YourDetails /> */}
    <InvoiceGenDetails />
  </>
  )
}

export default InvoiceDeatilsEdit;