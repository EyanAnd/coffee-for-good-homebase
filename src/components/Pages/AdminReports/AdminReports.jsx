import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import AdminReportsItem from "./AdminReportsItem";


export default function AdminReports() {

    // initalize the store
    const reports = useSelector(store => store.adminReportsReducer)
    console.log(reports)
    // initalize use dispatch
    const dispatch = useDispatch();

    // initalize useEffect
    useEffect(() => {
        dispatch({ type: 'FETCH_REPORTS' })
    }, [])
    return (
        <>
            <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Status</td>
                        </tr>
                    </thead>
                <tbody>
                    <tr>
                        {/* TODO map over the store of the reports */}
                        <AdminReportsItem />
                    </tr>
                </tbody>
            </table>
        </>
    )
}