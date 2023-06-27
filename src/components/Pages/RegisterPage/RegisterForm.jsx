
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Heading, FormLabel, Input } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

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
    <Container className="formPanel" onSubmit={registerUser}>
      <Heading>Register User</Heading>
      {errors.registrationMessage && (
        <Heading size={'sm'} className="alert" role="alert">
          {errors.registrationMessage}
        </Heading>
      )}
      <Container>
        <FormLabel color={'brand.500'} htmlFor="username">
          Username:
          <Input
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
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormLabel>
      </Container>
      <Container justifyContent={'space-between'}>
        <Button color={'brand.500'} variant={'outline'} onClick={registerUser} type="submit" name="submit" value="Register">Register</Button>
        <Button align={'right'} color={'brand.500'}
          variant={'outline'}

          type="button"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
      </Container>
    </Container>
  );
}

export default RegisterForm;
