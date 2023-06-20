import React from 'react';
import { useState } from 'react';
// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function ContactUs() {
  // use state to make the submission form
  const [submission, setSubmission] = useState({user_id: '', name: '', email: '', subject: '', description: ''});
  // import dispatch to send it to a saga
  // click handler to send dispatch to saga in order to send the submission to the backend
  const addSubmission = (e) => {
    e.prevent.defualt();
    console.log(submission)
  }
  return (
    <div className="container">
      <p>Contact Us</p>
      <label htmlFor="name">Name :<input type="text" value={submission.name} onChange={(e) => setSubmission({...submission, name: e.target.value})}/></label>
      <label htmlFor="email">Email :<input type="text" value={submission.email} onChange={(e) => setSubmission({...submission, email: e.target.value})}/></label>
      <label htmlFor="subject">Subject :<input type="text" value={submission.subject} onChange={(e) => setSubmission({...submission, subject: e.target.value})}/></label>
      <label htmlFor="description">Description :<input type="text" value={submission.description} onChange={(e) => setSubmission({...submission, description: e.target.value})}/></label>
      <button onClick={addSubmission}>Submit</button>
    </div>
  );
}

export default ContactUs;
