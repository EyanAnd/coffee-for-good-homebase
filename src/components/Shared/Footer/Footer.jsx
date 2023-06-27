import React from 'react';
import { Box, Text, Link, Icon, Button, Stack, IconButton, Image, ButtonGroup, VStack, HStack, Container } from '@chakra-ui/react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <Box as="footer" role="contentinfo" bg="brand.100" py="4" px="6" mt="auto">
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
            href="/public/images/cfg_dark_logo.png"
            aria-label="cfg-logo"
            icon={<Image src="/public/images/cfg_dark_logo.png" fontSize="1.25rem" />}
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
          &copy; {new Date().getFullYear()} Coffee For Good. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}

export default Footer;




