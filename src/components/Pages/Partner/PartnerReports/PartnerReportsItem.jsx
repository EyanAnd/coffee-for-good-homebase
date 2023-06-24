import { Table, TableCaption, TableContainer, Td, Tr } from '@chakra-ui/react';
import moment from 'moment';

export default function PartnerReportsItem({ report }) {

    const formattedDate = moment(report.date_sent).format('MMM Do YY');


    return (
                <Tr key={report.id}>
                    <Td>{report.name}</Td>
                    <Td>{report.description}</Td>
                    <Td>{formattedDate}</Td>
                </Tr>
    );
}
