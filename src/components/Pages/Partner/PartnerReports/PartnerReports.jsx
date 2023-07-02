import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import PartnerReportsItem from "./PartnerReportsItem";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Flex, Heading, Text } from '@chakra-ui/react';

export default function PartnerReports() {
    const reports = useSelector((store) => store.partnerReportsReducer);
    const dispatch = useDispatch();
    // bring in user store 
    const user = useSelector(store => store.user);

    useEffect(() => {
        dispatch({ type: 'FETCH_PARTNER_REPORTS' });
    }, []);

    return (

        <Flex direction={'column'} gap={'2rem'} p={'2rem'}>
            <Flex gap={'1rem'}>
                <Heading>Reports Table</Heading>
            </Flex>
            <Text>Hey, {user.username}.</Text>
            <Text> Here are your current reports. Be sure to reach out to us via our <strong>Contact</strong> tab. You can click on the download tab to view any attached documents
                the report. </Text>
            <TableContainer>
                <Table variant="simple" colorScheme="brand">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Category</Th>
                            <Th>Date Sent</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {reports.map((report) => (
                            <PartnerReportsItem report={report} />
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
}





