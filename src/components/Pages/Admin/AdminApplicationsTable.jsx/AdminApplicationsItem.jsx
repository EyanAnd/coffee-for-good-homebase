import { useDispatch } from "react-redux"
import {
    Tr,
    Td,
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    ModalOverlay,
} from '@chakra-ui/react'
import TableContent from "./TableContent";

export default function AdminApplicationsItem({ app }) {

    // initalize useDisclosure
    const { isOpen, onOpen, onClose } = useDisclosure();

    // initalize use disaptch
    const dispatch = useDispatch();
    // on click function to do a PUT request to update the application to approved
    // on click delete an application
    return (
        <Tr key={app.user_id}>
            <Td onClick={onOpen}> {app.name}</Td>
            <Modal size={'full'} isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader>{app.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} color={'brand.500'}>
                        {isOpen && <TableContent app={app} />}
                    </ModalBody>
                    <ModalFooter>
                        <Button color={'brand.300'} variant={'solid'} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant={'ghost'} color={'brand.500'} onClick={() => dispatch({ type: 'APPROVE_APP', payload: app.user_id })}>Approve</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Td>{!app.approved ? <Button variant='ghost' size='sm' onClick={() => dispatch({ type: 'APPROVE_APP', payload: app.user_id })}>Approve</Button> :
                <Button variant='ghost' size='sm'>Approved</Button>}</Td>
            <Td><Button variant='ghost' size='sm' onClick={() => dispatch({ type: 'DELETE_APP', payload: app.user_id })}>Delete</Button></Td>
        </Tr >
    )
}