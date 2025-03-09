import CLOSE from '../../images/close.png';
import './banner.css';

const Banner = ({ state, dispatch }) => {
  return (
    <div className={`banner-${state.banner.position}`}>
      <img className='banner-close' src={CLOSE} alt='close' onClick={() => dispatch({type: 'CLOSE_BANNER'})} />
      <div className='banner-message'>{state.banner.message}</div>
    </div>
  );
}

export default Banner;