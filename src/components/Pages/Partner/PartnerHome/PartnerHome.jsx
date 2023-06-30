import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
    Box,
    Heading,
    SimpleGrid,
    Card,
    CardHeader,
    CardBody,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    StatArrow,
    Flex,
    Button,
    useDisclosure, Table, Thead, Tbody, Tr, Th, Td, Text
} from "@chakra-ui/react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["rgb(43, 60, 87)", "#858a7a", "#9e6b42", "#E9DCCF", "#DDC6A6", "#76818E", "#CC7E85", "#B0C0BC", "#453F3C", "#F6AE2D", "#F26419", "#FE6D73", "#FFCB77",
    "#563635", "#6E9075", "#5B6057", "639FAB", "#94524A", "#A27E6F", "#C94277", "#EAE151", "#CEC3C1", "#8332AC", "#BAD1CD", "#462749", "#76E5FC", "#76E5FC", "#88665D",
    "#BCAA99", "#C2B97F", "#007EA7", "#00171F", "#B3001B", "#255C99", "CCAD8F", "#D6D9CE", "#F3DAD8", "#F4C3C2", "#F1B5CB", "#2F0601", "#553A41", "#32908F", "#26C485",
    "#A3E7FC", "#374B4A", "#526760", "#8B8BAE", "#88D9E6", "#C5FFFD", "#92BFB1"];


export default function PartnerHome() {
    const user = useSelector(store => store.user)
    const cfg = useSelector((store) => store.transactionDataReducer);
    const dispatch = useDispatch();
    console.log(cfg);

    const { isOpen, onOpen, onClose } = useDisclosure();


    useEffect(() => {
        dispatch({ type: "FETCH_DATA" });
    }, [dispatch]);

    const [activeIndices, setActiveIndices] = useState({});

    const handleMouseEnter = (key, index) => {
        setActiveIndices((prevIndices) => ({
            ...prevIndices,
            [key]: index,
        }));
    };

    const handleMouseLeave = (key) => {
        setActiveIndices((prevIndices) => ({
            ...prevIndices,
            [key]: null,
        }));
    };

    const responseOrder = ["response1", "response2", "response3"];

    return (
        <Flex direction="column" gap="1rem" padding="1rem">
            <Heading color="brand.500">Welcome Back, {user.username}</Heading>
            <Flex p={'2rem'}>
                <Heading color={'brand.500'}>Business Data</Heading>
            </Flex>
            <Flex p={'2rem'}>
                <Text>
                    This is where our data will be displayed to our partners. This allows them to see how we are doing in real time and gives insights to 
                    what they can expect to be donated to their business.
                </Text>
            </Flex>
            <Flex justifyContent={"space-evenly"} gap={'1rem'} >
                <Flex>
                    <Stat>
                        <StatLabel color={'brand.500'}>States</StatLabel>
                        <StatNumber>{cfg.orders_per_channel_type?.state_count || 'Loading...'}</StatNumber>
                    </Stat>

                </Flex>
                <Flex >
                    <Flex>
                        <Stat>
                            <StatLabel color={'brand.500'}>All Donations</StatLabel>
                            <StatNumber>${cfg.total_sum?.sum || 'Loading...'}</StatNumber>
                        </Stat>
                    </Flex>
                </Flex>
                <Flex>
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
                    console.log(response)

                    const data = response.map((chart, index) => ({
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
                        color: COLORS[index % COLORS.length],
                    }));

                    const activeIndex = activeIndices[key];


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
            </Flex>
        </Flex>
    );
}
