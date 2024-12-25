
import React, { useContext,useEffect } from "react";
import { CompanyDetail } from "../../../Context/companyDetailContext";
import './CompanyOtherDetailEdit.css';
import Card from "../../../Style/Card/Card";
import { Box, Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { MdDeleteForever, MdOutlineSaveAlt } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
const CompanyBankDetailEdit = () => {


    const companydet = useContext(CompanyDetail);

    // useEffect(() => {
    //     console.log(companydet.companydetails);

    // }, []);


    return (

        <Card >
            <h2>Company Bank Detail</h2>
            {companydet.companyBankdetails.map((item, index) => {
                return (<Box className="  "  key={item.id}
                    sx={{ '& .MuiTextField-root': { m: 2, width: '45ch' } }}
                >
                    <div className=" companyotherdeta companyindex" key={item.id}>
                        <div className="companyindex ">
                            {index + 1}</div>

                        <TextField id="outlined-required" label="Title" value={item.title}
                            onChangeCapture={(e) => {

                                companydet.updateBankDetailHandler(item.id, e.target.value, 'title');
                            }}
                        />
                        <TextField id="outlined-required" label="Value" multiline value={item.value}
                            onChange={(e) => {
                                companydet.updateBankDetailHandler(item.id, e.target.value, 'value');
                            }}
                        />
                        <FormControlLabel
                            control={
                                <Switch checked={item.isvisible}
                                    onChange={(e) => {
                                        companydet.updateBankDetailHandler(item.id, e, 'visible');
                                    }}
                                    name="Visibility" />
                            }
                            // label="Is Visible?"
                        />
                        <h5 className="tagline isvisible">{item.isvisible? 'Visible':'Hidden'}</h5>
                        <Button variant="contained" color="error" endIcon={<MdDeleteForever />}
                            onClick={() => companydet.companyBankDetailHandler(item.id, "delete")} >
                            Delete
                        </Button>
                    </div>
                </Box>
                )
            })}
            <h5 className="notetext" >
              New Item will not be automatically saved until you save!! 
            </h5>
            <Button variant="contained" color="info" endIcon={<MdOutlineSaveAlt />}
                onClick={() => companydet.saveHandler('addOrGetCompanyBankDetailHandler',companydet.companyBankdetails, "save")} >
                Save the Changes
            </Button>
            <Card >
                <h2 >Add Bank Details</h2>
                <Box component="form" sx={{ '& .MuiTextField-root': { m: 2, width: '35ch' } }}>
                    <div className=" companyotherdeta companyindex"> ,
                        <TextField id="outlined-required" label="Title" value={companydet.companyBankdetailtitle}
                            onChange={(e) => {

                                companydet.setcompanyBankdetailtitle(e.target.value)
                            }}
                        />

                        <TextField id="outlined-required" label="Details" multiline value={companydet.companyBankdetailvalue}
                            onChange={(e) => {

                                companydet.setcompanyBankdetailvalue(e.target.value)
                            }}

                        /> 

                        <FormControlLabel
                            control={
                                <Switch checked={companydet.companyBankdetailIsVisible}
                                    onChange={(e) => {
                                        companydet.setcompanyBankdetailIsVisible(!companydet.companyBankdetailIsVisible);
                                    }}
                                    name="Visibility" />
                            }
                            label="Is Visible?"
                        />
                        <div className="tagline isvisible">
                        {companydet.companyBankdetailIsVisible ? 'Visible in the screen': <>Details will be hidden...<h5> Please click switch to Visible </h5>  </>}
                        </div>
                        <Button variant="contained" color="success" endIcon={<FaRegSave />}
                            onClick={() => companydet.companyBankDetailHandler('', "new")} >
                            Save
                        </Button>

                    </div>
                </Box>
            </Card>
        </Card>)
}

export default CompanyBankDetailEdit;