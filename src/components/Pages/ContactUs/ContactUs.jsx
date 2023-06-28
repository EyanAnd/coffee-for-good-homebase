import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Alert, AlertDescription, AlertIcon, Box, CloseButton, Input, Textarea, useDisclosure, AlertTitle, AlertStatus } from '@chakra-ui/react';
import { Button, Heading } from '@chakra-ui/react';
import { Stack, Container, } from '@chakra-ui/react';

function ContactUs() {

  // init useDisclosure
  const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: false});

  // init useHistory
  const history = useHistory();
  // init use Selector
  const userId = useSelector(store => store.user.id)
  // use state to make the submission form
  const [submission, setSubmission] = useState({ user_id: userId, name: '', email: '', subject: '', description: '' });
  // import dispatch to send it to a saga
  const dispatch = useDispatch();
  // click handler to send dispatch to saga in order to send the submission to the backend
  const addSubmission = (e) => {
    dispatch({ type: 'CONTACT_ADMIN', payload: submission })
    onOpen();
    // dispatch here
  }
  return (
    <div className="container">
      <Heading color={'brand.300'}>Contact Us</Heading>
      <Container>
      <Stack spacing={2} rowGap={2}>
      <Input placeholder='Name' variant={'flushed'} type="text" value={submission.name} onChange={(e) => setSubmission({ ...submission, name: e.target.value })} />
      <Input placeholder='Email' variant={'flushed'} type="text" value={submission.email} onChange={(e) => setSubmission({ ...submission, email: e.target.value })} />
      </Stack>
      <Input placeholder='Subject'variant={'outline'} type="text" value={submission.subject} onChange={(e) => setSubmission({ ...submission, subject: e.target.value })} />
      <Textarea placeholder='description' type="text" value={submission.description} onChange={(e) => setSubmission({ ...submission, description: e.target.value })} />
      <Button color='brand.500' variant={'outline'} size={'lg'} onClick={() => history.push('/user')}>Back</Button>
      { isVisible ? (
        <Alert size={'lg'} color={'brand.400'} status='success'>
          <AlertIcon />
          <Box>
            <AlertTitle>Success! Your Message Has Been Sent</AlertTitle>
            <AlertDescription>
              Your Message has been recieved, one of our employees will get back to you within 48 hours.
            </AlertDescription>
          </Box>
          <CloseButton 
          alignSelf={'flex-start'}
          position={'relative'}
          right={-1}
          top={-1}
          onClick={onClose}
          />
        </Alert>
      ) : (<Button color='brand.500' variant={'outline'} size={'lg'} onClick={addSubmission}>Submit</Button>
      )}
      </Container>
    </div>
  );
}

export default ContactUs;
