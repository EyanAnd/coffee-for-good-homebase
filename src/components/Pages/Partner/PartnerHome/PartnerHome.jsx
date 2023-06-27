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
} from "@chakra-ui/react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["rgb(43, 60, 87)", "#858a7a", "#9e6b42", "#E9DCCF", "#DDC6A6", "#76818E", "#CC7E85", "#B0C0BC", "#453F3C", "#F6AE2D", "#F26419", "#FE6D73", "#FFCB77",
 "#563635", "#6E9075", "#5B6057", "639FAB", "#94524A", "#A27E6F", "#C94277", "#EAE151", "#CEC3C1", "#8332AC" , "#BAD1CD", "#462749", "#76E5FC", "#76E5FC", "#88665D",
  "#BCAA99", "#C2B97F", "#007EA7", "#00171F", "#B3001B", "#255C99", "CCAD8F", "#D6D9CE", "#F3DAD8", "#F4C3C2", "#F1B5CB", "#2F0601", "#553A41", "#32908F", "#26C485", 
  "#A3E7FC", "#374B4A", "#526760", "#8B8BAE", "#88D9E6",  "#C5FFFD", "#92BFB1"];


export default function PartnerHome() {
    const cfg = useSelector((store) => store.transactionDataReducer);
    const dispatch = useDispatch();
    console.log(cfg);

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
        <Box p={4}>
            <SimpleGrid columns={[1, 2]} spacing={4}>
                {responseOrder.map((key, index) => {
                    const response = cfg[key];
                    console.log(response)
                    if (!response) {
                        return null; // Skip rendering if response is undefined
                    }

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
                        <Card  align='center' textAlign={'center'} justifyContent={'center'} w={'50%'} key={key} boxShadow="md">
                            <CardHeader>
                                <Heading color={'brand.500'} as="h2" size="md">
                                    {key === "response1" && "Amount Of Shipping items per state"}
                                    {key === "response2" && "Amount of orders per channel"}
                                    {key === "response3" && "Get Type of orders per state"}
                                </Heading>
                            </CardHeader>
                            <CardBody>
                                
                                <PieChart width={200} height={200}>
                                    <Pie
                                        data={data}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        onMouseEnter={(event) =>
                                            handleMouseEnter(key, event.index)
                                        }
                                        onMouseLeave={() => handleMouseLeave(key)}
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    {activeIndex !== null && (
                                        <Tooltip
                                            label={data[activeIndex]?.name}
                                            aria-label={data[activeIndex]?.name}
                                            bg="gray.800"
                                            color="white"
                                            placement="top"
                                        >
                                            <Box
                                                as="span"
                                                display="inline-block"
                                                backgroundColor={data[activeIndex]?.color}
                                                borderRadius="full"
                                                p={1}
                                                ml={2}
                                            >
                                                {data[activeIndex]?.value}
                                            </Box>
                                        </Tooltip>
                                    )}
                                </PieChart>
                         
                            </CardBody>
                        </Card>
                    );
                })}
                <Card textAlign={'center'} w={'50%'} key={'response4'} boxShadow="md">
                    <CardBody>
                        <Stat>
                            <StatLabel color={'brand.500'}>States</StatLabel>
                            <StatNumber>${cfg.orders_per_channel_type?.state_count || 'Loading...'}</StatNumber>
                            <StatHelpText>
                                <StatArrow type='increase' />
                                23.36%
                            </StatHelpText>
                        </Stat>
                    </CardBody>
                </Card>
                <Card textAlign={'center'} w={'50%'} key={'response5'} boxShadow="md">
                    <CardBody>
                        <Stat>
                            <StatLabel color={'brand.500'}>All Donations</StatLabel>
                            <StatNumber>${cfg.total_sum?.sum || 'Loading...'}</StatNumber>
                            <StatHelpText>
                                <StatArrow type='increase' />
                                23.36%
                            </StatHelpText>
                        </Stat>
                    </CardBody>
                </Card>
                <Card textAlign={'center'} w={'50%'} key={'response6'} boxShadow="md">
                    <CardBody >
                        <Stat>
                            <StatLabel color={'brand.500'}> Total Orders</StatLabel>
                            <StatNumber>{cfg.total_orders?.count || 'Loading...'}</StatNumber>
                            <StatHelpText>
                                <StatArrow type='increase' />
                                23.36%
                            </StatHelpText>
                        </Stat>
                    </CardBody>
                </Card>
            </SimpleGrid>
        </Box>
    );
}






