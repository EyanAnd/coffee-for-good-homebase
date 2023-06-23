import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import axios from "axios"
import { useEffect } from "react";


export default function AdminHome() {

    // init dispatch
    const dispatch = useDispatch();
    // init use selector to get the store data to change it around and conditionally render based on the sort by...

    // init use effect to show the information for the transaciton data
    useEffect(() => {
        dispatch({ type: 'FETCH_DATA' })
    }, [dispatch])

    const cfg = useSelector(store => store.transactionDataReducer);
    console.log(cfg)




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