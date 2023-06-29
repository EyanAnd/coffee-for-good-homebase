import React from 'react';
import { Box, Text, Link, Icon, Button, Stack, IconButton, Image, ButtonGroup, VStack, HStack, Container, Flex, Divider } from '@chakra-ui/react';
import { FaInstagram, FaLinkedin, FaGithub, FaFacebookF, FaFacebook } from 'react-icons/fa';
import '../Footer/Footer.css';

function Footer() {
  return (
    <>
      <Flex paddingBottom={'2rem'}>
        <Divider orientation='horizontal' color={'brand.500'} />
      </Flex>
      <Flex h={'80px'} className='footer' as="footer" role="contentinfo" bg="white" justifyContent="space-between" alignItems="center" p={8}>
        <ButtonGroup variant="tertiary"  paddingTop={'1rem'}>
        <IconButton
            as={Link}
            href="https://www.facebook.com/profile.php?id=100094271915631"
            aria-label="Facebook"
            icon={<FaFacebook  fontSize={'1.25rem'}/>}
          />
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
              <Flex h={'30px'} w={'30px'}>
                <Image src="/images/cfg_dark_logo.png" fontSize="1.25rem" objectFit="contain" />
              </Flex>}
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
        <Box paddingRight={8} textAlign="center" alignContent={'center'}>
          <Image src='/images/leaf.png' alt='leaf image' h={'100px'} paddingTop={'1rem'} w={'100px'}  objectFit="contain" />
        </Box>
        <Flex paddingTop={'1rem'}>
        <Text fontSize="sm" color="fg.subtle">
          &copy; {new Date().getFullYear()} Coffee For Good.
        </Text>
        </Flex>
      </Flex>
    </>
  );
}

export default Footer;






