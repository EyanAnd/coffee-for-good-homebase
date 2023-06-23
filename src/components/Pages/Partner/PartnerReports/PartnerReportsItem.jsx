export default function PartnerReportsItem({ report }) {

    // grab report from props and set table data to report data
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