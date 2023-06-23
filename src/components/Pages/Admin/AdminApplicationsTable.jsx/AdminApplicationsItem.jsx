import { useDispatch } from "react-redux"

export default function AdminApplicationsItem({ app }) {
    // initalize use disaptch
    const dispatch = useDispatch();

    // on click function to do a PUT request to update the application to approved
    // on click delete an application
    return (
        <>
            <tr>
                <td>{app.name}</td>
                <td>{!app.approved ? <button onClick={() => dispatch({type: 'APPROVE_APP', payload: app.user_id})}>Approve</button> :
                <button>Approved</button>}</td>
                <td><button onClick={() => dispatch({type: 'DELETE_APP', payload: app.user_id})}>Delete</button></td>
            </tr>
        </>
    )
}