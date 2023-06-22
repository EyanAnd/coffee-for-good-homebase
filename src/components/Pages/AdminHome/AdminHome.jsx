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
        <>
            <p>this is the admin home page!</p>
        </>
    )
}