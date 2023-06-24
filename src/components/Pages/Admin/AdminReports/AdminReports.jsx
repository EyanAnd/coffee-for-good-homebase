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
} from '@chakra-ui/react'


export default function AdminReports() {

    // initalize the store
    const reports = useSelector(store => store.reportsReducer)
    // initalize use dispatch
    const dispatch = useDispatch();

    // initalize useEffect
    useEffect(() => {
        dispatch({ type: 'FETCH_REPORTS' })
    }, [])
    return (
        <>
        {/* TODO: STRETCH GOAL<div className="button">
            <button>Add A new report</button>
        </div> */}
            <Table>
                <Thead>
                    <Tr>
                        <Td>Name</Td>
                        <Td>Description</Td>
                        <Td>Date Sent</Td>
                    </Tr>
                </Thead>
                <Tbody>
                    {/* Map ove the reports and send a report as a prop ot the item component */}
                    {reports.map(report => (
                       <AdminReportsItem report={report} />
                    ))}
                </Tbody>
            </Table>
        </>
    )
}