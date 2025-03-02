import { useState, useEffect } from 'react';
import VISION01 from '../../images/Vision/vision01.jpg';
import VISION02 from '../../images/Vision/vision02.jpg';
import IMAGE1 from '../../images/Slider/image01.jpg';
import IMAGE2 from '../../images/Slider/image02.jpg';
import IMAGE3 from '../../images/Slider/image03.jpg';
import IMAGE4 from '../../images/Slider/image04.jpg';
import IMAGE5 from '../../images/Slider/image05.jpg';
import './vision.css';

const Vision = ({ state }) => {
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
          <img className='left-aligned-image' src={VISION01} alt='placeholder' />
          To become a premier academy of education recognized for its diversity, and known for excellence in teaching, 
          learning and students - Watson future proofing Academy. Our nation need harness the intellectual potential 
          of out younger generation to turn India into a superpower.
          <p>
            Watson Academy is a premier coaching institute that nurtures the students to explore their full potential 
            so as to boost their self-confidence and moral in order to realize their dreams by advanced teaching methodology.
          </p>
          <p>
            Our vision is to impact best quality education from 8th standard onwards for national and global examination 
            and help them to fulfill their dreams of entering to the top Engineering and Medical collages daily version 
            classroom study. At Watson Academy, we nurture the students to explore their full potential so as to boost 
            their self-confidence and moral in order to realise their dreams by advanced teaching methodology.
          </p>
        </p>
        <h2>Our Mission</h2>
        <p>
          <img className='left-aligned-image' src={VISION02} alt='placeholder' />
          Our mission is to deliver quality education to each and every student and to ensure his or her success. 
          We commit ourselves to excellent education and boast of a number of faculty members who are totally devoted 
          and committed so as to build trust and compassion between teachers and students and ensure that the students 
          achieve what they came for.
          <p>
            We are committed to provide a safe and intellectually challenging environment that will empower students to 
            become innovative thinkers, creative problem solvers and inspired learners prepared to thrive in the twenty-first 
            century. We are dedicated to provide a comprehensive, challenging and engaging curriculum that will be responsive 
            to the needs of each student.
          </p>
          <p>
            Watson Academic Coaching helps students develop effective academic skills, gain confidence, increase motivation, 
            and earn better grades. Watson offered individual sessions with a peer coach and through group workshops. We help 
            students to understand their learning styles, improve their study skills, and develop effective time management 
            strategies.
          </p>
        </p>
      </div>
      <div className='vision-right'>
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

export default Vision;