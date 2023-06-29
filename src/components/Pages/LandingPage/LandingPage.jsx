import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { Heading, Divider, Flex, Image, Button, Text, } from '@chakra-ui/react';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterPage/RegisterForm';

function LandingPage() {


  return (

    <Flex direction={'column'} gap={'4rem'} p={4}  >
      <Flex justifyContent={'space-between'} gap={'2rem'} padding={'2rem'}>
        <Heading>Welcome to Coffee For Good</Heading>
      </Flex>

      <Flex w={'85%'} alignContent={'center'} gap={'2rem'} padding={'2rem'}>
        <Text >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra lacus
          ut ex molestie blandit. Etiam et turpis sit amet risus mollis
          interdum. Suspendisse et justo vitae metus bibendum fringilla sed
          sed justo. Aliquam sollicitudin dapibus lectus, vitae consequat odio
          elementum eget. Praesent efficitur eros vitae nunc interdum, eu
          interdum justo facilisis. Sed pulvinar nulla ac dignissim efficitur.
          Quisque eget eros metus. Vestibulum bibendum fringilla nibh a
          luctus. Duis a sapien metus.
        </Text>
        <Text>
          Praesent consectetur orci dui, id elementum eros facilisis id. Sed
          id dolor in augue porttitor faucibus eget sit amet ante. Nunc
          consectetur placerat pharetra. Aenean gravida ex ut erat commodo, ut
          finibus metus facilisis. Nullam eget lectus non urna rhoncus
          accumsan quis id massa. Curabitur sit amet dolor nisl. Proin
          euismod, augue at condimentum rhoncus, massa lorem semper lacus, sed
          lobortis augue mi vel felis. Duis ultrices sapien at est convallis
          congue.
        </Text>
        <Text>
          Fusce porta diam ac tortor elementum, ut imperdiet metus volutpat.
          Suspendisse posuere dapibus maximus. Aliquam vitae felis libero. In
          vehicula sapien at semper ultrices. Vivamus sed feugiat libero. Sed
          sagittis neque id diam euismod, ut egestas felis ultricies. Nullam
          non fermentum mauris. Sed in enim ac turpis faucibus pretium in sit
          amet nisi.
        </Text>
      </Flex>
      <Divider />
      <Flex justifyContent={'space-between'} direction={'row'} alignContent={'center'} gap={'1rem'} padding={'1rem'}>
        <RegisterForm />
        <Flex gap={'1rem'} padding={'1rem'}>
          <Image h={'300px'} w={'300px'} src="/images/white-logo.png" alt="est logo" />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default LandingPage;
