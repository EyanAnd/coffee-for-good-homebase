import { Flex, Text, Heading, Center, List, ListIcon, ListItem } from '@chakra-ui/react';
import { HiCode } from 'react-icons/hi'
import React from 'react';


// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <Flex direction={'column'} justifyContent={'space-between '} gap={'2rem'} padding={'1rem'}>
      <Flex gap={'2rem'} padding={'1rem'}>
        <Heading>About Homebase</Heading>
      </Flex>
      <Flex letterSpacing={'wide'} direction={'column'} gap={'2rem'} padding={'1rem'}>

        <Text><strong>Homebase</strong> was created to solve a plethora of problems that our business is facing. Arguably
          the most important is that it allowed a space for us to have businesses that are interested in
          collaborating with us to apply. This is great for both the business applying, and us as well. For the business it allows them to
          see through our application if they truly align with our values and if a partnership would be a good fit. It works for us because it
          allows a place for applications to be stored, approved or removed. It also allows us time to research these businesses and connect
          with them over a few meetings before approving or denying thier application.</Text>
        <Text>
          <strong>A Lightweight web application</strong> like also allows use to have full transparency with our partners, they have complete access to our sales, how well we are doing, and reports that we send them.
          We <strong>never</strong> want to hide anything from our partners or customers, so this allows us the ability to have all of our relevant data readily available in one place for our partners. As admin, it actually
          saves us the hassle of going and logging into multiple different websites just to try and track our total sales. We can just look on Homebase. That is why I started calling it our Homebase. Because I believe it will be the main hub of our business outside of our website.
        </Text>
      </Flex>
      <Flex gap={'2rem'} padding={'1rem'}>
        <Heading >Tools and packages used for this project</Heading>
      </Flex>
      <Flex gap={'2rem'} padding={'1rem'}> 
      <List letterSpacing={'wide'} spacing={3}>
        <ListItem>
          <ListIcon as={HiCode} color='brand.400' />
          Chakra UI
        </ListItem>
        <ListItem>
          <ListIcon as={HiCode} color='brand.400' />
          Nodemailer
        </ListItem>
        <ListItem>
          <ListIcon as={HiCode} color='brand.400' />
          Font Source
        </ListItem>
        <ListItem>
          <ListIcon as={HiCode} color='brand.400' />
          React Icons
        </ListItem>
        <ListItem>
          <ListIcon as={HiCode} color='brand.400' />
          Chakra Icons
        </ListItem>
        <ListItem>
          <ListIcon as={HiCode} color='brand.400' />
          Moment.js
        </ListItem>
        <ListItem>
          <ListIcon as={HiCode} color='brand.400' />
          passport.js
        </ListItem>
        <ListItem>
          <ListIcon as={HiCode} color='brand.400' />
          PostreSQL
        </ListItem>
        <ListItem>
          <ListIcon as={HiCode} color='brand.400' />
          Express
        </ListItem>
        <ListItem>
          <ListIcon as={HiCode} color='brand.400' />
          React.js
        </ListItem>
        <ListItem>
          <ListIcon as={HiCode} color='brand.400' />
          Node.js
        </ListItem>
        <ListItem>
          <ListIcon as={HiCode} color='brand.400' />
          Redux
        </ListItem>
        <ListItem>
          <ListIcon as={HiCode} color='brand.400' />
          Passport.js
        </ListItem>
      </List>
      </Flex>
      <Flex gap={'2rem'} padding={'1rem'}>
        <Heading>Special thanks</Heading>
      </Flex>
      <Flex letterSpacing={'wide'} direction={'column'} gap={'2rem'} padding={'1rem'}>
        <Text>A Huge Thanks to the EDA staff, <strong>Blaine</strong>, <strong>Mason</strong>, and <strong>Katie</strong> for all of the help and encouragement through this project.
           A huge thanks to <strong>Kord</strong>, <strong>Jack</strong>, <strong>Travis</strong>, <strong>Garrett</strong>, <strong>Sawyer</strong>, and <strong>Zeke</strong> 
           for making the den such a fun place to come learn and be challenged. A huge thanks for my wife <strong>Sage</strong> for being the best support I could ask for. 
          Thanks to my mentors <strong>Adrian</strong>, <strong>Jide</strong>, <strong>Jason</strong>, and <strong>Anthony</strong> for always challenging me and supporting my growth as a developer. 
          </Text>
      </Flex>
    </Flex>
  );
}

export default AboutPage;
