import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import { Container, Button, Flex } from '@chakra-ui/react';

function RegisterPage() {

  return (
    <Flex paddingTop={'18rem'} height={'100vh'} gap={'4rem'} maxH={'100%'} justifyContent={'center'} >
        <RegisterForm />
    </Flex>
  );
}

export default RegisterPage;
