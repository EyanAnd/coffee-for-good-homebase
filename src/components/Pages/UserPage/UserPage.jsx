import React, { useEffect } from 'react';
import LogOutButton from '../../Shared/LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Badge, Button, ChakraProvider, Container, Flex, } from '@chakra-ui/react'
import { Heading, Text, Stack } from '@chakra-ui/react'

function UserPage({ forRealSubmit, setForRealSubmit }) {

  console.log(forRealSubmit)

  const user = useSelector((store) => store.user);
  const application = useSelector((store) => store.applicationReducer);
  console.log(application)
  console.log(application.sharing)

  const history = useHistory();

  // init useDispatch
  const dispatch = useDispatch();

  // start application handler
  const startApplicationHandler = () => {
    // dispatch to update users started boolean
    dispatch({ type: 'IS_STARTED', payload: user.id })
    // push to applications page
    history.push('/application')
  }

  // render different things depending on status of application
  const appStatus = () => {
    if (user.app_started) {
      return <Badge color={'brand.400'}>Started</Badge>
    } else if (!user.app_started) {
      return <Badge color={'brand.400'}>Not Started</Badge>
    } else if (user.app_submitted) {
      return <Badge color={'brand.400'}>Submitted</Badge>
    } else if (!user.app_submitted) {
      return <Badge color={'brand.400'}>Not Submitted</Badge>
    }
  }
  return (
    <Flex gap={'2rem'} direction={'column'} align={'center'} color={'brand.500'}>
      <Container >
        <Flex gap={'1rem'} >
          <Heading>Welcome, {user.username}!</Heading>
          <Heading>{appStatus()}</Heading>
        </Flex>
        <Flex gap={'2rem'}>
          {!user.app_started && !user.app_submitted ? (
            <Button onClick={startApplicationHandler}>Start Application</Button>
          ) : user.app_started && !user.app_submitted ? (
            <Button onClick={() => history.push('/application')}>Continue Application</Button>
          ) : null}
          {user.app_submitted &&
            <Flex direction={'column'} gap={'2rem'} p={'1rem'}>
              <Flex gap={'1rem'} >
                <Heading>Your Application</Heading>
              </Flex>
              <Flex gap={'1rem'} >
                <Heading>User Info</Heading>
              </Flex>
              <Flex gap={'1rem'} p={'0.5'}>

                <Text>Name : {application.name}</Text>
                <Text>Email : {application.email}</Text>
              </Flex>
              <Flex gap={'1rem'} p={'0.5'}>
                <Heading>Mission & Values</Heading>
              </Flex>
              <Flex gap={'1rem'} p={'0.5'}>
                <Text>Collaboration : {application.collab}</Text>
                <Text>Mission : {application.mission}</Text>
                <Text>Impact{application.impact}</Text>
                <Text>Values : {application.values}</Text>
              </Flex>
              <Flex gap={'1rem'} p={'0.5'}>
                <Heading>A Little More About You</Heading>
              </Flex>
              <Flex gap={'1rem'} p={'0.5'}>
                <Text>Previous Partners : {application.previous_partners}</Text>
                <Text>Success Stories : {application.success_stories}</Text>
                <Text>Reporting: {application.reporting}</Text>
                <Text>Open to sharing: {application.sharing ? "Yes" : "No"}</Text>
                <Text>Additional Notes : {application.notes}</Text>
              </Flex>
            </Flex>
          }
        </Flex>
      </Container>
    </Flex >
  );
}

export default UserPage;

