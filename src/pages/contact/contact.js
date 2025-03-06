import { useState, useEffect } from 'react';
import CONTACT01 from '../../images/Contact/contact01.jpg';
import ClOSE from '../../images/close.png';
import './contact.css';

const Contact = ({ state, dispatch }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % state.posters.length);
    }, 3000);

    return () => clearInterval(interval);
  });
  return (
    <div className='container'>
      <div className='container-left'>
        <h2>Dear Parents</h2>
        <p>
          We kindly invite you to leave a message regarding your address details to ensure smooth communication and coordination. 
          Providing accurate address information helps us in better planning and ensuring timely updates when needed.
          <p>
            <img className='left-aligned-image' src={CONTACT01} alt='placeholder' />
            Please feel free to share any additional details or special instructions that may assist us. Your cooperation is greatly appreciated!
          </p>
        </p>
        <h2>Write Us</h2>
        <div className='form-name'>
          <label>Name</label>
          <input type='text' />
        </div>
        <div className='form-email'>
          <label>Email</label>
          <input type='text' />
        </div>
        <div className='form-message'>
          <label>Message</label>
          <textarea />
        </div>
        <div className='form-actions'>
          <button>Clear</button>
          <button>Submit</button>
        </div>
      </div>
      <div className='container-right'>
        <label>Events</label>
        <div className='events'>
          {
            state.selectedEvent === '' ?
            <div className='scroll-events'>
              {
                state.events.slice(5).reverse().map((event, i) => (
                  <div key={i} className='events-item' onClick={() => dispatch({type: 'DISPLAY_EVENT', id: event.id})}>
                    <div style={{fontWeight: 'bolder'}}>{event.date}</div>
                    <p style={{marginBottom: '0'}}>{event.title}</p>
                  </div>
                ))
              }
            </div> :
            <div className='event-card'>
              <img className='close' src={ClOSE} alt='close' onClick={() => dispatch({type: 'CLOSE_EVENT'})} />
              <h4>{state.selectedEvent.date}</h4>
              <p>{state.selectedEvent.title}</p>
              <div>{state.selectedEvent.container}</div>
            </div>
          }
        </div>
        <label>News</label>
        <div className='news'>
          {
            state.selectedHeadline === '' ? 
            <div className='scroll-news'>
              {
                state.headlines.slice(5).reverse().map((news, i) => (
                  <div key={i} className='news-item' onClick={() => dispatch({type: 'DISPLAY_HEADLINE', id: news.id})}>
                    <div style={{fontWeight: 'bolder'}}>{news.date}</div>
                    <p style={{marginBottom: '0'}}>{news.title}</p>
                  </div>
                ))
              }
            </div> :
            <div className='news-card'>
              <img className='close' src={ClOSE} alt='close' onClick={() => dispatch({type: 'CLOSE_HEADLINE'})} />
              <h4>{state.selectedHeadline.date}</h4>
              <p>{state.selectedHeadline.title}</p>
              <div>{state.selectedHeadline.container}</div>
            </div>
          }
        </div>
        <label>Gallery</label>
        <div className='gallery'>
          <div className='gallery-images'>
            <img style={{width: '100%', height: '100%', scale: '1.05'}} src={state.posters[index].name} alt={`Slide ${index + 1}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;