export default function PartnerReportsItem({ report }) {

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