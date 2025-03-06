import { useState, useEffect } from 'react';
import WATSON01 from '../../images/Watson/watson01.jpg'
import WATSON02 from '../../images/Watson/watson02.jpg'
import ClOSE from '../../images/close.png';
import './watson.css';

const Watson = ({ state, dispatch }) => {
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
        <h2>Still confused why to trust us?</h2>
        <p>
          <b>Highly qualified and experienced teachers</b> handle the subjects effectively and efficiently and also make sure that 
          every student get proper individual attention. Parents are <b>regularly informed</b> about their children’s progress and performance.
        </p>
        <p>
          <img className='left-aligned-image' src={WATSON01} alt='placeholder' />
          We at Watson Academy follow <b>up-to-date and regularly revised teaching methods</b> and syllabus to keep pace with the 
          new pattern to make sure that it keeps up with the evolving examinations patters and also keep our students ahead
          in this race to the finish divine.
          <p>
            Presentation of the subjects is in a systematic and logical manner to enable the students to comprehend the 
            structure and substance of the concepts.
          </p>
          <p>
            Concentration on exam-oriented appreciable number of quadivty problems to provide a firm grounding for 
            students in various subjects and to face the professional exams with high confidence.
          </p>
        </p>
        <p>
          Systematic exploring of syllabus in a scheduled time frame without sacrificing quadivty and number of classes.
          Workable strategy and <b>Time Management scheme</b> for exam preparation.
        </p>
        <p>
          <img className='left-aligned-image' src={WATSON02} alt='placeholder' />
          Cooperative and supporting teachers for last minute assistance before examinations. <b>Concept-driven approach
          </b> which exposes students to all types of problems asked.
          <p>
            <b>Special attention to the doubts</b> of students and making sure that they understand the basic concepts.
            <b>Regular tests</b> are designed for the students to understand the stress and time-pressure conditions which 
            expected to be faced in the actual examinations.
          </p>
          <p>
            <b>Well paced lectures</b> starting with basic concepts and gradually culminating in entrance level problems.
            Continuous <b>Feedback Mechanism</b> in place so as to improve on any shortcomings whatsoever as soon as possible.
            Result oriented and dedicated faculty well equipped with knowledge regarding the subjects. Stringent 
            <b>selection criteria for faculty</b> so as to give the best to the students. We customize each subject learning 
            objectives depending on the learning gaps of the student and plan a lesson structure that would complement 
            their individual needs.
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
            <img style={{width: '100%', height: '100%', scale: '1.05'}} src={state.posters[index].name} alt={`Slide ${index + 1}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watson;