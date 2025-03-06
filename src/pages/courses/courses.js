import { useState, useEffect, lazy, Suspense } from 'react';
import COURSE01 from '../../images/Courses/courses01.jpg';
import ClOSE from '../../images/close.png';
import './courses.css';
const BC = lazy(() => import('../basic_course/bc'));
const SC = lazy(() => import('../special_course/sc'));

const Courses = ({ state, dispatch }) => {
  const selectedCourse = state.courses.filter(course => course.isSelected);
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
        <h2>Our Courses</h2>
        <p>
          In this competitive age, even 1 mark can make a difference. To score the high marks in exams, 
          you need to know a lot more than what the textbooks provide.
        </p> 
        <p>
          <img className='left-aligned-image' src={COURSE01} alt='placeholder' />
          Watson Academy provides the best coaching classes, which helps the students to score good marks and 
          ensure their success in competitive exams.
        </p>
        <h4>Click below buttons to explore more...</h4>
        <div className='container-left-top'>
          { state.courses.map((course, i) => 
          <div 
            key={i} 
            style={{backgroundColor: course.isSelected ? '#fee' : 'transparent'}}
            className='container-link'
            onClick={() => dispatch({type: 'SELECT_COURSE', index: i})}
          >
            <img src={course.logo} style={{width: '20px', height: '20px'}} alt='placeholder' />
            <div>{course.name}</div>
          </div>) }
        </div>
        <div className='slider' style={{ display: selectedCourse.length ? 'flex' : 'none' }}>
          <img className='slider-close' src={ClOSE} alt='close' onClick={() => dispatch({type: 'DESELECT_COURSE'})} />
          { selectedCourse.length && selectedCourse[0].name !== undefined && <div className='slider-title'>{selectedCourse[0].name}</div>}
          <Suspense fallback={<div className='loading'>Loading...</div>}>
            { selectedCourse.length && selectedCourse[0].name === 'Basic Courses' && <BC /> }
            { selectedCourse.length && selectedCourse[0].name === 'Special Courses' && <SC /> }
          </Suspense>
        </div>
        <p>
          <h3>Silent Features</h3>
          <ul>
            <li><p>container focus on Basics</p></li>
            <li><p>No Mug-ups</p></li>
            <li><p>Doubt sessions / Weekly Tests</p></li>
            <li><p>Regular PTM</p></li>
            <li><p>Personal attention to students</p></li>
            <li><p>Taught by expertise faculties</p></li>
            <li><p>Test series before exams</p></li>
            <li><p>Batch of 15 Students</p></li>
            <li><p>Weekly Test( 2 test per week)</p></li>
            <li><p>Excellent, qualified, child centric team of faculty</p></li>
            <li><p>Customised teaching pattern</p></li>
            <li><p>Doubt Difficulty & Revision Lectures</p></li>
          </ul>
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

export default Courses;