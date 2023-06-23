import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import AdminReportsItem from "./AdminReportsItem";


export default function AdminReports() {

    // initalize the store
    const reports = useSelector(store => store.reportsReducer)
    // initalize use dispatch
    const dispatch = useDispatch();

    // initalize useEffect
    useEffect(() => {
        dispatch({ type: 'FETCH_REPORTS' })
    }, [])
    return (
        <>
        <div className="button">
            <button>Add A new report</button>
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
                    {/* Map ove the reports and send a report as a prop ot the item component */}
                    {reports.map(report => (
                       <AdminReportsItem report={report} />
                    ))}
                </tbody>
            </table>
        </>
    )
}