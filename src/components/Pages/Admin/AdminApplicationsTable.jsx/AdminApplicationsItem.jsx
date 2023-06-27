import { useDispatch } from "react-redux"
import { useState } from "react";
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
    Text
} from '@chakra-ui/react'
import { useTheme } from "@emotion/react";

export default function AdminApplicationsItem({ app }) {
    
    // initalize useDisclosure
    const { isOpen, onOpen, onClose } = useDisclosure();

    // initalize use theme
    const theme = useTheme();
    // initalize use disaptch
    const dispatch = useDispatch();
    console.log(app);
    // initalize use state
    // const [showDescription, setShowDescription] = useState(false)
    // on click function to do a PUT request to update the application to approved
    // on click delete an application
    return (
            <Tr onClick={onOpen} key={app.user_id}>
                <Td>{app.name}</Td>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>{app.name}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6} color={'brand.500'}>
                                <Text>Collaboration: {app.collab}</Text>
                                <Text> Email Address: {app.email}</Text>
                                <Text>Impact: {app.impact}</Text>
                                <Text>Mission: {app.mission}</Text>
                                <Text>Additional Notes{app.notes}</Text>
                                <Text>Previous Partnerships: {app.previous_partners}</Text>
                                <Text>Success Stories: {app.success_stories}</Text>
                                <Text>Reporting: {app.reporting}</Text>
                                <Text>Sharing Info: {app.sharing}</Text>
                                <Text>Business Values: {app.values}</Text>
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
                            <Td><Button  variant='ghost' size='sm' onClick={() => dispatch({ type: 'DELETE_APP', payload: app.user_id })}>Delete</Button></Td>
                </Tr >
    )
}