import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
const DashboardTemp = (props) => {
  return (
    <>
      <Card>
        <CardContent>
          <Stack
            direction="row"
            marginLeft={2}
            paddingRight={10}
            alignItems="center"
            justifyContent={"flex-start"}
            gap={2}
          >
            <img
              src={props.img}
              height={100}
              width={100}
              alt="sales dashbboard"
            />
            <Box>
              <Typography variant="subtitle1" color="textSecondary">
                {props.title}
              </Typography>
              <Typography variant="h5">{props.value}</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardTemp;
