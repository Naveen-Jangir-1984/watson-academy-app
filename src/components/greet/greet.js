import { useState } from 'react';
import CryptoJS from 'crypto-js';

import './greet.css';

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

const Greet = ({ state, dispatch, scrollToEvents, scrollToNews }) => {
  const unreadEnquiries = state.enquiries.filter(enquiry => enquiry.status === 'unread');
  const allEnquiries = state.enquiries;
  const maxLength50 = 50;
  const maxLength100 = 100;
  const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const { firstname, lastname, mobile } = state.signin.user
  const [action, setAction] = useState({
    file: null,
    event: false,
    news: false,
    enquiry: false
  });
  const [event, setEvent] = useState({
    title: '',
    content: '',
    bullet1: '',
    bullet2: '',
    bullet3: '',
    bullet4: '',
    bullet5: '',
    contact: '',
    date: ''
  });
  const [news, setNews] = useState({
    title: '',
    content: '',
    bullet1: '',
    bullet2: '',
    bullet3: '',
    bullet4: '',
    bullet5: '',
    contact: '',
    date: ''
  });
  const handleFileChange = (e) => {
    if(e.target.files.length > 0) {
      setAction({
        file: e.target.files[0],
        event: false,
        news: false,
        enquiry: false
      });
      e.target.value = '';
    }
  };
  const handleUpload = async () => {
    if (!action.file) {
      alert('Please select a file first!');
      return;
    }
    const formData = new FormData();
    formData.append('file', action.file);    
    const response = await fetch(`${uri}:${port}/${resource}/addPoster`, {
      method: 'post',
      // headers: { 'Content-Type': 'application/json' },
      body: formData
    })
    const data = await response.text();
    if (decryptData(data).result === 'success') {
      setAction({
        file: null,
        event: false,
        news: false,
        enquiry: false
      });
      dispatch({type: 'OPEN_BANNER', message: 'Poster Uploaded !'});
      setTimeout(() => { 
        dispatch({type: 'CLOSE_BANNER'});
        window.location.reload();
      }, 5000);
    }
  };
  const handleCancelEvent = () => {
    handleClearEvent();
    setAction({ 
      file: null, 
      event: false, 
      news: false,
      enquiry: false 
    });    
  };
  const handleClearEvent = () => {
    setEvent({
      title: '',
      content: '',
      bullet1: '',
      bullet2: '',
      bullet3: '',
      bullet4: '',
      bullet5: '',
      contact: '',
      date: ''
    });
  };
  const handleSubmitEvent = async () => {
    const consent = window.confirm('Are you sure to add the event?');
    if (!consent) return;
    const eventIds = state.events.map(event => event.id);
    let randomId = Math.floor(Math.random() * 1000) + 1;
    while(eventIds.includes(randomId)) {
      randomId = Math.floor(Math.random() * 1000) + 1;
    }
    const date = new Date();
    const currentDate = date.getDate() + ' ' + monthName[date.getMonth()] + ' ' + date.getFullYear();
    const post = {
      id: randomId,
      title: event.title,
      content: event.content,
      bullet1: event.bullet1,
      bullet2: event.bullet2,
      bullet3: event.bullet3,
      bullet4: event.bullet4,
      bullet5: event.bullet5,
      contact: event.contact,
      date: currentDate
    }
    const response = await fetch(`${uri}:${port}/${resource}/addEvent`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: encryptData(post) })})
    const data = await response.text();
    if (decryptData(data).result === 'success') {
      dispatch({type: 'ADD_EVENT', event: post});
      handleCancelEvent();
      setTimeout(() => {
        scrollToEvents.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
      setTimeout(() => dispatch({type: 'CLOSE_BANNER'}), 5000);
    }
  };
  const disableClearEvent = event.title === '' && event.content === '' && event.bullet1 === '' && event.bullet2 === '' && event.bullet3 === '' && event.bullet4 === '' && event.bullet5 === '' && event.contact === '';
  const disableSubmitEvent = event.title === '' || event.content === '';
  const handleCancelNews = () => {
    handleClearNews();
    setAction({ 
      file: null, 
      event: false, 
      news: false,
      enquiry: false
     });    
  };
  const handleClearNews = () => {
    setNews({
      title: '',
      content: '',
      bullet1: '',
      bullet2: '',
      bullet3: '',
      bullet4: '',
      bullet5: '',
      contact: '',
      date: ''
    });
  };
  const handleSubmitNews = async () => {
    const consent = window.confirm('Are you sure to add the news?');
    if (!consent) return;
    const newsIds = state.headlines.map(headline => headline.id);
    let randomId = Math.floor(Math.random() * 1000) + 1;
    while(newsIds.includes(randomId)) {
      randomId = Math.floor(Math.random() * 1000) + 1;
    }
    const date = new Date();
    const currentDate = date.getDate() + ' ' + monthName[date.getMonth()] + ' ' + date.getFullYear();
    const post = {
      id: randomId,
      title: news.title,
      content: news.content,
      bullet1: news.bullet1,
      bullet2: news.bullet2,
      bullet3: news.bullet3,
      bullet4: news.bullet4,
      bullet5: news.bullet5,
      contact: news.contact,
      date: currentDate
    }
    const response = await fetch(`${uri}:${port}/${resource}/addHeadline`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ headline: encryptData(post) })})
    const data = await response.text();
    if (decryptData(data).result === 'success') {
      dispatch({type: 'ADD_HEADLINE', headline: post});
      handleCancelNews();
      setTimeout(() => {
        scrollToNews.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
      setTimeout(() => dispatch({type: 'CLOSE_BANNER'}), 5000);
    }
  };
  const disableClearNews = news.title === '' && news.content === '' && news.bullet1 === '' && news.bullet2 === '' && news.bullet3 === '' && news.bullet4 === '' && news.bullet5 === '' && news.contact === '';
  const disableSubmitNews = news.title === '' || news.content === '';
  const handleSignOut = () => {
    const consent = window.confirm('Do you really wish to sign out?');
    if (!consent) return;
    dispatch({type: 'SIGNOUT'});
  }
  const handleViewEnquiries = async () => {
    if(unreadEnquiries.length > 0) {
      const response = await fetch(`${uri}:${port}/${resource}/resetEnquiry`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }})
      const data = await response.text();
      if (decryptData(data).result === 'success') {
        setTimeout(() => dispatch({type: 'RESET_ENQUIRY'}), 5000);
      }
    }
    setAction({ 
      ...action,
      enquiry: !action.enquiry  
    });
  };
  return (
    <div className='greet'>
      <div className='greet-user'>
        <div className='user-info'>
          { unreadEnquiries.length > 0 && <div className='notification' onClick={() => handleViewEnquiries()}>{unreadEnquiries.length}</div> }
          <img className='user-photo' src={`${uri}:${port}/images/Users//${mobile}.jpg`} alt='user' />
          <div>{`${firstname} ${lastname}`}</div>
          { state.signin.user ? <div className='signout' onClick={() => handleSignOut()}>Sign Out</div> : '' }
        </div>
        <div className='user-actions'>
          <button style={{backgroundColor: action.file ? '#fee' : '#eee'}} onClick={() => handleViewEnquiries()}>View Enquiry</button>
          <button style={{backgroundColor: action.event ? '#fee' : '#eee'}} onClick={() => setAction({ file: null, event: !action.event, news: false })}>+ Event</button>
          <button style={{backgroundColor: action.news ? '#fee' : '#eee'}} onClick={() => setAction({ file: null, event: false, news: !action.news })}>+ News</button>
          <input type='file' id='hiddenFileInput' style={{display: 'none'}} accept='image/*' onChange={handleFileChange} />
          <button style={{backgroundColor: action.file ? '#fee' : '#eee'}} onClick={() => {document.getElementById('hiddenFileInput').click()}}>+ Poster</button>
        </div>
      </div>
      <div className='file-upload' style={{display: action.file ? 'flex' : 'none'}}>
        <div className='user-actions'>
          { action.file && <span style={{fontSize: 'x-small'}}>{`Upload '${action.file.name}'?`}</span> }
          { action.file && <button onClick={handleUpload}>Yes</button> }
          { action.file && <button onClick={() => setAction({ file: null, event: false, news: false })}>No</button> }
        </div>
      </div>
      <div className='add-event' style={{display: action.event ? 'flex' : 'none'}}>
        <div className='event-actions'>
          <div>Please fill in the details below</div>
          <input type='text' maxLength={maxLength50} name='title' value={event.title} placeholder='event title (mandatory)' onChange={(e) => setEvent({ ...event, [e.target.name]: e.target.value })} />
          <input type='text'  maxLength={maxLength100} name='content' value={event.content} placeholder='event content (mandatory)' onChange={(e) => setEvent({ ...event, [e.target.name]: e.target.value })} />
          <input type='text' maxLength={maxLength50} name='bullet1' value={event.bullet1} placeholder='event bullet point 1 (optional)' onChange={(e) => setEvent({ ...event, [e.target.name]: e.target.value })} />
          <input type='text' maxLength={maxLength50} name='bullet2' value={event.bullet2} placeholder='event bullet point 2 (optional)' onChange={(e) => setEvent({ ...event, [e.target.name]: e.target.value })} />
          <input type='text' maxLength={maxLength50} name='bullet3' value={event.bullet3} placeholder='event bullet point 3 (optional)' onChange={(e) => setEvent({ ...event, [e.target.name]: e.target.value })} />
          <input type='text' maxLength={maxLength50} name='bullet4' value={event.bullet4} placeholder='event bullet point 4 (optional)' onChange={(e) => setEvent({ ...event, [e.target.name]: e.target.value })} />
          <input type='text' maxLength={maxLength50} name='bullet5' value={event.bullet5} placeholder='event bullet point 5 (optional)' onChange={(e) => setEvent({ ...event, [e.target.name]: e.target.value })} />
          <input type='text' maxLength={maxLength100} name='contact' value={event.contact} placeholder='event contact (optional)' onChange={(e) => setEvent({ ...event, [e.target.name]: e.target.value })} />
          <div className='user-actions'>
            <button onClick={() => handleCancelEvent()}>Cancel</button>
            <button disabled={disableClearEvent} onClick={() => handleClearEvent()}>Clear</button>
            <button disabled={disableSubmitEvent} onClick={() => handleSubmitEvent()}>Submit</button>
          </div>
        </div>
      </div>
      <div className='add-news' style={{display: action.news ? 'flex' : 'none'}}>
        <div className='news-actions'>
          <div>Please fill in the details below</div>
          <input type='text' maxLength={maxLength50} name='title' value={news.title} placeholder='news title (mandatory)' onChange={(e) => setNews({ ...news, [e.target.name]: e.target.value })} />
          <input type='text'  maxLength={maxLength100} name='content' value={news.content} placeholder='news content (mandatory)' onChange={(e) => setNews({ ...news, [e.target.name]: e.target.value })} />
          <input type='text' maxLength={maxLength50} name='bullet1' value={news.bullet1} placeholder='news bullet point 1 (optional)' onChange={(e) => setNews({ ...news, [e.target.name]: e.target.value })} />
          <input type='text' maxLength={maxLength50} name='bullet2' value={news.bullet2} placeholder='news bullet point 2 (optional)' onChange={(e) => setNews({ ...news, [e.target.name]: e.target.value })} />
          <input type='text' maxLength={maxLength50} name='bullet3' value={news.bullet3} placeholder='news bullet point 3 (optional)' onChange={(e) => setNews({ ...news, [e.target.name]: e.target.value })} />
          <input type='text' maxLength={maxLength50} name='bullet4' value={news.bullet4} placeholder='news bullet point 4 (optional)' onChange={(e) => setNews({ ...news, [e.target.name]: e.target.value })} />
          <input type='text' maxLength={maxLength50} name='bullet5' value={news.bullet5} placeholder='news bullet point 5 (optional)' onChange={(e) => setNews({ ...news, [e.target.name]: e.target.value })} />
          <input type='text' maxLength={maxLength100} name='contact' value={news.contact} placeholder='news contact (optional)' onChange={(e) => setNews({ ...news, [e.target.name]: e.target.value })} />
          <div className='user-actions'>
            <button onClick={() => handleCancelNews()}>Cancel</button>
            <button disabled={disableClearNews} onClick={() => handleClearNews()}>Clear</button>
            <button disabled={disableSubmitNews} onClick={() => handleSubmitNews()}>Submit</button>
          </div>
        </div>
      </div>
      <div className='enquiry' style={{display: action.enquiry ? 'flex' : 'none'}}>
        <div className='messages'>
          { allEnquiries.map((enquiry) => <div key={enquiry.id} style={{backgroundColor: enquiry.status === 'read' ? '#eee' : '#fee'}}>
            <div className='message-header'>
              <div>{`${enquiry.name} (${enquiry.email})`}</div>
            </div>
            <div className='message-content'>{enquiry.message}</div>
          </div>) }
        </div>
      </div>
    </div>
  );
};

export default Greet;