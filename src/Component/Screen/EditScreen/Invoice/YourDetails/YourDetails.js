import React, { useEffect } from "react";
import { FormGroup, FormControl, TextField, Box, Button } from "@mui/material";

import { MdOutlineSaveAlt } from "react-icons/md";
import "./YourDetails.css";
import Card from "../../../../Style/Card/Card";
import StyleHeader from "../../../Header/StyleHeader";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../../../redux/userSlice";
import {
  getCompanyBasicDetails,
  saveCompanyBasicDetails,
} from "../../../../../apis/apis";

const YourDetails = () => {
  const userState = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getCompanyDetails() {
      await getCompanyBasicDetails(userState.userid).then((res) => {
        dispatch(updateUser(res[0]));
      });
    }
    if (userState.userid) {
      getCompanyDetails();
    }
  }, [userState.userid]);

  const saveCompanyDetails = async () => {
    // localstorage.addOrUpdateCompanyHandler(item, "save");

    try {
      //need to return saved data
      await saveCompanyBasicDetails(userState.userid, userState).then(() => {
        console.log("success");
      });
    } catch (error) {
      console.log("error", error);
    }

    // let companyBasicDetails = await companyDetailsDB.saveCompanyBasicDetails(
    //   item,
    //   localstorage.addOrGetUserdetail("", "userid", "get")
    // );

    // if (
    //   companyBasicDetails.status !== 201 &&
    //   companyBasicDetails.status !== 200
    // ) {
    //   // toast.error(companyBasicDetails.data + " in saving DB");
    // }
  };

  return (
    <>
      <FormGroup>
        <FormControl>
          <Card>
            <StyleHeader>Company Details</StyleHeader>
            <Box
              component="form"
              className="alltextfiled"
              sx={{ "& .MuiTextField-root": { m: 1, width: "35ch" } }}
            >
              <div>
                {userState.companyImage ? (
                  <>
                    <img
                      className={"img-style"}
                      alt="Company Images"
                      src={userState.companyImage}
                      loading="lazy"
                    />

                    <div>
                      <Button
                        variant="outlined"
                        color="info"
                        endIcon={<MdOutlineSaveAlt />}
                        onClick={
                          () => {}
                          //  compayDet.uploadImage("upload")
                        }
                      >
                        Upload Image
                      </Button>
                    </div>
                  </>
                ) : null}
              </div>

              <div className={"img-container"}>
                {userState.companyImage
                  ? "Replace the Company Logo: "
                  : "Select Company Logo: "}
                <input
                  type="file"
                  name="image"
                  className="imageselector"
                  onChange={userState.selectCompanyImg}
                />
              </div>

              <TextField
                className="alltextfiled"
                required
                id="outlined-required"
                label="Company Name"
                value={userState.companyName}
                onChange={(e) =>
                  dispatch(updateUser({ companyName: e.target.value }))
                }
                color={userState.companyName !== "" && "success"}
                error={userState.companyName === ""}
              />

              <TextField
                className="alltextfiled"
                required
                id="outlined-required"
                label="Company Tag Line"
                multiline
                value={userState.companyTagLine}
                onChange={(e) =>
                  dispatch(updateUser({ companyTagLine: e.target.value }))
                }
                color={userState.companyTagLine !== "" && "success"}
                error={userState.companyTagLine === ""}
              />

              <TextField
                className="alltextfiled"
                required
                id="outlined-required"
                label="Company Address"
                multiline
                value={userState.companyAddress}
                onChange={(e) =>
                  dispatch(updateUser({ companyTagLine: e.target.value }))
                }
                color={userState.companyTagLine !== "" && "success"}
                error={userState.companyTagLine === ""}
              />

              <TextField
                className="alltextfiled"
                required
                id="outlined-required"
                label="Company Phone Number"
                value={userState.companyPhno}
                onChange={(e) =>
                  dispatch(updateUser({ companyPhno: e.target.value }))
                }
                color={userState.companyPhno !== "" && "success"}
                error={userState.companyPhno === ""}
              />

              <TextField
                className="alltextfiled"
                required
                id="outlined-required"
                label="Company Mailid"
                value={userState.companymailid}
                onChange={(e) =>
                  dispatch(updateUser({ companymailid: e.target.value }))
                }
                color={userState.companymailid !== "" && "success"}
                error={userState.companymailid === ""}
              />

              <TextField
                className="alltextfiled"
                required
                id="outlined-required"
                label="Company Owner Name"
                value={userState.companyOwner}
                onChange={(e) =>
                  dispatch(updateUser({ companyOwner: e.target.value }))
                }
                color={userState.companyOwner !== "" && "success"}
                error={userState.companyOwner === ""}
              />

              <TextField
                className="alltextfiled"
                id="outlined-required"
                label="Company Gstin"
                value={userState.companyGstin}
                onChange={(e) =>
                  dispatch(updateUser({ companyGstin: e.target.value }))
                }
              />
              <TextField
                className="alltextfiled"
                id="outlined-required"
                label="Company Gstin state"
                value={userState.companyGstinStatename}
                multiline
                onChange={(e) =>
                  dispatch(
                    updateUser({ companyGstinStatename: e.target.value })
                  )
                }
              />

              <h5>System will automatically update..</h5>
              <Button
                variant="contained"
                color="info"
                endIcon={<MdOutlineSaveAlt />}
                onClick={saveCompanyDetails}
              >
                Save the Changes
              </Button>
            </Box>
          </Card>
        </FormControl>
      </FormGroup>
    </>
  );
};

export default YourDetails;
