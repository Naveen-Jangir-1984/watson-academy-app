import './header.css';

const uri = process.env.REACT_APP_API_URI;
const port = process.env.REACT_APP_API_PORT;

const Header = ({ state, dispatch }) => {
  return (
    <div className='header'>
      <div className='contacts'>
        <div className='phone'>
          <img src={`${uri}:${port}/images/Header/mobile.jpg`} alt='phone' />
          <a href='tel:9767940053'>9767940053</a>
        </div>
        <div className='email'>
          <img src={`${uri}:${port}/images/Header/email.jpg`} alt='email' />
          <a href='mailto:watsonacad@gmail.com'>watsonacad@gmail.com</a>
        </div>
      </div>
      <div className='links'>
        { state.signin.user ? '' : <div className='signin' onClick={() => dispatch({type: 'OPEN_SIGNIN'})}>Sign In</div> }
        <div>Follow Us on</div>
        <div className='links-wrap'>
          <a className='facebook' href='https://www.facebook.com/Watson-academy-633668063499427/'>
            <img src={`${uri}:${port}/images/Header/facebook.jpg`} alt='facebook' />
          </a>
          <a className='instagram' href='https://www.instagram.com/'>
            <img src={`${uri}:${port}/images/Header/instagram.jpg`} alt='instagram' />
          </a>
          <a className='twitter' href='https://www.twitter.com/'>
            <img src={`${uri}:${port}/images/Header/twitter.jpg`} alt='twitter' />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;