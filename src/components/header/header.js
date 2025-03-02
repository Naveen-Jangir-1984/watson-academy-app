import './header.css';

const Header = () => {
  return (
    <div className='header'>
      <div className='contacts'>
        <div className='phone'>
          <img src='https://img.icons8.com/ios/50/000000/phone.png' alt='phone' />
          <a href='tel:9767940053'>9767940053</a>
        </div>
        <div className='email'>
          <img src='https://img.icons8.com/ios/50/000000/email.png' alt='email' />
          <a href='mailto:watsonacad@gmail.com'>watsonacad@gmail.com</a>
        </div>
      </div>
      <div className='links'>
        <div>Follow Us on</div>
        <div className='links-wrap'>
          <a className='facebook' href='https://www.facebook.com/Watson-academy-633668063499427/'>
            <img src='https://img.icons8.com/ios/50/000000/facebook.png' alt='facebook' />
          </a>
          <a className='instagram' href='https://www.instagram.com/'>
            <img src='https://img.icons8.com/ios/50/000000/instagram-new.png' alt='instagram' />
          </a>
          <a className='twitter' href='https://www.twitter.com/'>
            <img src='https://img.icons8.com/ios/50/000000/twitter.png' alt='twitter' />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;