export default function AdminApplicationsItem({id, app}) {

    // grab from the store the status of the application

    // on click function to do a PUT request to update the application to approved

    // on click delete an application

    return (
        <>
            <p>applications go here</p>
            <button onClick={() => console.log('approve the application')}>Approve</button>
            <button onClick={() => console.log('delete the application')}>Delete</button>
        </>
    )
}