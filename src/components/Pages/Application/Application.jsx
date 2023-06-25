import { useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect } from "react"
import { Button, Container, Heading, Input, Stack, StackDivider, Text, Textarea, VStack, Flex, Box } from "@chakra-ui/react"

export default function Application() {

    // TODO conditionally render application if they have submitted one or not.

    // grab current application from the store
    const currentApplication = useSelector(store => store.applicationReducer)
    // initalize history
    const history = useHistory();

    // initalize dispatch
    const dispatch = useDispatch();

    // TODO find out if you really need this here
    const userId = useSelector(store => store.user.id)
    // initalize useEffect
    useEffect(() => {
        dispatch({ type: 'FETCH_APP' })
        console.log("IN USE effect")
    }, [])

    // new useEffect 
    useEffect(() => {
        setApplication({
            ...currentApplication
        })
    }, [currentApplication])

    // set state for the form
    const [application, setApplication] = useState({ id: null, name: '', email: '', mission: '', impact: '', values: '', previous_partners: '', success_stories: '', collab: '', reporting: '', sharing: '', notes: '' })

    // dispatch here to POST in the saga 
    const saveHandler = () => {
        // this will update the application when the user hits the save button
        dispatch({ type: 'UPDATE_APP', payload: application })
    }
    // click handler for dispatch to update the status maybe take the user_id in?
    const applicationSubmit = () => {
        dispatch({ type: 'SUBMIT_APP', payload: application });
        history.push('/user') // push user to new page. 
    }
    return (
        <>
            <Flex direction={'column'} height={'100vh'}>
                <Container flex={1} padding={'1rem'}>
                    <VStack divider={<StackDivider borderColor={'brand.100'} />} spacing={4}>
                        <Box textAlign="left" width="100%">
                            <Heading size={"md"}>Contact Info</Heading>
                        </Box>
                        <label htmlFor="name">Name :<Input variant={'flushed'} type="text" value={application.name} onChange={(e) => setApplication({ ...application, name: e.target.value })} /></label>
                        <label htmlFor="email">Email :<Input variant={'flushed'} type="text" value={application.email} onChange={(e) => setApplication({ ...application, email: e.target.value })} /></label>
                        <Box textAlign="left" width="100%">
                            <Heading size={'md'}>Mission & Values</Heading>
                        </Box>
                        <label htmlFor="mission">Mission :<Textarea type="text" value={application.mission} onChange={(e) => setApplication({ ...application, mission: e.target.value })} /></label>
                        <label htmlFor="impact">Impact :<Textarea type="text" value={application.impact} onChange={(e) => setApplication({ ...application, impact: e.target.value })} /></label>
                        <label htmlFor="values">Values :<Textarea type="text" value={application.values} onChange={(e) => setApplication({ ...application, values: e.target.value })} /></label>
                        <Box textAlign="left" width="100%">
                            <Heading size={'md'}>A Little More About You</Heading>
                        </Box>
                        <label htmlFor="previous-partners">Previous Partners :<Textarea type="text" value={application.previous_partners} onChange={(e) => setApplication({ ...application, previous_partners: e.target.value })} /></label>
                        <label htmlFor="success-stories">Success Stories :<Textarea type="text" value={application.success_stories} onChange={(e) => setApplication({ ...application, success_stories: e.target.value })} /></label>
                        <label htmlFor="collaboration">Collaboration :<Textarea type="text" value={application.collab} onChange={(e) => setApplication({ ...application, collab: e.target.value })} /></label>
                        <label htmlFor="reporting">Reporting :<Textarea type="text" value={application.reporting} onChange={(e) => setApplication({ ...application, reporting: e.target.value })} /></label>
                        <label htmlFor="sharing">Sharing :<Input type="text" value={application.sharing} onChange={(e) => setApplication({ ...application, sharing: e.target.value })} /></label>
                        <label htmlFor="notes">Additonal Notes :<Textarea type="text" value={application.notes} onChange={(e) => setApplication({ ...application, notes: e.target.value })} /></label>
                    </VStack>
                </Container>
                <Flex justify="space-between" padding="1rem">
                    <Button color={'brand.300'} onClick={() => history.push('/user')}>Back</Button>
                    <Button color={'brand.500'} onClick={saveHandler}>Save Application</Button>
                    <Button color={'brand.400'} onClick={applicationSubmit}>Submit</Button>
                </Flex>
            </Flex>
        </>
    )
}