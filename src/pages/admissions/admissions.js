import { useState, useEffect } from 'react';
import IMAGE1 from '../../images/Slider/image01.jpg';
import IMAGE2 from '../../images/Slider/image02.jpg';
import IMAGE3 from '../../images/Slider/image03.jpg';
import IMAGE4 from '../../images/Slider/image04.jpg';
import IMAGE5 from '../../images/Slider/image05.jpg';
import ADMISSIONS01 from '../../images/Admissions/admissions01.jpg';
import './admissions.css';

const Admissions = ({ state }) => {
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
    <div className='admissions'>
      <div className='admissions-left'>
        <h2>Admissions at Watson</h2> 
        <p>
          <img className='left-aligned-image' src={ADMISSIONS01} alt='placeholder' />
          Obviously this factor become most and most important in today’s scenario as in school we don’t 
          able to understand the things not because there are bad teachers but because of large strength 
          they shy to ask their doubts.
          <p>
            Because of large strengths personal attention cannot be given irrespective of how good the teacher is. 
            This is practically right
          </p>
          <p>
            If student doesn’t ask his/her doubts in 15 students also then teachers can also understand from 
            the face of students. If it has been large then it won’t be practically possible. Syllabus will have its pace.
          </p>
        </p>
      </div>
      <div className='admissions-right'>
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

export default Admissions;