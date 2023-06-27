import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import { Container, Button } from '@chakra-ui/react';

function RegisterPage() {
  const history = useHistory();

  return (
    <Container>
      <RegisterForm />
    </Container>
  );
}

export default RegisterPage;
