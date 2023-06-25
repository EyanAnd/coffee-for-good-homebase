import React from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';
import { Button, Container, Box, Flex } from '@chakra-ui/react';

function LoginPage() {
  const history = useHistory();

  return (
    <Box className='login-page' w={'100%'}>
      <LoginForm />
      <Flex justifyContent={'center'}>

        <Button
          color={'brand.500'}
          variant={'outline'}
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </Flex>
    </Box>
  );
}

export default LoginPage;

