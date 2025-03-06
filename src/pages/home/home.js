import { useState, useEffect, lazy, Suspense } from 'react';
import NEETU_HOME_01 from '../../images/neetu_home_01.jpg';
import IMAGE1 from '../../images/Slider/image01.jpg';
import IMAGE2 from '../../images/Slider/image02.jpg';
import IMAGE3 from '../../images/Slider/image03.jpg';
import IMAGE4 from '../../images/Slider/image04.jpg';
import IMAGE5 from '../../images/Slider/image05.jpg';
import ClOSE from '../../images/close.png';
import './home.css';
const PD = lazy(() => import('../professional_development/pd'));
const SI = lazy(() => import('../student_instruction/si'));
const AE = lazy(() => import('../alternate_education/ae'));

const Home = ({ state, dispatch }) => {
  const selectedHomePageLink = state.homePageLinks.filter(link => link.isSelected);
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
        <h2>Welcome to Watson Academy, Goa</h2>
        <p>
          What makes the Watson Academy the smartest choice? Goa's (Vasco-da-Gama) first (NEET or IIT JEE) 
          coaching center that provides 6 Days Regualar Classes, 4 Days Regular DPP for Each Subject 
          (Physics, Chemistry, Maths and Biology). Class 6th to 12th, Board/School and Olympiad preparation, 
          Parent Teacher Meetings, Motivational Sessions.
        </p>
        <h4>Click below buttons to explore more...</h4>
        <div className='container-left-top'>
          { state.homePageLinks.map((link, i) => 
          <div 
            key={i} 
            style={{backgroundColor: link.isSelected ? '#fee' : 'transparent'}}
            className='container-link'
            onClick={() => dispatch({type: 'SELECT_HOME_PAGE_LINK', index: i})}
          >
            <img src={link.logo} style={{width: '20px', height: '20px'}} alt='placeholder' />
            <div>{link.name}</div>
          </div>)}
        </div>
        <div className='slider' style={{ display: selectedHomePageLink.length ? 'flex' : 'none' }}>
          { selectedHomePageLink.length && selectedHomePageLink[0].name !== undefined && <div className='slider-title'>{selectedHomePageLink[0].name}</div>}
          <img className='slider-close' src={ClOSE} alt='close' onClick={() => dispatch({type: 'DESELECT_HOME_PAGE_LINK'})} />
          <Suspense fallback={<div className='loading'>Loading...</div>}>
            { selectedHomePageLink.length && selectedHomePageLink[0].name === 'Professional Developement' && <PD /> }
            { selectedHomePageLink.length && selectedHomePageLink[0].name === 'Student Instruction' && <SI /> }
            { selectedHomePageLink.length && selectedHomePageLink[0].name === 'Alternate Education' && <AE /> }
          </Suspense>
        </div>
        <p>
          If you are dreaming to be future doctor and engineer. You want to score well in your exams. 
          We are here to help you. You will get well deigned study materials. We have well qualified 
          teachers (IITIAN, BITSIAN and PHD Scholar).
        </p>
        <p>
          Best Coaching Institute for Pre-Medical (AIPMT, NEET & AIIMS), IITJEE, JEE containers, 
          JEE Advanced, NTSE, KVPY, Boards, Commerce Maths and Class - VIII to XII Science & Maths.
        </p>
        <h2>Individual approach to Education!</h2>
        <p>
          <img className='home-left-aligned-image' src={NEETU_HOME_01} alt='placeholder' />
          <b>
            Watson Academy was started 3 years ago only with 2 students but today we are providing coaching for more 
            than 80 students under one roof. Watson is a complete science academy i.e. PCMB (Maths & Biology).
          </b>
          <p>
            In the field of education we have different thinking. Besides providing Basic and Standardized knowledge of 
            each subject our container motive is to raise the mental moral standard of students so that our country would get 
            educated & civilized generation.
          </p>
          <p>
            We, as a unit, has designed a system which will develop interest for science 
            in students and their preparations will be guided by means of various assignments and activities.
            Our aim is to cater children’s academic needs based on their academic capabilities, grasping power, level 
            of dedications and level of performance achievement. With this, the institute is on its “Path to Success” 
            by writing its success story and adding more episode of splendid achievement year after year.
          </p>
          <p>
            <i>“Dream is not that which you see while sleeping, it is something that does not let you sleep.” - <b>A P J Abdul Kalam</b></i>
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
            <img style={{width: '100%', height: '100%', scale: '1.05'}} src={images[index].name} alt={`Slide ${index + 1}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;