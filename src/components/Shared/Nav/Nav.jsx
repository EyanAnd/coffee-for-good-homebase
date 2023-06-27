import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Flex, Box, Heading, Link as ChakraLink, Text, HStack, Divider, Container } from '@chakra-ui/react';


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
    <Flex height={'80px'} bg={'white'} alignItems="center" justifyContent="space-between">
      <Link to="/home">
        <Heading as="h1" size="md" className="nav-title">
          Coffee For Good
        </Heading>
      </Link>
      <Box fontSize={'lg'} letterSpacing={'wide'} textTransform={'lowercase'}>
        {!user.id && (
          <HStack spacing='24px'>
            <ChakraLink color={'brand.300'} as={Link} className="navLink" to="/login">
              <Text color={'brand.500'}>Login / Register</Text>
            </ChakraLink>
            <ChakraLink color={'brand.300'} as={Link} className="navLink" to="/about">
              <Text color={'brand.500'}>About</Text>
            </ChakraLink>
          </HStack>
        )}

        {isPartner && (
            <HStack spacing='24px'>
              <ChakraLink as={Link} className="navLink" to="/partner/">
                <Text color={'brand.500'}>Home</Text>
              </ChakraLink>
              <ChakraLink as={Link} className="navLink" to="/partner/reports">
                <Text color={'brand.500'}>Reports</Text>
              </ChakraLink>
              <ChakraLink as={Link} className="navLink" to="/contact">
                <Text color={'brand.500'}>Contact Us</Text>
              </ChakraLink>
              <Divider orientation='vertical' color={'brand.500'} />
              <LogOutButton onClick={() => history.push('/login')} />
            </HStack>
        )}

        {user.id && !isPartner && !user.is_admin && (
          <HStack>
            <ChakraLink as={Link} className="navLink" to="/user">
              <Text color={'brand.500'}>Home</Text>
            </ChakraLink>
            <ChakraLink as={Link} className="navLink" to="/user/contact">
              <Text color={'brand.500'}>Contact Us</Text>
            </ChakraLink>
            <ChakraLink as={Link} className="navLink" to="/application">
              <Text color={'brand.500'}>Application</Text>
            </ChakraLink>
            <Divider orientation='vertical' color={'brand.500'} />
            <LogOutButton onClick={() => history.push('/login')} />
          </HStack>
        )}

        {user.is_admin && (
          <HStack spacing='24px'>
            <ChakraLink as={Link} className="navLink" to="/admin/">
              <Text color={'brand.500'}>Home</Text>
            </ChakraLink>
            <ChakraLink as={Link} className="navLink" to="/admin/applications">
              <Text color={'brand.500'}>Applications</Text>
            </ChakraLink>
            <ChakraLink as={Link} className="navLink" to="/admin/reports">
              <Text color={'brand.500'}>Reports</Text>
            </ChakraLink>
            <Divider orientation='vertical' color={'brand.500'} />
            <LogOutButton onClick={() => history.push('/login')} />
          </HStack>
        )}
      </Box>
    </Flex>
  );
}

export default Nav;

