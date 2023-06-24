import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import PartnerReportsItem from "./PartnerReportsItem";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';

export default function PartnerReports() {
    const reports = useSelector((store) => store.partnerReportsReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_PARTNER_REPORTS' });
    }, []);

    return (
        <TableContainer>
            <Table variant="striped" colorScheme="brand">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Description</Th>
                        <Th>Date Sent</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {reports.map((report) => (
                        <PartnerReportsItem key={report.user_id} report={report} />
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}





