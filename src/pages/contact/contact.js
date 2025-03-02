import { useState, useEffect } from 'react';
import IMAGE1 from '../../images/Slider/image01.jpg';
import IMAGE2 from '../../images/Slider/image02.jpg';
import IMAGE3 from '../../images/Slider/image03.jpg';
import IMAGE4 from '../../images/Slider/image04.jpg';
import IMAGE5 from '../../images/Slider/image05.jpg';
import './contact.css';

const Contact = ({ state }) => {
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
    <div className='contact'>
      <div className='contact-left'>
        <h2>Dear Parents</h2>
        <p>
          We kindly invite you to leave a message regarding your address details to ensure smooth communication and coordination. 
          Providing accurate address information helps us in better planning and ensuring timely updates when needed. Please feel 
          free to share any additional details or special instructions that may assist us. Your cooperation is greatly appreciated!
        </p>
        <h2>Write Us</h2>
        <div className='form-name'>
          <label>Name</label>
          <input type='text' />
        </div>
        <div className='form-email'>
          <label>Email</label>
          <input type='text' />
        </div>
        <div className='form-message'>
          <label>Message</label>
          <textarea />
        </div>
        <div className='form-actions'>
          <button>Clear</button>
          <button>Submit</button>
        </div>
      </div>
      <div className='contact-right'>
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

export default Contact;