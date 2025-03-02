import { useState, useEffect, lazy, Suspense } from 'react';
import IMAGE1 from '../../images/Slider/image01.jpg';
import IMAGE2 from '../../images/Slider/image02.jpg';
import IMAGE3 from '../../images/Slider/image03.jpg';
import IMAGE4 from '../../images/Slider/image04.jpg';
import IMAGE5 from '../../images/Slider/image05.jpg';
import COURSE01 from '../../images/Courses/courses01.jpg';
import ClOSE from '../../images/close.png';
import BULB from '../../images/bulb.png';
import './courses.css';
const BC = lazy(() => import('../basic_course/bc'));
const SC = lazy(() => import('../special_course/sc'));

const Courses = ({ state, dispatch }) => {
  const selectedCourse = state.courses.filter(course => course.isSelected);
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
    <div className='courses'>
      <div className='courses-left'>
        <div className='courses-left-top'>
          { state.courses.map((course, i) => 
          <div 
            key={i} 
            style={{backgroundColor: course.isSelected ? '#fee' : 'transparent'}}
            className='courses-link'
            onClick={() => dispatch({type: 'SELECT_COURSE', index: i})}
          >
            <img src={BULB} style={{width: '20px', height: '18px'}} alt='placeholder' />
            <div>{course.name}</div>
          </div>) }
        </div>
          <div className='slider' style={{ display: selectedCourse.length ? 'flex' : 'none' }}>
            <img className='slider-close' src={ClOSE} alt='close' onClick={() => dispatch({type: 'DESELECT_COURSE'})} />
            <Suspense fallback={<div className='loading'>Loading...</div>}>
              { selectedCourse.length && selectedCourse[0].name === 'Basic Courses' && <BC /> }
              { selectedCourse.length && selectedCourse[0].name === 'Special Courses' && <SC /> }
            </Suspense>
          </div>
        <p>
          <img className='left-aligned-image' src={COURSE01} alt='placeholder' />
          In this competitive age, even 1 mark can make a difference. To score the high marks in exams, 
          you need to know a lot more than what the textbooks provide. 
          <p>
            Watson Academy provides the best coaching classes, which help you to score good marks and 
            ensure your success in competitive exams.
          </p>
        </p>
        <p>
          <h3>Silent Features</h3>
          <ul>
            <li><p>Main focus on Basics</p></li>
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
      <div className='courses-right'>
        <div className='gallery'>
          <label>Gallery</label>
          <div className='gallery-images'>
            <img style={{width: '100%', height: '100%', scale: '1.05'}} src={images[index].name} alt={`Slide ${index + 1}`} />
          </div>
        </div>
        <label>Latest News</label>
        <div className='news'>
          <div className='scroll-news'>
            {
              state.latestNews.slice(5).reverse().map((news, i) => (
                <div key={i} className='news-item'>
                  <div style={{fontWeight: 'bolder'}}>{news.date}</div>
                  <p>{news.title}</p>
                  <div style={{fontSize: 'x-small'}}>{news.content}</div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;