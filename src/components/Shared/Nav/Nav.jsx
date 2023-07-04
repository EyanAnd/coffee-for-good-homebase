import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Flex, Box, Link as ChakraLink, Text, Divider, Image } from '@chakra-ui/react';


function Nav() {
  // init use history.
  const history = useHistory();
  // init use dispatch.
  const dispatch = useDispatch();
  // grab the user from the store to check if they are a user, and if they are an admin.
  const user = useSelector((store) => store.user);
  // grab the partner store to see if they are a partner.
  const partner = useSelector((store) => store.partnerReducer);
  // logic using the above store to check if the user id matches the user id of the partner.
  const isPartner = partner.some((partner) => partner.user_id === user.id);

  // use effect to fetch the user, partner and data
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'FETCH_PARTNER' });
    dispatch({ type: 'FETCH_DATA' })
  }, []);

  return (
    <Flex justifyContent={'space-between'} align={'center'} bg={'white'} >
      {/* always show these links */}
      <Link to="/home">
        <Flex align={'center'}>
          <Box h={28} w={28}>
            <Image src='/images/cfg_dark_logo.png' alt='Coffee For Good' />
          </Box>
        </Flex>
      </Link>
      <Flex align={'center'} gap={2} p={6} paddingBottom={3} display={'flex'}>
        {!user.id && (
          <Flex pr={6} gap={'2rem'} textTransform={'lowercase'} >
            <ChakraLink as={Link} to="/login">
              <Text color={'brand.500'}>Login / Register</Text>
            </ChakraLink>
            <ChakraLink as={Link} to="/about">
              <Text color={'brand.500'}>About</Text>
            </ChakraLink>
          </Flex>
        )}
        {/* if they are a partner and not an admin, show these links */}
        {isPartner && !user.is_admin && (
          <>
            <Flex gap={'2rem'} textTransform={'lowercase'} >
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
            <Flex pr={'1'}>
              <LogOutButton onClick={() => history.push('/login')} />
            </Flex>
          </>
        )}
        {/* if they are a user, not a partner and not an admin, show these links */}
        {user.id && !isPartner && !user.is_admin && (
          <>
            <Flex gap={'2rem'} textTransform={'lowercase'}  >
              <ChakraLink as={Link} to="/user">
                <Text color={'brand.500'}>Home</Text>
              </ChakraLink>
              <ChakraLink as={Link} to="/user/contact">
                <Text color={'brand.500'}>Contact</Text>
              </ChakraLink>
              {!user.app_submitted &&
                <ChakraLink as={Link} to="/application">
                  <Text color={'brand.500'}>Application</Text>
                </ChakraLink>}
              <Divider orientation='horizontal' color={'brand.500'} />
            </Flex>
            <Flex pr={'1'}>
              <LogOutButton onClick={() => history.push('/login')} />
            </Flex>
          </>
        )}
        {/* if the user is an admin, show these links */}
        {user.is_admin && (
          <>
            <Flex gap={'2rem'} textTransform={'lowercase'}  >
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
            <Flex pr={'1'}>
              <LogOutButton onClick={() => history.push('/login')} />
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
}

export default Nav;