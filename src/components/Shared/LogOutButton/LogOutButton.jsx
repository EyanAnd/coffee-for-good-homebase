import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@chakra-ui/react';


function LogOutButton() {

  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <Button textTransform={'lowercase'} colorScheme='brand' variant='unstyled'
    // on click, run the logout dispatch. Then push them to the login page.
      onClick={() => {dispatch({ type: 'LOGOUT' });
      history.push('/login')}}    
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
