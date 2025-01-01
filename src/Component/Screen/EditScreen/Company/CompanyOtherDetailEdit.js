
import React, { useContext, useEffect } from "react";
import { CompanyDetail } from "../../../Context/companyDetailContext";
import './CompanyOtherDetailEdit.css';
import Card from "../../../Style/Card/Card";
import { Box, Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { MdDeleteForever, MdOutlineSaveAlt } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
const CompanyOtherDetailEdit = () => {


    const companydet = useContext(CompanyDetail);

    useEffect(() => {
        console.log("companydet.companydetails");
        console.log(companydet.companydetails)
    }, [companydet.companydetails]);


    return (

        <Card >
            <h2>Terms And Conditions</h2>
            {companydet.companydetails.length}
            {companydet.companydetails.length == 0 ? <></> : 
            <>
            {companydet.companydetails.map((item, index) => {
                return (<Box className="  " key={item.id}
                    sx={{ '& .MuiTextField-root': { m: 2, width: '45ch' } }}
                >    
                        <div className=" companyotherdeta companyindex" key={item.id}>
                            <div className="companyindex ">
                                {index + 1}</div>

                            <TextField id="outlined-required" label="Title" value={item.title}
                                onChangeCapture={(e) => {

                                    companydet.companytitle(item.id, e.target.value, 'title');
                                }}
                            />
                            <TextField id="outlined-required" label="Details" multiline value={item.desc}
                                onChange={(e) => {

                                    companydet.companytitle(item.id, e.target.value, 'desc');
                                }}
                            />

                            <FormControlLabel
                                control={
                                    <Switch checked={item.isvisible}
                                        onChange={(e) => {
                                            companydet.companytitle(item.id, e, 'visible');
                                        }}
                                        name="Visibility" />
                                }
                            // label="Is Visible?"
                            />
                            <h5 className="tagline isvisible">{item.isvisible ? 'Visible' : 'Hidden'}</h5>
                            <Button variant="contained" color="error" endIcon={<MdDeleteForever />}
                                onClick={() => companydet.companyOtherDetailHandeler(item.id, "delete")} >
                                Delete
                            </Button>



                        </div>
                    

                </Box>
                )
            })} 
         </> } 
            
             <h5 className="notetext" >
              New Item will not be automatically saved until you save!! 
            </h5>
            <Button variant="contained" color="info" endIcon={<MdOutlineSaveAlt />}
                onClick={() => companydet.saveHandler('addOrUpdateCompanyTermsAndConditionHandler',companydet.companydetails, "save")} >
                Save the Changes
            </Button>
            <Card >
                <h2 >Add New Terms And Conditions</h2>
                <Box component="form" sx={{ '& .MuiTextField-root': { m: 2, width: '35ch' } }}>
                    <div className=" companyotherdeta companyindex">
                        <TextField id="outlined-required" label="Title" value={companydet.companydetailtitle}
                            onChange={(e) => {

                                companydet.setcompanydetailtitle(e.target.value)
                            }}
                        />

                        <TextField id="outlined-required" label="Details" multiline value={companydet.companydetaildesc}
                            onChange={(e) => {

                                companydet.setcompanydetaildesc(e.target.value)
                            }}

                        />

                        <FormControlLabel
                            control={
                                <Switch checked={companydet.companydetailIsVisible}
                                    onChange={(e) => {
                                        companydet.setcompanydetailIsVisible(!companydet.companydetailIsVisible);
                                    }}
                                    name="Visibility" />
                            }
                            label="Is Visible?"
                        />
                        <div className="tagline isvisible">
                            {companydet.companydetailIsVisible ? 'Visible in the screen' : <>Details will be hidden...
                            <h5> Switch to Visible </h5>  </>}
                        </div>


                        <Button variant="contained" color="success" endIcon={<FaRegSave />}
                            onClick={() => companydet.companyOtherDetailHandeler('', "new")} >
                            Save
                        </Button>

                    </div>
                </Box>
            </Card>
        </Card>)
}

export default CompanyOtherDetailEdit;