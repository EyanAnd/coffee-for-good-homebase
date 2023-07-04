import { useSelector } from "react-redux";
import {Heading, Stat, StatLabel, StatNumber, Flex, Table,
     Thead, Tbody, Tr, Th, Td, Box, Text } from "@chakra-ui/react";

export default function AdminHome() {
    // initialize use selector to grab the transaction in the store
    const cfg = useSelector((store) => store.transactionDataReducer);
    // initialize the user to be able to get their username to display on the home screen
    const user = useSelector((store) => store.user)

    const responseOrder = ["response1", "response2", "response3"];

    return (
        <Flex direction="column" gap="2rem" padding="2rem">
            <Heading color="brand.500">Welcome Back, {user.username}</Heading>
            <Flex p={'2rem'}>
                <Heading color={'brand.500'}>Business Data</Heading>
            </Flex>
            <Text>
                This is where our data will be displayed for admin.
                This is powerful for admin to see because we have to login to multiple accounts to track all
                of our current transactional data, so having it all available saves us time.
            </Text>
            <Flex  justifyContent={"space-evenly"} >
                <Flex >
                    <Stat>
                        <StatLabel color={'brand.500'}>States</StatLabel>
                        <StatNumber>{cfg.orders_per_channel_type?.state_count || 'Loading...'}</StatNumber>
                    </Stat>

                </Flex>
                <Flex  >
                    <Flex>
                        <Stat>
                            <StatLabel color={'brand.500'}>All Donations</StatLabel>
                            <StatNumber>${cfg.total_sum?.sum || 'Loading...'}</StatNumber>
                        </Stat>
                    </Flex>
                </Flex>
                <Flex >
                    <Flex >
                        <Stat>
                            <StatLabel color={'brand.500'}> Total Orders</StatLabel>
                            <StatNumber>{cfg.total_orders?.count || 'Loading...'}</StatNumber>
                        </Stat>
                    </Flex>
                </Flex>
            </Flex>
            <Flex justifyContent={'space-evenly'} gap={'1rem'} >
                {responseOrder.map((key, index) => {
                    const response = cfg[key];

                    const data = response?.map((chart, index) => ({
                        name:
                            chart.shipping_state ||
                            chart.channel_type ||
                            chart.shipping_method ||
                            chart.sate_count ||
                            'Total Sum' ||
                            'Orders Per State',
                        value: Number(
                            chart.shipment_count ||
                            chart.order_count ||
                            chart.sate_count ||
                            chart.sum ||
                            chart.count ||
                            chart.state_count
                        ),
                        
                    })) || [];

                    return (
                        <Flex direction={"column"} gap={"4rem"} align="center" textAlign={"center"} justifyContent={"center"} key={key}>
                            <Heading color={"brand.500"} size="md">
                                {key === "response1" && "Amount Of Shipping items per state"}
                                {key === "response2" && "Amount of orders per channel"}
                                {key === "response3" && "Get Type of orders per state"}
                            </Heading>
                            <Flex px={"2rem"}>
                                <Box h={'300px'} overflowY={'auto'}>
                                    {/* Render the table */}
                                    <Table variant="simple">
                                        <Thead>
                                            <Tr>
                                                <Th>Category</Th>
                                                <Th isNumeric>Value</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {data.map((entry, index) => (
                                                <Tr key={index}>
                                                    <Td>{entry.name}</Td>
                                                    <Td isNumeric>{entry.value}</Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </Box>
                            </Flex>
                        </Flex>
                    );
                })}
            </Flex >
        </Flex>
    );
}