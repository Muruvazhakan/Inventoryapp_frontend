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
import './StockTable.css';

import { Stocks } from "../../Context/StocksContex";

const StockTable = (props) => {

    const tabledetails = useContext(Stocks);
    const digit2options = { maximumFractionDigits: 2 }

    return <>

        <Paper sx={{ width: '98%', overflow: 'hidden', padding: '5px', borderRadius: '10px',marginTop:"10px" }}>
            <TableContainer sx={{ minWidth: 650, borderRadius: '10px' }}>
                <Table aria-label="simple table">
                    <TableHead sx={{ fontWeight: 1130, color: "white" }}>
                        <TableRow className="table-header">
                            <TableCell sx={{ fontWeight: 700 }}>S.No</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Description of Goods </TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Quantity</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Purchace Rate</TableCell>
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
                                    <TableCell align='center' className="table-header-td">{item.quantity}</TableCell>
                                    <TableCell className="table-header-td">{item.rate}</TableCell>
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

                        <TableRow className="table-total" key="2"
                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell></TableCell>
                            <TableCell sx={{ fontSize: 18, fontWeight: 700 }} >Total</TableCell>
                            <TableCell ></TableCell>
                            <TableCell ></TableCell>
                            <TableCell sx={{ fontSize: 18, fontWeight: 700 }} className="table-amount">₹{Intl.NumberFormat("en-IN", digit2options).format(tabledetails.totalamt)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>


            </TableContainer>

        </Paper >
    </>
}

export default StockTable;