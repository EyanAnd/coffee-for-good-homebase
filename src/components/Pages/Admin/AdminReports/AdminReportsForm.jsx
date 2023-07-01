import { Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function AdminReportsForm() {


    // import useState to set the state of the report

    // import use dispatch to send the POST and the put to update the forms for
    // partner that the admin is sending the report to as well as the admin themselves.

    // import use selector to grab the store of partners.
    const currentPartners = useSelector(store => store.partnerReducer)
    console.log(currentPartners)
    // import modal useDisclosure to close the modal on a timeout the admin has created the report





    return (
        <Flex>
            
        </Flex>
    )
}