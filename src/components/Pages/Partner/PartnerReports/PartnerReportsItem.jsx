import moment from 'moment';
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
    Button
} from '@chakra-ui/react'

export default function PartnerReportsItem({ report }) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const formattedDate = moment(report.date_sent).format('MMM Do YY');


    return (
                // <Tr key={report.id}>
                //     <Td>{report.name}</Td>
                //     <Td>{report.description}</Td>
                //     <Td>{formattedDate}</Td>
                // </Tr>
                     <Tr onClick={onOpen} key={report.id}>
                     <Td>{report.name}</Td>
                     <Td>{formattedDate}</Td>
                     <Modal isCentered isOpen={isOpen} onClose={onClose}>
                         <ModalOverlay />
                         <ModalContent>
                             <ModalHeader>{report.name}</ModalHeader>
                             <ModalCloseButton />
                             <ModalBody pb={6}>
                                 <Heading size={'md'} color={'brand.500'} >Report Description</Heading>
                                 <Text>{report.description}</Text>
                             </ModalBody>
                             <ModalFooter>
                                 <Button color={'brand.500'} onClick={onClose}>Close</Button>
                             </ModalFooter>
                         </ModalContent>
                     </Modal>
                 </Tr>
    );
}
