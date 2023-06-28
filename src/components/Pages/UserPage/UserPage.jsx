import React, { useEffect } from 'react';
import LogOutButton from '../../Shared/LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, ChakraProvider, Container, Flex, FormLabel, Hide, theme } from '@chakra-ui/react'
import { Heading, Text, Stack } from '@chakra-ui/react'

function UserPage({ forRealSubmit, setForRealSubmit }) {

  console.log(forRealSubmit)

  const user = useSelector((store) => store.user);
  const application = useSelector((store) => store.applicationReducer);
  console.log(application)
  const adminApplications = useSelector(store => store.adminApplicationReducer)
  const isUserApplicationSubmitted = adminApplications.some((adminApplications) => adminApplications.user_id === user.id)
  console.log(isUserApplicationSubmitted)
  const history = useHistory();
  console.log(application)



  // init useDispatch
  const dispatch = useDispatch();
  // initalize useEffect to get the adminApplications
  useEffect(() => {
    dispatch({ type: 'FETCH_ADMIN_APPS' })
  }, [dispatch])

  const getApplicationStatus = () => {
    if (!application.app_id) {
      return "Application Status: not started";
    } else if (application.app_id && !application.approved) {
      return "Application Status: Pending";
    } else if (application.app_id && application.approved) {
      return "Application Status: Approved";
    } else if (!forRealSubmit) {
      return 'Not Submitted'
    }
  };

  return (
    <Container maxW={'container.xl'} color={'brand.500'}>
      <Stack spacing={4}>
        <Heading>Welcome, {user.username}!</Heading>
        <Button onClick={() => dispatch({ type: 'IS_SUBMITTED', payload: user.id})}>Click me to set app_submitted to true</Button>
        <Button onClick={() => dispatch({ type: 'IS_STARTED', payload: user.id})}>Click me to set app_started to true</Button>
        {isUserApplicationSubmitted ? (
          <Flex gap={'3rem'} padding={'2rem'} direction={'column'}>
            <Flex gap={'1.5rem'} padding={'1rem'}>
              <Heading>Your Application</Heading>
            </Flex>
            <Flex gap={'0.75rem'} padding={'0.5rem'}>
              <Text>{application.name}</Text>
              <Text>{application.approved}</Text>
              <Text>{application.email}</Text>
              <Text>{application.collab}</Text>
              <Text>{application.imact}</Text>
              <Text>{application.mission}</Text>
              <Text>{application.preious_partners}</Text>
              <Text>{application.reporting}</Text>
              <Text>{application.sharing}</Text>
              <Text>{application.success_stories}</Text>
              <Text>{application.values}</Text>
              <Text>{application.notes}</Text>
            </Flex>
          </Flex>
        )
          : (
            <>
              <Heading size={'lg'}>{getApplicationStatus()}</Heading>
              {user.id !== application.user_id ? (
                <Button w={'fit-content'} justifyContent='left' color={'brand.500'} variant='outline' size='lg' onClick={() => history.push('/application')}>
                  Start Application
                </Button>
              ) : (
                <Button w={'fit-content'} justifyContent={'left'} color={'brand.500'} variant='outline' size='lg' onClick={() => history.push('/application')}>
                  Continue Application
                </Button>
              )}
            </>
          )}
      </Stack>
    </Container>
  );
}

export default UserPage;

