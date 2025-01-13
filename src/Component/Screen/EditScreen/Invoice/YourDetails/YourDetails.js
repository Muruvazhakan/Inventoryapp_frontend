
import React, { useContext } from "react";
import { FormGroup, FormControl, TextField, Box, Button, ImageList, ImageListItem, withStyles } from '@mui/material';

import { MdOutlineSaveAlt } from "react-icons/md";

import { CompanyDetail } from "../../../../Context/companyDetailContext";
import './YourDetails.css';
import Card from "../../../../Style/Card/Card";


const YourDetails = () => {

  const compayDet = useContext(CompanyDetail);
  const setval = (e, fun) => {
    fun(e.target.value);
  }

  const setboxColors = (item, field) => {
    if (field === 'color') {
      return (item === undefined || item.length > 0) ? 'success' : 'error';
    }

    else {
      return (item === undefined || item.length > 0) ? false : true;
    }

  }


  return <>
    <FormGroup>
      <FormControl>
        <Card>
          <h3>Company Details</h3>
          <Box component="form" className="alltextfiled" sx={{ '& .MuiTextField-root': { m: 1, width: '35ch' } }} >
            {/* companyImage, setcompanyImage */}

            {/* {compayDet.companyImage ?
                <div> change</div>
               
            } */}

            <div>
              {compayDet.companyImage ?
                <>
                  <img
                    className={"img-style"}
                    alt="Company Images"
                    src={compayDet.companyImage}
                    loading="lazy"
                  // src={`${state.newimgurl }`} 
                  />

                  <div>
                  <Button variant="outlined" color="info" endIcon={<MdOutlineSaveAlt />}
                    onClick={() => compayDet.uploadImage("upload")} >
                    Upload Image
                  </Button>
                  </div>
                </> : null}
            </div>

            <div className={'img-container'}>
              {compayDet.companyImage ? "Replace the Company Logo: " : "Select Company Logo: "}
              <input type="file" name="image" className="imageselector"
                onChange={compayDet.selectCompanyImg}
              />
            </div>

            {/* <ImageList >
              <ImageListItem key={compayDet.companyImage} >
               <div>
                  {compayDet.companyImage ?
                    <img
                    className={"img-style"}
                      alt="Company Images"
                      src={compayDet.companyImage}
                      loading="lazy"
                    // src={`${state.newimgurl }`} 
                    /> : null}
              </div>
              </ImageListItem>
            </ImageList> */}
            
            <TextField className="alltextfiled" required id="outlined-required" label="Company Name" value={compayDet.companyName}
              onChange={(e) => setval(e, compayDet.setcompanyName)}
              color={setboxColors(compayDet.companyName, 'color')}
              error={setboxColors(compayDet.companyName, 'error')} />

            <TextField className="alltextfiled" required id="outlined-required" label="Company Tag Line" multiline value={compayDet.companyTagLine}
              onChange={(e) => setval(e, compayDet.setcompanyTagLine)}
              color={setboxColors(compayDet.companyTagLine, 'color')}
              error={setboxColors(compayDet.companyTagLine, 'error')} />

            <TextField className="alltextfiled" required id="outlined-required" label="Company Address" multiline value={compayDet.companyAddress}
              onChange={(e) => setval(e, compayDet.setcompanyAddress)}
              color={setboxColors(compayDet.companyAddress, 'color')}
              error={setboxColors(compayDet.companyAddress, 'error')} />

            <TextField className="alltextfiled" required id="outlined-required" label="Company Phone Number" value={compayDet.companyPhno}
              onChange={(e) => setval(e, compayDet.setcompanyPhno)}
              color={setboxColors(compayDet.companyPhno, 'color')}
              error={setboxColors(compayDet.companyPhno, 'error')} />

            <TextField className="alltextfiled" required id="outlined-required" label="Company Mailid" value={compayDet.companymailid}
              onChange={(e) => setval(e, compayDet.setcompanymailid)}
              color={setboxColors(compayDet.companymailid, 'color')}
              error={setboxColors(compayDet.companymailid, 'error')} />

            <TextField className="alltextfiled" required id="outlined-required" label="Company Owner Name" value={compayDet.companyOwner}
              onChange={(e) => setval(e, compayDet.setcompanyOwner)}
              color={setboxColors(compayDet.companyOwner, 'color')}
              error={setboxColors(compayDet.companyOwner, 'error')} />

            {/* <TextField className="alltextfiled" required id="outlined-required" label="Thanksyou words" value={compayDet.companythankyou} multiline rows={2}
              onChange={(e) => setval(e, compayDet.setcompanythankyou)}
              color={setboxColors(compayDet.companythankyou, 'color')}
              error={setboxColors(compayDet.companythankyou, 'error')} /> */}

            <TextField className="alltextfiled" id="outlined-required" label="Company Gstin" value={compayDet.companyGstin}
              onChange={(e) => setval(e, compayDet.setcompanyGstin)}
            //  color ={setboxColors(compayDet.companyGstin,'color')}
            //  error={setboxColors(compayDet.companyGstin,'error')}
            />
            <TextField className="alltextfiled" id="outlined-required" label="Company Gstin state" value={compayDet.companyGstinStatename} multiline
              onChange={(e) => setval(e, compayDet.setcompanyGstinStatename)}
            //  color ={setboxColors(compayDet.companyGstinStatename,'color')}
            //  error={setboxColors(compayDet.companyGstinStatename,'error')}
            />

            {/* <TextField className="alltextfiled" id="outlined-required" label="Company Declaration" value={compayDet.companyDeleration} multiline rows={3}
              onChange={(e) => setval(e, compayDet.setcompanyDeleration)}
              color={setboxColors(compayDet.companyDeleration, 'color')}
              error={setboxColors(compayDet.companyDeleration, 'error')}
            /> */}
            <h5>
              System will automatically update..
            </h5>
            <Button variant="contained" color="info" endIcon={<MdOutlineSaveAlt />}
              onClick={() => compayDet.saveHandler('addOrUpdateCompanyHandler', compayDet, "save")} >
              Save the Changes
            </Button>
          </Box>
        </Card>
      </FormControl>

    </FormGroup>


  </>
}

export default YourDetails;