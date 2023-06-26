import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@chakra-ui/react';


function LogOutButton(props) {

  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <Button colorScheme='brand' variant='ghost'
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={() => {dispatch({ type: 'LOGOUT' });
      history.push('/login')}}
      
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
