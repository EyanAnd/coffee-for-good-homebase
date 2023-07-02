import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import PartnerReportsItem from "./PartnerReportsItem";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Flex, Heading, Text } from '@chakra-ui/react';

export default function PartnerReports() {
    const reports = useSelector((store) => store.reportsReducer);
    const dispatch = useDispatch();
    const currentPartner = useSelector((store) => store.partnerReducer)
    console.log(currentPartner[0].partner_id)
    
    // bring in user store 
    const user = useSelector(store => store.user);
    console.log(reports)

 
    useEffect(() => {
        dispatch({ type: 'FETCH_PARTNER_REPORTS', payload: { partner_id: currentPartner[0].partner_id } });
    }, [currentPartner]); // Add currentPartner as a dependency to useEffect

    const filteredReports = reports.filter(report => report.partner_id === currentPartner[0].partner_id);



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
                            <Th>Category</Th>
                            <Th>Date Sent</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredReports.map((report) => (          
                            <PartnerReportsItem key={report.id} report={report} />
                            ))}          
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    );
}





