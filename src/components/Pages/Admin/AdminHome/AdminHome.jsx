import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import axios from "axios"
import { useEffect } from "react";


export default function AdminHome() {

    // init dispatch
    const dispatch = useDispatch();
    
    // use effect to show the information for the transaciton data
    useEffect(() => {
        dispatch({ type: 'FETCH_DATA' })
    }, [dispatch])
    
    // init use selector to get the store data to change it around 
    const cfg = useSelector(store => store.transactionDataReducer);

    // TODO conditionally render based on a sort by
    // this will look like chart.js or whichever chard libarary you need.
    return (
        <div className="container">
            {Object.keys(cfg).map(key => {
                const response = cfg[key];
                return (
                    <div key={key}>
                        <h2>{key}</h2>
                        <ul>
                            {response.map((chart, index) => (
                                <li key={index}>
                                    {chart.shipping_state || chart.channel_type || chart.shipping_method}: {chart.shipment_count || chart.order_count || chart.sum || chart.count}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
}