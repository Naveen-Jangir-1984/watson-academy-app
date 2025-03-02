import { useState, useEffect } from 'react';
import WATSON01 from '../../images/Watson/watson01.jpg'
import WATSON02 from '../../images/Watson/watson02.jpg'
import IMAGE1 from '../../images/Slider/image01.jpg';
import IMAGE2 from '../../images/Slider/image02.jpg';
import IMAGE3 from '../../images/Slider/image03.jpg';
import IMAGE4 from '../../images/Slider/image04.jpg';
import IMAGE5 from '../../images/Slider/image05.jpg';
import './watson.css';

const Watson = ({ state }) => {
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
    <div className='watson'>
      <div className='watson-left'>
        <h2>Still confused why to trust us?</h2>
        <h3>Here are few things about us that may help change your mind.</h3>
        <p>
          <img className='left-aligned-image' src={WATSON01} alt='placeholder' />
          <div>
            <b>Highly qualified and experienced teachers</b> handle the subjects effectively and efficiently and also make sure that 
            every student get proper individual attention. Parents are <b>regularly informed</b> about their children’s progress and performance.
          </div>
          <p>
            We at Watson Academy follow <b>up-to-date and regularly revised teaching methods</b> and syllabi to keep pace with the 
            new pattern to make sure that it keeps up with the evolving examinations patters and also keep our students ahead
            in this race to the finish divne.
            </p>
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
          <img className='left-aligned-image' src={WATSON02} alt='placeholder' />
          <div>
            Systematic exploring of syllabus in a scheduled time frame without sacrificing quadivty and number of classes.
            Workable strategy and <b>Time Management scheme</b> for exam preparation.
          </div>
          <p>
            Cooperative and supporting teachers for last minute assistance before examinations.
            <b>Concept-driven approach</b> which exposes students to all types of problems asked.
          </p>
          <p>
            <b>Special attention to doubts</b> of students and making sure that they understand the basic concepts.
            <b>Regular tests</b> to adivgn the students to the stress and time-pressure conditions to be faced in the actual examinations.
          </p>
          <p>
            <b>Well paced lectures</b> starting with basic concepts and gradually culminating in entrance level problem.
            Continuous <b>Feedback Mechanism</b> in place so as to improve on any shortcomings whatsoever as soon as possible.
            Result oriented and dedicated faculty well equipped with knowledge regarding the subjects.
            Stringent <b>selection criteria for faculty</b> so as to give the best to the students.            
            We customize each subject learning objectives depending on the learning gaps of the student and plan a 
            lesson structure that would complement their individual needs.
          </p>
        </p>    
      </div>
      <div className='watson-right'>
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

export default Watson;