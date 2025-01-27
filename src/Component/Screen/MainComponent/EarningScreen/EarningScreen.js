
import React, { useContext } from 'react'

import './EarningScreen.css';

import { Stocks } from '../../../Context/StocksContex';
import TotalSalesScreen from './TotalEarningScreen/TotalSalesScreen';
import TotalEarningScreen from './TotalEarningScreen/TotalEarningScreen';
import MonthlyEarningScreen from './TotalEarningScreen/MonthlyEarningScreen';
import { Stack } from '@mui/material';

// import Flash from 'react-reveal/Flash';
// import Spinner from '../../Spinner/Spinner';

const EarningScreen = (props) => {
     const stockdet = useContext(Stocks);
    return (
        <>
        <Stack direction="row" spacing={1} mt={1} alignItems="center">
           <TotalEarningScreen data={stockdet} />
           <TotalSalesScreen data={stockdet} />
           {/* <MonthlyEarningScreen data={stockdet} /> */}
           </Stack>
        </>
    )
}
export default EarningScreen;
