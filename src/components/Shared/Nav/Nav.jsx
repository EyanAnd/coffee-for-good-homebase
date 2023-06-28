import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Flex, Box, Heading, Link as ChakraLink, Text, HStack, Divider, Container, Image } from '@chakra-ui/react';


function Nav() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const partner = useSelector((store) => store.partnerReducer);
  const isPartner = partner.some((partner) => partner.user_id === user.id);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'FETCH_PARTNER' });
    dispatch({ type: 'FETCH_DATA' })
  }, []);

  return (
    <Flex justifyContent={'space-between'} align={'center'} bg={'white'} >
      <Link to="/home">
        <Flex align={'center'}>
            <Box h={16} w={16}>
            <Image src='/images/cfg_dark_logo.png' alt='Coffee For Good' />
            </Box>
        </Flex>
      </Link>
      <Flex align={'center'} gap={2} p={6} paddingBottom={3} display={'flex'}>
        {!user.id && (
          <Flex pr={6} gap={'2rem'} textTransform={'lowercase'} letterSpacing={'wide'}>
            <ChakraLink as={Link} to="/login">
              <Text color={'brand.500'}>Login / Register</Text>
            </ChakraLink>
            <ChakraLink as={Link} to="/about">
              <Text color={'brand.500'}>About</Text>
            </ChakraLink>
          </Flex>
        )}

        {isPartner && (
          <Flex gap={'2rem'} textTransform={'lowercase'} letterSpacing={'wide'} >
            <ChakraLink as={Link} to="/partner/">
              <Text color={'brand.500'}>Home</Text>
            </ChakraLink>
            <ChakraLink as={Link} to="/partner/reports">
              <Text color={'brand.500'}>Reports</Text>
            </ChakraLink>
            <ChakraLink as={Link} to="/contact">
              <Text color={'brand.500'}>Contact</Text>
            </ChakraLink>
            <Divider orientation='horizontal' color={'brand.500'} />
          </Flex>
        )}

        {user.id && !isPartner && !user.is_admin && (
          <Flex gap={'2rem'} textTransform={'lowercase'} letterSpacing={'wide'} >
            <ChakraLink as={Link} to="/user">
              <Text color={'brand.500'}>Home</Text>
            </ChakraLink>
            <ChakraLink as={Link} to="/user/contact">
              <Text color={'brand.500'}>Contact</Text>
            </ChakraLink>
            <ChakraLink as={Link} to="/application">
              <Text color={'brand.500'}>Application</Text>
            </ChakraLink>
            <Divider orientation='horizontal' color={'brand.500'} />
          </Flex>
        )}

        {user.is_admin && (
          <Flex  gap={'2rem'} textTransform={'lowercase'} letterSpacing={'wide'} >
            <ChakraLink as={Link} to="/admin/">
              <Text color={'brand.500'}>Home</Text>
            </ChakraLink>
            <ChakraLink as={Link} to="/admin/applications">
              <Text color={'brand.500'}>Applications</Text>
            </ChakraLink>
            <ChakraLink as={Link} to="/admin/reports">
              <Text color={'brand.500'}>Reports</Text>
            </ChakraLink>
            <Divider orientation='horizontal' color={'brand.500'} />
          </Flex>
        )}
        <Flex pr={'1'}>
        <LogOutButton onClick={() => history.push('/login')} />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Nav;

