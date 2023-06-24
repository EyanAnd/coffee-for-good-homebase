import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Input, Textarea } from '@chakra-ui/react';
import { Button, Heading } from '@chakra-ui/react';

function ContactUs() {

  // init useHistory
  const history = useHistory();
  // init use Selector
  const userId = useSelector(store => store.user.id)
  // use state to make the submission form
  const [submission, setSubmission] = useState({user_id: userId, name: '', email: '', subject: '', description: ''});
  // import dispatch to send it to a saga
  const dispatch = useDispatch();
  // click handler to send dispatch to saga in order to send the submission to the backend
  const addSubmission = (e) => {
    dispatch({ type: 'CONTACT_ADMIN', payload: submission})
    // dispatch here
  }
  return (
    <div className="container">
      <Heading>Contact Us</Heading>
      <label htmlFor="name">Name :<Input variant={'flushed'} type="text" value={submission.name} onChange={(e) => setSubmission({...submission, name: e.target.value})}/></label>
      <label htmlFor="email">Email :<Input variant={'flushed'} type="text" value={submission.email} onChange={(e) => setSubmission({...submission, email: e.target.value})}/></label>
      <label htmlFor="subject">Subject :<Input variant={'flushed'} type="text" value={submission.subject} onChange={(e) => setSubmission({...submission, subject: e.target.value})}/></label>
      <label htmlFor="description">Description :<Textarea placeholder='description' type="text" value={submission.description} onChange={(e) => setSubmission({...submission, description: e.target.value})}/></label>
      <Button colorScheme='brand' variant={'outline'} onClick={() => history.push('/user')}>Back</Button>
      <Button colorScheme='brand' variant={'outline'} onClick={addSubmission}>Submit</Button>
    </div>
  );
}

export default ContactUs;
