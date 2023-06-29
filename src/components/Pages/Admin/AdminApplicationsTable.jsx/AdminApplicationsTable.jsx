import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
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
import AdminApplicationsItem from "./AdminApplicationsItem"
import { AnimatePresence } from "framer-motion"
export default function AdminApplicationsTable() {

    // initalize dispatch
    const dispatch = useDispatch();

    // use effect to ask for the admin applications
    useEffect(() => {
        dispatch({ type: 'FETCH_ADMIN_APPS' })
    }, [dispatch])
    // grab applications table from the store. 
    const applications = useSelector(store=> store.adminApplicationReducer)
    console.log(applications);
  
    // Map over the store and display the applciants name and status 
    return (
            <Table variant={'striped'} colorScheme="brand">
                    <Thead>
                        <Tr>
                            <Td>Name</Td>
                            <Td>Status</Td>
                        </Tr>
                    </Thead>
                <Tbody>
                        {applications.map((app, key) => (
                            <AdminApplicationsItem  app={app} key={key}/>
                        ))}
                </Tbody>
            </Table>
    )
}