import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { useSelector } from "react-redux"



import AdminApplicationsItem from "./AdminApplicationsItem"
export default function AdminApplicationsTable() {

    // initalize dispatch
    const dispatch = useDispatch();

    // use effect to ask for the admin applications
    useEffect(() => {
        dispatch({ type: 'FETCH_ADMIN_APPS' })
    }, [dispatch])
    // grab applications table from the store. 
    const applications = useSelector(store=> store.adminApplicationReducer)
    console.log(applications);
  
    // Map over the store and display the applciants name and status 
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
                        {applications.map((app, key) => (
                            <AdminApplicationsItem app={app} key={key}/>
                        ))}
                </tbody>
            </table>
        </>
    )
}