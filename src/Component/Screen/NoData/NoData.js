import React, { useEffect,useState } from 'react'

import './NoData.css';
// import Flash from 'react-reveal/Flash';
// import Spinner from '../../Spinner/Spinner';
import Card from '../../Style/Card/Card';

const NoData = (props) => {
    const [state, setState] = useState(false);
    // useEffect(() =>{
    //     setTimeout(() => {
    //         setState(true)
    //     }, 1500);
    // },[])
    // if(!state)
    // {
    //     return <Spinner />
    // }
    return (
        <>
            {/* <Flash delay={1200}> */}
                <div className=" why_pvc_div-style nodata-stytle">
                    <Card className="img-style w-100 why_pvc_div-style nodata-stytle">                      
                        No {props.details} {props.errorcode}
                    </Card>
                </div>
            {/* </Flash> */}
        </>
    )
}
export default NoData;
