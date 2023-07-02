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
    Flex, Text, Heading, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalHeader, ModalFooter, ModalContent, ModalOverlay
} from '@chakra-ui/react'
import AdminReportsForm from "./AdminReportsForm";


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
        dispatch({ type: 'FETCH_PARTNERS' })
    }, [])

    // initalize useDisclosure
    const { isOpen, onOpen, onClose } = useDisclosure();


    return (
        <Flex direction={'column'} gap={'2rem'} p={'2rem'} >
            <Flex>
                <Heading>Admin Reports Table</Heading>
            </Flex>
            <Flex>
            <Text>
                Admin can view and send reports in the table. Click on the <strong>Name</strong> to see the report
                click on the <strong>View Documents</strong> to view the document associated with the report.
            </Text>
            <Button onClick={onOpen} color={'brand.400'}>Add a report</Button>
            <Modal size={'full'} isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={'brand.500'}>Add A Report</ModalHeader>
                    <ModalBody >
                        {isOpen && <AdminReportsForm />}
                    </ModalBody>
                    <ModalFooter>
                    <Button color={'brand.300'} variant={'solid'} onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>
            </Flex>
            <Table variant={'simple'} colorScheme="brand">
                <Thead>
                    <Tr>
                        <Td>Name</Td>
                        <Td>Date Sent</Td>
                        <Td>Category</Td>
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