import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

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
    console.log(submission)
    // dispatch here
  }
  return (
    <div className="container">
      <p>Contact Us</p>
      <label htmlFor="name">Name :<input type="text" value={submission.name} onChange={(e) => setSubmission({...submission, name: e.target.value})}/></label>
      <label htmlFor="email">Email :<input type="text" value={submission.email} onChange={(e) => setSubmission({...submission, email: e.target.value})}/></label>
      <label htmlFor="subject">Subject :<input type="text" value={submission.subject} onChange={(e) => setSubmission({...submission, subject: e.target.value})}/></label>
      <label htmlFor="description">Description :<input type="text" value={submission.description} onChange={(e) => setSubmission({...submission, description: e.target.value})}/></label>
      <button onClick={() => history.push('/user')}>Back</button>
      <button onClick={addSubmission}>Submit</button>
    </div>
  );
}

export default ContactUs;
