import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useEffect } from "react";

export default function PartnerHome() {
    // initalize cfg to map over for the data
    const cfg = useSelector(store => store.transactionDataReducer);

    const dispatch = useDispatch();
    
    // render the data on load
    useEffect(() => {
        dispatch({ type: 'FETCH_DATA' })
    }, [dispatch])

    // TODO implement chart js

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