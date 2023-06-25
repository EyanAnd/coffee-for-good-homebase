import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Button, CardBody, Container, Heading, Input } from '@chakra-ui/react';
import { Flex, Card, Box } from '@chakra-ui/react';
import './LoginForm.css'


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <Box >
      <Flex  height={'100vh'} alignItems={'center'}justifyContent={'center'} >
        <Card w={'50%'} bg={'whiteAlpha.400'}>
          <CardBody >
            <form className="formPanel" onSubmit={login} >
              <Heading size='md'>Login</Heading>
              {errors.loginMessage && (
                <Heading size={'sm'} className="alert" role="alert">
                  {errors.loginMessage}
                </Heading>
              )}
              <Container>
                <Input
                  variant={'flushed'}
                  placeholder='Username'
                  type="text"
                  name="username"
                  required
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Container>
              <Container>
                <Input variant={'flushed'} placeholder='Password'
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Container>
              <Flex>
                <Container>
                  <Button color={'brand.500'} variant={'outline'} type="submit" name="submit" value="Log In">Log In</Button>
                </Container>
              </Flex>
            </form>
          </CardBody>
        </Card >
      </Flex>
    </Box>
  );
}

export default LoginForm;
