import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import AdminReportsItem from "./AdminReportsItem";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    Flex, Text, Heading
} from '@chakra-ui/react'


export default function AdminReports() {

    // initalize the store
    const reports = useSelector(store => store.reportsReducer)
    // initalize use dispatch
    const dispatch = useDispatch();

    // initalize user store to get user information
    const user = useSelector(store => store.user)

    // initalize useEffect
    useEffect(() => {
        dispatch({ type: 'FETCH_REPORTS' })
    }, [])
    return (
        <Flex direction={'column'} gap={'2rem'} p={'2rem'} >
            <Flex>
                <Heading>Admin Reports Table</Heading>
            </Flex>
            <Text>
                Admin can view and send reports in the table. Click on the <strong>Name</strong> to see the report
                click on the <strong>View Documents</strong> to view the document associated with the report.
            </Text>
            <Button color={'brand.400'}>Click Me</Button>
            <Table variant={'simple'} colorScheme="brand">
                <Thead>
                    <Tr>
                        <Td>Name</Td>
                        <Td>Date Sent</Td>
                        <Td>View Documents</Td>
                    </Tr>
                </Thead>
                <Tbody>
                    {/* Map ove the reports and send a report as a prop ot the item component */}
                    {reports.map(report => (
                       <AdminReportsItem report={report} />
                    ))}
                </Tbody>
            </Table>
        </Flex>
    )
}