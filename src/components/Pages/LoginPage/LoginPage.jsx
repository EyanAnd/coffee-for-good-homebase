import React from 'react';
import LoginForm from './LoginForm';
import { Container, Flex } from '@chakra-ui/react';

function LoginPage() {

  return (
    <Flex justifyContent={'center'} color={'brand.200'}>
      <Container className='login-page' maxW={'100%'} gap={'8rem'}>
      <LoginForm />
      </Container>
    </Flex>
  );
}

export default LoginPage;

