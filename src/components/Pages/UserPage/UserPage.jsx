import React from 'react';
import LogOutButton from '../../Shared/LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, ChakraProvider, Container, theme } from '@chakra-ui/react'
import { Heading, Text, Stack } from '@chakra-ui/react'

function UserPage({ ...theme }) {
  const user = useSelector((store) => store.user);
  const application = useSelector((store) => store.applicationReducer);
  const history = useHistory();
  console.log(application)

  const getApplicationStatus = () => {
    if (!application.app_id) {
      return "Application Status: not started";
    } else if (application.app_id && !application.approved) {
      return "Application Status: pending";
    } else if (application.app_id && application.approved) {
      return "Application Status: approved";
    }
  };

  return (
    <Container maxW={'container.xl'} color={'brand.500'}>
      <Stack spacing={4}>
        <Heading letterSpacing={"0.1rem"}>Welcome, {user.username}!</Heading>

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
      </Stack>
    </Container>
  );
}

export default UserPage;

