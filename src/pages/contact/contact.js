import { useState } from 'react';
import CONTACT01 from '../../images/Contact/contact01.jpg';
import ContainerRight from '../../components/container-right/container-right';
import './contact.css';

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
  const handleEnquiryClear = () => {
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
    handleEnquiryClear();
  }
  const handleSubmitEnquiry = () => {
    const consent = window.confirm('Are you sure to send the message?');
    if (!consent) return;
    const date = new Date();
    const currentDate = date.getDate() + ' ' + monthName[date.getMonth()] + ' ' + date.getFullYear();
    dispatch({type: 'UPDATE_ENQUIRY', enquiry: {
      name: enquiry.name,
      email: enquiry.email,
      message: enquiry.message,
      date: currentDate
    }});
    handleClearFeedback();
  }
  const disbaleButtonEnquiry = enquiry.name === '' || enquiry.email === '' || enquiry.message === '';
  const handleSubmitFeedback = () => {
    const consent = window.confirm('Are you sure to send the feedback?');
    if (!consent) return;
    const date = new Date();
    const currentDate = date.getDate() + ' ' + monthName[date.getMonth()] + ' ' + date.getFullYear();
    dispatch({type: 'UPDATE_FEEDBACK', feedback: {
      id: state.posts.length + 1,
      by: feedback.class.length ? feedback.by + ' (' + feedback.class + ')' : feedback.by,
      message: feedback.message,
      date: currentDate
    }});
    handleClearFeedback();
  }
  const disbaleButtonFeedback = feedback.by === '' || feedback.message === '';
  return (
    <div className='container'>
      <div className='container-left'>
        <h2>Dear Parents</h2>
        <p>
          We kindly invite you to leave a message regarding your address details to ensure smooth communication and coordination. 
          Providing accurate address information helps us in better planning and ensuring timely updates when needed.
        </p>
        <p>
          <img className='left-aligned-image' src={CONTACT01} alt='placeholder' />
          Please feel free to share any additional details or special instructions that may assist us. Your cooperation is greatly appreciated!
        </p>
        <div className='write-us'>
          <h2>Enquire Us</h2>
          <div className='form-name'>
            <label>Name</label>
            <input type='text' name='name' value={enquiry.name} placeholder='mandatory' onChange={(e) => setEnquiry({...enquiry, [e.target.name]: e.target.value})} />
          </div>
          <div className='form-email'>
            <label>Email</label>
            <input type='text' name='email' value={enquiry.email} placeholder='mandatory' onChange={(e) => setEnquiry({...enquiry, [e.target.name]: e.target.value})} />
          </div>
          <div className='form-message'>
            <label>Message</label>
            <textarea maxLength={maxLength} name='message' value={enquiry.message} placeholder='mandatory' onChange={(e) => setEnquiry({...enquiry, [e.target.name]: e.target.value})} />
          </div>
          <div className='form-actions'>
            <button style={{pointerEvents: disbaleButtonEnquiry ? 'none' : 'all'}}  disabled={disbaleButtonEnquiry} onClick={() => handleEnquiryClear()}>Clear</button>
            <button style={{pointerEvents: disbaleButtonEnquiry ? 'none' : 'all'}}  disabled={disbaleButtonEnquiry} onClick={() => handleSubmitEnquiry()}>Submit</button>
          </div>
        </div>
        <div className='feedback'>
          <h2>Feedback for Us</h2>
          <div className='form-name'>
            <label>Name</label>
            <input type='text' name='by' value={feedback.by} placeholder='mandatory' onChange={(e) => setFeedback({...feedback, [e.target.name]: e.target.value})} />
          </div>
          <div className='form-email'>
            <label>Class</label>
            <input type='text' name='class' value={feedback.class} placeholder='optional' onChange={(e) => setFeedback({...feedback, [e.target.name]: e.target.value})} />
          </div>
          <div className='form-message'>
            <label>Feedback</label>
            <textarea maxLength={maxLength} name='message' value={feedback.message} placeholder={`${maxLength} characters only (mandatory)`} onChange={(e) => setFeedback({...feedback, [e.target.name]: e.target.value})} />
          </div>
          <div className='form-actions'>
            <div style={{color: '#f00', fontSize: 'smaller'}}>{`${maxLength - feedback.message.length} characters left`}</div>
            <button style={{pointerEvents: disbaleButtonFeedback ? 'none' : 'all'}} disabled={disbaleButtonFeedback} onClick={() => handleClearFeedback()}>Clear</button>
            <button style={{pointerEvents: disbaleButtonFeedback ? 'none' : 'all'}} disabled={disbaleButtonFeedback} onClick={() => handleSubmitFeedback()}>Submit</button>
          </div>
        </div>
      </div>
      <ContainerRight state={state} dispatch={dispatch} />
    </div>
  );
};

export default Contact;