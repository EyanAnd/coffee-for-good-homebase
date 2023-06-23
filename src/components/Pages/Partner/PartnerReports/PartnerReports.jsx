
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import PartnerReportsItem from "./PartnerReportsItem"
export default function PartnerReports() {
    // initalize the store
    const reports = useSelector(store => store.partnerReportsReducer)
    const partner = useSelector(store => store.partnerReducer)
    console.log(partner)
    console.log(reports)
    // initalize use dispatch
    const dispatch = useDispatch();

    // initalize useEffect
    useEffect(() => {
        dispatch({ type: 'FETCH_PARTNER_REPORTS'  })
    }, [])

    console.log(reports)
    return (
        <>
            <div className="container">
            </div>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Description</td>
                        <td>Date Sent</td>
                    </tr>
                </thead>
                <tbody>
                    {reports.map(report => (
                        <PartnerReportsItem report={report} />
                    ))}

                </tbody>
            </table>
        </>
    )
}




