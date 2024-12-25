import React, { useContext, useEffect, useState } from "react";

import { Box, Button, FormControl, FormControlLabel, FormGroup, List, Switch, TextField } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { GrClearOption } from "react-icons/gr";
import "react-toastify/dist/ReactToastify.css";
import Card from "../../../../Style/Card/Card";
import { BsSave } from "react-icons/bs";
import { estimateState } from "../../../../Context/EstimatestateContext";
import { FaFileInvoice } from "react-icons/fa";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();
const EstimateTableForm = (props) => {
    const [tit, setit] = useState([]);
    const [sub, sesubtit] = useState([]);
    let title, subtitle;
    const estdetail = useContext(estimateState);

    const top100Films = [
        { title: 'The Shawshank Redemption' },
        { title: 'The Godfather' },
        { title: 'The Godfather: Part II' },
        { title: 'The Dark Knight' }];

    useEffect(() => {
        console.log('EstimateTableForm estimateState');
        console.log(estdetail.estimateHistoryData);
        autocompleTitle();
        // console.log('top100Films');
        // console.log(top100Films);

        // let title = 
    }, [estdetail])

    const autocompleTitle = () => {
        if (estdetail.estimateHistoryData !== null && estdetail.estimateHistoryData.length > 0) {
            let rows = estdetail.estimateHistoryData.map((est) => {
                return est.rows

            });
            console.log('EstimateTableForm title');
            title = rows.map((row) => {
                return row.map((allrows) => {
                    return { title: allrows.title }
                });
            })
            console.log(rows);
            title = [].concat.apply([], title);
            // console.log(title);
            // var distinct = [];
            const unique = [...new Set(title.map((item) => item.title))];
            const ti = unique.map((allrows) => { return { title: allrows } });

            subtitle = rows.map((row) => {
                return row.map((allrows) => {
                    return allrows.values.map((sub) => {
                        return { title: sub.desc }
                    });
                });
            })

            subtitle = [].concat.apply([], subtitle);
            subtitle = [].concat.apply([], subtitle);
            const uniquesub = [...new Set(subtitle.map((item) => item.title))];
            const sub = uniquesub.map((allrows) => { return { title: allrows } });
            console.log(sub);
            setit(ti);
            sesubtit(sub);

            // console.log(tit);
            // console.log('unique');

            // console.log(ti);
        }
    }


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


    const [value, setValue] = React.useState(null);

    const onChangeOnAutoComplete = (event, newValue, type) => {
        // console.log(newValue);
        // console.log(event);
        if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
                title: newValue.inputValue,
            });
            if (type === 'subdesc') {
                estdetail.setsubdesc(newValue.inputValue);
            }
            else {
                estdetail.settitle(newValue.inputValue);
            }

            // estdetail.settitle(newValue.inputValue);
        } else {
            setValue(newValue);
            // estdetail.settitle(newValue);
            if (newValue != null) {
                if (type === 'subdesc') {
                    estdetail.setsubdesc(newValue.title);
                }
                else {
                    estdetail.settitle(newValue.title);
                }

            }


        }


    }

    const filterOptionOnAutoComplete = (options, params) => {
        // console.log(options);

        // let filtered;
        const filtered = filter(options, params);
        // // let filtered;
        const { inputValue } = params;
        // console.log(inputValue);
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.title);
        // console.log(isExisting);
        if (inputValue !== '' && !isExisting) {
            filtered.push({
                inputValue,
                title: `Add "${inputValue}"`,
            });
        }
        return filtered;
    }

    const getOptionLabelOnAutoComplete = (option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
            return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
            return option.inputValue;
        }
        // Regular option
        return option.title;
    }

    const renderOptionOnAutoComplete = (props, option) => {
        const { key, ...optionProps } = props;
        return (
            <li key={key} {...optionProps}>
                {option.title}
            </li>
        );
    }
    return <>
        <Card>
            <ToastContainer position="top-center" theme="colored" containerId="EstimateTableForm" />
            <h3>Estimate Data </h3>
            <FormGroup>
                <FormControl>
                    <Card>
                        <h3>Add details below for Estimation</h3>
                        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '20ch' } }}>

                            <Autocomplete
                                // value={value}
                                value={estdetail.title}
                                onChange={(event, newValue) => onChangeOnAutoComplete(event, newValue)}
                                filterOptions={(options, params) => filterOptionOnAutoComplete(options, params)}
                                selectOnFocus
                                clearOnBlur
                                handleHomeEndKeys
                                id="free-solo-with-text"
                                options={tit}
                                getOptionLabel={(option) => getOptionLabelOnAutoComplete(option)}
                                renderOption={(props, option) => renderOptionOnAutoComplete(props, option)}
                                // sx={{ width: 300 }}
                                freeSolo
                                renderInput={(params) => (
                                    // <TextField label="Title" />
                                    <TextField required id="outlined-required" label="Item Title"
                                        onChange={(e) => setval(e, estdetail.settitle)}
                                        color={setboxColors(estdetail.title, 'color')}
                                        error={setboxColors(estdetail.title, 'error')}  {...params}
                                    />
                                )}
                            />

                            {/* <Autocomplete
                                // value={value}
                                value={estdetail.subdesc}
                                onChange={(event, newValue) => onChangeOnAutoComplete(event, newValue,'subdesc')}
                                filterOptions={(options, params) => filterOptionOnAutoComplete(options, params)}
                                selectOnFocus
                                clearOnBlur
                                handleHomeEndKeys
                                id="free-solo-with-text"
                                options={sub}
                                getOptionLabel={(option) => getOptionLabelOnAutoComplete(option)}
                                renderOption={(props, option) => renderOptionOnAutoComplete(props, option)}
                                // sx={{ width: 300 }}
                                freeSolo
                                renderInput={(params) => (
                                    // <TextField label="Title" />
                                    <TextField required id="outlined-required" label="Sub Title"
                                        onChange={(e) => setval(e, estdetail.settitle)}
                                        color={setboxColors(estdetail.title, 'color')}
                                        error={setboxColors(estdetail.title, 'error')}  {...params}
                                    />
                                )}
                            /> */}
                            {/* 
                            <Autocomplete
                                value={value}
                                onChange={(event, newValue) => onChangeOnAutoComplete(event, newValue)}
                                filterOptions={filterOptionOnAutoComplete}
                                selectOnFocus
                                clearOnBlur
                                handleHomeEndKeys
                                id="free-solo-with-text-demo"
                                options={top100Films}
                                getOptionLabel={getOptionLabelOnAutoComplete}
                                renderOption={renderOptionOnAutoComplete}
                                sx={{ width: 300 }}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField {...params} label="Free solo with text demo" />
                                )}
                            /> */}


                            {/* <TextField required id="outlined-required" label="Item Title" value={estdetail.title}
                                onChange={(e) => setval(e, estdetail.settitle)}
                                color={setboxColors(estdetail.title, 'color')}
                                error={setboxColors(estdetail.title, 'error')}
                            /> */}
                            <h4>Sub Details</h4>
                            <TextField required id="outlined-required" label="Sub description" value={estdetail.subdesc}
                                onChange={(e) => setval(e, estdetail.setsubdesc)}
                                color={setboxColors(estdetail.subdesc, 'color')}
                                error={setboxColors(estdetail.subdesc, 'error')}
                            />
                            <TextField required id="outlined-required" label="Order number" value={estdetail.orderno} type="number"
                                onChange={(e) => setval(e, estdetail.setorderno)}
                                color={setboxColors(estdetail.orderno, 'color')}
                                error={setboxColors(() => estdetail.setisotheritem(!estdetail.isotheritem).orderno, 'error')}
                            />
                            <h4 className="tagline">'Switch to Special item feature to add other than raw material' </h4>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={estdetail.isotheritem}
                                        onChange={estdetail.specialItemHandler}

                                        name="isotheritem" />
                                }
                                label="Special Item"
                            />
                            {estdetail.isotheritem && <>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={estdetail.hideotheritem}
                                            onChange={() => estdetail.sethideotheritem(!estdetail.hideotheritem)}

                                            name="isotheritem" />
                                    }
                                    label="Hide other details"
                                />
                            </>}

                            <h4 className="tagline">{estdetail.isotheritem ? 'Specail Item activated' : null}</h4>
                            <h4 className="tagline">{estdetail.hideotheritem ? 'Length, Height, Area, Total sq.ft will be hidden' : null}</h4>
                            <TextField required id="outlined-required" label="Length" value={estdetail.length} type="number"
                                onChange={(e) => setval(e, estdetail.setlength)}
                                color={setboxColors(estdetail.length, 'color')}
                                error={setboxColors(estdetail.length, 'error')}
                            />
                            <TextField required id="outlined-required" label="Height" value={estdetail.height} type="number"
                                onChange={(e) => setval(e, estdetail.setheight)}
                                color={setboxColors(estdetail.height, 'color')}
                                error={setboxColors(estdetail.height, 'error')}
                            />
                            {/* <TextField required id="outlined-required" label="Area" value={estdetail.area} type="number"
                                // onChange={(e) => setval(e, estdetail.setsubdesc)}
                                disabled
                                color={setboxColors(estdetail.area, 'color')}
                                error={setboxColors(estdetail.area, 'error')}
                            /> */}
                            <TextField required id="outlined-required" label="Total Sq. feet" value={estdetail.perqsft}
                                onChange={(e) => setval(e, estdetail.setperqsft)}

                                color={setboxColors(estdetail.perqsft, 'color')}
                                error={setboxColors(estdetail.perqsft, 'error')}
                            />
                            <TextField required id="outlined-required" label="Pvc cost psf" value={estdetail.pvccostpsf} type="number"
                                onChange={(e) => setval(e, estdetail.setpvccostpsf)}
                                color={setboxColors(estdetail.pvccostpsf, 'color')}
                                error={setboxColors(estdetail.pvccostpsf, 'error')}
                            />
                            <TextField required id="outlined-required" label="Total Pvc cost" value={estdetail.totalpvccost} type="number"
                                onChange={(e) => setval(e, estdetail.settotalpvccost)}

                                color={setboxColors(estdetail.totalpvccost, 'color')}
                                error={setboxColors(estdetail.totalpvccost, 'error')}
                            />
                            <TextField required id="outlined-required" label="Upvc cost psf" value={estdetail.upvccostpsf} type="number"
                                onChange={(e) => setval(e, estdetail.setupvccostpsf)}
                                color={setboxColors(estdetail.upvccostpsf, 'color')}
                                error={setboxColors(estdetail.upvccostpsf, 'error')}
                            />

                            <TextField required id="outlined-required" label="Total Upvc cost" value={estdetail.totalupvccost} type="number"
                                onChange={(e) => setval(e, estdetail.settotalupvccost)}

                                color={setboxColors(estdetail.totalupvccost, 'color')}
                                error={setboxColors(estdetail.totalupvccost, 'error')}
                            />

                            <TextField required id="outlined-required" label="Wood cost psf" value={estdetail.woodcostpsf} type="number"
                                onChange={(e) => setval(e, estdetail.setwoodcostpsf)}
                                color={setboxColors(estdetail.woodcostpsf, 'color')}
                                error={setboxColors(estdetail.woodcostpsf, 'error')}
                            />

                            <TextField required id="outlined-required" label="Total Wood cost" value={estdetail.totalwoodcost} type="number"
                                onChange={(e) => setval(e, estdetail.settotalwoodcost)}

                                color={setboxColors(estdetail.totalwoodcost, 'color')}
                                error={setboxColors(estdetail.totalwoodcost, 'error')}
                            />
                            <TextField id="outlined-required" label="Remarks" value={estdetail.remarks}
                                onChange={(e) => setval(e, estdetail.setremarks)}
                                color={setboxColors(estdetail.remarks, 'color')}
                            // error={setboxColors(estdetail.remarks, 'error')}
                            />

                            <div className="button-warn">
                                {estdetail.isNewDataSaveType ? <>
                                    <Button variant="contained" color="success" size="medium" endIcon={<BsSave />}
                                        onClick={() => estdetail.addOrUpdateEstimateItemHandler('', '', 'New')}>Add Item</Button>
                                </>
                                    :
                                    <>


                                        <Button variant="contained" color="success" size="medium" endIcon={<BsSave />}
                                            onClick={() => estdetail.addOrUpdateEstimateItemHandler('', '', 'Cancelupdate')}>Cancel Update</Button>
                                    </>
                                }
                            </div>


                        </Box>
                    </Card>

                    <Card>
                        <h3>Add details below for Estimation</h3>
                        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '15ch' } }}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={estdetail.columns[6].display}
                                        onChange={() => estdetail.updateTableView('pvc')}
                                        //   onChange={() => tabledet.setischargedinhsn(!tabledet.ischargedinhsn)} 
                                        name="includePVC" />
                                }
                                label="Can include PVC"
                            />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={estdetail.columns[8].display}
                                        onChange={() => estdetail.updateTableView('upvc')}
                                        //  checked={tabledet.ischargedinhsn} onChange={() => tabledet.setischargedinhsn(!tabledet.ischargedinhsn)} 
                                        name="includeUPVC" />
                                }
                                label="Can include UPVC"
                            />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={estdetail.columns[10].display}
                                        onChange={() => estdetail.updateTableView('wood')}
                                        name="includewood" />
                                }
                                label="Can include wood"
                            />
                            <div className="companyname tagline ">
                                <div>
                                    {!estdetail.columns[6].display && <> " PVC cost Psf & Total PVC Cost colums will not be visible "</>}</div>
                                <div> {!estdetail.columns[8].display && <> "UPVC cost Psf & Total UPVC Cost colums will not be visible"</>}</div>
                                <div>  {!estdetail.columns[10].display && <>"Wood cost Psf & Total Wood Cost colums will not be visible"</>}</div>
                            </div>
                            {/* <div className="button-warn">
                                <Button variant="contained" color="success" size="medium" onClick={() => estdetail.addOrUpdateEstimateItemHandler('', '', 'New')}>Update Table</Button>

                            </div> */}
                        </Box>

                        <h3>Discount the Grand Total</h3>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={estdetail.discountedcheck}
                                    onChange={() => estdetail.setdiscountedcheck(!estdetail.discountedcheck)}
                                    //  checked={tabledet.ischargedinhsn} onChange={() => tabledet.setischargedinhsn(!tabledet.ischargedinhsn)} 
                                    name="iscountedPricecheck" />
                            }
                            label="Discount Price Enable"
                        />

                        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '15ch' } }}>
                            <TextField required id="outlined-required" label="Discounted Text" value={estdetail.discountedText}
                                onChange={(e) => setval(e, estdetail.setdiscountedText)}
                                color={setboxColors(estdetail.discountedText, 'color')}
                                error={setboxColors(estdetail.discountedText, 'error')}
                            />
                            <TextField required id="outlined-required" label="Discounted Total Pvc cost" value={estdetail.discountedTotalpvccost} type="number"
                                onChange={(e) => setval(e, estdetail.setdiscountedTotalpvccost)}
                                color={setboxColors(estdetail.discountedTotalpvccost, 'color')}
                                error={setboxColors(estdetail.discountedTotalpvccost, 'error')}
                            />
                            <TextField required id="outlined-required" label="Discounted Total Upvc cost" value={estdetail.discountedTotalupvccost} type="number"
                                onChange={(e) => setval(e, estdetail.setdiscountedTotalupvccost)}
                                color={setboxColors(estdetail.discountedTotalupvccost, 'color')}
                                error={setboxColors(estdetail.discountedTotalupvccost, 'error')}
                            />
                            <TextField required id="outlined-required" label="Discounted Total Wood cost" value={estdetail.discountedTotalwoodcost} type="number"
                                onChange={(e) => setval(e, estdetail.setdiscountedTotalwoodcost)}

                                color={setboxColors(estdetail.discountedTotalwoodcost, 'color')}
                                error={setboxColors(estdetail.discountedTotalwoodcost, 'error')}
                            />


                        </Box>
                    </Card>

                    <div className="button-warn buttonspace">

                        <Button variant="contained" color="success" size="medium" endIcon={<FaFileInvoice />}
                            onClick={() => estdetail.addOrGetEstimateHistoryData('', '', 'New')}>Save Complete Estimate</Button>

                        {estdetail.estimateid.length === 0 && <div className="displaysmalldata"> Estimate Id is not generates</div>}

                    </div>
                    <div className="button-warn buttonspace">

                        <Button variant="contained" color="warning" size="medium" endIcon={<GrClearOption />}
                            onClick={() => estdetail.cleartallEstimateotal()}>Reset Estimate Screen</Button>

                        
                    </div>
                    
                </FormControl>
            </FormGroup>
        </Card>
    </>
}

export default EstimateTableForm;