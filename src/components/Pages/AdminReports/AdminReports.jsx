import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useEffect } from "react"


export default function AdminReports() {

    // initalize the store
    
    // initalize use dispatch
    const dispatch = useDispatch();

    // initalize useEffect
    useEffect(() => {
        dispatch({ type: 'FETCH_REPORTS' })
    })
    return (
        <>
        <p>this is the admin reports page!</p>
        </>
    )
}