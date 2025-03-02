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
    <div className='home'>
      <div className='home-left'>
        <div className='home-left-top'>
          { state.homePageLinks.map((link, i) => 
          <div 
            key={i} 
            style={{backgroundColor: link.isSelected ? '#fee' : 'transparent'}}
            className='home-link'
            onClick={() => dispatch({type: 'SELECT_HOME_PAGE_LINK', index: i})}
          >
            <img src={link.logo} style={{width: '20px', height: '20px'}} alt='placeholder' />
            <div>{link.name}</div>
          </div>) }
        </div>
          <div className='slider' style={{ display: selectedHomePageLink.length ? 'flex' : 'none' }}>
            <img className='slider-close' src={ClOSE} alt='close' onClick={() => dispatch({type: 'DESELECT_HOME_PAGE_LINK'})} />
            <Suspense fallback={<div className='loading'>Loading...</div>}>
              { selectedHomePageLink.length && selectedHomePageLink[0].name === 'Professional Developement' && <PD /> }
              { selectedHomePageLink.length && selectedHomePageLink[0].name === 'Student Instruction' && <SI /> }
              { selectedHomePageLink.length && selectedHomePageLink[0].name === 'Alternate Education' && <AE /> }
            </Suspense>
          </div>
        <h2>Welcome to Watson Academy, Goa</h2>
        <p>
          What makes the Watson Academy the smartest choice? Goa's (Vasco-da-Gama) first (NEET or IIT JEE) 
          coaching center that provide 6 Days Regualar Classes, 4 Days Regular DPP for Each Subject 
          (Physics, Chemistry, Maths and Biology). Class 6th to 12th, Board/School and Olympiad preparation, 
          Parent Teacher Meetings, Motivational Sessions. If you are dreaming to be future doctor and engineer. 
          You want to score well in your exams. We are here to help you. You will get well deigned study materials. 
          We have well qualified teachers (IITIAN, BITSIAN and PHD Scholar).
        </p>
        <p>
          <b>Watson Academy;</b> Best Coaching Institute for Pre-Medical (AIPMT, NEET & AIIMS), IITJEE, JEE Mains, 
          JEE Advanced, NTSE, KVPY, Boards, Commerce Maths and Class - VIII to XII Science & Maths.
        </p>
        <h2>Individual approach to Education!</h2>
        <p>
          <img className='left-aligned-image' src={NEETU_HOME_01} alt='placeholder' />
          <b>
            Watson Academy was started 3 years ago only with 2 students but today we are providing coaching for more 
            than 80 students under one roof. Watson is a complete science academy i.e. PCMB (Maths & Biology).
          </b>
          <p>
            In the field of education we have different thinking. Besides providing Basic and Standardized knowledge of 
            each subject our main motive is to raise the mental moral standard of students so that our country would get 
            educated & civilized generation. We as a unit has designed a system which will develop interest for science 
            in student and their preparation will be guided by means of various assignment and activities. Our aim is to 
            cater children’s academic needs based on their academic capabilities, grasping power, level of dedications 
            and level of performance achievement.
          </p>
          <p>
            With this, the institute is on its “Path to Success” by writing its success story and adding more episode 
            of splendid achievement year after year. “Dream is not that which you see while sleeping it is something 
            that does not let you sleep.” - <b>A P J Abdul Kalam</b>
          </p>
        </p>
      </div>
      <div className='home-right'>
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

export default Home;