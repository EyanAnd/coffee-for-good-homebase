import { Flex, Heading, Select, useDisclosure, FormControl, FormLabel, Textarea, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function AdminReportsForm() {


    // import useState to set the state of the report
    const [newReport, setNewReport] = useState({
        name: '', description: '', date_sent: '',
        file_path: ''
    })
    // import use dispatch to send the POST and the put to update the forms for
    // partner that the admin is sending the report to as well as the admin themselves.
    const dispatch = useDispatch();
    // import use selector to grab the store of partners.
    const currentPartners = useSelector(store => store.adminFetchPartnerReducer)
    console.log(currentPartners)
    // import modal useDisclosure to close the modal on a timeout the admin has created the report
    const { isOpen, onOpen, onClose, } = useDisclosure();




    return (
        <Flex direction={'column'} gap={'1rem'} p={'1rem'}>
            <Flex>
                <Heading>Add Report Form</Heading>
            </Flex>
            <Flex>
            <FormControl isRequired>
                <FormLabel>Partner Name</FormLabel>
                <Select value={newReport.name} onChange={(e) => setNewReport({ ...newReport, name: e.target.value})}>
                    {currentPartners.map(partner => (
                        <option key={partner.partner_id} value={partner.partner_id}>{partner.name}</option>
                    ))}
                </Select>
            </FormControl>
            </Flex>
            <Flex>
                <FormControl>
                    <FormLabel>Desription of the report</FormLabel>
                    <Textarea value={newReport.description} onChange={(e) => setNewReport({ ...newReport, description: e.target.value})} type='text' />
                </FormControl>
            </Flex>
            <Flex>
                <FormControl>
                    <FormLabel>Category</FormLabel>
                    <Select>
                        Select From Categories Here
                    </Select>
                </FormControl>

            </Flex>
            <Flex>
                <FormControl>
                    <FormLabel>Paste in a File here</FormLabel>
                    <Input placeholder="insert file here" value={newReport.file_path} onChange={(e) => setNewReport({ ...newReport, file_path: e.target.value})}/>
                </FormControl>
            </Flex>
            <Button variant={'ghost'} color={'brand.500'} onClick={() => dispatch({ type: 'ADD_REPORT'})}>Add Report</Button>
        </Flex>
    )
}