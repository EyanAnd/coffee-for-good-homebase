import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Button, CardBody, Container, Heading, Input, CardHeader, Image } from '@chakra-ui/react';
import { Flex, Card, Box } from '@chakra-ui/react';
import './LoginForm.css'
import { useHistory } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const history = useHistory();
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

    history.push('/user')
  }; // end login

  return (
    <Box maxW={'100%'}>
      <Flex height={'120vh'} alignItems={'center'} justifyContent={'center'}>
        <Card w={'25%'} color={'brand.500'} bg={'snow'}>
          <CardHeader>
            <Image src={'/images/white-logo.png'} />
          </CardHeader>
          <CardBody>
            <Container h={'275px'}>          
                <Heading size={'md'}>Login</Heading>
              {errors.loginMessage && (
                <Heading size={'sm'} className="alert" role="alert">
                  {errors.loginMessage}
                </Heading>
              )}
              <Container >
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
                <Input
                  variant={'flushed'}
                  placeholder='Password'
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Container>
              <Flex>
                <Container>
                  <Button color={'brand.500'} variant={'outline'} onClick={login}>Log In</Button>
                </Container>
                <Button
                  color={'brand.500'}
                  variant={'outline'}
                  onClick={() => {
                    history.push('/registration');
                  }}
                >
                  Register
                </Button>
              </Flex>
            </Container>
          </CardBody>
        </Card>
      </Flex>
    </Box>
  );
}

export default LoginForm;


