import React from "react"
import { useState } from "react"
import moment from "moment"
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

export default function AdminReportsItem({ report }) {
    // initalize useState
    const [showDescription, setShowDescription] = useState(false)

    // format date for the report
    const formattedDate = moment(report.date_sent).format('MMM Do YY')

    // TODO add in on click functionality to view a singular report
    // this will look like getting rid of the description and just keeping the name and the date sent most likely.
    return (
            <Tr key={report.user_id} onClick={() => setShowDescription(!showDescription)}>
                <Td>{report.name}</Td>
                {showDescription ? (
                <Td>{report.description}</Td>) : ( 
                <Td>Click to view description</Td>
                )}
                <Td>{formattedDate}</Td>
            </Tr>
    )
}