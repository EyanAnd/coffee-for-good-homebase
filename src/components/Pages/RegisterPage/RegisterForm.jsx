
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Flex, Text, Container, Heading, FormLabel, Input } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';


function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogin = (event) => {
    history.push('/login');

  };
  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <Flex color={'brand/500'} align={'center'} direction={'column'} className="formPanel" onSubmit={registerUser}>
      <Flex gap={'2rem'} padding={'2rem'}>
        <Heading>Register User</Heading>
      </Flex>
      {errors.registrationMessage && (
        <Heading size={'sm'} className="alert" role="alert">
          {errors.registrationMessage}
        </Heading>
      )}
      <Container>
        <FormLabel color={'brand.500'} htmlFor="username">
          Username:
          <Input
            variant={'flushed'}
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormLabel>
      </Container>
      <Container>
        <FormLabel color={'brand.500'} htmlFor="password">
          Password:
          <Input
            variant={'flushed'}
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormLabel>
      </Container>
      <Flex align={'center'} justifyContent={'space-between'} gap={'2rem'}>
        <Button color={'brand.500'} variant={'outline'} onClick={registerUser} type="submit" name="submit" value="Register">Register</Button>
        <Text paddingLeft={'6rem'}>Already a Member?</Text>
        <Button color={'brand.500'} variant={'outline'} onClick={onLogin}>
          Login
        </Button>
      </Flex>
    </Flex>
  );
}

export default RegisterForm;
