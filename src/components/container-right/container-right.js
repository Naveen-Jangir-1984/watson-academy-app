import CryptoJS from 'crypto-js';
import { useState, useEffect } from 'react';
import './container-right.css';

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

const ContainerRight = ({ state, dispatch, scrollToTop, scrollToPosters, scrollToEvents, scrollToNews }) => {
  const eventsLength = state.events.length;
  const newsLength = state.headlines.length;
  const images = state.posters.images;
  const postersLength = images.length;
  const [index, setIndex] = useState(0);
  const videos = state.videos.clips;
  const videosLength = videos.length;
  // const [control, setControl] = useState(false);
  const [indexVideo, setIndexVideo] = useState(0);
  useEffect(() => {
    const interval1 = setInterval(() => {
      setIndex(index => (index + 1) % postersLength);
    }, 3000);
    const interval2 = setInterval(() => {
      setIndexVideo(indexVideo => (indexVideo + 1) % videosLength);
    }, 10000);
    return () => { clearInterval(interval1); clearInterval(interval2); };
  });
  const handleDeleteEvent = async () => {
    const consent = window.confirm('Are you sure to delete the event?');
    if (!consent) return;
    const response = await fetch(`${uri}:${port}/${resource}/deleteEvent`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: state.selectedEvent.id })})
    const data = await response.json();
    if (data.result === 'success') {
      dispatch({type: 'DELETE_EVENT', id: state.selectedEvent.id});
      dispatch({type: 'CLOSE_EVENT'});
      setTimeout(() => dispatch({type: 'CLOSE_BANNER'}), 5000);
    }
  }
  const handleDeleteNews = async () => {
    const consent = window.confirm('Are you sure to delete the news?');
    if (!consent) return;
    const response = await fetch(`${uri}:${port}/${resource}/deleteHeadline`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: state.selectedHeadline.id })})
    const data = await response.json();
    if (data.result === 'success') {
      dispatch({type: 'DELETE_HEADLINE', id: state.selectedHeadline.id});
      dispatch({type: 'CLOSE_HEADLINE'});
      setTimeout(() => dispatch({type: 'CLOSE_BANNER'}), 5000);
    }
  }
  const handleDisplayPoster = () => {
    const updatedImages = images.map(image => {
      if(image.id === images[index].id) {
        image.isSelected = true;
      } else {
        image.isSelected = false;
      }
      return image;
    });
    dispatch({type: 'DISPLAY_POSTER', images: updatedImages});
    setTimeout(() => {
      scrollToTop.current?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };
  const handleDeletePoster = async () => {
    const consent = window.confirm('Are you sure to delete the poster?');
    if (!consent) return;
    const id = images[index].id;
    const response = await fetch(`${uri}:${port}/${resource}/deletePoster`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: encryptData(id) })})
    const data = await response.text();
    if (decryptData(data).result === 'success') {
      dispatch({type: 'DELETE_POSTER', id: id});
      setTimeout(() => { 
        dispatch({type: 'CLOSE_BANNER'});
      }, 5000);
    }
  };
  const handleDeleteVideo = async () => {
    const consent = window.confirm('Are you sure to delete the video?');
    if (!consent) return;
    const id = videos[indexVideo].id;
    const response = await fetch(`${uri}:${port}/${resource}/deleteVideo`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: encryptData(id) })})
    const data = await response.text();
    if (decryptData(data).result === 'success') {
      dispatch({type: 'DELETE_VIDEO', id: id});
      setTimeout(() => { 
        dispatch({type: 'CLOSE_BANNER'});
      }, 5000);
    }
  };
  return (
    <div className='container-right'>
      <div className='events' ref={scrollToEvents}>
        {/* { state.signin.user && !state.events.length ? <img className='add' src={ADD} alt='add' /> : '' } */}
        <label>
          {
            state.events.length ?
            <>
              <div>Events</div>
              <div style={{fontSize: 'medium'}}>(click on the card for details)</div>
            </> :
            <div>(empty)</div>
          }
        </label>
        {
          state.selectedEvent === '' ?
          <div className='scroll-events' style={{animation: `scroll ${eventsLength * 5}s linear infinite normal`}}>
            {
              state.events.map((event, i) => (
                <div key={i} className='events-item' onClick={() => dispatch({type: 'DISPLAY_EVENT', id: event.id})}>
                  <div style={{fontWeight: 'bolder'}}>{event.date}</div>
                  <p style={{marginBottom: '0', fontStyle: 'italic'}}>{`${event.title} ...`}</p>
                </div>
              ))
            }
          </div> :
          <div className='event-card'>
            { state.signin.user ? <img className='delete' src={`${uri}:${port}/images/delete.png`} alt='delete' onClick={() => handleDeleteEvent()} /> : '' }
            <img className='close' src={`${uri}:${port}/images/close.png`} alt='close' onClick={() => dispatch({type: 'CLOSE_EVENT'})} />
            <h4>{state.selectedEvent.date}</h4>
            <h5>{state.selectedEvent.title}</h5>
            <div style={{fontSize: 'smaller', paddingBottom: '0.5rem'}}>{state.selectedEvent.content}</div>
            { state.selectedEvent.bullet1 !== '' && <div style={{fontSize: 'smaller', paddingLeft: '0.5rem'}}>- {state.selectedEvent.bullet1}</div> }
            { state.selectedEvent.bullet2 !== '' && <div style={{fontSize: 'smaller', paddingLeft: '0.5rem'}}>- {state.selectedEvent.bullet2}</div> }
            { state.selectedEvent.bullet3 !== '' && <div style={{fontSize: 'smaller', paddingLeft: '0.5rem'}}>- {state.selectedEvent.bullet3}</div> }
            { state.selectedEvent.bullet4 !== '' && <div style={{fontSize: 'smaller', paddingLeft: '0.5rem'}}>- {state.selectedEvent.bullet4}</div> }
            { state.selectedEvent.bullet5 !== '' && <div style={{fontSize: 'smaller', paddingLeft: '0.5rem'}}>- {state.selectedEvent.bullet5}</div> }
            { state.selectedEvent.contact !== '' && <div style={{fontSize: 'smaller', paddingTop: '0.5rem'}}>{state.selectedEvent.contact}</div> }
          </div>
        }
      </div>
      <div className='news' ref={scrollToNews}>
        {/* { state.signin.user && !state.headlines.length ? <img className='add' src={ADD} alt='add' /> : '' } */}
        <label>
          {
            state.headlines.length ?
            <>
              <div>News</div>
              <div style={{fontSize: 'medium'}}>(click on the card for details)</div>
            </> :
            <div>(empty)</div>
          }
        </label>
        {
          state.selectedHeadline === '' ? 
          <div className='scroll-news' style={{animation: `scroll ${newsLength * 5}s linear infinite normal`}}>
            {
              state.headlines.map((news, i) => (
                <div key={i} className='news-item' onClick={() => dispatch({type: 'DISPLAY_HEADLINE', id: news.id})}>
                  <div style={{fontWeight: 'bolder'}}>{news.date}</div>
                  <p style={{marginBottom: '0', fontStyle: 'italic'}}>{`${news.title} ...`}</p>
                </div>
              ))
            }
          </div> :
          <div className='news-card'>
            { state.signin.user ? <img className='delete' src={`${uri}:${port}/images/delete.png`} alt='delete' onClick={() => handleDeleteNews()} /> : '' }
            <img className='close' src={`${uri}:${port}/images/close.png`} alt='close' onClick={() => dispatch({type: 'CLOSE_HEADLINE'})} />
            <h4>{state.selectedHeadline.date}</h4>
            <h5>{state.selectedHeadline.title}</h5>
            <div style={{fontSize: 'smaller', paddingBottom: '0.5rem'}}>{state.selectedHeadline.content}</div>
            { state.selectedHeadline.bullet1 !== '' && <div style={{fontSize: 'smaller', paddingLeft: '0.5rem'}}>- {state.selectedHeadline.bullet1}</div> }
            { state.selectedHeadline.bullet2 !== '' && <div style={{fontSize: 'smaller', paddingLeft: '0.5rem'}}>- {state.selectedHeadline.bullet2}</div> }
            { state.selectedHeadline.bullet3 !== '' && <div style={{fontSize: 'smaller', paddingLeft: '0.5rem'}}>- {state.selectedHeadline.bullet3}</div> }
            { state.selectedHeadline.bullet4 !== '' && <div style={{fontSize: 'smaller', paddingLeft: '0.5rem'}}>- {state.selectedHeadline.bullet4}</div> }
            { state.selectedHeadline.bullet5 !== '' && <div style={{fontSize: 'smaller', paddingLeft: '0.5rem'}}>- {state.selectedHeadline.bullet5}</div> }
            { state.selectedHeadline.contact !== '' && <div style={{fontSize: 'smaller', paddingTop: '0.5rem'}}>{state.selectedHeadline.contact}</div> }
          </div>
        }
      </div>
      <div className='gallery' ref={scrollToPosters}>
        { state.signin.user && <img className='delete' src={`${uri}:${port}/images/delete.png`} alt='delete' onClick={() => handleDeletePoster()}/> }
        { index > 0 && <div className='left' onClick={() => setIndex(index - 1)}>{'<'}</div> }
        { index < (postersLength - 1) && <div className='right' onClick={() => setIndex(index + 1)}>{'>'}</div> }
        <div className='gallery-images'>
          { 
            postersLength ? 
            <img 
              style={{width: '100%', height: '100%', scale: '1.05', objectFit: 'cover'}} 
              src={images[index].logo} 
              alt={`Slide ${index + 1}`} 
              onClick={() => handleDisplayPoster()}
            /> : 
            <div style={{width: '100%', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: '.5', fontSize: 'large'}}>(empty)</div>
          }
        </div>
      </div>
      <div className='gallery' ref={scrollToPosters}>
        { state.signin.user && <img className='delete' src={`${uri}:${port}/images/delete.png`} alt='delete' onClick={() => handleDeleteVideo()} /> }
        { indexVideo > 0 && <div className='left' onClick={() => setIndexVideo(indexVideo - 1)}>{'<'}</div> }
        { indexVideo < (videosLength - 1) && <div className='right' onClick={() => setIndexVideo(indexVideo + 1)}>{'>'}</div> }
        <div className='gallery-images'>
          { 
            videosLength ? 
            <video
              muted
              controls
              playsInline
              autoPlay
              // loop
              // onMouseEnter={() => setControl(true)}
              // onMouseLeave={() => setControl(false)}
              style={{width: '100%', height: '100%', objectFit: 'cover'}} 
              src={videos[indexVideo].logo} 
              alt={`Clip ${indexVideo + 1}`}
            ></video> : 
            <div style={{width: '100%', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: '.5', fontSize: 'large'}}>(empty)</div>
          }
        </div>
      </div>
    </div>
  );
};

export default ContainerRight;