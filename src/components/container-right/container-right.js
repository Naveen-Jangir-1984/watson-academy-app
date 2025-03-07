import { useState, useEffect, useRef } from 'react';
import ClOSE from '../../images/close.png';

const ContainerRight = ({ state, dispatch }) => {
  const eventsLength = state.events.length;
  const newsLength = state.headlines.length;
  const postersLength = state.posters.length;
  const scrollToPoster = useRef(state.displayPoster.scrollToPoster);
  const [index, setIndex] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % postersLength);
    }, 3000);
    return () => clearInterval(interval);
  });
  return (
    <div className='container-right'>
      <label>Events</label>
      <div className='events'>
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
      <label>News</label>
      <div className='news'>
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
      <label ref={scrollToPoster}>Gallery</label>
      <div className='gallery'>
        <div className='gallery-images'>
          <img 
            style={{width: '100%', height: '100%', scale: '1.05', objectFit: 'contain'}} 
            src={state.posters[index].name} 
            alt={`Slide ${index + 1}`} 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              const updatedImages = state.posters.map(image => {
                if(image.id === state.posters[index].id) {
                  image.isSelected = true;
                } else {
                  image.isSelected = false;
                }
                return image;
              })
              dispatch({type: 'DISPLAY_POSTER', images: updatedImages, element: scrollToPoster})
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ContainerRight;