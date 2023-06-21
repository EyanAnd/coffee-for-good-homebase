import AdminApplicationsItem from "./AdminApplicationsItem"
// grab applications table from the store. 

// Map over the store and display the applciants name and status 
export default function AdminApplicationsTable() {
    return (
        <>
            <table>
                <thead>
                    <td>Name</td>
                    <td>Status</td>
                </thead>
                <tbody>
                    <tr>
                        <AdminApplicationsItem />
                    </tr>
                </tbody>
            </table>
        </>
    )
}