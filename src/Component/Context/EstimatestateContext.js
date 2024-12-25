import React, { useState, useEffect, createContext } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import collect from "collect.js";
import * as XLSX from "xlsx";
import * as localstorage from '../Context/localStorageData';
import * as estimateDetailsDb from '../DBconnection/estimateDetailsDB';
import { isbackendconnect } from "../DBconnection/dbproperties";

// import { CompanyDetail } from "./companyDetailContext";
export const estimateState = createContext();

const EstimatestateContext = ({ children }) => {
    // const [width] = useState(641);
    // const companydet = useContext(CompanyDetail);
    let columnNames = [{ columnname: 'S.no', display: true, cnmae: 'other' }
        , { columnname: 'Description', display: true, cnmae: 'other' }
        , { columnname: 'Length', display: true, cnmae: 'other' }
        , { columnname: 'Height', display: true, cnmae: 'other' }
        , { columnname: 'Area', display: true, cnmae: 'other' }
        , { columnname: 'Total sq.ft', display: true, cnmae: 'other' }
        , { columnname: 'PVC cost Psf', display: true, cnmae: 'pvc' }
        , { columnname: 'Total PVC Cost', display: true, cnmae: 'pvc' }
        , { columnname: 'UPVC cost Psf', display: true, cnmae: 'upvc' }
        , { columnname: 'Total UPVC Cost', display: true, cnmae: 'upvc' }
        , { columnname: 'Wood cost Psf', display: true, cnmae: 'wood' }
        , { columnname: 'Total Wood Cost', display: true, cnmae: 'wood' }
        , { columnname: 'Remarks', display: false, cnmae: 'other' }];

    const [columns, setcolumns] = useState(columnNames);
    const [granttotalsqft, setgranttotalsqft] = useState(0);
    const [grandtotalpvccost, setgrandtotalpvccost] = useState(0);
    const [grandtotalupvccost, setgrandtotalupvccost] = useState(0);
    const [grandtotalwoodcost, setgrandtotalwoodcost] = useState(0);
    const [isNewDataSaveType, setisNewDataSaveType] = useState(true);
    const [orderno, setorderno] = useState(0);

    // let row = [{
    //     id: 1123, title: 'MODULAR KITCHEN', values: [{
    //         subid: 1, desc: '1', length: '1', height: '1', area: '1',
    //         perqsft: 1, pvccostpsf: 0, totalpvccost: 0, upvccostpsf: 0, totalupvccost: 0, woodcostpsf: 0, totalwoodcost: 0, remarks: ''
    //     }, {
    //         subid: 2, desc: '2', length: '1', height: '1', area: '1',
    //         perqsft: 1, pvccostpsf: 0, totalpvccost: 0, upvccostpsf: 0, totalupvccost: 0, woodcostpsf: 0, totalwoodcost: 0, remarks: ''
    //     }
    //     ],
    //     sumtotalpvscost: 0, sumtotalupvscost: 0, sumtotalwoodcost: 0
    // }, {
    //     title: 'KITCHEN', values: [{
    //         desc: '2', length: '1', height: '1', area: '1',
    //         perqsft: 1, pvccostpsf: 0, totalpvccost: 0, upvccostpsf: 0, totalupvccost: 0, woodcostpsf: 0, totalwoodcost: 0, remarks: ''
    //     }],
    //     sumtotalpvscost: 0, sumtotalupvscost: 0, sumtotalwoodcost: 0
    // }
    // ];
    const [rows, setrows] = useState([]);

    const [title, settitle] = useState('');
    const [subdesc, setsubdesc] = useState('');
    const [length, setlength] = useState(1);
    const [height, setheight] = useState(1);
    const [area, setarea] = useState(1);
    const [perqsft, setperqsft] = useState(1);
    const [isotheritem, setisotheritem] = useState(false);
    const [hideotheritem, sethideotheritem] = useState(false);
    const [pvccostpsf, setpvccostpsf] = useState(0);
    const [totalpvccost, settotalpvccost] = useState(0);
    const [upvccostpsf, setupvccostpsf] = useState(0);
    const [totalupvccost, settotalupvccost] = useState(0);
    const [woodcostpsf, setwoodcostpsf] = useState(0);
    const [totalwoodcost, settotalwoodcost] = useState(0);
    const [remarks, setremarks] = useState('');
    const [estimateHistoryData, setestimateHistoryData] = useState(null);
    const [estimateHistroyUpdateFlag, setestimateHistroyUpdateFlag] = useState(false);
    const [estimateSingleData, setestimateSingleData] = useState(null);

    const [discountedcheck, setdiscountedcheck] = useState(false);
    const [discountedText, setdiscountedText] = useState('');
    const [discountedTotalpvccost, setdiscountedTotalpvccost] = useState(0);
    const [discountedTotalupvccost, setdiscountedTotalupvccost] = useState(0);
    const [discountedTotalwoodcost, setdiscountedTotalwoodcost] = useState(0);

    const [estimateid, setestimateid] = useState('');
    const [estimateidcount, setestimateidcount] = useState(1000);
    const [estimatedate, setestimatedate] = useState('');
    const [estimatedate1, setestimatedate1] = useState('');
    const [clientName, setclientName] = useState('');
    const [clientPhno, setclientPhno] = useState('');
    const [clientAdd, setclientAdd] = useState('');
    const [isloaded, setisloaded] = useState(true);

    const setval = (e, fun) => {
        fun(e.target.value);
    }

    const setboxColors = (item, field) => {
        if (field === 'color') {
            return item.length === 0 || item === 0 ? 'error' : 'success';
        }

        else {
            return item.length === 0 || item === 0 ? true : false;
        }

    }

    const saveEstimationDetailCounter = async (estimateidcount, loginuserid) => {
        localstorage.addOrGetEstimateid(estimateidcount, "save");
        console.log(estimateidcount + 'estimateidcount');
        let responsesaveEstimationId;
        if (isbackendconnect) {

            responsesaveEstimationId = await estimateDetailsDb.saveEstimationId(estimateidcount, loginuserid);

        }
        console.log(responsesaveEstimationId);
    }
    const addOrGetEstimateHistoryData = async () => {

        if (estimateid === '' || estimateid === null) {
            toast.error('Estimate Id is not generates');
            return false;
        }
        let iscontains = false;
        setestimateHistroyUpdateFlag(true);

        let loginuserid = localstorage.addOrGetUserdetail('', 'userid', 'get');
        saveEstimationDetailCounter(estimateidcount, loginuserid);

        let singleEstimation = {
            userid: loginuserid,
            estimateid: estimateid,
            estimatedate: estimatedate,
            estimatedate1: estimatedate1,
            clientName: clientName,
            clientPhno: clientPhno,
            clientAdd: clientAdd,
            rows: rows,
            columns: columns,
            granttotalsqft: granttotalsqft,
            grandtotalpvccost: grandtotalpvccost,
            grandtotalupvccost: grandtotalupvccost,
            grandtotalwoodcost: grandtotalwoodcost,
            discountedcheck: discountedcheck,
            discountedText: discountedText,
            discountedTotalpvccost: discountedTotalpvccost,
            discountedTotalupvccost: discountedTotalupvccost,
            discountedTotalwoodcost: discountedTotalwoodcost,
            // companytermsandcondition:companydet.companydetails,
            // companybankdet:companydet.companyBankdetails,
            iscontains: true,
        }
        // let [getvalue] = estimateHistoryData;


        // console.log('estimateHistoryData');
        // console.log(estimateHistoryData);
        // console.log('singleEstimation');
        // console.log(singleEstimation);
        if (estimateHistoryData !== null) {
            estimateHistoryData.map((item) => {
                if (item.estimateid === estimateid) {
                    item.estimatedate = estimatedate;
                    item.estimatedate1 = estimatedate1;
                    item.clientName = clientName;
                    item.clientPhno = clientPhno;
                    item.clientAdd = clientAdd;
                    item.rows = rows;
                    item.columns = columns;
                    item.granttotalsqft = granttotalsqft;
                    item.grandtotalpvccost = grandtotalpvccost;
                    item.grandtotalupvccost = grandtotalupvccost;
                    item.grandtotalwoodcost = grandtotalwoodcost;

                    item.discountedcheck = discountedcheck;
                    item.discountedText = discountedText;
                    item.discountedTotalpvccost = discountedTotalpvccost;
                    item.discountedTotalupvccost = discountedTotalupvccost;
                    item.discountedTotalwoodcost = discountedTotalwoodcost;
                    iscontains = true;
                    // item.companytermsandcondition=companydet.companydetails;
                    // item.companybankdet=companydet.companyBankdetails;

                }
                return item;
            });
            if (iscontains === false) {
                setestimateHistoryData([
                    ...estimateHistoryData, singleEstimation
                ]);
                toast.success('Estimate Details are added');
            }
            else {
                toast.success('Estimate Details are updated');
            }
            // console.log('estimateHistoryData');
            // console.log(estimateHistoryData);

        } else {
            // console.log('inside else');
            setestimateHistoryData([
                singleEstimation
            ]);
        }
        updateestimateDB(singleEstimation);
        // localstorage.addOrGetEstimateHistoryData(estimateHistoryData, "save");


        // toast.success('Estimate Details are added');


    }

    const updateestimateDB = async (data) => {

        let loginuserid = localstorage.addOrGetUserdetail('', 'userid', 'get');
        if (isbackendconnect) {
            setisloaded(false);
            let storedataindb = await estimateDetailsDb.saveEstimateDB(data, loginuserid);

            //console.log(storedataindb);
            if (storedataindb.status !== 200 || storedataindb.data !== 'estimation saved') {
                toast.error('Error in saving Estimate Details in DB');
            }
            setisloaded(true);
        }
        setestimateHistroyUpdateFlag(false);

    }

    const addOrUpdateEstimateItemHandler = (inputitem, inputsubitem, type) => {
        // console.log('item edit rows')
        // console.log(inputsubitem);

        if (type === 'New') {
            if (!title || !subdesc || Number(orderno) === 0) {
                toast.error("Title or Sub Details or orderno was not added");
                return false
            }
            const available = rows.filter((item) => {
                return item.title === title;
            });
            const other = rows.filter((item) => {
                return item.title !== title;
            });
            //console.log('available');
            //console.log(available);
            //console.log('other');
            //console.log(other);

            if (available.length > 0) {
                // console.log(available[0]);         
                let exitsingleestimatevalue1 = {
                    subid: uuidv4(), desc: subdesc, length: length, height: height, area: area,
                    perqsft: perqsft, pvccostpsf: pvccostpsf, totalpvccost: totalpvccost, upvccostpsf: upvccostpsf, isotheritem: isotheritem, hideotheritem: hideotheritem,
                    totalupvccost: totalupvccost, woodcostpsf: woodcostpsf, totalwoodcost: totalwoodcost, remarks: remarks
                };

                available[0] = {
                    id: available[0].id,
                    title: title,
                    orderno: orderno,
                    sumtotalpvccost: calculatetotal(available[0].sumtotalpvccost, totalpvccost, 'sum', 2),
                    sumtotalupvccost: calculatetotal(available[0].sumtotalupvccost, totalupvccost, 'sum', 2),
                    sumtotalwoodcost: calculatetotal(available[0].sumtotalwoodcost, totalwoodcost, 'sum', 2),
                    sumtotalsqft: calculatetotal(available[0].sumtotalsqft, perqsft, 'sum', 3),
                    discountedcheck: discountedcheck, discountedText: discountedText, discountedTotalupvccost: discountedTotalupvccost, discountedTotalpvccost: discountedTotalpvccost,
                    discountedTotalwoodcost: discountedTotalwoodcost,
                    values: [...available[0].values, exitsingleestimatevalue1]
                };

                // console.log('exitsingleestimatevalue2');
                // console.log(available);
                // available[0].values = values+ exitsingleestimatevalue;
                // console.log(available);
                if (other.length > 0) {
                    setrows([
                        ...other,
                        available[0]
                    ]);
                } else {
                    setrows([
                        available[0]
                    ]);
                }

            }
            else {
                // console.log('not ava');
                let singleestimate = {
                    id: uuidv4(),
                    title: title,
                    orderno: orderno,
                    sumtotalpvccost: totalpvccost, sumtotalupvccost: totalupvccost, sumtotalwoodcost: totalwoodcost,
                    discountedcheck: discountedcheck, discountedText: discountedText, discountedTotalupvccost: discountedTotalupvccost, discountedTotalpvccost: discountedTotalpvccost,
                    discountedTotalwoodcost: discountedTotalwoodcost,
                    sumtotalsqft: perqsft,
                    values: [{
                        subid: uuidv4(), desc: subdesc, length: length, height: height, area: area, isotheritem: isotheritem, hideotheritem: hideotheritem,
                        perqsft: perqsft, pvccostpsf: pvccostpsf, totalpvccost: totalpvccost, upvccostpsf: upvccostpsf, totalupvccost: totalupvccost, woodcostpsf: woodcostpsf, totalwoodcost: totalwoodcost, remarks: remarks
                    }]
                };
                setrows([
                    ...rows,
                    singleestimate
                ]);
                // console.log(singleestimate)
                // console.log(rows)
            }
            toast.success("Estimation Item Added");
        }
        // else if (type === 'delete') {
        //     const available1 = rows.filter((item) => {
        //         return item.id === inputitem;
        //     });
        //     const other1 = rows.filter((item) => {
        //         return item.id !== inputitem;
        //     });

        //     if (available1.length > 0) {
        //         const subtableava = available1[0].values.filter((subitem) => {
        //             return subitem.subid === inputsubitem.subid
        //         });
        //         const othersubtableava = available1[0].values.filter((subitem) => {
        //             return subitem.subid !== inputsubitem.subid
        //         });

        //         if (othersubtableava.length > 0) {

        //         } else {
        //             if (other1.length > 0) {
        //                 setrows([
        //                     ...other1
        //                 ]);
        //             }
        //             else {
        //                 setrows([]);
        //                 cleartotal();
        //             }
        //         }

        //         let newrows=[];
        //         let a=0,b=0;
        //         for(let i=0;i<rows.length;i++){
        //             console.log('rows '+i);
        //             console.log(rows[i]);
        //             for(let j=0;j<rows[i].values.length  ;j++){
        //                 console.log('rows[i].values[j] : ' + j);
        //                 console.log(rows[i].values[j]);
        //                 if(rows[i].values[j].subid !==inputsubitem.subid){
        //                     console.log('found ' + inputsubitem.subid);
        //                     newrows[a]=rows[i];
        //                     b++;
        //                 }
        //             }
        //             a++
        //         }
        //         console.log('newrows ');
        //         console.log(newrows);
        //         // let alterrows = rows.filter((item,index) =>{
        //         //    return item.values[index].subid !==inputsubitem.subid;
        //         //     // console.log(item);
        //         //     // console.log(item.values
        //         //     // );
        //         //     // if(item.values[index].subid ===inputsubitem.subid ){
        //         //     //     console.log('inside ' +inputsubitem.subid);
        //         //     // }
        //         // })
        //         // console.log('alterrows');
        //         // console.log(alterrows);

        //     }


        //     toast.warning("Estimation Item Deleted");
        // }
        else {
            const available1 = rows.filter((item) => {
                return item.id === inputitem;
            });
            const other1 = rows.filter((item) => {
                return item.id !== inputitem;
            });
            if (available1.length > 0) {
                const subtableava = available1[0].values.filter((subitem) => {
                    return subitem.subid === inputsubitem.subid
                });
                const othersubtableava = available1[0].values.filter((subitem) => {
                    return subitem.subid !== inputsubitem.subid
                });

                // console.log(available1[0].orderno);

                if (type === 'update') {
                    settitle(available1[0].title);
                    setorderno(available1[0].orderno);
                    setsubdesc(subtableava[0].desc);
                    setlength(subtableava[0].length);
                    setheight(subtableava[0].height);
                    setarea(subtableava[0].area);
                    setperqsft(subtableava[0].perqsft);
                    setpvccostpsf(subtableava[0].pvccostpsf);
                    settotalpvccost(subtableava[0].totalpvccost);
                    setupvccostpsf(subtableava[0].upvccostpsf);
                    settotalupvccost(subtableava[0].totalupvccost);
                    setwoodcostpsf(subtableava[0].woodcostpsf);
                    settotalwoodcost(subtableava[0].totalwoodcost);
                    setremarks(subtableava[0].remarks);

                    setisotheritem(subtableava[0].isotheritem);
                    sethideotheritem(subtableava[0].hideotheritem);
                    toast.info("Estimation Item is added in edit section");
                }
                else {
                    toast.warning("Estimation Item Deleted");
                }
                if (othersubtableava.length > 0) {

                    available1[0] = {
                        id: available1[0].id,
                        title: available1[0].title,
                        orderno: available1[0].orderno,
                        sumtotalpvccost: calculatetotal(available1[0].sumtotalpvccost, subtableava[0].totalpvccost, 'diff', 2),
                        sumtotalupvccost: calculatetotal(available1[0].sumtotalupvccost, subtableava[0].totalupvccost, 'diff', 2),
                        sumtotalwoodcost: calculatetotal(available1[0].sumtotalwoodcost, subtableava[0].totalwoodcost, 'diff', 2),
                        sumtotalsqft: calculatetotal(available1[0].sumtotalsqft, subtableava[0].perqsft, 'diff', 3),

                        values: [...othersubtableava]
                    };
                    if (other1.length > 0) {
                        setrows([
                            ...other1,
                            available1[0]
                        ]);
                        // const sortedrows = rows.sort((a,b)=> a.orderno >b.orderno ? 1:-1);
                        // console.log('sortedrow');
                        // console.log(sortedrows);
                        // setrows(sortedrows);

                    }
                    else {
                        setrows([
                            available1[0]
                        ]);
                    }

                } else {
                    if (other1.length > 0) {
                        setrows([
                            ...other1
                        ]);
                    }
                    else {
                        setrows([]);
                        cleartotal();
                    }
                }

            }
        }


    };

    const handleExportXlsx = () => {

        let filtercolumn = estimateHistoryData.map(data => {
            return {
                Estimate_id: data.estimateid,
                Estimate_date: data.estimatedate,
                Client_Name: data.clientName,
                Client_PhoneNo: data.clientPhno,
                Client_Address: data.clientAdd,
                Granttotalsqft: data.granttotalsqft,
                Grandtotalpvccost: data.grandtotalpvccost,
                Grand_totalupvccost: data.grandtotalupvccost,
                Grand_totalwoodcost: data.grandtotalwoodcost,
                Discounted_Text: data.discountedText,
                Discounted_Totalpvccost: data.discountedTotalpvccost,
                Discounted_Totalupvccost: data.discountedTotalupvccost,
                Discounted_Totalwoodcost: data.discountedTotalwoodcost,
            }
        })
        console.log(filtercolumn);
        // console.log(estimateHistoryData);
        // console.log(estimateHistoryData.length);
        var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(filtercolumn);

        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        let date = (new Date());
        console.log(date);
        var estimatedDate =
            date.getDate() + "_" + date.getMonth() + "_" + date.getFullYear();
        XLSX.writeFile(wb, `MyEstimation_${estimatedDate}.xlsx`);
    }
    const sortorder = () => {
        const sortedrows = rows.sort((a, b) => a.orderno > b.orderno ? 1 : -1);
        // console.log('sortedrow');
        // console.log(sortedrows);
        setrows(sortedrows);
    }

    const cleartotal = () => {
        setgrandtotalpvccost(0);
        setgrandtotalupvccost(0);
        setgrandtotalwoodcost(0);
    }

    const cleartallEstimateotal = () => {

        setclientAdd('');
        setclientName('');
        setclientPhno('');
        setestimatedate('');
        setestimatedate1('');
        setgrandtotalpvccost(0);
        setgrandtotalupvccost(0);
        setgrandtotalwoodcost(0);
        setgranttotalsqft(0);
        setestimateid('')
        settitle('');
        setorderno(1);
        setsubdesc('');
        setlength(1);
        setheight(1);
        setarea(1);
        setperqsft(1);
        setpvccostpsf(0);
        settotalpvccost(0);
        setupvccostpsf(0);
        settotalupvccost(0);
        setwoodcostpsf(0);
        settotalwoodcost(0);
        setremarks('');
        setrows([]);
        setisotheritem(false);
        sethideotheritem(false);
        setdiscountedcheck(false);
        setdiscountedTotalupvccost(0);
        setdiscountedTotalpvccost(0);
        setdiscountedTotalwoodcost(0);
        toast.success('Estimate details are cleared in this screen');
    }

    const calculatetotal = (initalval, statevalue, type, fix) => {
        if (type === 'sum') {
            return ((initalval) * 1 + (statevalue) * 1).toFixed(fix);
        }
        else {
            return ((initalval) * 1 - (statevalue) * 1).toFixed(fix);
        }
    };

    const calculateEstimateTotal = () => {
        if (rows.length > 0) {
            const totalpvc = rows.map((item) => item.sumtotalpvccost);
            const totalupvc = rows.map((item) => item.sumtotalupvccost);
            const totalwood = rows.map((item) => item.sumtotalwoodcost);
            const totalsqft = rows.map((item) => item.sumtotalsqft);
            setgrandtotalpvccost(collect(totalpvc).sum().toFixed(2));
            setgrandtotalupvccost(collect(totalupvc).sum().toFixed(2));
            setgrandtotalwoodcost(collect(totalwood).sum().toFixed(2));
            setgranttotalsqft(collect(totalsqft).sum().toFixed(3));
        }
        // grandtotalupvccost, setgrandtotalupvccost, grandtotalpvccost, setgrandtotalpvccost, grandtotalwoodcost, setgrandtotalwoodcost,
    };

    const dateHandler = () => {
        let today = new Date();
        let todaydate;

        let month = today.getMonth() + 1;
        let year = today.getFullYear();
        let date = today.getDate();


        todaydate = `ES${year}${month}${date}${estimateidcount}`;
        //console.log(typeof estimateidcount + " type of estimateidcount");

        setestimateid(todaydate);
        let count = estimateidcount * 1;

        setestimateidcount(++count);
        //console.log("todaydate: " + estimateidcount + '  ');
        localstorage.addOrGetUserdetail(++count, 'estimateidcount', 'save');
    }

    const specialItemHandler = () => {

        if (!isotheritem) {
            setlength(0);
            setheight(0);
            setperqsft(0);
        }
        setisotheritem(!isotheritem);


    };

    useEffect(() => {
        // //console.log('local Estimate history');

        // getAlldataFromDB();

        let count = localstorage.addOrGetEstimateid('', 'get');

        // let estimateid =  localstorage.addOrGetUserdetail(++count, 'estimateidcount', 'get');
        if (count !== null) {
            setestimateidcount(count);
        }


        // console.log(count + 'count');
    }, []);


    useEffect(() => {
        if (estimateHistoryData !== null) {
            localstorage.addOrGetEstimateHistoryData(estimateHistoryData, "save");
            // if (estimateHistroyUpdateFlag) {
            //     updateestimate(estimateHistoryData);
            // }
            console.log("localstorage: ");
            console.log(estimateHistoryData);
            //console.log(localstorage.addOrGetEstimateHistoryData(estimateHistoryData, "get"));
        }

    }, [estimateHistroyUpdateFlag]);

    useEffect(() => {
        calculateEstimateTotal();
        sortorder();
    }, [rows])

    useEffect(() => {
        let ar = (length * height).toFixed(3);
        // let psf = (ar / 144).toFixed(3);
        // setarea(ar);
        // let psf = (ar / 144).toFixed(3);
        setperqsft(ar);
    }, [length, height]);

    useEffect(() => {
        let costpvc = ((pvccostpsf * 1) * perqsft).toFixed(2);
        settotalpvccost(costpvc);
    }, [perqsft, pvccostpsf]);

    useEffect(() => {
        let costupvc = ((upvccostpsf * 1) * perqsft).toFixed(2);
        settotalupvccost(costupvc);
    }, [perqsft, upvccostpsf]);

    useEffect(() => {
        let costwood = ((woodcostpsf * 1) * perqsft).toFixed(2);

        settotalwoodcost(costwood);
    }, [perqsft, woodcostpsf]);

    // useEffect(()=>{
    //     console.log('columnNames'+columns[6]);

    //     console.log(columns);
    //     console.log(columns[6].display);
    // });

    const updateTableView = (cnames) => {
        // console.log(cnames);
        const getresul = columns.map((item) => {
            // console.log(item)
            if (item.cnmae === cnames) {
                item.display = !item.display;
            }
            return item;

        });
        // console.log(getresul);
        setcolumns(getresul);

        // if(props.columnname === 'Wood cost Psf'){

        // }
        // else if(props.columnname === 'UPVC cost Psf'){

        // }
        // else{

        // }
    };

    const allEstimateEdit = (props) => {
        // console.log(props);

        let estimatedetails = props;
        setgranttotalsqft(estimatedetails.granttotalsqft);
        setgrandtotalpvccost(estimatedetails.grandtotalpvccost);
        setgrandtotalupvccost(estimatedetails.grandtotalupvccost);
        setgrandtotalwoodcost(estimatedetails.grandtotalwoodcost);

        setrows(estimatedetails.rows);
        setclientName(estimatedetails.clientName);
        setclientPhno(estimatedetails.clientPhno);
        setclientAdd(estimatedetails.clientAdd);

        setestimateid(estimatedetails.estimateid);
        setestimatedate(estimatedetails.estimatedate);
        setestimatedate1(estimatedetails.estimatedate1);

        if (estimatedetails.columns.length > 0) {
            setcolumns(estimatedetails.columns);
        }
        else {
            setcolumns(columnNames);
        }
        if (estimatedetails.discountedcheck) {
            setdiscountedcheck(estimatedetails.discountedcheck);
            setdiscountedText(estimatedetails.discountedText)
            setdiscountedTotalupvccost(estimatedetails.discountedTotalupvccost);
            setdiscountedTotalpvccost(estimatedetails.discountedTotalpvccost);
            setdiscountedTotalwoodcost(estimatedetails.discountedTotalwoodcost);
        }
        else {
            setdiscountedcheck(false);
            setdiscountedText('');
            setdiscountedTotalupvccost(0);
            setdiscountedTotalpvccost(0);
            setdiscountedTotalwoodcost(0);
        }

    }
    const estcontext = {
        columns, setcolumns, rows, setrows, estimateidcount, setestimateidcount, granttotalsqft, setgranttotalsqft,
        clientName, setclientName, clientPhno, setclientPhno, clientAdd, setclientAdd, estimateid, setestimateid, estimatedate, setestimatedate,
        grandtotalupvccost, setgrandtotalupvccost, grandtotalpvccost, setgrandtotalpvccost, grandtotalwoodcost, setgrandtotalwoodcost,
        title, settitle, subdesc, setsubdesc, length, setlength, height, setheight, area, setarea, perqsft, setperqsft, isotheritem, setisotheritem, hideotheritem, sethideotheritem,
        pvccostpsf, setpvccostpsf, totalpvccost, settotalpvccost, upvccostpsf, setupvccostpsf, totalupvccost, settotalupvccost, woodcostpsf, setwoodcostpsf, totalwoodcost, settotalwoodcost,
        remarks, setremarks, addOrUpdateEstimateItemHandler, updateTableView, estimatedate1, setestimatedate1, estimateHistoryData, setestimateHistoryData, addOrGetEstimateHistoryData, dateHandler,
        estimateSingleData, setestimateSingleData, allEstimateEdit, isNewDataSaveType, setisNewDataSaveType, orderno, setorderno, setval, setboxColors, sortorder,
        estimateHistroyUpdateFlag, setestimateHistroyUpdateFlag, isloaded, setisloaded, cleartallEstimateotal, specialItemHandler, discountedcheck, setdiscountedcheck, discountedText, setdiscountedText,
        discountedTotalupvccost, setdiscountedTotalupvccost, discountedTotalpvccost, setdiscountedTotalpvccost, discountedTotalwoodcost, setdiscountedTotalwoodcost, handleExportXlsx
    };

    return <estimateState.Provider value={estcontext} >{children}</estimateState.Provider>
}

export default EstimatestateContext;