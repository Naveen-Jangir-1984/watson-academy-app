import { useState, useEffect } from 'react';
import ClOSE from '../../images/close.png';
import DELETE from '../../images/delete.png';
import ADD from '../../images/add.png';

const uri = process.env.REACT_APP_API_URI;
const port = process.env.REACT_APP_API_PORT;
const resource = process.env.REACT_APP_API_RESOURCE;
// const secretKey = process.env.REACT_APP_SECRET_KEY;

// const decryptData = (encryptedData) => {
//   const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
//   return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
// }

const ContainerRight = ({ state, dispatch }) => {
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
  const eventsLength = state.events.length;
  const newsLength = state.headlines.length;
  const images = state.posters.images;
  const postersLength = images.length;
  const [index, setIndex] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % postersLength);
    }, 3000);
    return () => clearInterval(interval);
  });
  return (
    <div className='container-right'>
      <div className='events'>
        { state.signin.user && !state.events.length ? <img className='add' src={ADD} alt='add' /> : '' }
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
            { state.signin.user ? <img className='delete' src={DELETE} alt='delete' onClick={() => handleDeleteEvent()} /> : '' }
            <img className='close' src={ClOSE} alt='close' onClick={() => dispatch({type: 'CLOSE_EVENT'})} />
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
      <div className='news'>
        { state.signin.user && !state.headlines.length ? <img className='add' src={ADD} alt='add' /> : '' }
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
            { state.signin.user ? <img className='delete' src={DELETE} alt='delete' onClick={() => handleDeleteNews()} /> : '' }
            <img className='close' src={ClOSE} alt='close' onClick={() => dispatch({type: 'CLOSE_HEADLINE'})} />
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
      <div className='gallery' ref={state.scrollToPosters}>
        <div className='gallery-images'>
          <img 
            style={{width: '100%', height: '100%', scale: '1.05', objectFit: 'contain'}} 
            src={images[index].logo} 
            alt={`Slide ${index + 1}`} 
            onClick={() => {
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
                state.scrollToTop.current?.scrollIntoView({ behavior: 'smooth' });
              }, 500);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ContainerRight;