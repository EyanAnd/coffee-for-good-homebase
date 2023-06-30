import React from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';
import { Button, Container, Box, Flex, Image } from '@chakra-ui/react';

function LoginPage() {
  const history = useHistory();

  return (
    <Flex justifyContent={'center'} color={'brand.200'}>
      <Container className='login-page' maxW={'100%'} gap={'8rem'}>
      <LoginForm />
      </Container>
    </Flex>
  );
}

export default LoginPage;

