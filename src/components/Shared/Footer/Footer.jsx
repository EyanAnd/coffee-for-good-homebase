import React from 'react';
import './Footer.css';
import { Box, Flex, Text, Link, Icon, Button, VStack, HStack } from '@chakra-ui/react';
import { FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <Box
      bg={'brand.200'}
      color={'brand.500'}
      boxSize={'min-content'}
      w={'100%'}
      py={4}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Flex>
          <VStack>
            <Text>&copy; Coffee For Good</Text>
            <Link href='https://www.coffeeforgoodco.com/'>Visit Our Website</Link>
          </VStack>
        </Flex>
        <HStack>
        <Link href='https://www.instagram.com/coffee_for_good/' variant={'outline'} color={'brand.500'}>
          <FaInstagram size={'24px'} />
        </Link>
        <Link href='https://www.linkedin.com/in/eyanand/'>
          <FaLinkedinIn size={'24px'} />
        </Link>
        <Link href='https://github.com/EyanAnd?tab=repositories'>
          <FaGithub size={'24px'} />
        </Link>
        </HStack>
      </Flex>
    </Box>
  );
}

export default Footer;


