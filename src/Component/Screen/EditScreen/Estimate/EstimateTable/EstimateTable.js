import React, { useContext, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

import './EstimateTable.css';

import { estimateState } from "../../../../Context/EstimatestateContext";


const EstimateTable = (props) => {
    // const estdetail = useContext(estimateState);
    const estdetail = useContext(estimateState);
    const digit2options = {  maximumFractionDigits: 2   }   
    const digit3options = {  maximumFractionDigits: 3   } 
   

    useEffect(() => {
        // console.log('estdetail.columns[8].values');
        // console.log(props);
        // console.log('from screen' +props.fromscreen);

        // console.log(estdetail.columns);
        // let upvcisisvisible = estdetail.columns.map(item =>item.columnname==='UPVC cost Psf')
        // console.log(upvcisisvisible); 
       
    }, [])
    let pvcisisvisible = estdetail.columns[6];
    let upvcisisvisible = estdetail.columns[8];
    let woodisisvisible = estdetail.columns[10];
    let remarks = estdetail.columns[12];

    return <>
        <Paper sx={{ width: '98%', overflow: 'hidden', padding: '5px', borderRadius: '10px' }}>
            <TableContainer sx={{ minWidth: 650, borderRadius: '10px' }} containerId="EstimateTable" >
                <Table aria-label="simple table">
                    <TableHead sx={{ fontWeight: 1130, color: "white" }}>
                        <TableRow className="table-header" key="estimatetable" >

                            {estdetail.columns.map((item, index) => {

                                return (<>
                                    {item.display === true && item.columnname !== 'Area' &&
                                        <TableCell sx={{ fontWeight: 700 }} align='center' >{item.columnname}</TableCell>
                                    }

                                </>)
                            })}
                            {props.screen === "update" &&
                                <>
                                    <TableCell sx={{ fontWeight: 700 }} >Order

                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} >Edit rows

                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} >Delete rows

                                    </TableCell>
                                </>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {estdetail.rows.map((item, index) => {

                            // if (props.screen ==='update'  ){
                            //     upvcisisvisible.display = true;
                            //     woodisisvisible.display = true;
                            //     remarks.display = true;
                            // };

                            return (<>

                                <TableRow className={"table-body tableblue"} key={item.id}
                                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align='center' sx={{ fontWeight: 700 }}>{index + 1}</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 700 }}>{item.title}</TableCell>
                                    <TableCell ></TableCell>
                                    <TableCell ></TableCell>
                                    <TableCell ></TableCell>
                                    {/* <TableCell ></TableCell> */}
                                    {pvcisisvisible.display === true && <>
                                        <TableCell ></TableCell>
                                        <TableCell ></TableCell></>}
                                    {upvcisisvisible.display === true && <>
                                        <TableCell ></TableCell>
                                        <TableCell ></TableCell></>}
                                    {woodisisvisible.display === true &&
                                        <>
                                            <TableCell ></TableCell>
                                            <TableCell ></TableCell></>}
                                    {remarks.display === true &&
                                        <TableCell ></TableCell>}
                                    {props.screen === "update" &&
                                        <TableCell align='center' sx={{ fontWeight: 700 }} >{item.orderno}</TableCell>}
                                </TableRow>
                                {item.values.map((subitem, subindex) => {
                                    var chr = String.fromCharCode(97 + subindex);

                                    return (
                                        <TableRow className={subindex.index % 2 === 0 ? "table-body tablegrey" : "table-body"} key={subindex + 1000}>
                                            <TableCell align='center' >{chr}</TableCell>
                                            <TableCell align='center' >{subitem.desc}</TableCell>
                                            {((subitem.hideotheritem && subitem.isotheritem) || (subitem.length <= 0)) ? <TableCell ></TableCell> :
                                                <TableCell align='center' >{subitem.length}</TableCell>}
                                            {(subitem.hideotheritem && subitem.isotheritem) || (subitem.height <= 0) ? <TableCell ></TableCell> :
                                                <TableCell align='center' >{subitem.height}</TableCell>}
                                            {/* { ((subitem.hideotheritem && subitem.isotheritem) || (subitem.area <=0)) ? <TableCell ></TableCell> :
                                                <TableCell align='center' >{subitem.area}</TableCell>} */}
                                            {((subitem.hideotheritem && subitem.isotheritem)) || (subitem.perqsft <= 0) ? <TableCell ></TableCell> :
                                                <TableCell align='center' >{Intl.NumberFormat("en-IN",digit2options).format(subitem.perqsft)}</TableCell>}
                                            {pvcisisvisible.display === true && <>
                                                <TableCell align='center' >{subitem.pvccostpsf > 0 ? Intl.NumberFormat("en-IN",digit2options).format(subitem.pvccostpsf) : '-'}</TableCell>
                                                <TableCell align='center' >{subitem.totalpvccost>0? Intl.NumberFormat("en-IN",digit2options).format(subitem.totalpvccost) :'-'}</TableCell></>}
                                            {upvcisisvisible.display === true && <>
                                                <TableCell align='center' >{subitem.upvccostpsf>0? Intl.NumberFormat("en-IN",digit3options).format(subitem.upvccostpsf) : '-'}</TableCell>
                                                <TableCell align='center' >{subitem.totalupvccost>0? Intl.NumberFormat("en-IN",digit2options).format(subitem.totalupvccost) : '-'}</TableCell></>}
                                            {woodisisvisible.display === true &&
                                                <>
                                                    <TableCell align='center' >{subitem.woodcostpsf>0? Intl.NumberFormat("en-IN",digit3options).format(subitem.woodcostpsf) : '-'}</TableCell>
                                                    <TableCell align='center' >{subitem.totalwoodcost>0? Intl.NumberFormat("en-IN",digit2options).format(subitem.totalwoodcost) : '-'}</TableCell></>}
                                            {remarks.display === true &&
                                                <TableCell align='center' >{subindex.remarks}</TableCell>}

                                            {props.screen === "update" &&
                                                <>
                                                    <TableCell ></TableCell>
                                                    <TableCell className="table-edit" onClick={() => estdetail.addOrUpdateEstimateItemHandler(item.id, subitem, "update")} >

                                                        <FiEdit size={18} />

                                                    </TableCell>
                                                    <TableCell className="table-edit" onClick={() => estdetail.addOrUpdateEstimateItemHandler(item.id, subitem, "delete")} >

                                                        <MdDelete size={18} />

                                                    </TableCell>
                                                </>}
                                        </TableRow>
                                    )
                                })}
                                <TableRow className={"table-body tablegrey"} key={item.sumtotalpvscost * Math.round}>
                                    <TableCell ></TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 700 }}> Total</TableCell>
                                    <TableCell ></TableCell>
                                    {/* <TableCell ></TableCell> */}
                                    <TableCell ></TableCell>
                                    <TableCell align='center'>{Intl.NumberFormat("en-IN",digit3options).format(item.sumtotalsqft)}</TableCell>
                                    {pvcisisvisible.display === true && <>
                                        <TableCell></TableCell>
                                        <TableCell align='center'>{item.sumtotalpvccost>0? Intl.NumberFormat("en-IN",digit2options).format(item.sumtotalpvccost) : '-'}</TableCell></>}
                                    {upvcisisvisible.display === true && <>
                                        <TableCell ></TableCell>
                                        <TableCell align='center'>{item.sumtotalupvccost>0? Intl.NumberFormat("en-IN",digit2options).format(item.sumtotalupvccost) : '-'}</TableCell></>}
                                    {woodisisvisible.display === true &&
                                        <>
                                            <TableCell ></TableCell>
                                            <TableCell align='center'>{item.sumtotalwoodcost>0? Intl.NumberFormat("en-IN",digit2options).format(item.sumtotalwoodcost) : '-'}</TableCell></>}
                                    {remarks.display === true &&
                                        <TableCell ></TableCell>}

                                </TableRow>

                            </>
                            )
                        })}
                        <TableRow className={"table-body tabledis"}>
                            <TableCell ></TableCell>
                            <TableCell align='center' sx={{ fontWeight: 700 }}>Grand Total</TableCell>
                            <TableCell ></TableCell>
                            <TableCell ></TableCell>
                            {/* <TableCell ></TableCell> */}

                            <TableCell align='center' sx={{ fontWeight: 700 }}>{Intl.NumberFormat("en-IN",digit3options).format(estdetail.granttotalsqft)}</TableCell>
                            {pvcisisvisible.display === true && <>
                                <TableCell ></TableCell>
                                <TableCell align='center' sx={{ fontWeight: 700 }}>{estdetail.grandtotalpvccost>0? Intl.NumberFormat("en-IN",digit2options).format(estdetail.grandtotalpvccost) : '-'}</TableCell></>}
                            {upvcisisvisible.display === true && <>
                                <TableCell ></TableCell>
                                <TableCell align='center' sx={{ fontWeight: 700 }}>{estdetail.grandtotalupvccost>0? Intl.NumberFormat("en-IN",digit2options).format(estdetail.grandtotalupvccost) : '-'}</TableCell></>}
                            {woodisisvisible.display === true &&
                                <>
                                    <TableCell ></TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 700 }}>{estdetail.grandtotalwoodcost>0? Intl.NumberFormat("en-IN",digit2options).format(estdetail.grandtotalwoodcost) : '-'}</TableCell></>}
                            {remarks.display === true &&
                                <TableCell ></TableCell>}

                        </TableRow>
                        {estdetail.discountedcheck &&
                            <TableRow className={"table-body  tableyellow"}>
                                <TableCell ></TableCell>
                                <TableCell align='center' sx={{ fontWeight: 700 }}>{estdetail.discountedText}</TableCell>
                                <TableCell ></TableCell>
                                <TableCell ></TableCell>
                                {/* <TableCell ></TableCell> */}

                                <TableCell align='center' sx={{ fontWeight: 700 }}>{Intl.NumberFormat("en-IN",digit3options).format(estdetail.granttotalsqft)}</TableCell>
                                {pvcisisvisible.display === true && <>
                                    <TableCell ></TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 700 }}>{estdetail.discountedTotalpvccost>0? Intl.NumberFormat("en-IN",digit2options).format(estdetail.discountedTotalpvccost) : '-'}</TableCell></>}
                                {upvcisisvisible.display === true && <>
                                    <TableCell ></TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 700 }}>{estdetail.discountedTotalupvccost>0? Intl.NumberFormat("en-IN",digit2options).format(estdetail.discountedTotalupvccost) : '-'}</TableCell></>}
                                {woodisisvisible.display === true &&
                                    <>
                                        <TableCell ></TableCell>
                                        <TableCell align='center' sx={{ fontWeight: 700 }}>{estdetail.discountedTotalwoodcost>0?  Intl.NumberFormat("en-IN",digit2options).format(estdetail.discountedTotalwoodcost)  : '-'}</TableCell></>}
                                {remarks.display === true &&
                                    <TableCell ></TableCell>}

                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    </>

};

export default EstimateTable;