import React from "react"
import { useState } from "react"

export default function AdminReportsItem({ report }) {
    // initalize useState
    const [showDescription, setShowDescription] = useState(false)

    // TODO add in on click functionality to view a singular report
    // this will look like getting rid of the description and just keeping the name and the date sent most likely.
    return (
        <>
            <tr key={report.user_id} onClick={() => setShowDescription(!showDescription)}>
                <td>{report.name}</td>
                {showDescription ? (
                <td>{report.description}</td>) : ( 
                <td>Click to view description</td>
                )}
                <td>{report.date_sent}</td>
            </tr>
        </>
    )
}