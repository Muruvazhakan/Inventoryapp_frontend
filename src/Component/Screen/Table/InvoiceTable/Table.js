import React, { useContext } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import '../Table.css';


import { AllState } from "../../../Context/allStateContext";

const Tables = (props) => {

  const tabledetails = useContext(AllState);
  const digit2options = { maximumFractionDigits: 2 }
  const digit3options = { maximumFractionDigits: 3 }

  // const list=[{
  //     sno:1,
  //     desc:"Description of Goods",
  //     hsn:"200",
  //     quantity:20,
  //     rateoftax:2,
  //     rate:100,
  //     per:"PCS",
  //     disc:"15%",
  //     amount:"1000"
  // },{
  //     sno:2,
  //     desc:"Description of Goods",
  //     hsn:"200",
  //     quantity:20,
  //     rateoftax:2,
  //     rate:100,
  //     per:"PCS",
  //     disc:"15%",
  //     amount:"1000"
  // },{
  //     sno:3,
  //     desc:"Description of Goods",
  //     hsn:"200",
  //     quantity:20,
  //     rateoftax:2,
  //     rate:100,
  //     per:"PCS",
  //     disc:"15%",
  //     amount:"1000"
  // }];


  // const hsnlist=[{
  //     sno:1,
  //     hsn:2000,
  //     taxableValue:1000,
  //     centaxrate:10,
  //     centaxamt:110,
  //     satetaxrate:10,
  //     statetaxamt:110,
  //     totaltaxamt:200
  // }]
  return <>
    {/* <Paper sx={{ height: 400, width: '100%' }}>
  <DataGrid
    rows={rows}
    columns={columns}
    initialState={{ pagination: { paginationModel } }}
    pageSizeOptions={[5, 10]}
    checkboxSelection
    sx={{ border: 0 }}
  />
</Paper> */}
    <Paper sx={{ width: '98%', overflow: 'hidden', padding: '5px', borderRadius: '10px' }}>
      <TableContainer sx={{ minWidth: 650, borderRadius: '10px' }}>
        <Table aria-label="simple table">
          <TableHead sx={{ fontWeight: 1130, color: "white" }}>
            <TableRow className="table-header">
              <TableCell sx={{ fontWeight: 700 }}>S.No</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Description of Goods </TableCell>
              <TableCell sx={{ fontWeight: 700 }}>HSN/SAC</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Quantity</TableCell>

              <TableCell sx={{ fontWeight: 700 }}>Rate
                (Incl.of tax)</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Discount %</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Rate</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Per</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Amount (₹)</TableCell>
              {props.screen === "update" &&
                <>
                  <TableCell sx={{ fontWeight: 700 }} >Edit rows

                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }} >Delete rows

                  </TableCell>
                </>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {tabledetails.list.map((item, index) => {

              return (
                <TableRow className={item.index % 2 === 0 ? "table-body tablegrey" : "table-body"} key={item.id}
                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align='center' className="table-header-td">{index + 1}</TableCell>
                  <TableCell className="table-header-td">{item.desc}</TableCell>
                  <TableCell className="table-header-td">{item.hsn}</TableCell>
                  <TableCell align='center' className="table-header-td">{item.quantity}</TableCell>

                  <TableCell className="table-header-td">{item.rateinctax}</TableCell>
                  <TableCell className="table-header-td">{item.disc}</TableCell>
                  <TableCell className="table-header-td">{item.rate}</TableCell>
                  <TableCell className="table-header-td">{item.per}</TableCell>

                  <TableCell className="table-header-td">{Intl.NumberFormat("en-IN", digit2options).format(item.amount)}</TableCell>
                  {props.screen === "update" &&
                    <>
                      <TableCell className="table-edit" onClick={() => tabledetails.editListRows(item, "update")} >

                        <FiEdit size={18} />

                      </TableCell>
                      <TableCell className="table-edit" onClick={() => tabledetails.editListRows(item, "delete")} >

                        <MdDelete size={18} />

                      </TableCell>
                    </>}
                </TableRow>
              )

            })}

            <TableRow key="subtotal"
            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell  ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell sx={{ fontWeight: 700 }} >{Intl.NumberFormat("en-IN", digit2options).format(tabledetails.totalsubamt)}</TableCell>


            </TableRow>

            {tabledetails.otherchargedetail.map((item, index) => {

              return (
                <TableRow className={index % 2 === 0 ? "table-body tablegrey" : "table-body"} key={item.id}
                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell ></TableCell>
                  <TableCell >{item.otheritemdesc}</TableCell>
                  <TableCell ></TableCell>
                  <TableCell  ></TableCell>

                  <TableCell ></TableCell>
                  <TableCell ></TableCell>
                  <TableCell ></TableCell>
                  <TableCell ></TableCell>
                  <TableCell >{Intl.NumberFormat("en-IN", digit2options).format(item.otherdesctaxamt)}</TableCell>
                  {props.screen === "update" &&
                    <>
                      <TableCell className="table-edit" onClick={() => tabledetails.addOrEditOtherItems(item, "update")} >

                        <FiEdit size={18} />

                      </TableCell>
                      <TableCell className="table-edit" onClick={() => tabledetails.addOrEditOtherItems(item, "delete")} >

                        <MdDelete size={18} />

                      </TableCell>
                    </>}
                </TableRow>
              )

            })}
            <TableRow key="OUTPUTCGST9"
            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell  ></TableCell>
              <TableCell sx={{ fontWeight: 700 }}>OUTPUTCGST {tabledetails.ctrate}%</TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell sx={{ fontWeight: 700 }} >{Intl.NumberFormat("en-IN", digit2options).format(tabledetails.totalcentaxamt)}</TableCell>


            </TableRow>

            <TableRow key="OUTPUTSGST9"
            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell  ></TableCell>
              <TableCell sx={{ fontWeight: 700 }}> OUTPUTSGST {tabledetails.strate}%</TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell sx={{ fontWeight: 700 }} >{Intl.NumberFormat("en-IN", digit2options).format(tabledetails.totalstatetaxamt)}</TableCell>


            </TableRow>
            {/* {tabledetails.gstCgstitem.map((item) => (
            <TableRow className= {item.sno%2===0 ? "table-body tablegrey" :  "table-body"} key={item.sno}
            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell ></TableCell>
            <TableCell sx={{fontWeight:700}}>{item.desc}</TableCell>
            <TableCell ></TableCell>
            <TableCell  ></TableCell>
            <TableCell ></TableCell>
            <TableCell ></TableCell>
            <TableCell ></TableCell>
            <TableCell ></TableCell>
            <TableCell sx={{fontWeight:700}}>{item.amount}</TableCell>
       </TableRow>
          ))} */}
            <TableRow className="table-total" key="2"
            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell></TableCell>
              <TableCell sx={{ fontSize: 18, fontWeight: 700 }} >Total</TableCell>
              <TableCell ></TableCell>
              <TableCell  ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell sx={{ fontSize: 18, fontWeight: 700 }} className="table-amount">₹{Intl.NumberFormat("en-IN", digit2options).format(tabledetails.totalamt)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>


      </TableContainer>

    </Paper >
    <div className="tabletotal-final ">
      <div className="tabletotal-final word" >
        Total Amount Chargeable  (in words):
        <div className="words">
          {tabledetails.totalamtwords}
        </div>
      </div>
      {/* <div className="tabletotal-final amount ">
          {tabledetails.totalamt}
            </div> */}
    </div>

    {tabledetails.displayhsntable &&
      <>
        <Paper sx={{ width: '98%', overflow: 'hidden', padding: '5px', borderRadius: '10px' }}>
          <TableContainer sx={{ minWidth: 650, borderRadius: '10px' }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow className="table-header">
                  <TableCell sx={{ fontWeight: 700 }}>S.No</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>HSN/SAC</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Taxable Value </TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Central Tax Rate %</TableCell>
                  {/* <TableCell sx={{fontWeight:700}}>Rate</TableCell> */}
                  <TableCell sx={{ fontWeight: 700 }}>Central Tax Amount</TableCell>

                  <TableCell sx={{ fontWeight: 700 }}>State Tax Rate %</TableCell>

                  <TableCell sx={{ fontWeight: 700 }}>State Tax Amount</TableCell>

                  <TableCell sx={{ fontWeight: 700 }}>Total Tax Amount (₹)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tabledetails.hsnlist.map((item, key) => (
                  <TableRow className={item.sno % 2 === 0 ? "table-body tablegrey" : "table-body"} key={item.sno}
                  // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="table-header-td">{key + 1}</TableCell>
                    <TableCell className="table-header-td">{item.hsndesc}</TableCell>
                    <TableCell className="table-header-td">{Intl.NumberFormat("en-IN", digit2options).format(item.taxvalue)}</TableCell>
                    <TableCell className="table-header-td">{item.ctrate}</TableCell>
                    <TableCell className="table-header-td">{Intl.NumberFormat("en-IN", digit2options).format(item.ctamount)}</TableCell>
                    <TableCell className="table-header-td">{item.strate}</TableCell>
                    <TableCell className="table-header-td">{Intl.NumberFormat("en-IN", digit2options).format(item.stamount)}</TableCell>
                    <TableCell className="table-header-td">{Intl.NumberFormat("en-IN", digit2options).format(item.amount)}</TableCell>
                  </TableRow>
                ))}

                {tabledetails.otherchargedetail.map((item, key) => {
                  return (
                    <>
                      {item.ischargedinhsn &&

                        <TableRow className={key % 2 === 0 ? "table-body tablegrey" : "table-body"} key={item.id}
                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell></TableCell>
                          <TableCell>{item.otheritemdesc}</TableCell>
                          <TableCell >{Intl.NumberFormat("en-IN", digit2options).format(item.otherdesctaxamt)}</TableCell>
                          <TableCell >{item.ctrate}</TableCell>
                          <TableCell >{Intl.NumberFormat("en-IN", digit2options).format(item.ctamount)}</TableCell>
                          <TableCell >{item.strate}</TableCell>
                          <TableCell >{Intl.NumberFormat("en-IN", digit2options).format(item.stamount)}</TableCell>
                          <TableCell>{Intl.NumberFormat("en-IN", digit2options).format(item.otherdescamt)}</TableCell>
                        </TableRow>}
                    </>
                  )
                }
                )}

                <TableRow className="table-total " key="1"
                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell ></TableCell>
                  <TableCell sx={{ fontSize: 18, fontWeight: 700 }}>Total</TableCell>
                  <TableCell sx={{ fontSize: 18, fontWeight: 700 }}>{Intl.NumberFormat("en-IN", digit2options).format(tabledetails.totaltaxvalueamt)}</TableCell>
                  <TableCell ></TableCell>
                  <TableCell sx={{ fontSize: 18, fontWeight: 700 }}>{Intl.NumberFormat("en-IN", digit2options).format(tabledetails.totalcentaxamt)}</TableCell>
                  <TableCell ></TableCell>
                  <TableCell sx={{ fontSize: 18, fontWeight: 700 }}>{Intl.NumberFormat("en-IN", digit2options).format(tabledetails.totalstatetaxamt)}</TableCell>
                  <TableCell sx={{ fontSize: 18, fontWeight: 700 }}>₹{Intl.NumberFormat("en-IN", digit2options).format(tabledetails.totalhsnamt)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper >
        <div className="tabletotal-final ">
          <div className="tabletotal-final word" >
            Tax Amount (in words):
            <div >

            </div>
            <div className="words">
              {tabledetails.totalhsnamtwords}
            </div>
          </div>
          {/* <div className="tabletotal-final amount ">
          {tabledetails.totalhsnamt}
            </div> */}
        </div>
      </>}

  </>
}

export default Tables;