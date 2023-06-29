import React, { useEffect } from 'react';
import LogOutButton from '../../Shared/LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Badge, Button, ChakraProvider, Container, Flex, FormLabel, Hide, theme } from '@chakra-ui/react'
import { Heading, Text, Stack } from '@chakra-ui/react'

function UserPage({ forRealSubmit, setForRealSubmit }) {

  console.log(forRealSubmit)

  const user = useSelector((store) => store.user);
  const application = useSelector((store) => store.applicationReducer);
  console.log(application)

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
    <Flex gap={'8rem'} direction={'column'} color={'brand.500'}>
      <Flex gap={'4rem'}>
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
          <>
            <Heading>Your Application</Heading>
            <Text>{application.name}</Text>
            <Text>{application.email}</Text>
            <Text>{application.collab}</Text>
            <Text>{application.mission}</Text>
            <Text>{application.mission}</Text>
            <Text>{application.previous_partners}</Text>
            <Text>{application.success_stories}</Text>
            <Text>{application.reporting}</Text>
            <Text>{application.sharing}</Text>
            <Text>{application.values}</Text>
            <Text>{application.notes}</Text>
          </>
        }
      </Flex>
      <Button onClick={() => dispatch({ type: 'IS_SUBMITTED', payload: user.id })}>Click me to set app_submitted to true</Button>
      <Button onClick={() => dispatch({ type: 'IS_STARTED', payload: user.id })}>Click me to set app_started to true</Button>
    </Flex>
  );
}

export default UserPage;

