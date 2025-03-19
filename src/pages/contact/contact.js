import CryptoJS from 'crypto-js';
import { useState } from 'react';
import './contact.css';

const uri = process.env.REACT_APP_API_URI;
const port = process.env.REACT_APP_API_PORT;
const resource = process.env.REACT_APP_API_RESOURCE;
const secretKey = process.env.REACT_APP_SECRET_KEY;

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

const Contact = ({ state, dispatch }) => {
  const maxLength = 100;
  const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [enquiry, setEnquiry] = useState({
    name: '',
    email: '',
    message: '',
    date: ''
  });
  const [feedback, setFeedback] = useState({
    by: '',
    class: '',
    message: '',
    date: ''
  });
  const handleClearEnquiry = () => {
    setEnquiry({
      name: '',
      email: '',
      message: '',
      date: ''
    });
  }
  const handleClearFeedback = () => {
    setFeedback({
      by: '',
      class: '',
      message: '',
      date: ''
    });
  }
  const handleSubmitEnquiry = async () => {
    const consent = window.confirm('Are you sure to send the enquiry?');
    if (!consent) return;
    const enquiryIds = state.enquiries.map(enquiry => enquiry.id);
    let randomId = Math.floor(Math.random() * 1000) + 1;
    while(enquiryIds.includes(randomId)) {
      randomId = Math.floor(Math.random() * 1000) + 1;
    }
    const date = new Date();
    const currentDate = date.getDate() + ' ' + monthName[date.getMonth()] + ' ' + date.getFullYear();
    const post = {
      id: randomId,
      name: enquiry.name,
      email: enquiry.email,
      message: enquiry.message,
      date: currentDate,
      status: 'unread'
    }
    const response = await fetch(`${uri}:${port}/${resource}/addEnquiry`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ enquiry: encryptData(post) })})
    const data = await response.text();
    if (decryptData(data).result === 'success') {
      dispatch({type: 'ADD_ENQUIRY', enquiry: post});
      handleClearEnquiry();
      setTimeout(() => dispatch({type: 'CLOSE_BANNER'}), 5000);
    }
  }
  const disableClearEnquiry = enquiry.name === '' && enquiry.email === '' && enquiry.message === '';
  const disableSubmitEnquiry = enquiry.name === '' || enquiry.email === '' || enquiry.message === '';
  const handleSubmitFeedback = async () => {
    const consent = window.confirm('Are you sure to send the feedback?');
    if (!consent) return;
    const feedbackIds = state.posts.map(post => post.id);
    let randomId = Math.floor(Math.random() * 1000) + 1;
    while(feedbackIds.includes(randomId)) {
      randomId = Math.floor(Math.random() * 1000) + 1;
    }
    const date = new Date();
    const currentDate = date.getDate() + ' ' + monthName[date.getMonth()] + ' ' + date.getFullYear();
    const post = {
      id: randomId,
      by: feedback.class.length ? feedback.by + ' (' + feedback.class + ')' : feedback.by,
      message: feedback.message,
      date: currentDate
    }
    const response = await fetch(`${uri}:${port}/${resource}/addFeedback`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ feedback: encryptData(post) })})
    const data = await response.text();
    if (decryptData(data).result === 'success') {
      dispatch({type: 'ADD_FEEDBACK', feedback: post});
      handleClearFeedback();
      setTimeout(() => dispatch({type: 'CLOSE_BANNER'}), 5000);
    }
  }
  const disableClearFeedback = feedback.by === '' && feedback.class === '' && feedback.message === '';
  const disableSubmitFeedback = feedback.by === '' || feedback.message === '';
  return (
    <div className='container-left'>
      <h2>Dear Parents</h2>
      <p>
        We kindly invite you to leave a message regarding your address details to ensure smooth communication and coordination. 
        Providing accurate address information helps us in better planning and ensuring timely updates when needed.
      </p>
      <p>
        <img className='left-aligned-image' src={`${uri}:${port}/images/Contact/contact01.jpg`} alt='placeholder' />
        Please feel free to share any additional details or special instructions that may assist us. Your cooperation is greatly appreciated!
      </p>
      <div className='write-us'>
        <h2>Enquire</h2>
        <div className='form-name'>
          <label>Name</label>
          <input type='text' name='name' value={enquiry.name} placeholder='mandatory' onChange={(e) => setEnquiry({...enquiry, [e.target.name]: e.target.value})} />
        </div>
        <div className='form-email'>
          <label>Email/Mob.</label>
          <input type='text' name='email' value={enquiry.email} placeholder='mandatory' onChange={(e) => setEnquiry({...enquiry, [e.target.name]: e.target.value})} />
        </div>
        <div className='form-message'>
          <label>Message</label>
          <textarea maxLength={maxLength} name='message' value={enquiry.message} placeholder='mandatory' onChange={(e) => setEnquiry({...enquiry, [e.target.name]: e.target.value})} />
        </div>
        <div className='form-actions'>
          <button disabled={disableClearEnquiry} onClick={() => handleClearEnquiry()}>Clear</button>
          <button disabled={disableSubmitEnquiry} onClick={() => handleSubmitEnquiry()}>Submit</button>
        </div>
      </div>
      <div className='feedback'>
        <h2>Feedback</h2>
        <div className='form-name'>
          <label>Name</label>
          <input type='text' name='by' value={feedback.by} placeholder='mandatory' onChange={(e) => setFeedback({...feedback, [e.target.name]: e.target.value})} />
        </div>
        <div className='form-email'>
          <label>Class</label>
          <input type='text' name='class' value={feedback.class} placeholder='(optional)' onChange={(e) => setFeedback({...feedback, [e.target.name]: e.target.value})} />
        </div>
        <div className='form-message'>
          <label>Message</label>
          <textarea maxLength={maxLength} name='message' value={feedback.message} placeholder={`mandatory (maximum ${maxLength} characters)`} onChange={(e) => setFeedback({...feedback, [e.target.name]: e.target.value})} />
        </div>
        <div className='form-actions'>
          <div style={{color: '#f00', fontSize: 'smaller'}}>{`${maxLength - feedback.message.length} characters left`}</div>
          <button disabled={disableClearFeedback} onClick={() => handleClearFeedback()}>Clear</button>
          <button disabled={disableSubmitFeedback} onClick={() => handleSubmitFeedback()}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;