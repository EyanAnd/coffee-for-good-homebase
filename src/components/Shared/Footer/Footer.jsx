import React from 'react';
import './Footer.css';
import { Box, Flex,Text, Link, Icon } from '@chakra-ui/react';


// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return (
  <Box bg={'brand.500'} color={'brand.100'} boxSize={'min-content'} w={'100%'}>
    <Text>&copy; Coffee For Good</Text>
    <Link href='https://www.coffeeforgoodco.com/'>Visit Our Website</Link>
    <Link><Icon>Instagram</Icon></Link>
  </Box>

)}

export default Footer;
