import { useState, useEffect } from 'react';
import IMAGE1 from '../../images/Slider/image01.jpg';
import IMAGE2 from '../../images/Slider/image02.jpg';
import IMAGE3 from '../../images/Slider/image03.jpg';
import IMAGE4 from '../../images/Slider/image04.jpg';
import IMAGE5 from '../../images/Slider/image05.jpg';
import ADMISSIONS01 from '../../images/Admissions/admissions01.jpg';
import ClOSE from '../../images/close.png';
import './admissions.css';

const Admissions = ({ state, dispatch }) => {
  const images = [
    { name: IMAGE1, isSelected: false },
    { name: IMAGE2, isSelected: false },
    { name: IMAGE3, isSelected: false },
    { name: IMAGE4, isSelected: false },
    { name: IMAGE5, isSelected: false },
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  });
  return (
    <div className='container'>
      <div className='container-left'>
        <h2>Admissions</h2> 
        <p>
          Obviously this factor become most and most important in today’s scenario as in school we aren not 
          able to understand the things, not because there are bad teachers but because of large strength 
          they shy to ask their doubts.
        </p>
        <p>
          <img className='left-aligned-image' src={ADMISSIONS01} alt='placeholder' />
          Because of large strengths personal attention cannot be given irrespective of how good the teacher is. 
          This is practically right.
          <p>
            If student doesn’t ask his/her doubts in 15 students also then teachers can also understand from 
            the face of students. If it has been large then it won’t be practically possible. Syllabus will have its pace.
          </p>
        </p>
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
            <img style={{width: '100%', height: '100%', scale: '1.05'}} src={images[index].name} alt={`Slide ${index + 1}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admissions;