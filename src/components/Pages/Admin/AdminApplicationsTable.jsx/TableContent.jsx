import { Text, Flex, Table, Thead, Tr, Tbody, Td } from "@chakra-ui/react";

export default function TableContent({ app }) {
    return (
        <Flex height={'300px'} overflowX={'auto'}>
            <Table>
                <Thead>
                    <Tr>
                        <Td>Collaboration</Td>
                        <Td>Email Address</Td>
                        <Td>Impact</Td>
                        <Td>Mission</Td>
                        <Td>Additional Notes</Td>
                        <Td>Previous Partnerships</Td>
                        <Td>Success Stories</Td>
                        <Td>Reporting</Td>
                        <Td>Sharing Info</Td>
                        <Td>Business Values</Td>

                    </Tr>
                </Thead>
                <Tbody>
                <Tr>
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
                </Tr>
                </Tbody>
            </Table>
        </Flex>
    )
}