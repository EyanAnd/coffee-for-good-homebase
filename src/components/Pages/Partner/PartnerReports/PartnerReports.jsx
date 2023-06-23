
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import PartnerReportsItem from "./PartnerReportsItem"
export default function PartnerReports() {
    // initalize the store for reports
    const reports = useSelector(store => store.partnerReportsReducer)
    // initalize store for partner
    const partner = useSelector(store => store.partnerReducer)
    // initalize use dispatch
    const dispatch = useDispatch();
    // initalize useEffect to grab current partner reports
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
                    {/* map over the reports array and pass in the report to the reports item */}
                    {reports.map(report => (
                        <PartnerReportsItem report={report} />
                    ))}

                </tbody>
            </table>
        </>
    )
}




