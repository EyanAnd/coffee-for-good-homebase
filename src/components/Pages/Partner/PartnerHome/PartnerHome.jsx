import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  Box,
  Heading,
  UnorderedList,
  ListItem,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = ["rgb(43, 60, 87)", "#858a7a", "#9e6b42", "#E9DCCF", "DDC6A6"];

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

  const responseOrder = ["response1", "response2", "response3", "response4", "response5", "response6"];

  return (
    <Box p={4}>
      <SimpleGrid columns={[1, 2]} spacing={4}>
        {responseOrder.map((key, index) => {
          const response = cfg[key];

          if (index >= 3) {
            // Render text card for response 4, 5, and 6
            return (
              <Card key={key} boxShadow="md">
                <CardHeader>
                  <Heading as="h2" size="md">
                    {key === "response4" && "Total Sum of all donations"}
                    {key === "response5" && "Total Number of orders"}
                    {key === "response6" && "Amount of states that have ordered"}
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Box p={4}>
                    {response &&
                      Object.entries(response).map(([innerKey, value]) => (
                        <div key={innerKey}>
                          {typeof value === 'object' && value.count 
                          || typeof value === 'object' && value.sum 
                          || typeof value === 'object' && value.sate_count}
                        </div>
                      ))}
                  </Box>
                </CardBody>
              </Card>
            );
          }

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
            <Card key={key} boxShadow="md">
              <CardHeader>
                <Heading as="h2" size="md">
                  {key === "response1" && "Amount Of Shipping items per state"}
                  {key === "response2" && "Amount of orders per channel"}
                  {key === "response3" && "Get Type of orders per state"}
                </Heading>
              </CardHeader>
              <CardBody>
                <PieChart width={300} height={200}>
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
      </SimpleGrid>
    </Box>
  );
}






