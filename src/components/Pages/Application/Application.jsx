import { useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect } from "react"
import {
    Button, Container, Heading, Input, Stack, StackDivider,
    Text, Textarea, VStack, Flex, Box,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    HStack,
    Divider,
    useDisclosure
} from "@chakra-ui/react"

export default function Application() {
    // grab user store
     const user = useSelector((store) => store.user);
    // initalize useDisclosure for modals
    const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
    // grab current application from the store
    const currentApplication = useSelector(store => store.applicationReducer)
    // initalize history
    const history = useHistory();
    // initalize dispatch
    const dispatch = useDispatch();

    // initalize useEffect
    useEffect(() => {
        dispatch({ type: 'FETCH_APP' })
        console.log("IN USE effect")
    }, [])
    // new useEffect to watch cuurent application
    useEffect(() => {
        setApplication({
            ...currentApplication
        })
    }, [currentApplication])
    // set state for the form
    const [application, setApplication] = useState({ id: null, name: '', email: '', mission: '', impact: '', values: '', previous_partners: '', success_stories: '', collab: '', reporting: '', sharing: '', notes: '' })
    // check admin applications reducer to see if the application matches one in the applciations 
    // dispatch here to POST in the saga 
    const saveHandler = () => {
        // this will update the application when the user hits the save button
        dispatch({ type: 'UPDATE_APP', payload: application })
        // set start application on user to true just to be sure
        dispatch({ type: "IS_STARTED", payload: user.id})
        // push them to the user page
        history.push('/user')
    }
    // click handler for dispatch to update the status maybe take the user_id in?
    const applicationSubmit = () => {
        console.log(application)
        dispatch({ type: 'SUBMIT_APP', payload: application });
        dispatch({ type: "IS_SUBMITTED", payload: user.id})
    }


    //     TODO add alerts to applications
    return (
        <Flex w={'75%'} maxW={'100%'} gap={'1rem'} direction={'column'} >
            <Flex gap={'1rem'} padding={'1rem'} >
                <Heading size={"lg"}>Contact Info</Heading>
            </Flex>
            <Flex gap={'0.5rem'} padding={'1rem'} >
                <FormControl>
                    <FormLabel>Name:</FormLabel>
                    <Input variant={'flushed'} type="email" value={application.name} onChange={(e) => setApplication({ ...application, name: e.target.value })} />
                    <FormLabel>Email Address:</FormLabel>
                    <Input variant={'flushed'} type="text" value={application.email} onChange={(e) => setApplication({ ...application, email: e.target.value })} />
                </FormControl>
            </Flex>
            <Flex gap={'1rem'} padding={'1rem'}>
                <Heading size={'lg'}>Mission & Values</Heading>
            </Flex>
            <Flex gap={'0.5rem'} padding={'1rem'}>
                <FormControl >
                    <FormLabel>Mission:</FormLabel>
                    <Textarea type="text" value={application.mission} onChange={(e) => setApplication({ ...application, mission: e.target.value })} />
                    <FormLabel>Impact:</FormLabel>
                    <Textarea type="text" value={application.impact} onChange={(e) => setApplication({ ...application, impact: e.target.value })} />
                    <FormLabel>Values:</FormLabel>
                    <Textarea type="text" value={application.values} onChange={(e) => setApplication({ ...application, values: e.target.value })} />
                </FormControl>
            </Flex>
            <Flex gap={'1rem'} padding={'1rem'}>
                <Heading size={'lg'}>A Little More About You</Heading>
                <Divider color={'brand.300'} />
            </Flex>
            <Flex gap={'0.5'} padding={'1rem'}>
                <FormControl>
                    <FormLabel>Previous Partners:</FormLabel>
                    <Textarea type="text" value={application.previous_partners} onChange={(e) => setApplication({ ...application, previous_partners: e.target.value })} />
                    <FormLabel>Success Stories:</FormLabel>
                    <Textarea type="text" value={application.success_stories} onChange={(e) => setApplication({ ...application, success_stories: e.target.value })} />
                    <FormLabel>Collaboration:</FormLabel>
                    <Textarea type="text" value={application.collab} onChange={(e) => setApplication({ ...application, collab: e.target.value })} />
                    <FormLabel>Reporting:</FormLabel>
                    <Textarea type="text" value={application.reporting} onChange={(e) => setApplication({ ...application, reporting: e.target.value })} />
                    <FormLabel>Sharing:</FormLabel>
                    <Input type="text" value={application.sharing} onChange={(e) => setApplication({ ...application, sharing: e.target.value })} />
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
                                We will review your applciation and get back to you by email or phone call within 72 horus.
                            </AlertDescription>
                        </Box>
                        <CloseButton
                            alignSelf={'flex-start'}
                            position={'relative'}
                            right={-1}
                            top={-1}
                            onClick={applicationSubmit}
                            
                        />
                    </Alert>)
                    :
                    <Button justifyContent={'right'} color={'brand.400'} onClick={onClose}>Submit</Button>
                }
            </Flex>
        </Flex>
    )
}