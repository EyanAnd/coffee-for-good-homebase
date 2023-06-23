import { useDispatch } from "react-redux"
import { useState } from "react";

export default function AdminApplicationsItem({ app }) {
    // initalize use disaptch
    const dispatch = useDispatch();
    console.log(app);
    // initalize use state
    const [showDescription, setShowDescription] = useState(false)
    // on click function to do a PUT request to update the application to approved
    // on click delete an application
    return (
        <>
            <tr key={app.user_id} onClick={() => setShowDescription(!showDescription)}>
                <td>{app.name}</td>
                {showDescription ? (
                    <>
                        <td>{app.collab}</td>
                        <td>{app.email}</td>
                        <td>{app.impact}</td>
                        <td>{app.mission}</td>
                        <td>{app.notes}</td>
                        <td>{app.previous_partners}</td>
                        <td>{app.success_stories}</td>
                        <td>{app.reporting}</td>
                        <td>{app.sharing}</td>
                        <td>{app.values}</td>
                    </>) : (<>
                        < td > {!app.approved ? <button onClick={() => dispatch({ type: 'APPROVE_APP', payload: app.user_id })}>Approve</button> :
                            <button>Approved</button>}</td>
                        <td><button onClick={() => dispatch({ type: 'DELETE_APP', payload: app.user_id })}>Delete</button></td>
                    </>)}
            </tr >
        </>
    )
}