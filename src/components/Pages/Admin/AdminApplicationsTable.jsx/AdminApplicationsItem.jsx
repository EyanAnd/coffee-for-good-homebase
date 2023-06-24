import { useDispatch } from "react-redux"
import { useState } from "react";
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
} from '@chakra-ui/react'

export default function AdminApplicationsItem({ app }) {


    // initalize use disaptch
    const dispatch = useDispatch();
    console.log(app);
    // initalize use state
    const [showDescription, setShowDescription] = useState(false)
    // on click function to do a PUT request to update the application to approved
    // on click delete an application
    return (
                <Tr key={app.user_id} onClick={() => setShowDescription(!showDescription)}>
                    <Td>{app.name}</Td>
                    {showDescription ? (
                        <>
                            <Td>{app.collab}</Td>
                            <Td>{app.email}</Td>
                            <Td>{app.impact}</Td>
                            <Td>{app.mission}</Td>
                            <Td>{app.notes}</Td>
                            <Td>{app.previous_partners}</Td>
                            <Td>{app.success_stories}</Td>
                            <Td>{app.reporting}</Td>
                            <Td>{app.sharing}</Td>
                            <Td>{app.values}</Td>
                        </>) : (<>
                            <Td> {!app.approved ? <Button colorScheme='brand' variant='outline' size='sm' onClick={() => dispatch({ type: 'APPROVE_APP', payload: app.user_id })}>Approve</Button> :
                                <button>Approved</button>}</Td>
                            <Td><Button colorScheme='brand' variant='outline' size='sm' onClick={() => dispatch({ type: 'DELETE_APP', payload: app.user_id })}>Delete</Button></Td>
                        </>)}
                </Tr >
    )
}