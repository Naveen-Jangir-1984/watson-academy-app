import { useState, useEffect } from 'react';
import IMAGE1 from '../../images/Slider/image01.jpg';
import IMAGE2 from '../../images/Slider/image02.jpg';
import IMAGE3 from '../../images/Slider/image03.jpg';
import IMAGE4 from '../../images/Slider/image04.jpg';
import IMAGE5 from '../../images/Slider/image05.jpg';
import TEACHERS01 from '../../images/Teachers/teachers01.jpg';
import TEACHERS02 from '../../images/Teachers/teachers02.jpg';
import ClOSE from '../../images/close.png';
import './teachers.css';

const Teachers = ({ state, dispatch }) => {
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
        <h2>Our Faculty</h2>
        <p>
          We have dedicated and experienced faculty for each and every subject sourced from Reputed universities and the industry. 
          The best teachers, like the best leaders, have an uncanny ability to step outside themselves and become liberating forces 
          in our lives.
        </p> 
        <p>
          <img className='left-aligned-image' src={TEACHERS01} alt='placeholder' />
          So, the best amongst the lot joined hands with us to bring complete understanding of the subject and arsenal 
          of problem-solving techniques for efficient and effective studying. 
          <p>
            Our faculty team comprise of perfect blend of academicians and subject experts. They are trained to better 
            the learning process for students.
          </p>
        </p>
        <p>
          We have scientifically designed methodology to filter out best from the existing lot. Regular soft training workshops 
          are held for the faculty members to ensure that teaching methods, subject knowledge, problem solving tricks are always 
          up to the mark. 
        </p>
        <p>
          <img className='left-aligned-image' src={TEACHERS02} alt='placeholder' />
          Constant update of classroom problems as suggested by team is incorporated to make sure that students 
          are exposed to latest and ever changing patterns of these competitive examinations.
        </p>
        <h2>Faculty are</h2>
        <ul>
          <li><p>Well qualified</p></li>
          <li><p>Experienced with passion</p></li>
          <li><p>Years of experience in industry</p></li>
          <li><p>Guest Faculty lecture</p></li>
          <li><p>Dedicated for each subject</p></li>
        </ul>
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
              <div>{state.selectedEvent.content}</div>
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
              <div>{state.selectedHeadline.content}</div>
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

export default Teachers;