import React from 'react';
import { Box, Text, Link, Icon, Button, Stack, IconButton, Image, ButtonGroup, VStack, HStack, Container } from '@chakra-ui/react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
//TODO import divider for the footer
import '../Footer/Footer.css';

function Footer() {
  return (
    <Box className='footer' as="footer" role="contentinfo" bg="white" py="4" px="6" mt="auto">
      <Container maxW="container.xl" display="flex" justifyContent="space-between" alignItems="center">
        <ButtonGroup variant="tertiary">
          <IconButton
            as={Link}
            href="https://www.linkedin.com/in/eyanand/"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          <IconButton
            as={Link}
            src="/images/cfg_dark_logo.png"
            aria-label="cfg-logo"
            icon={
              <Box h={'35px'} w={'35px'}>
                <Image src="/images/cfg_dark_logo.png" fontSize="1.25rem" />
              </Box>}
          />
          <IconButton
            as={Link}
            href="https://github.com/EyanAnd?tab=repositories"
            aria-label="Github"
            icon={<FaGithub fontSize="1.25rem" />}
          />
          <IconButton
            as={Link}
            href="https://www.instagram.com/coffee_for_good/"
            aria-label="Instagram"
            icon={<FaInstagram fontSize="1.25rem" />}
          />
        </ButtonGroup>
        <Text fontSize="sm" color="fg.subtle">
          &copy; {new Date().getFullYear()} Coffee For Good.
        </Text>
      </Container>
    </Box>
  );
}

export default Footer;




