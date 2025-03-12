import MOBILE from '../../images/Header/mobile.jpg';
import EMAIL from '../../images/Header/email.jpg';
import FACEBOOK from '../../images/Header/facebook.jpg';
import INSTAGRAM from '../../images/Header/instagram.jpg';
import TWITTER from '../../images/Header/twitter.jpg';
import './header.css';

const Header = ({ state, dispatch }) => {
  const handleSignOut = () => {
    const consent = window.confirm('Do you really wish to sign out?');
    if (!consent) return;
    dispatch({type: 'SIGNOUT'});
  }
  return (
    <div className='header'>
      <div className='contacts'>
        <div className='phone'>
          <img src={MOBILE} alt='phone' />
          <a href='tel:9767940053'>9767940053</a>
        </div>
        <div className='email'>
          <img src={EMAIL} alt='email' />
          <a href='mailto:watsonacad@gmail.com'>watsonacad@gmail.com</a>
        </div>
      </div>
      <div className='links'>
        { 
          state.signin.user ? 
          <div className='signin' onClick={() => handleSignOut()}>Sign Out</div> :
          <div className='signin' onClick={() => dispatch({type: 'OPEN_SIGNIN'})}>Sign In</div>
        }
        <div>Follow Us on</div>
        <div className='links-wrap'>
          <a className='facebook' href='https://www.facebook.com/Watson-academy-633668063499427/'>
            <img src={FACEBOOK} alt='facebook' />
          </a>
          <a className='instagram' href='https://www.instagram.com/'>
            <img src={INSTAGRAM} alt='instagram' />
          </a>
          <a className='twitter' href='https://www.twitter.com/'>
            <img src={TWITTER} alt='twitter' />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;