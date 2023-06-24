import React from 'react';
import LogOutButton from '../../Shared/LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, ChakraProvider } from '@chakra-ui/react'
import { Heading, Text } from '@chakra-ui/react'

function UserPage() {
  const user = useSelector((store) => store.user);
  const application = useSelector((store) => store.applicationReducer);
  const doesFormExist = useSelector(store => store.existanceReducer);
  const history = useHistory();

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
    <ChakraProvider>
      <div className="container">
        <Heading letterSpacing={"0.1rem"}>Welcome, {user.username}!</Heading>
        <Text>{getApplicationStatus()}</Text>
        {doesFormExist ? (
          <Button variant='blue' onClick={() => history.push('/application')}>
            Continue Application
          </Button>
        ) : (
          <Button variant='outline' color={'navyblue.500'} onClick={() => history.push('/application')}>
            Start Application
          </Button>
        )}
        <LogOutButton variant='outline' color='' />
      </div>
    </ChakraProvider>
  );
}

export default UserPage;

