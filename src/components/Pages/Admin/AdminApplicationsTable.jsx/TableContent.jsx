import { Text, Flex, Table, Thead, Tr, Tbody, Td, Heading } from "@chakra-ui/react";

export default function TableContent({ app }) {

    console.log(app)
    return (
        <Flex direction={'column'} gap={'2rem'} padding={'1rem'}>
            <Flex>
                <Heading>Details for {app.name}'s application</Heading>
            </Flex>
            <Flex>
                <Text>This will give the admin a deeper dive into their application and ultimately let them know more about them
                    before reaching out to connect more. 
                </Text>
            </Flex>
            <Table display={'table-column'}  overflowx={'auto'}>
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
                    <Td>{app.sharing === true ? 'Yes' : 'No'}</Td>
                    <Td>{app.values}</Td>
                </Tr>
                </Tbody>
            </Table>
        </Flex>
    )
}