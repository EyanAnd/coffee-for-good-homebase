import React from "react"
import moment from "moment"
import {
    Tr,
    Td,
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    ModalOverlay,
    Text,
    Heading,
    Button,
    Link
} from '@chakra-ui/react'

export default function AdminReportsItem({ report }) {
    // initalize use Disclosure
    const { isOpen, onOpen, onClose } = useDisclosure();

    // format date for the report
    const formattedDate = moment(report.date_sent).format('MMM Do YY')
    return (
        
            <Tr onClick={onOpen} key={report.id}>
                <Td>{report.name}</Td>
                <Td>{report.category}</Td>
                <Td>{formattedDate}</Td>
                
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{report.name}</ModalHeader>
                    <ModalBody pb={6}>
                        <Heading size={'md'} color={'brand.500'}>Report Description</Heading>
                        <Text>{report.description}</Text>
                        <Link href="/images/project-report.png" target="_blank">View</Link>
                    </ModalBody>
                    <ModalFooter>
                        <Button color={'brand.500'} onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            </Tr>
    )
}