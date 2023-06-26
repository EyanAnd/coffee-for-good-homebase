import React from 'react';
import './Footer.css';
import { Box, Flex, Text, Link, Icon, Button, Stack, IconButton, Image, ButtonGroup, VStack, HStack, Container } from '@chakra-ui/react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <Container justifyContent={'center'} padding={'0'} margin={'0'} maxW={'100%'} bg={'brand.100'} as="footer" role="contentinfo" >
      <Stack spacing={{ base: '4', md: '5' }}>
        <Stack justify="space-between" direction="row" align="center">
          <ButtonGroup variant="tertiary">
            <IconButton
              as="a"
              href='https://www.linkedin.com/in/eyanand/'
              aria-label="LinkedIn"
              icon={<FaLinkedin fontSize="1.25rem" />}
            />
            <IconButton as="a" href="/public/images/cfg_dark_logo.png" aria-label="cfg=logo" icon={<Image src="/public/images/cfg_dark_logo.png" fontSize={'1.25rem'} /> }   />
            <IconButton
              as="a"
              href="'https://github.com/EyanAnd?tab=repositories'"
              aria-label="Github"
              icon={<FaGithub fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href='https://www.instagram.com/coffee_for_good/'
              aria-label="Instagram"
              icon={<FaInstagram fontSize="1.25rem" />}
            />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" color="fg.subtle">
          &copy; {new Date().getFullYear()} Coffee For Good. All rights reserved.
        </Text>
      </Stack>
    </Container>
  );
}

// TODO wrap up footer issue

export default Footer;



