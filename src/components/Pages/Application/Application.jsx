import { useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect } from "react"
import {
    Button, Heading, Input, Textarea, Flex, Box, FormControl,
    FormLabel, FormHelperText, Divider, useDisclosure, Alert,
    AlertDescription, AlertIcon, CloseButton, AlertTitle, Checkbox, Progress
} from "@chakra-ui/react"

export default function Application() {

    // grab user store
    const user = useSelector((store) => store.user);
    // initalize useDisclosure for modals
    const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
    // initalize history
    const history = useHistory();
    // initalize dispatch
    const dispatch = useDispatch();
    
    // initalize useEffect
    useEffect(() => {
        dispatch({ type: 'FETCH_APP' })
        console.log("IN USE effect")
    }, [])
    // new useEffect to watch curent application
    useEffect(() => {
        setApplication({
            ...currentApplication
        })
    }, [currentApplication])
    // grab current application from the store
    const currentApplication = useSelector(store => store.applicationReducer)
    const [application, setApplication] = useState({ id: null, name: '', email: '', mission: '', impact: '', values: '', previous_partners: '', success_stories: '', collab: '', reporting: '', sharing: '', notes: '' })


    // dispatch here to POST in the saga 
    const saveHandler = () => {
        // this will update the application when the user hits the save button
        dispatch({ type: 'UPDATE_APP', payload: application })
        // set start application on user to true just to be sure
        dispatch({ type: "IS_STARTED", payload: user.id })
        // push them to the user page
        history.push('/user')
    }
    // click handler for dispatch to update the status maybe take the user_id in?
    const applicationSubmit = () => {
        dispatch({ type: 'UPDATE_APP', payload: application })
        dispatch({ type: 'SUBMIT_APP', payload: application });
        dispatch({ type: "IS_SUBMITTED", payload: user.id });

    }

    // run the application submit function, then push them to the home page.
    const closeHandler = () => {
        onClose();
        applicationSubmit();
        history.push('/user')
    }

    // set the checked for sharing reports to true.
    const handleSharingChange = (e) => {
        const { checked } = e.target
        setApplication({ ...application, sharing: checked })
    }

    // progress bar calculation
    const calculateProgress = () => {
        const { name, email, mission, impact, values, previous_partners, success_stories, collab, reporting, sharing, notes } = application;
        const totalFields = 10; 
        let filledFields = 0;

        if (name) filledFields++;
        if (email) filledFields++;
        if (mission) filledFields++;
        if (impact) filledFields++;
        if (values) filledFields++;
        if (previous_partners) filledFields++;
        if (success_stories) filledFields++;
        if (collab) filledFields++;
        if (reporting) filledFields++;
        if (sharing) filledFields++;
        if (notes) filledFields++;

        return (filledFields / totalFields) * 100;
    };

    return (
        <Flex justifyContent={'center'} maxW={'100%'} gap={'1rem'} direction={'column'} >
            <Flex gap={'1rem'} padding={'1rem'} >
                <Heading size={"lg"}>Contact Info</Heading>
            </Flex>   
                <Progress value={calculateProgress()} bg={'brand.400'} colorScheme="brand"  size="lg" />
            <Flex gap={'0.5rem'} padding={'1rem'} >
                <FormControl isRequired>
                    <FormLabel>What is the name of your organization? :</FormLabel>
                    <Input variant={'flushed'} type="email" value={application.name} onChange={(e) => setApplication({ ...application, name: e.target.value })} />
                    <FormLabel>What is your Email Address? :</FormLabel>
                    <Input variant={'flushed'} type="text" value={application.email} onChange={(e) => setApplication({ ...application, email: e.target.value })} />
                </FormControl>
            </Flex>
            <Flex gap={'1rem'} padding={'1rem'}>
                <Heading size={'lg'}>Mission & Values</Heading>
            </Flex>
            <Flex gap={'0.5rem'} padding={'1rem'}>
                <FormControl isRequired>
                    <FormLabel>Describe your businesses Mission:</FormLabel>
                    <Textarea type="text" value={application.mission} onChange={(e) => setApplication({ ...application, mission: e.target.value })} />
                    <FormLabel>What measurable outcomes or impact have your programs achieved? :</FormLabel>
                    <Textarea type="text" value={application.impact} onChange={(e) => setApplication({ ...application, impact: e.target.value })} />
                    <FormLabel>How does your organization's mission align with our company's focus on helping women and children in crisis? :</FormLabel>
                    <Textarea type="text" value={application.values} onChange={(e) => setApplication({ ...application, values: e.target.value })} />
                </FormControl>
            </Flex>
            <Flex gap={'1rem'} padding={'1rem'}>
                <Heading size={'lg'}>A Little More About You</Heading>
                <Divider color={'brand.300'} />
            </Flex>
            <Flex gap={'0.5'} padding={'1rem'}>
                <FormControl isRequired>
                    <FormLabel>Have you previously partnered with other businesses or organizations? If yes, please provide details. :</FormLabel>
                    <Textarea type="text" value={application.previous_partners} onChange={(e) => setApplication({ ...application, previous_partners: e.target.value })} />
                    <FormLabel>Can you provide any success stories or testimonials from individuals or communities you have helped? :</FormLabel>
                    <Textarea type="text" value={application.success_stories} onChange={(e) => setApplication({ ...application, success_stories: e.target.value })} />
                    <FormLabel>How do you envision partnering with our coffee roasting company? Do you have any specific ideas or proposals? :</FormLabel>
                    <Textarea type="text" value={application.collab} onChange={(e) => setApplication({ ...application, collab: e.target.value })} />
                    <FormLabel>How do you measure and report the impact of your programs? :</FormLabel>
                    <Textarea type="text" value={application.reporting} onChange={(e) => setApplication({ ...application, reporting: e.target.value })} />
                    <FormLabel>Would you be open to sharing periodic progress reports and updates if we partner together? :</FormLabel>
                    <Checkbox isChecked={application.sharing} onChange={handleSharingChange}>Allow Sharing?</Checkbox>
                    <FormLabel>Additional Notes:</FormLabel>
                    <Textarea type="text" value={application.notes} onChange={(e) => setApplication({ ...application, notes: e.target.value })} />
                    <FormHelperText>If none, write N/A</FormHelperText>
                </FormControl>
            </Flex>
            <Flex gap={'2rem'} paddingRight={'1.25rem'}>
                <Button color={'brand.300'} onClick={() => history.push('/user')}>Back</Button>
                <Button color={'brand.500'} onClick={saveHandler}>Save Application</Button>
                {isVisible ? (
                    <Alert size={'lg'} color={'brand.400'} status='success'>
                        <AlertIcon />
                        <Box>
                            <AlertTitle>Success! Your Application Has Been Submitted</AlertTitle>
                            <AlertDescription>
                                We will review your application and get back to you by email or phone call within 72 hours.
                            </AlertDescription>
                        </Box>
                        <CloseButton
                            alignSelf={'flex-start'}
                            position={'relative'}
                            right={-1}
                            top={-1}
                            onClick={closeHandler}
                        />
                    </Alert>
                ) : (
                    <Button justifyContent={'right'} color={'brand.400'} onClick={onOpen}>
                        Submit
                    </Button>
                )}
            </Flex>
        </Flex>
    );
}