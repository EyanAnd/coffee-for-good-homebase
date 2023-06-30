import React, { useEffect } from 'react';
import LogOutButton from '../../Shared/LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Badge, Button, ChakraProvider, Container, Flex, } from '@chakra-ui/react'
import { Heading, Text, Stack, VStack, Image } from '@chakra-ui/react'
import './UserPage.css'
import ContactUs from '../ContactUs/ContactUs';

function UserPage({ forRealSubmit, setForRealSubmit }) {

  console.log(forRealSubmit)

  const user = useSelector((store) => store.user);
  const application = useSelector((store) => store.applicationReducer);
  console.log(application)
  console.log(application.sharing)

  const history = useHistory();

  // init useDispatch
  const dispatch = useDispatch();

  // start application handler
  const startApplicationHandler = () => {
    // dispatch to update users started boolean
    dispatch({ type: 'IS_STARTED', payload: user.id })
    // push to applications page
    history.push('/application')
  }

  // render different things depending on status of application
  const appStatus = () => {
    if (!user.app_started) {
      return
    } else if (!user.app_submitted) {
      return <Badge color={'brand.400'}>Not Started</Badge>
    } else if (user.app_submitted) {
      return <Badge color={'brand.400'}>Submitted</Badge>
    } else if (user.app_started) {
      return <Badge color={'brand.400'}>Not Submitted</Badge>
    }
  }
  return (
    <Flex className='background' gap={'2rem'} padding={'2rem'} direction={'row'} color={'brand.500'}>
      <Flex gap={'2rem'} padding={'2rem'} direction={'column'}>
        <Flex direction={'column'} gap={'2rem'} padding={'2rem'} paddingBottom={'6rem'}>
          <Heading>Welcome, {user.username} to our Homebase!</Heading>
          <Heading>{appStatus()}</Heading>
          <Flex direction={'column'} gap={'2rem'} maxW={'50%'}>
            <Text>
              Thank you for your interest in Coffee For Good!
            </Text>
            <Text>
              On the User page the user can expect to start an application, continue an application and save their progress. They also have the ability to contact us via the
              contact form. From a users perspective, this portal serves the purpose of applying and communicating with us via email on any problem or question they have while applying.
            </Text>
          </Flex>
        </Flex>
        <ContactUs />
      </Flex>
      <Flex align={'center'} w={'100%'} >
        {!user.app_started && !user.app_submitted ? (
          <Flex gap={'2rem'}  padding={'2rem'} align={'start'} direction={'row'} h={'100%'}>
            <Flex direction={'column'} paddingTop={'2rem'} gap={'2rem'}>
              <Heading size={'lg'} color={'brand.500'}>Click Here to apply to become a partner!</Heading>
              <Text>This will take the user to the applications tab. The user will see a <strong>Coninue Application</strong> 
              button if they have already started an applciation and saved their progress.</Text>
              <Button onClick={startApplicationHandler}>Start Application</Button>
              <Flex gap={'2rem'} padding={'3rem'}>
              </Flex>
              <Image src='/images/hand_beans.jpg' />
            </Flex>
          </Flex>
        ) : user.app_started && !user.app_submitted ? (
          <Button onClick={() => history.push('/application')}>Continue Application</Button>
        ) : null}
        {user.app_submitted &&
          <Flex direction={'row'} gap={'2rem'} p={'1rem'}>
            <Container bg={'brand.200'} borderRadius={'20'}>
              <Flex gap={'1rem'} padding={'1rem'}>
                <Heading size={'lg'}>Your Application</Heading>
              </Flex>
              <Flex gap={'1rem'}>
                <Heading size={'md'}>User Info</Heading>
              </Flex>
              <Flex direction={'column'} gap={'1rem'} p={'1rem'}>
                <Text>Name : {application.name}</Text>
                <Text>Email : {application.email}</Text>
              </Flex>
              <Flex gap={'1rem'} p={'0.5'}>
                <Heading size={'md'}>Mission & Values</Heading>
              </Flex>
              <Flex direction={'column'} gap={'1rem'} p={'1rem'}>
                <Text>Collaboration : {application.collab}</Text>
                <Text>Mission : {application.mission}</Text>
                <Text>Impact{application.impact}</Text>
                <Text>Values : {application.values}</Text>
              </Flex>
              <Flex gap={'1rem'} p={'0.5'}>
                <Heading size={'md'}>A Little More About You</Heading>
              </Flex>
              <Flex direction={'column'} gap={'1rem'} p={'1rem'}>
                <Text>Previous Partners : {application.previous_partners}</Text>
                <Text>Success Stories : {application.success_stories}</Text>
                <Text>Reporting: {application.reporting}</Text>
                <Text>Open to sharing: {application.sharing ? "Yes" : "No"}</Text>
                <Text>Additional Notes : {application.notes}</Text>
              </Flex>
            </Container>
          </Flex>
        }
      </Flex>
    </Flex >
  );
}

export default UserPage;

