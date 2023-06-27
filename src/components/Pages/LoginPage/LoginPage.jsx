import React from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';
import { Button, Container, Box, Flex } from '@chakra-ui/react';

function LoginPage() {
  const history = useHistory();

  return (
    <Box className='login-page' w={'100%'}>
      <LoginForm />
    </Box>
  );
}

export default LoginPage;

