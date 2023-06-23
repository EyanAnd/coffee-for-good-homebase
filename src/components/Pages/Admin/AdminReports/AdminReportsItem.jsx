import React from "react"

export default function AdminReportsItem({ report }) {


    // TODO add in on click functionality to view a singular report
    // this will look like getting rid of the description and just keeping the name and the date sent most likely.
    return (
        <>
            <tr key={report.user_id}>
                <td>{report.name}</td>
                <td>{report.description}</td>
                <td>{report.date_sent}</td>
            </tr>
        </>
    )
}