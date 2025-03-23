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
  const mobiles = state.users.map(user => user.mobile);
  const emails = state.users.map(user => user.email);
  const { firstname, lastname, mobile } = state.signin.user
  const [action, setAction] = useState({
    fileImage: null,
    fileVideo: null,
    event: false,
    news: false,
    enquiry: false,
    user: false
  });
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    mobile: '',
    email: '',
    password: '',
    error: ''
  });
  const usetInputChange = (e) => {
    setUser({ 
      ...user,
      [e.target.name]: e.target.value,
      error: mobiles.includes(user.mobile) ? 'Mobile already exists !' : emails.includes(user.email) ? 'Email already exists !' : ''
    });
  };
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
  const handleFileChangeImage = (e) => {
    if(e.target.files.length > 0) {
      setAction({
        fileImage: e.target.files[0],
        fileVideo: null,
        event: false,
        news: false,
        enquiry: false,
        user: false
      });
      e.target.value = '';
    }
  };
  const handleFileChangeVideo = (e) => {
    if(e.target.files.length > 0) {
      setAction({
        fileImage: null,
        fileVideo: e.target.files[0],
        event: false,
        news: false,
        enquiry: false,
        user: false
      });
      e.target.value = '';
    }
  };
  const handleUploadImage = async () => {
    if (!action.fileImage) {
      alert('Please select a file first!');
      return;
    }
    const formData = new FormData();
    formData.append('file', action.fileImage);    
    const response = await fetch(`${uri}:${port}/${resource}/addPoster`, {
      method: 'post',
      // headers: { 'Content-Type': 'application/json' },
      body: formData
    })
    const data = await response.text();
    if (decryptData(data).result === 'success') {
      setAction({
        fileImage: null,
        fileVideo: null,
        event: false,
        news: false,
        enquiry: false,
        user: false
      });
      dispatch({type: 'OPEN_BANNER', message: 'Poster Uploaded !'});
      setTimeout(() => { 
        dispatch({type: 'CLOSE_BANNER'});
      }, 5000);
    }
  };
  const handleUploadVideo = async () => {
    if (!action.fileVideo) {
      alert('Please select a file first!');
      return;
    }
    const formData = new FormData();
    formData.append('file', action.fileVideo);    
    const response = await fetch(`${uri}:${port}/${resource}/addVideo`, {
      method: 'post',
      // headers: { 'Content-Type': 'application/json' },
      body: formData
    })
    const data = await response.text();
    if (decryptData(data).result === 'success') {
      setAction({
        fileImage: null,
        fileVideo: null,
        event: false,
        news: false,
        enquiry: false,
        user: false
      });
      dispatch({type: 'OPEN_BANNER', message: 'Video Uploaded !'});
      setTimeout(() => { 
        dispatch({type: 'CLOSE_BANNER'});
      }, 5000);
    }
  };
  const handleCancelEvent = () => {
    handleClearEvent();
    setAction({ 
      fileImage: null, 
      fileVideo: null,
      event: false, 
      news: false,
      enquiry: false,
      user: false
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
      fileImage: null, 
      fileVideo: null,
      event: false, 
      news: false,
      enquiry: false,
      user: false
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
  const handleClearUser = () => {
    setUser({
      firstname: '',
      lastname: '',
      mobile: '',
      email: '',
      password: '',
      error: ''
    });
  };
  const handleSubmitUser = async () => {
    const consent = window.confirm('Are you sure to add the user?');
    if (!consent) return;
    const post = {
      firstname: user.firstname,
      lastname: user.lastname,
      mobile: user.mobile,
      email: user.email,
      password: user.password
    };
    const response = await fetch(`${uri}:${port}/${resource}/addUser`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: encryptData(post) })})
    const data = await response.text();
    if (decryptData(data).result === 'success') {
      dispatch({type: 'ADD_USER', user: post});
      handleCancelUser();
      setTimeout(() => {
        scrollToNews.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
      setTimeout(() => dispatch({type: 'CLOSE_BANNER'}), 5000);
    }
  };
  const handleCancelUser = () => {
    handleClearUser();
    setAction({
      firstname: '',
      lastname: '',
      mobile: '',
      email: '',
      password: '',
      error: ''
    });    
  };
  const disableClearUser = user.firstname === '' && user.lastname === '' && user.mobile === '' && user.email === '' && user.password === '';
  const disableSubmitUser = user.mobile === '' || user.email === '' || user.password === '' || user.firstname === '' || user.lastname === '' || user.error !== '';
  const handleSignOut = () => {
    const consent = window.confirm('Do you really wish to sign out?');
    if (!consent) return;
    dispatch({type: 'SIGNOUT'});
  }
  const handleViewEnquiries = async () => {
    setAction({
      fileImage: null,
      fileVideo: null,
      event: false,
      news: false,
      enquiry: !action.enquiry,
      user: false
    });
    if(unreadEnquiries.length > 0) {
      const response = await fetch(`${uri}:${port}/${resource}/resetEnquiry`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }})
      const data = await response.text();
      if (decryptData(data).result === 'success') {
        setTimeout(() => dispatch({type: 'RESET_ENQUIRY'}), 5000);
      }
    }
  };
  const handleDeleteEnquiry = async (id) => {
    const consent = window.confirm('Are you sure to delete the enquiry?');
    if (!consent) return;
    const response = await fetch(`${uri}:${port}/${resource}/deleteEnquiry`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: encryptData(id) })})
    const data = await response.text();
    if (decryptData(data).result === 'success') {
      dispatch({type: 'DELETE_ENQUIRY', id: id});
      setTimeout(() => dispatch({type: 'CLOSE_BANNER'}), 5000);
    }
  };
  return (
    <div className='greet'>
      <div className='greet-user'>
        <div className='user-info'>
          { unreadEnquiries.length > 0 && <div className='notification' onClick={() => handleViewEnquiries()}>{unreadEnquiries.length}</div> }
          <img className='user-photo' src={`${uri}:${port}/images/Users/${mobile}.jpg`} alt='user' />
          <div>{`${firstname} ${lastname}`}</div>
          { state.signin.user ? <div className='signout' onClick={() => handleSignOut()}>Sign Out</div> : '' }
        </div>
        <div className='user-actions'>
          <button style={{backgroundColor: action.event ? '#fee' : '#eee'}} onClick={() => setAction({ fileImage: null, fileVideo: null, event: !action.event, news: false, enquiry: false, user: false })}>+ Event</button>
          <button style={{backgroundColor: action.news ? '#fee' : '#eee'}} onClick={() => setAction({ fileImage: null, fileVideo: null, event: false, news: !action.news, enquiry: false, user: false })}>+ News</button>
          <input type='file' id='hiddenFileInputImage' style={{display: 'none'}} accept='image/*' onChange={handleFileChangeImage} />
          <button style={{backgroundColor: action.fileImage ? '#fee' : '#eee'}} onClick={() => {document.getElementById('hiddenFileInputImage').click()}}>+ Poster</button>
        </div>
        <div className='user-actions'>
          <input type='file' id='hiddenFileInputVideo' style={{display: 'none'}} accept='video/*' onChange={handleFileChangeVideo} />
          <button style={{backgroundColor: action.fileVideo ? '#fee' : '#eee'}} onClick={() => {document.getElementById('hiddenFileInputVideo').click()}}>+ Video</button>
          <button style={{backgroundColor: action.user ? '#fee' : '#eee'}} onClick={() => setAction({ fileImage: null, fileVideo: null, event: false, news: false, enquiry: false, user: !action.user })}>+ User</button>
          <button style={{backgroundColor: action.enquiry ? '#fee' : '#eee'}} onClick={() => handleViewEnquiries()}>Enquiry</button>
        </div>
      </div>
      <div className='file-upload' style={{display: action.fileImage || action.fileVideo ? 'flex' : 'none'}}>
        <div className='user-actions'>
          { action.fileImage && <span style={{fontSize: 'x-small'}}>{`Upload '${action.fileImage.name}'?`}</span> }
          { action.fileImage && <button onClick={handleUploadImage}>Yes</button> }
          { action.fileImage && <button onClick={() => setAction({ fileImage: null, fileVideo: null, event: false, news: false })}>No</button> }
          { action.fileVideo && <span style={{fontSize: 'x-small'}}>{`Upload '${action.fileVideo.name}'?`}</span> }
          { action.fileVideo && <button onClick={handleUploadVideo}>Yes</button> }
          { action.fileVideo && <button onClick={() => setAction({ fileImage: null, fileVideo: null, event: false, news: false })}>No</button> }
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
      <div className='add-user' style={{display: action.user ? 'flex' : 'none'}}>
        <div className='add-actions'>
          <div>Please fill in the details below</div>
          <input type='text' name='mobile' placeholder='mobile (mandatory' value={user.mobile} onChange={(e) => usetInputChange(e)} />
          <input type='text' name='email' placeholder='email (mandatory)' value={user.email} onChange={(e) => usetInputChange(e)} />
          <input type='text' name='firstname' placeholder='firstname (mandatory)' value={user.firstname} onChange={(e) => usetInputChange(e)} />
          <input type='text' name='lastname' placeholder='lastname (mandatory)' value={user.lastname} onChange={(e) => usetInputChange(e)} />
          <input type='text' name='password' placeholder='password (mandatory)' value={user.password} onChange={(e) => usetInputChange(e)} />
          { user.error !== '' && <div style={{color: 'red'}}>{user.error}</div> }
          <div className='user-actions'>
            <button onClick={() => handleCancelUser()}>Cancel</button>
            <button disabled={disableClearUser} onClick={() => handleClearUser()}>Clear</button>
            <button disabled={disableSubmitUser} onClick={() => handleSubmitUser()}>Submit</button>
          </div>
        </div>
      </div>
      <div className='enquiry' style={{display: action.enquiry ? 'flex' : 'none'}}>
        <div className='messages' style={{display: allEnquiries.length > 0 ? 'block' : 'flex', justifyContent: allEnquiries.length > 0 ? 'none' : 'center', alignItems: allEnquiries.length > 0 ? 'none' : 'center' }}>
          { allEnquiries.length === 0 ? <div>No enquiries found !</div> :
            allEnquiries.map((enquiry) => <div key={enquiry.id} style={{backgroundColor: enquiry.status === 'read' ? '#eee' : '#fee'}}>
            <img className='delete' src={`${uri}:${port}/images/delete.png`} alt='delete' onClick={() => handleDeleteEnquiry(enquiry.id)} />
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