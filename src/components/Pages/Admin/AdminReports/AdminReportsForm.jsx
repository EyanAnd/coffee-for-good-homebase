import { Flex, Heading, Select, useDisclosure, FormControl, FormLabel, Textarea, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

export default function AdminReportsForm() {

    // import useState to set the state of the report
    const [newReport, setNewReport] = useState({
        name: '', partner_id: '',user_id: '', date_sent: '', description: '', category: '', file_path: ''
    })
    // import use dispatch to send the POST and the put to update the forms for
    // partner that the admin is sending the report to as well as the admin themselves.
    const dispatch = useDispatch();
    // import use selector to grab the store of partners.
    const currentPartners = useSelector(store => store.adminFetchPartnerReducer)

    // import modal useDisclosure to close the modal on a timeout the admin has created the report
    const { isOpen, onOpen, onClose, } = useDisclosure();

    const categories = ['Quarterly Reports', 'Earnings Reports', 'News Updates', 'Announcements']
    
    const submitReportHandler = () => {
            const currentDate = moment().format("YYYY-MM-DD");
            console.log('current date: ', currentDate )
            setNewReport(prevState => ({ ...prevState, date_sent: currentDate }));
            dispatch({ type: 'ADD_REPORT', payload: newReport });   
    }

    return (
        <Flex direction={'column'} gap={'1rem'} p={'1rem'}>
            <Flex>
                <Heading>Add Report Form</Heading>
            </Flex>
            <Flex>
                <FormControl isRequired>
                    <FormLabel>Partner Name</FormLabel>
                    <Select value={newReport.name} onChange={(e) => {
                        const selectedPartner = currentPartners.find(partner => partner.name === e.target.value);
                        setNewReport(prevState => ({ ...prevState, name: e.target.value, partner_id: selectedPartner ? selectedPartner.partner_id : '' }));
                        
                    }}>

                        {currentPartners.map(partner => (
                            <option key={partner.partner_id} value={partner.name} >{partner.name}</option>
                        ))}
                    </Select>
                </FormControl>
            </Flex>
            <Flex>
                <FormControl>
                    <FormLabel>Desription of the report</FormLabel>
                    <Textarea value={newReport.description} onChange={(e) => setNewReport(prevState => ({ ...prevState, description: e.target.value }))} type='text' />
                </FormControl>
            </Flex>
            <Flex>
                <FormControl>
                    <FormLabel>Category</FormLabel>
                    <Select value={newReport.category} onChange={(e) =>  setNewReport(prevState => ({ ...prevState, category: e.target.value }))}>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </Select>
                </FormControl>

            </Flex>
            <Flex>
                <FormControl>
                    <FormLabel>Paste in a File here</FormLabel>
                    <Input type="link" placeholder="insert link here" value={newReport.file_path} onChange={(e) =>  setNewReport(prevState => ({ ...prevState, file_path: e.target.value }))} />
                </FormControl>
            </Flex>
            <Button variant={'ghost'} color={'brand.500'} onClick={submitReportHandler}>Add Report</Button>
        </Flex>

    )
}