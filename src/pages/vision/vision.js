import { useState, useEffect } from 'react';
import VISION01 from '../../images/Vision/vision01.jpg';
import VISION02 from '../../images/Vision/vision02.jpg';
import IMAGE1 from '../../images/Slider/image01.jpg';
import IMAGE2 from '../../images/Slider/image02.jpg';
import IMAGE3 from '../../images/Slider/image03.jpg';
import IMAGE4 from '../../images/Slider/image04.jpg';
import IMAGE5 from '../../images/Slider/image05.jpg';
import ClOSE from '../../images/close.png';
import './vision.css';

const Vision = ({ state, dispatch }) => {
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
    <div className='vision'>
      <div className='vision-left'>
        <h2>Our Vision</h2>
        <p>
          To become a premier academy of education recognized for its diversity, and known for excellence in teaching, 
          learning and students - Watson future proofing Academy. Our nation needs to harness the intellectual potential 
          of our younger generation to turn India into a superpower.
        </p>
        <p>
          <img className='left-aligned-image' src={VISION01} alt='placeholder' />
          Watson Academy is a premier coaching institute that nurtures the students to explore their full potential 
          so as to boost their self-confidence and moral in order to realize their dreams by advanced teaching methodology.
          <p>
            Our vision is to impact best quality education from 8th standard onwards for national and global examinations 
            and help them to fulfill their dreams of entering in to the top Engineering and Medical collages daily version 
            classroom study.
          </p>
        </p>
        <h2>Our Mission</h2>
        <p>
          To deliver quality education to each and every student and to ensure his or her success. 
          We commit ourselves to excellent education and boast of a number of faculty members who are totally devoted 
          and committed so as to build trust and compassion between teachers and students and ensure that the students 
          achieve what they came for.
        </p>
        <p>
          <img className='left-aligned-image' src={VISION02} alt='placeholder' />
          We are committed to provide a safe and intellectually challenging environment that will empower students to 
          become innovative thinkers, creative problem solvers and inspired learners prepared to thrive in the twenty-first 
          century. We are dedicated to provide a comprehensive, challenging and engaging curriculum that will be responsive 
          to the needs of each student.
          <p>
            Watson Academic Coaching helps the students to develop effective academic skills, gain confidence, increase motivation, 
            and earn better grades. Watson offeress individual sessions with a peer coach and through group workshops. We help 
            students to understand their learning styles, improve their study skills, and develop effective time management 
            strategies.
          </p>
        </p>
      </div>
      <div className='vision-right'>
        <label>Events</label>
        <div className='events'>
          {
            state.selectedEvent === '' ?
            <div className='scroll-events'>
              {
                state.events.slice(5).reverse().map((event, i) => (
                  <div key={i} className='events-item' onClick={() => dispatch({type: 'DISPLAY_EVENT', id: event.id})}>
                    <div style={{fontWeight: 'bolder'}}>{event.date}</div>
                    <p>{event.title}</p>
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
                    <p>{news.title}</p>
                    <div style={{fontSize: 'x-small'}}>{news.content}</div>
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

export default Vision;