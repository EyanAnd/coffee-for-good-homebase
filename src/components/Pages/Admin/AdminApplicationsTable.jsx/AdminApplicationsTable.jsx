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
    Flex, Text, Heading
} from '@chakra-ui/react'
import AdminApplicationsItem from "./AdminApplicationsItem"
export default function AdminApplicationsTable() {

    // initalize dispatch
    const dispatch = useDispatch();

    // use effect to ask for the admin applications
    useEffect(() => {
        dispatch({ type: 'FETCH_ADMIN_APPS' })
    }, [dispatch])
    // grab applications table from the store. 
    const applications = useSelector(store => store.adminApplicationReducer)
    console.log(applications);

    // Map over the store and display the applciants name and status 
    return (
        <Flex direction={'column'} gap={'2rem'} p={'2rem'}>
            <Flex gap={'1rem'} >
                <Heading>Current Applications</Heading>
            </Flex>
            <Flex>
                <Text>
                    This is where all submitted applications will show up. Admin have the ability to <strong>Approve</strong> or <strong>Delete</strong> a users application. If approved, they will become a partner and will have access to our transactional data and customized reports.
                </Text>
            </Flex>
            <Table variant={'striped'} colorScheme="brand">
                <Thead>
                    <Tr>
                        <Td>Name</Td>
                        <Td>Approve</Td>
                        <Td>Delete</Td>
                    </Tr>
                </Thead>
                <Tbody>
                    {applications.map((app, key) => (
                        <AdminApplicationsItem app={app} key={key} />
                    ))}
                </Tbody>
            </Table>
        </Flex>
    )
}