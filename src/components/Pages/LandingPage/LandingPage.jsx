import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { Heading, Divider, Flex, Image, Button, Text, } from '@chakra-ui/react';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterPage/RegisterForm';

function LandingPage() {


  return (

    <Flex direction={'column'} gap={'1rem'} p={'2rem'} >
        <Heading size={'xl'}>Welcome to Homebase</Heading>
      <Flex justifyContent={'space-between'} gap={'1rem'} padding={'0.5'}>
        <Heading size={'lg'}>By Coffee For Good</Heading>
      </Flex>
   

      <Flex w={'100%'} alignContent={'center'} padding={'1rem'} gap={'2rem'}>
        <Text >
          What is Homebase? Homebase is an web application that is filled with great tools that directly apply to helping a business I co-founded. Coffee For Good. 
        </Text>
        <Text>
          Coffee For Good is a coffee roasting business that gives 50% of its profits to helping women and children in crisis. We are a lightweight team of 4 and prior to EDA we were stuck with no technical skills to make a dream like Homebase come true. 
        </Text>
        <Text>
            Homebase will help our business in a multitude of ways. The first and arguably most importat is that it allows non-profits to apply to become partners with us. It also allows parnters to see real financial data straight from squarespace. We are keen on being as transparent as possible with our partners and customers alike. On the admin side of this application they can also see real time data, as well as approve or delete applications.
        </Text>
      </Flex>
      <Divider />
      <Flex justifyContent={'space-between'} direction={'row'} alignContent={'center'} gap={'1rem'} padding={'3rem'}>
        <RegisterForm />
        <Flex gap={'1rem'} padding={'1rem'}>
          <Image h={'300px'} w={'300px'} src="/images/white-logo.png" alt="est logo" />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default LandingPage;
